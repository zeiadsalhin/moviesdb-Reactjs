import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useLocation } from "react-router-dom";
import { alpha } from "@mui/material/styles";

// This component is used for the mobile navigation bar at the bottom of the screen
// It uses Material UI's BottomNavigation and BottomNavigationAction components
// The navigation bar contains four icons: Home, Movies, Favorites, and Account
// Each icon is linked to a different route in the application
const MobileNav = () => {
  const location = useLocation();

  return (
    <BottomNavigation
      value={location.pathname}
      showLabels
      sx={{
        position: "fixed",
        bottom: 0,
        zIndex: 99,
        width: "100%",
        backgroundColor: "#121212", // Dark background
      }}
    >
      {[
        { label: "Home", icon: <HomeIcon />, to: "/" },
        { label: "Movies", icon: <MovieIcon />, to: "/movies" },
        { label: "Favorites", icon: <FavoriteIcon />, to: "/favorites" },
        { label: "Account", icon: <AccountCircleIcon />, to: "/account" },
      ].map(({ label, icon, to }) => (
        <BottomNavigationAction
          key={to}
          label={label}
          icon={icon}
          component={Link}
          to={to}
          disableTouchRipple
          sx={{
            backgroundColor: location.pathname === to ? alpha("#ffffff", 0.1) : "transparent", // Lighter background when active
            borderRadius: "8px",
            // transition: "background-color 0.3s ease",
          }}
        />
      ))}
    </BottomNavigation>
  );
};

export default MobileNav;
