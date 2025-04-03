import PropTypes from "prop-types";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MovieIcon from "@mui/icons-material/Movie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";

// Set Axios Authorization header globally
axios.defaults.headers.common["Authorization"] = import.meta.env.VITE_API_KEY;

// Sidebar component
// This component renders a sidebar with navigation links and user avatar 
const Sidebar = ({ setSidebarVisible, passAuth }) => {
  const location = useLocation();
  const [userAvatar, setUserAvatar] = useState("/default-avatar.png");
  const [isVisible, setIsVisible] = useState(true);

  // Use Set for faster lookup of hidden paths
  const hiddenPaths = useMemo(() => new Set(["/account"]), []);

  // Determine Sidebar Visibility
  useEffect(() => {
    const shouldHide = [...hiddenPaths].some((path) => location.pathname.startsWith(path));
    
    if (isVisible !== !shouldHide) {
      setIsVisible(!shouldHide);
      setSidebarVisible(!shouldHide);
    }
  }, [location.pathname, isVisible, setSidebarVisible, hiddenPaths]);

  // Fetch user avatar from Supabase
  const fetchUserAvatar = useCallback(async () => {
    try {
      const { data: userData, error } = await passAuth.auth.getUser();
      if (error || !userData?.user) return;

      const { data } = await passAuth
        .from("user_profiles")
        .select("avatar_url")
        .eq("id", userData.user.id)
        .single();

      setUserAvatar(data?.avatar_url || "/default-avatar.png");
    } catch (err) {
      console.error("Error fetching avatar:", err);
    }
  }, [passAuth]);

  useEffect(() => {
    fetchUserAvatar();

    // Listen for authentication state changes
    const { data: authListener } = passAuth.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        setUserAvatar("/default-avatar.png");
      } else if (event === "SIGNED_IN") {
        fetchUserAvatar();
      }
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, [fetchUserAvatar, passAuth]);

  // Memoized Menu Items
  const menuItems = useMemo(
    () => [
      { label: "Home", icon: <HomeIcon sx={{ fontSize: 32 }} />, path: "/" },
      { label: "My Account", icon: <AccountCircleIcon sx={{ fontSize: 32 }} />, path: "/account" },
      { label: "My Movies", icon: <MovieIcon sx={{ fontSize: 32 }} />, path: "/movies" },
      { label: "Favorites", icon: <FavoriteIcon sx={{ fontSize: 32 }} />, path: "/favorites" },
      { label: "About", icon: <InfoIcon sx={{ fontSize: 32 }} />, path: "/about" },
    ],
    []
  );

  if (!isVisible) return null;

  return (
    <Drawer
      variant="permanent"
      sx={{
        zIndex: 1301,
        "& .MuiDrawer-paper": {
          width: 75,
          backgroundColor: "black",
          color: "white",
          overflowX: "hidden",
          transition: "width 0.3s ease-in-out",
        },
      }}
    >
      {/* Profile Avatar */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Avatar src={userAvatar} alt="Avatar" sx={{ width: 50, height: 50, mx: "auto" }} />
      </Box>

      {/* Navigation List */}
      <List sx={{ mt: 3 }}>
        {menuItems.map(({ label, icon, path }) => {
          const isActive = location.pathname === path;

          return (
            <ListItem key={label} disablePadding>
              <Tooltip title={label} placement="right" >
                <ListItemButton
                  disableTouchRipple
                  component={Link}
                  to={path}
                  sx={{
                    justifyContent: "center",
                    margin: 1,
                    borderRadius: 2,
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.17)" : "transparent",
                    transition: "background-color 0.2s ease-in-out",
                    "&:hover": {
                      // backgroundColor: "transparent",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>{icon}</ListItemIcon>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  setSidebarVisible: PropTypes.func.isRequired,
  passAuth: PropTypes.object.isRequired,
};

export default Sidebar;
