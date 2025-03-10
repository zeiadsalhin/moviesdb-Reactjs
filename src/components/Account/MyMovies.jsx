import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarRateIcon from "@mui/icons-material/StarRate";
import EventIcon from "@mui/icons-material/Event";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const movieCategories = [
  { icon: <BookmarkIcon sx={{ color: "#e50914" }} />, text: "Want to Watch", count: 27 },
  { icon: <StarRateIcon sx={{ color: "#e50914" }} />, text: "Ratings & Reviews", count: 50 },
  { icon: <EventIcon sx={{ color: "#e50914" }} />, text: "Expected", count: 43 },
  { icon: <FavoriteIcon sx={{ color: "#e50914" }} />, text: "Favorite Films", count: 33 },
  { icon: <ThumbUpIcon sx={{ color: "#e50914" }} />, text: "Recommended", count: 56 },
];

const MyMovies = () => {
  return (
    <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.3)", p: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
        My Movies
      </Typography>
      <List>
        {movieCategories.map((category, index) => (
          <ListItem
            key={index}
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
              <ListItemIcon sx={{ minWidth: "35px" }}>{category.icon}</ListItemIcon>
              <ListItemText primary={category.text} sx={{ color: "#fff" }} />
            </Box>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "#e50914" }}>
              {category.count}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyMovies;
