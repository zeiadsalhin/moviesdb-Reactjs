import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const ChangePassword = ({ supabase }) => {
  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "At least one special character (@$!%*?&)")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),
  });

  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    const { password } = values;

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    } else {
      toast.success("Password updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });

      // Clear form inputs after success
      resetForm();
    }

    setSubmitting(false);
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={passwordSchema}
        onSubmit={handleChangePassword}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Field
                name="password"
                as={TextField}
                label="New Password"
                type="password"
                color="fff"
                fullWidth
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  "& .MuiOutlinedInput-root": {
                        backgroundColor: "#222",
                        color: "#fff",
                        borderRadius: 2,
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                        borderRadius: 2,
                        borderWidth: 1,
                        outline: "none",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#aaa",
                },}}
              />

              <Field
                name="confirmPassword"
                as={TextField}
                label="Confirm Password"
                type="password"
                color="fff"
                fullWidth
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{
                  "& .MuiOutlinedInput-root": {
                        backgroundColor: "#222",
                        color: "#fff",
                        borderRadius: 2,
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                        borderRadius: 2,
                        borderWidth: 1,
                        outline: "none",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#aaa",
                },}}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                sx={{ backgroundColor: "#99050d", color: "#fff", "&:hover": { backgroundColor: "#b20710" } }}
              >
                {isSubmitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Change Password"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

ChangePassword.propTypes = {
  supabase: PropTypes.object.isRequired,
};

export default ChangePassword;
