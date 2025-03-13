import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Google, GitHub } from "@mui/icons-material";
import { supabase } from "../../utils/authConfig";
import { BASE_URL } from "../../utils/BASE_URL_Config";
import CustomButton from "../../components/useCustomButton";
import NetflixOtpInput from "../../components/Auth/otpLogin";
import TwoFactorAuthInput from "../../components/Auth/TwoFactorAuthInput"; // Import the new 2FA component
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  useEffect(() => {
    document.title = "Login | The Movies";
  }, []);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [useOtp, setUseOtp] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [is2FARequired, setIs2FARequired] = useState(false)
  const [userSession, setUserSession] = useState(null)
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleOAuthSignIn = async (provider) => {
    provider === "google" ? setGoogleLoading(true) : setGithubLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${BASE_URL}/account` },
    });

    if (error) {
      setGoogleLoading(false);
      setGithubLoading(false);
      toast.error(error.message, { position: "top-center", autoClose: 2000, theme: "dark" });
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "At least 8 characters")
        .when("passwordRequired", {
          is: false,
          then: (schema) => schema.required("Password is required"),
        }),
    }),
    onSubmit: async (values) => {
      setLoading(true);
    
      if (useOtp) {
        const { error } = await supabase.auth.signInWithOtp({ email: values.email });
        if (error) {
          setLoading(false);
          toast.error(error.message, { position: "top-center", autoClose: 2000, theme: "dark" });
          return;
        }
        toast.success("OTP Sent Successfully!", { position: "top-center", autoClose: 1000, theme: "dark" });
        setOtpSent(true);
      } else {
        if (!values.password) {
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
    
        if (error) {
          setLoading(false);
          toast.error(error.message, { position: "top-center", autoClose: 2000, theme: "dark" });
          return;
        }
    
        // 🔹 Check if 2FA is required (AAL1 Check)
        const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        
        if (mfaError) {
          setLoading(false);
          toast.error(mfaError.message, { position: "top-center", autoClose: 2000, theme: "dark" });
          return;
        }
    
        if (mfaData?.currentLevel === "aal1" && mfaData?.currentLevel != mfaData?.nextLevel) {
          console.log('2fa required');
          console.log(mfaData);
          
          
          setIs2FARequired(true);
          setUserSession(data.session);
          setLoading(false);
          return;
        }
    
        // ✅ If no 2FA required, proceed to account page
        toast.success("Signed In Successfully!", { position: "top-center", autoClose: 1000, theme: "dark" });
        setTimeout(() => {
          navigate("/account/");
        }, 1000);
      }
    
      setLoading(false);
    }
      
  });

  const toggleSignInMethod = () => {
    setUseOtp((prev) => !prev);
    formik.setFieldValue("password", ""); // Reset password field when switching
    formik.setFieldTouched("password", false); // Reset error state
    formik.setFieldValue("passwordRequired", !useOtp); // Toggle password validation
  };

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
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url('/account_signup.webp')",
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
            maxWidth: { xs: 380, sm: 400 },
            minWidth: { xs: 0, sm: 360 },
            color: "#fff",
          }}
        >
          <Typography gutterBottom sx={{ fontWeight: "bold", textAlign: "center", fontSize: {xs: "1.875rem", sm: "2rem"} }}>
            {otpSent ? "OTP Verification" : is2FARequired ? "2-Step Verification" : "Welcome | Sign In"}
          </Typography>

          {!otpSent && !is2FARequired ? (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            color="#e50914"
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

          {!useOtp && (
            <>
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                name="password"
                color="#e50914"
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
                      <IconButton disableTouchRipple onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff sx={{ color: "#fff" }} /> : <Visibility sx={{ color: "#fff" }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
                  <Typography variant="body2" sx={{ textAlign: "right", mt: 0.2 }}>
                    <Link to="/auth/forgot-password" style={{ color: "#e50914" }}>
                      Forgot Password?
                    </Link>
                  </Typography>
                </>
              )}

              <CustomButton
                text={loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : useOtp ? "Continue" : "Sign in with Password"}
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

              <CustomButton
                text={useOtp ? "Use Password Instead" : "Use OTP Instead"}
                fullWidth
                sx={{ mt: 2, backgroundColor: "black", color: "#fff", border: 1.5 }}
                type="button"
                onClick={toggleSignInMethod}
              />
            </form>
          ) : is2FARequired ? (
            // Show TwoFactorAuthInput ONLY if 2FA is required
            <TwoFactorAuthInput userSession={userSession} onSuccess={() => navigate("/account/")} />
          ) : useOtp  ? (
            // Show NetflixOtpInput only if OTP login is active
            <NetflixOtpInput toggleMode={() => { setUseOtp(false); setOtpSent(false); }} email={formik.values.email} onSuccess={() => navigate("/account/")} />
          ) : null}

          
          

          <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
            New to The Movies? <Link to="/auth/signup" style={{ color: "#e50914" }}>Sign Up</Link>
          </Typography>

      {!useOtp && (
        <Box>                   
         <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
          <CustomButton
            fullWidth
            startIcon={googleLoading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : <Google />}
            sx={{
              backgroundColor: "#4285F4",
              color: "#fff",
              "&:hover": { backgroundColor: "#357ae8" },
            }}
            onClick={() => handleOAuthSignIn("google")}
            text={"Sign In with Google"}
            disabled={googleLoading || githubLoading} // Disable while loading
          />

          <CustomButton
            fullWidth
            startIcon={githubLoading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : <GitHub />}
            sx={{
              backgroundColor: "#333",
              color: "#fff",
              "&:hover": { backgroundColor: "#222" },
            }}
            onClick={() => handleOAuthSignIn("github")}
            text={"Sign In with GitHub"}
            disabled={googleLoading || githubLoading} // Disable while loading
          />

        </Box>
        </Box>
        )}
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
