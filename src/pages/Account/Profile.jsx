import { Box, Typography } from "@mui/material";
import EditProfile from "../../components/Account/ProfileEdit";
const Profile = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ color: "#e50914", fontWeight: "bold" }}>
        Edit Profile
      </Typography>
      <EditProfile />
    </Box>
  );
};

export default Profile;