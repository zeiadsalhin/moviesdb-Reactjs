import { useEffect, useState, useCallback } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import CustomButton from "../../components/useCustomButton";
import { supabase } from "../../utils/authConfig";
import { MuiOtpInput } from "mui-one-time-password-input";
import PropTypes from 'prop-types';

const TwoFactorAuthInput = ({ userSession, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate OTP input (only allows digits)
  const validateChar = (char) => /^\d$/.test(char);

  const handleVerify2FA = useCallback(async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code", { position: "top-center", autoClose: 2000, theme: "dark" });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.mfa.challengeAndVerify({ 
      factorId: userSession?.user?.factors[0].id, 
      code: otp 
    });

    if (error) {
        console.log(otp);
        console.log(error);
        
      setLoading(false);
      toast.error(error.message, { position: "top-center", autoClose: 2000, theme: "dark" });
      return;
    }

    toast.success("2FA Verified Successfully!", { position: "top-center", autoClose: 1000, theme: "dark" });

    setTimeout(() => {
      onSuccess();
    }, 1000);
}, [otp, userSession, onSuccess]);

  // Auto-submit OTP when all digits are entered
    useEffect(() => {
      if (otp.length === 6) handleVerify2FA();
    }, [otp, handleVerify2FA]);

  return (
    <Box
      sx={{
        textAlign: "center",
        borderRadius: 2,
        width: "100%",
        color: "#fff",
      }}
    >
      <Typography variant="body1" sx={{ mt: 2, color: "#aaa" }}>
        Enter google Authenticator Code
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
        text={loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Verify"}
        fullWidth
        disabled={loading}
        sx={{ mt: 2, backgroundColor: "#e50914", color: "#fff", "&:hover": { backgroundColor: "#b20710" } }}
        onClick={handleVerify2FA}
      />
    </Box>
  );
};

TwoFactorAuthInput.propTypes = {
  userSession: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default TwoFactorAuthInput;
