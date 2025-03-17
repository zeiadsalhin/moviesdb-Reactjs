import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { supabase } from "../../utils/authConfig";
import { Box, TextField, Typography, Stack } from "@mui/material";
import CustomButton from "../useCustomButton"
import { QRCodeSVG } from "qrcode.react";
import { toast, ToastContainer } from "react-toastify";
import { getFactorInfo, start2FAChallenge, verifyTOTPCode } from "../../utils/2FAUtils"; // ✅ Import utils
import { fixOtpAuthUri } from "../../utils/fixAuthURI";

const Enable2FA = () => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const intervalRef = useRef(null); // 🔹 Store interval ID
  const [factorId, setFactorId] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [totpSecret, setTotpSecret] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loading, setLoading] = useState(false);



  // ✅ Fetch Factor ID & 2FA Status
  useEffect(() => {
    const fetch2FAStatus = async () => {
      const factor = await getFactorInfo();
      // console.log(factor);
      
      if (factor.aalLevel && factor.factorId) {
        setIs2FAEnabled(true);
        setFactorId(factor.factorId);
        // console.log(factor);    
      }
    };

    fetch2FAStatus();
  }, []);

  /// ✅ Cleanup interval when 2FA is enabled or component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [is2FAEnabled]);


  // ✅ Enroll User for 2FA (Generate QR Code)
  const enroll2FA = async () => {
    if (isEnrolling) return; // ✅ Prevent multiple enroll calls

    setLoading(true);
    setIsEnrolling(true);

    // 🔹 Fetch existing factors
    const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();
    if (factorsError) {
        toast.error("Error fetching 2FA factors.", { position: "top-center", autoClose: 2000, theme: "dark" });
        console.error(factorsError);
        setLoading(false);
        return;
    }

    // 🔹 Unenroll all existing unverified TOTP factors
    for (const factor of factorsData?.all || []) {
        if (factor.factor_type === "totp" && factor.status === "unverified") {
            await supabase.auth.mfa.unenroll({ factorId: factor.id });
        }
    }

    // 🔹 Now enroll for a new TOTP factor
    const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "Movies React App",
    });

    setLoading(false);

    if (error) {
        toast.error("Error enrolling for 2FA.", { position: "top-center", autoClose: 2000, theme: "dark" });
        console.error(error);
        return;
    }

    setFactorId(data.id);
    setQrCode(fixOtpAuthUri(data.totp.uri));    
    setTotpSecret(data.totp.secret);

    toast.success("Scan the QR code in your authenticator app.", { position: "top-center", autoClose: 2000, theme: "dark" });

    // ✅ Auto-start challenge after QR scan
    const { challengeId, error: challengeError } = await start2FAChallenge(data.id);

    if (challengeError) {
        toast.error("Failed to start 2FA challenge.", { position: "top-center", autoClose: 2000, theme: "dark" });
        console.error(challengeError);
        return;
    }

    setChallengeId(challengeId);
    toast.success("Enter the 6-digit code from your Authenticator app.", { position: "top-center", autoClose: 2000, theme: "dark" });

    // ✅ Start interval only if it's not already running
  if (!intervalRef.current) {
    intervalRef.current = setInterval(async () => {
      // console.log("🔄 Refreshing QR Code...");
      await enroll2FA(); // Refresh QR every 30s
    }, 30000);
  }
};




  // ✅ Start Challenge (After QR Code is Scanned) uncomment for manual approve
  // const startChallenge = async () => {
  //   if (!factorId) {
  //     toast.error("You must enroll in 2FA first!");
  //     // return;
  //   }

  //   setLoading(true);
  //   const { challengeId, error } = await start2FAChallenge(factorId);
  //   setLoading(false);

  //   if (error) {
  //     toast.error("Failed to start 2FA challenge.");
  //     console.error(error);
  //     return;
  //   }

  //   setChallengeId(challengeId);
  //   toast.success("Enter the 6-digit code from your Authenticator app.");
  // };

  // ✅ Verify TOTP Code
  const verify2FA = async () => {
    if (!factorId || !challengeId || !verificationCode) {
      toast.error("Missing challenge details.", { position: "top-center", autoClose: 2000, theme: "dark" });
      return;
    }

    setLoading(true);
    const { error } = await verifyTOTPCode(factorId, challengeId, verificationCode.trim());
    setLoading(false);

    if (error) {
      toast.error("Invalid code. Try again.", { position: "top-center", autoClose: 2000, theme: "dark" });
      console.error("Verification error:", error);
      return;
    }

    setIs2FAEnabled(true);
    toast.success("2FA enabled successfully!", { position: "top-center", autoClose: 2000, theme: "dark" });
    setQrCode(null)
  };

  // ✅ Disable 2FA
  const disable2FA = async () => {
    if (!factorId) {
      toast.error("2FA is not enabled.", { position: "top-center", autoClose: 2000, theme: "dark" });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.mfa.unenroll({ factorId });

    setLoading(false);

    if (error) {
      toast.error("Failed to disable 2FA. Try again.", { position: "top-center", autoClose: 2000, theme: "dark" });
      return;
    }

    setIs2FAEnabled(false);
    setFactorId(null);
    setVerificationCode("");
    toast.success("2FA has been disabled.", { position: "top-center", autoClose: 2000, theme: "dark" });
  };

  return (
    <>
    <ToastContainer />
      <Box
        sx={{
          mt: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: { xs: "100%", sm: 500 },
          marginInline: "auto"
        }}
      >
        <Typography variant="h6" sx={{ mb: 1.5, color: "#fff", fontWeight: "bold" }}>
          Two-Factor Authentication (2FA)
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "#bbb" }}>
          Protect your account by adding an extra security step.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          {is2FAEnabled ? (
            <CustomButton
             text="Disable 2FA"
              variant="contained"
              onClick={disable2FA}
              disabled={loading}
              sx={{
                flexGrow: 1,
                backgroundColor: "#99050d",
                "&:hover": { backgroundColor: "#B20710" },
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                py: 1.2,
                borderRadius: "8px",
              }}
            />
              
          ) : (
            <CustomButton 
             text="Enable 2FA" 
             onClick={enroll2FA} 
             sx={{ 
              flexGrow: 1,
              backgroundColor: "#444",
              // "&:hover": { backgroundColor: "#B20710" },
              outline: 1,
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              py: 1.2,
              borderRadius: "8px", 
             }} />
          )}
        </Stack>

        {qrCode && (
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body1" sx={{ color: "#fff", mb: 1 }}>
              📌 Scan this QR code in Google Authenticator:
            </Typography>
            <QRCodeSVG value={qrCode} alt="QR Code" style={{ width: 180, height: 180, marginInline: "auto",paddingBlock: 5 }} />

            <Typography variant="body2" sx={{ color: "#aaa", mt: 2, mb: 1 }}>
              Or manually enter this code:
            </Typography>
            <Typography variant="body2" sx={{ color: "#fff", fontWeight: "bold", wordBreak: "break-word" }}>
              {totpSecret}
            </Typography>

            {challengeId && (
              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <TextField
                  type="text"
                  placeholder="Enter 6-digit Code"
                  focused
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0,6))}
                  sx={{ outline: 0}}
                />

                <CustomButton
                  text="Verify Code"
                  variant="contained"
                  onClick={verify2FA}
                  sx={{
                    mt: 0,
                    // fontsize: 20,
                    backgroundColor: "#E50914",
                    "&:hover": { backgroundColor: "#B20710" },
                    color: "#fff",
                    textTransform: "none",
                    py: 2,
                    borderRadius: "8px",
                  }}
                />
                  
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

Enable2FA.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Enable2FA;
