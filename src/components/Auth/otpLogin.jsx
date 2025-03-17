import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress, Typography, Divider } from "@mui/material";
import { supabase } from "../../utils/authConfig";
import CustomButton from "../useCustomButton";
import { MuiOtpInput } from "mui-one-time-password-input";
import { toast } from "react-toastify";

const NetflixOtpInput = ({ toggleMode, email, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Validate OTP input (only allows digits)
  const validateChar = (char) => /^\d$/.test(char);

  // Function to verify OTP
  const handleOtpSubmit = useCallback(async () => {
    if (otp.length < 6) return;

    setLoading(true);

    setTimeout(async () => {
      const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: "email" });

      if (error) {
        toast.error(error.message, { position: "top-center", autoClose: 2000, theme: "dark" });
      } else {
        toast.success("OTP Verified Successfully!", { position: "top-center", autoClose: 500, theme: "dark" });
        setTimeout(onSuccess, 500);
      }

      setLoading(false);
    }, 1000);
  }, [otp, email, onSuccess]);

  // Auto-submit OTP when all digits are entered
  useEffect(() => {
    if (otp.length === 6) handleOtpSubmit();
  }, [otp, handleOtpSubmit]);

  // Function to resend OTP
  const handleResendOtp = async () => {
    setResending(true);
    
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 2000, theme: "dark" });
    } else {
      toast.success("New OTP sent successfully, check your inbox!", { position: "top-center", autoClose: 1000, theme: "dark" });
    }

    setResending(false);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body2" sx={{ mt: 2, color: "#aaa" }}>
        Enter the OTP we have sent to your email {email}
      </Typography>

      <MuiOtpInput
        autoFocus
        value={otp}
        onChange={setOtp}
        length={6}
        validateChar={validateChar}
        sx={{
          my: 4,
          "& .MuiOutlinedInput-root": {
            color: "#fff",
            borderRadius: 2,
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e50914",
          },
        }}
      />

      <CustomButton
        text={loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Verify OTP"}
        fullWidth
        disabled={loading || otp.length < 6}
        sx={{ mt: 2, backgroundColor: "#99050d", color: "#fff", "&:hover": { backgroundColor: "#b20710" } }}
        onClick={handleOtpSubmit}
      />

      <CustomButton
        text="Sign in with Password"
        fullWidth
        disabled={loading}
        sx={{ mt: 2, backgroundColor: "black", color: "#fff", outline: 1 }}
        onClick={() => toggleMode(false)}
      />

      {/* Divider for separation */}
      <Divider sx={{ mt: 4, mb: 2, bgcolor: "#444" }} />

      <Typography variant="body2" sx={{ mt: 0, color: "#aaa" }}>
        Didn&apos;t receive the code? 
      </Typography>

      <CustomButton
        text={resending ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Resend OTP"}
        fullWidth
        disabled={resending || loading}
        sx={{ mt: 1, backgroundColor: "#222", color: "#fff" }}
        onClick={handleResendOtp}
      />
    </Box>
  );
};

NetflixOtpInput.propTypes = {
  toggleMode: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default NetflixOtpInput;
