import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MovieIcon from "@mui/icons-material/Movie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";

const Sidebar = ({ drawerOpen, toggleDrawer }) => {
  const [user, setUser] = useState({ name: "", avatar: "" });

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/account/21017366", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_API_KEY,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();

      return {
        name: data.name || "Guest",
        avatar: data.avatar?.tmdb?.avatar_path
          ? `https://image.tmdb.org/t/p/w200${data.avatar.tmdb.avatar_path}`
          : "/default-avatar.png", // Fallback avatar
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return { name: "Guest", avatar: "/default-avatar.png" };
    }
  };

  useEffect(() => {
    fetchUserData().then(setUser); // Call function and update state
  }, []);

  return (
    <Drawer
      variant="temporary"
      open={drawerOpen}
      onClose={toggleDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "black",
          color: "white",
        },
      }}
    >
      <Box>
        <List>
          <ListItem>
            <ListItemIcon>
              <img src={user.avatar} alt="Avatar" style={{ width: 40, borderRadius: "50%" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  Hello, <br /> {user.name}!
                </Typography>
              }
            />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: "white" }} />
            </IconButton>
          </ListItem>
        </List>
        <Divider sx={{ backgroundColor: "gray" }} />
        <List>
          {[
            { label: "Home", icon: <HomeIcon />, path: "/" },
            { label: "My Account", icon: <AccountCircleIcon />, path: "/account" },
            { label: "My Movies", icon: <MovieIcon />, path: "/movies" },
            { label: "Favorites", icon: <FavoriteIcon />, path: "/favorites" },
            { label: "About", icon: <InfoIcon />, path: "/about" },
          ].map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton component={Link} to={item.path} onClick={toggleDrawer}>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default Sidebar;
