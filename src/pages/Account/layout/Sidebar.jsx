import { useState } from "react";
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/authConfig";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  // IconButton,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import BackIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const sections = [
  { icon: <BackIcon />, text: "Home Page", path: "/" },
  { icon: <HomeIcon />, text: "Home", path: "/account" },
  { icon: <PersonIcon />, text: "Profile", path: "/account/profile" },
  { icon: <BookmarkIcon />, text: "My Movies", path: "/account/watchlist" },
  { icon: <ThumbUpIcon />, text: "Recommendations", path: "/account/recommendations" },
  { icon: <SettingsIcon />, text: "Settings", path: "/account/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 899px)"); // Hide sidebar on mobile
  const [open, setOpen] = useState(false); // Controls mobile sidebar visibility
  const [loading, setLoading] = useState(false);

  const handleToggle = () => setOpen(!open);

  const signOutUser = async () => {
    setLoading(true);

    // Add a timeout before redirecting
    setTimeout( async() => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign-out Error:", error.message);
      setLoading(false);
      return;
    }
      navigate("/auth/login");
      setLoading(false);
    }, 1500);
  };

  const SidebarContent = (
    <Box sx={{ width: 250, backgroundColor: "#141414", height: "100vh", p: 2 }}>
      <List>
        {sections.map((section) => {
          const isActive = location.pathname === section.path;

          return (
            <ListItem
              key={section.path}
              component="button"
              onClick={() => {
                navigate(section.path);
                if (isMobile) setOpen(false); // Close sidebar on mobile after click
              }}
              sx={{
                borderRadius: 2,
                py: 1.2,
                px: 2,
                my: 1.5,
                transition: "background 0.3s",
                cursor: "pointer",
                backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? "#e50914" : "#bbb" }}>{section.icon}</ListItemIcon>
              <ListItemText
                primary={section.text}
                sx={{ color: isActive ? "#e50914" : "#fff", fontWeight: isActive ? "bold" : "normal" }}
              />
            </ListItem>
          );
        })}
        
        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", my: 1.5 }} />

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
            cursor: "pointer",
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

  return (
    <>
      {/* Mobile Menu Button */}
      {/* {isMobile && (
        <IconButton
          onClick={handleToggle}
          sx={{
            position: "fixed",
            top: 40,
            left: 16,
            color: "#fff",
            zIndex: 1300,
          }}
        >
          <MenuIcon sx={{fontSize: 40}} />
        </IconButton>
      )} */}

      {/* Sidebar Drawer */}
      {isMobile ? (
        <Drawer anchor="left" open={open} onClose={handleToggle}>
          {SidebarContent}
        </Drawer>
      ) : (
        <Box sx={{ width: 240, flexShrink: 0 }}>{SidebarContent}</Box>
      )}
    </>
  );
};
Sidebar.propTypes = {
  setActiveSection: PropTypes.func.isRequired,
};

export default Sidebar;
