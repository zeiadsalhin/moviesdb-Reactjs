import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, Google, GitHub } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { supabase } from "../../utils/authConfig";
import CustomButton from "../../components/useCustomButton"; // Using your custom button

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

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
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.error("Sign-up Error:", error.message);
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "calc(100vh - 9rem)",
        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url('/account_signup.webp')",
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
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: 4,
          borderRadius: 2,
          width: "95%",
          maxWidth: 1380,
          color: "#fff",
        }}
      >
        {/* Sign-up Form */}
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: 350, sm: 350 },
            minWidth: { xs: 350, sm: 250 },
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", fontSize: { xs: "1.875rem", sm: "2rem", md: "2.25rem" } }}>
            Join Us | The Movies
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#222",
                  color: "#fff",
                  borderColor: "#e50914",
                  borderRadius: 2,
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e50914 !important",
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
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#222",
                  color: "#fff",
                  borderColor: "#e50914",
                  borderRadius: 2,
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e50914 !important",
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

            <CustomButton
              text="Get Started"
              type="submit"
              sx={{
                mt: 2,
                width: "100%",
                backgroundColor: "#e50914",
                color: "#fff",
                "&:hover": { backgroundColor: "#b20710" },
              }}
            />

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Already have an account? <Link to="/account/login" style={{ color: "#e50914" }}>Sign In</Link>
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
              text="Sign Up with Google"
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
              text="Sign Up with GitHub"
            />
          </Box>
        </Box>

        {/* Image Section (Visible only on Desktop) */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "100%",
            maxWidth: "100%",
            minWidth: {sm: 500, md: 500, lg: 500},
            borderRadius: 2,
            marginLeft: 4,
            overflow: "hidden",
          }}
        >
          <img
            src="/account_signup.webp"
            alt="Sign Up"
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
