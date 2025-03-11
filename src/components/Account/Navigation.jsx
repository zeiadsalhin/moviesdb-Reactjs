import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const sections = [
  { icon: <PersonIcon sx={{ color: "#e50914" }} />, text: "Profile", path: "/account/profile" },
  { icon: <BookmarkIcon sx={{ color: "#e50914" }} />, text: "My Movies", path: "/account/watchlist" },
  { icon: <ThumbUpIcon sx={{ color: "#e50914" }} />, text: "Recommendations", path: "/account/recommendations" },
  { icon: <SettingsIcon sx={{ color: "#e50914" }} />, text: "Settings", path: "/account/settings" },
];

const DashboardNavigation = ({ passAuth, passUseState }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = passUseState(false);

  const signOutUser = async () => {
    setLoading(true);

    // Add a timeout before redirecting
    setTimeout( async() => {
    const { error } = await passAuth.auth.signOut();
    if (error) {
      console.error("Sign-out Error:", error.message);
      setLoading(false);
      return;
    }
      navigate("/auth/login");
      setLoading(false);
    }, 1500);
  };

  return (
    <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.3)", p: 2, borderRadius: 2, mb: 3, mt: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
        Dashboard
      </Typography>
      <List>
        {sections.map((section) => (
          <ListItem
            key={section.path}
            component="button"
            onClick={() => navigate(section.path)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.2,
              px: 2,
              borderRadius: 2,
              transition: "background 0.3s ease-in-out",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <ListItemIcon sx={{ minWidth: "35px" }}>{section.icon}</ListItemIcon>
              <ListItemText primary={section.text} sx={{ color: "#fff" }} />
            </Box>
          </ListItem>
        ))}

        {/* Sign Out Button with Loader */}
        <ListItem
          component="button"
          onClick={signOutUser}
          disabled={loading}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.2,
            px: 2,
            borderRadius: 2,
            transition: "background 0.3s ease-in-out",
            "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.2)" },
            opacity: loading ? 0.6 : 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <LogoutIcon sx={{ color: "#e50914" }} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" sx={{ color: "#fff" }} />
          </Box>

          {/* Loader when signing out */}
          {loading && <CircularProgress size={20} sx={{ color: "#e50914" }} />}
        </ListItem>
      </List>
    </Box>
  );
};

DashboardNavigation.propTypes = {
  passAuth: PropTypes.object.isRequired,
  passUseState: PropTypes.func.isRequired,
};

export default DashboardNavigation;
