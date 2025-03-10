import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Google, GitHub } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { supabase } from "../../utils/authConfig";
import CustomButton from "../../components/useCustomButton"; // Using your custom button
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const SignIn = () => {

  useEffect(() => {
    document.title = "Login | The Movies";
  }, []);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOAuthSignIn = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) {
      console.error("OAuth Sign-in Error:", error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(8, "At least 8 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true); // Show spinner
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      
      if (error) {
        setLoading(false); // Hide spinner
        console.error("Sign-in Error:", error.message);
        setError(error.message);
        toast.error(error.message, { position: "top-center", autoClose: 2000, theme: "dark" });
        return;
      }

      toast.success("Signed In Successfully!", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
      
      setTimeout(() => {
        setLoading(false); // Hide spinner
        navigate("/account/");
      }, 1000);

    },
  });

  return (
    <>
    <ToastContainer />
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 9rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url('/account_signup.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative", 
          zIndex: 2,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 4,
          borderRadius: 2,
          width: "100%",
          maxWidth: { xs: 350, sm: 400 },
          color: "#fff",
        }}
      >
        <Typography gutterBottom sx={{ fontWeight: "bold", textAlign: "center", fontSize: {xs: "1.875rem", sm: "2rem", md: "2.25rem"} }}>
          Welcome | Sign In
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            color="#e50914"
            value={formik.values.email}
            onChange={(e) => {
              setError(null); // Clear error on input change
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#222",
                color: "#fff",
                borderRadius: 2,
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e50914 !important", // Prevents white border on hover
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e50914",
                borderRadius: 2,
                borderWidth: 2.25,
                outline: "none",
              },
              "& .MuiInputLabel-root": {
                color: "#aaa",
              },
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            name="password"
            color="#e50914"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={(e) => {
              setError(null); // Clear error on input change
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#222",
                color: "#fff",
                borderRadius: 2,
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e50914 !important", // Prevents white border on hover
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e50914",
                borderRadius: 2,
                borderWidth: 2.25,
                outline: "none",
              },
              "& .MuiInputLabel-root": {
                color: "#aaa",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff sx={{ color: "#fff" }} /> : <Visibility sx={{ color: "#fff" }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Error Message */}
          {error && (
            <Typography variant="body2" sx={{ color: "#f44336", mt: 1, textAlign: "center" }}>
              {error}
            </Typography>
            )}

          <CustomButton
            text={loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Sign in"}
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: "#e50914",
              color: "#fff",
              "&:hover": { backgroundColor: "#b20710" },
            }}
            type="submit"
          />

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            New to The Movies? <Link to="/auth/signup" style={{ color: "#e50914" }}>Sign Up</Link>
          </Typography>
        </form>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
        <CustomButton
          fullWidth
          startIcon={<Google />}
          sx={{
            backgroundColor: "#4285F4",
            color: "#fff",
            "&:hover": { backgroundColor: "#357ae8" },
          }}
          onClick={() => handleOAuthSignIn("google")}
          text="Sign In with Google"
        />

        <CustomButton
          fullWidth
          startIcon={<GitHub />}
          sx={{
            backgroundColor: "#333",
            color: "#fff",
            "&:hover": { backgroundColor: "#222" },
          }}
          onClick={() => handleOAuthSignIn("github")}
          text="Sign In with GitHub"
        />

        </Box>
      </Box>
    </Box>
    </>
  );
};

export default SignIn;
