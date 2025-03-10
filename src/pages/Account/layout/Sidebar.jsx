import { useState } from "react";
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  // IconButton,
  useMediaQuery,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SettingsIcon from "@mui/icons-material/Settings";

const sections = [
  { icon: <HomeIcon />, text: "Home", path: "/account/" },
  { icon: <PersonIcon />, text: "Profile", path: "/account/profile" },
  { icon: <BookmarkIcon />, text: "My Movies", path: "/account/watchlist" },
  { icon: <ThumbUpIcon />, text: "Recommendations", path: "/account/recommendations" },
  { icon: <SettingsIcon />, text: "Settings", path: "/account/settings" },
];

const Sidebar = ({setActiveSection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 900px)"); // Hide sidebar on mobile
  const [open, setOpen] = useState(false); // Controls mobile sidebar visibility

  const handleToggle = () => setOpen(!open);

  const SidebarContent = (
    <Box sx={{ width: 250, backgroundColor: "#141414", height: "100vh", p: 2, mt:2 }}>
      <List>
        {sections.map((section) => {
          const isActive = location.pathname === section.path;

          return (
            <ListItem
              key={section.path}
              component="button"
              onClick={() => {
                navigate(section.path);
                setActiveSection(section.text);
                if (isMobile) setOpen(false); // Close sidebar on mobile after click
              }}
              sx={{
                borderRadius: 2,
                py: 1.2,
                px: 2,
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
