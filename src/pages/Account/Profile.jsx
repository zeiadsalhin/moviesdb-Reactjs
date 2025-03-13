import { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import EditProfile from "../../components/Account/ProfileEdit";
import AuthProviders from "../../components/Account/AuthProviders";
import Enable2FA from "../../components/Auth/Enable2FA";
import { supabase } from "../../utils/authConfig";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
    };

    getUser();
  }, []);

  if (!user) return null; // Avoid rendering before user is fetched

  return (
    <Box>
      <Typography variant="h5" sx={{ color: "#e50914", fontWeight: "bold" }}>
        Edit Profile
      </Typography>
      <EditProfile passAuth={supabase} />
      <Divider sx={{my: 5}} />
      <AuthProviders passAuth={supabase} />
      <Divider sx={{my: 5}} />
      <Enable2FA user={user} />
    </Box>
  );
};

export default Profile;
