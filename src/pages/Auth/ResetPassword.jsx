import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Box, TextField, Button, CircularProgress, Typography } from "@mui/material";
import { supabase } from "../../utils/authConfig";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sessionVerified, setSessionVerified] = useState(false);
  const token_hash = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token_hash) {
        toast.error("Invalid or missing reset token.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        navigate("/auth/login");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: "recovery",
      });

      if (error) {
        console.log(error);
        
        toast.error("Invalid or expired reset link. Please request a new one.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } else {
        toast.success("Verified! You can now reset your password.", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });

        setSessionVerified(true);
      }

      setLoading(false);
    };

    verifyToken();
  }, [token_hash, navigate]);

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[@$!%*?&]/, "At least one special character (@$!%*?&)")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),
  });

  const handleResetPassword = async (values, { setSubmitting }) => {
    if (!sessionVerified) {
      toast.error("Session verification failed. Try again.");
      return;
    }

    setLoading(true);
    const { password } = values;

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 2000, theme: "dark" });
    } else {
      toast.success("Password reset successfully! Redirecting to login...", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });

      await supabase.auth.signOut(); // Logout user after resetting password
      setTimeout(() => navigate("/auth/login"), 2500);
    }

    setSubmitting(false);
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 3, bgcolor: "rgba(0, 0, 0, 0.6)", borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#fff", textAlign: "center" }}>
          Reset Your Password
        </Typography>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={passwordSchema}
          onSubmit={handleResetPassword}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Field
                  name="password"
                  as={TextField}
                  label="New Password"
                  type="password"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Field
                  name="confirmPassword"
                  as={TextField}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || loading}
                  sx={{ backgroundColor: "#e50914", color: "#fff", "&:hover": { backgroundColor: "#b20710" } }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Reset Password"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ResetPassword;
