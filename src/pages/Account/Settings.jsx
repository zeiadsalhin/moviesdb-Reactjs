import { useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography, Modal } from "@mui/material";
import PropTypes from "prop-types";
import ChangeEmailSection from "../../components/Account/ChangeEmail";
import ChangePasswordSection from "../../components/Account/ChangePassword";
import { supabase } from "../../utils/authConfig";
import { BASE_URL } from "../../utils/BASE_URL_Config";
import { useRequireAAL2 } from "../../hooks/useRequireAAL2";
import TwoFactorAuthInput from "../../components/Auth/TwoFactorAuthInput";

const SettingsPage = () => {
  useEffect(() => {
    document.title = "Account Settings | The Movies";
  }, []);

  const { isAAL1, checking } = useRequireAAL2();
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!checking && isAAL1) {
      setOpen(true);
    }
  }, [isAAL1, checking]);

  const handleReauthSuccess = () => {
    setOpen(false);
    // window.location.reload(); // Refresh after successful 2FA
  };

  if (!user) return null;

  return (
    <>
      {/* 2FA Modal Popup */}
      <Modal open={open} disableEscapeKeyDown>
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: "#141414",
            mx: "auto",
            mt: "25vh",
            p: 4,
            borderRadius: 2,
          }}
        >
          <TwoFactorAuthInput userSession={user} onSuccess={handleReauthSuccess} />
        </Box>
      </Modal>

      {/* Settings Content */}
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          color: "#fff",
          opacity: open ? 0.4 : 1,
          pointerEvents: open ? "none" : "auto",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
          Account Settings
        </Typography>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
          centered
          sx={{
            "& .MuiTab-root": { color: "#bbb" },
            "& .MuiTab-root.Mui-selected": { color: "#e50914", fontWeight: "bold" },
            "& .MuiTabs-indicator": { backgroundColor: "#e50914" },
          }}
        >
          <Tab label="Change Email" />
          <Tab label="Change Password" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ mt: 3 }}>
          {tabIndex === 0 && <ChangeEmailSection supabase={supabase} BASE_URL={BASE_URL} />}
          {tabIndex === 1 && <ChangePasswordSection supabase={supabase} BASE_URL={BASE_URL} />}
        </Box>

        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: "#aaa", mb: 0.5 }}>
            Forgot your 2FA code?
          </Typography>
          <Typography variant="body2" sx={{ color: "#fff", fontWeight: "bold" }}>
            Contact support @themovies
          </Typography>
        </Box>
      </Box>
    </>
  );
};

SettingsPage.propTypes = {
  supabase: PropTypes.object.isRequired,
};

export default SettingsPage;
