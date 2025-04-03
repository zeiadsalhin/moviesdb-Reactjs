import { useState, useEffect } from "react";
import { TextField, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/authConfig";
import { BASE_URL } from "../../utils/BASE_URL_Config";
import CustomButton from "../../components/useCustomButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

// This component is used to reset the password for a user. It sends a password reset email to the user.
// The user can enter their email address and click the "Send Reset Link" button to receive the email.
// If the email is sent successfully, a success message is displayed. If there is an error, an error message is displayed.
// The component also includes a link to the login page for users who have remembered their password.
const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Reset Password | The Movies";
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${BASE_URL}/auth/reset-password`,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    } else {
      toast.success("Password reset email sent! Check your inbox.", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      setTimeout(() => navigate("/auth/login"), 3000);
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "calc(100vh - 9rem)",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url('/account_signup.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: 4,
            borderRadius: 2,
            width: "95%",
            maxWidth: 400,
            color: "#fff",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
          >
            Reset Your Password
          </Typography>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "#ccc", mb: 2 }}
          >
            Enter your email, and we&apos;ll send you a link to reset your password.
            If you don&apos;t see the email, check your spam folder.
          </Typography>

          <form onSubmit={handleResetPassword} style={{ width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              color="#e50914"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#222",
                  color: "#fff",
                  borderRadius: 2,
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#e50914 !important",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#e50914",
                    borderWidth: 2.25,
                  },
                "& .MuiInputLabel-root": { color: "#aaa" },
              }}
              margin="normal"
            />

            <CustomButton
              text={
                loading ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "Send Reset Link"
                )
              }
              type="submit"
              disabled={loading}
              sx={{
                mt: 2,
                width: "100%",
                backgroundColor: "#e50914",
                color: "#fff",
                "&:hover": { backgroundColor: "#b20710" },
              }}
            />
          </form>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 3, color: "#ccc" }}
          >
            Remembered your password?{" "}
            <Link to="/auth/login" style={{ color: "#e50914" }}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;
