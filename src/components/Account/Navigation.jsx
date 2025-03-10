import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SettingsIcon from "@mui/icons-material/Settings";

const sections = [
  { icon: <PersonIcon sx={{ color: "#e50914" }} />, text: "Profile", path: "/account/profile" },
  { icon: <BookmarkIcon sx={{ color: "#e50914" }} />, text: "My Movies", path: "/account/watchlist" },
  { icon: <ThumbUpIcon sx={{ color: "#e50914" }} />, text: "Recommendations", path: "/account/recommendations" },
  { icon: <SettingsIcon sx={{ color: "#e50914" }} />, text: "Settings", path: "/account/settings" },
];

const DashboardNavigation = () => {
  const navigate = useNavigate();

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
      </List>
    </Box>
  );
};

export default DashboardNavigation;
