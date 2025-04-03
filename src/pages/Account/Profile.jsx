import { useEffect, useState } from "react";
import { Box, Typography, Divider, Modal } from "@mui/material";
import EditProfile from "../../components/Account/ProfileEdit";
import AuthProviders from "../../components/Account/AuthProviders";
import Enable2FA from "../../components/Auth/Enable2FA";
import { supabase } from "../../utils/authConfig";
import { useRequireAAL2 } from "../../hooks/useRequireAAL2";
import TwoFactorAuthInput from "../../components/Auth/TwoFactorAuthInput";

// This component is responsible for rendering the profile page where users can edit their profile, manage authentication providers, and enable 2FA.
// It uses the `useRequireAAL2` hook to check if the user is authenticated and has AAL2 enabled. If not, it shows a modal for reauthentication.
// The `useEffect` hooks are used to set the document title and manage the state of the modal based on the user's authentication status.
// The `EditProfile`, `AuthProviders`, and `Enable2FA` components are imported to handle the respective functionalities on the profile page.
const Profile = () => {
  useEffect(() => {
    document.title = "Edit Profile | The Movies";
  }, []);

  const { isAAL1, checking } = useRequireAAL2();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  // Check if the user is authenticated and has AAL2 enabled
  // If not, show the reauthentication modal
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
    // window.location.reload(); // 🔄 Refresh on successful reauthentication
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
            mt: "30vh",
            p: 4,
            borderRadius: 2,
          }}
        >
          <TwoFactorAuthInput userSession={user} onSuccess={handleReauthSuccess} />
        </Box>
      </Modal>

      {/* Profile Page Content */}
      <Box sx={{ opacity: open ? 0.4 : 1, pointerEvents: open ? "none" : "auto", m: {xs: 0, md: 4} }}>
        <Typography variant="h5" sx={{ color: "#e50914", fontWeight: "bold" }}>
          Edit Profile
        </Typography>
        <EditProfile passAuth={supabase} />
        <Divider sx={{ my: 5 }} />
        <AuthProviders passAuth={supabase} />
        <Divider sx={{ my: 5 }} />
        <Enable2FA user={user} />
      </Box>
    </>
  );
};

export default Profile;
