import { Box, Typography } from "@mui/material";
import EditProfile from "../../components/Account/ProfileEdit";
import AuthProviders from "../../components/Account/AuthProviders";
import { supabase } from "../../utils/authConfig";

const Profile = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ color: "#e50914", fontWeight: "bold" }}>
        Edit Profile
      </Typography>
      <EditProfile passAuth={supabase} />
      <AuthProviders passAuth={supabase} />
    </Box>
  );
};

export default Profile;