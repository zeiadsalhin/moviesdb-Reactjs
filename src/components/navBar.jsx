import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQuery } from "@mui/material"
import { Link } from "react-router-dom";

const Navbar = ({ toggleDrawer }) => {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Check if screen width is 768px or smaller

  return (
    <AppBar position="fixed" sx={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}>
      <Toolbar>
        {!isMobile && (
        <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
          <MenuIcon fontSize="large" />
        </IconButton>
        )}
        <img src="/logo.png" alt="Logo" width="50" style={{ marginLeft: isMobile? '0px' : "auto", marginRight: "auto" }} />
        <Button component={Link} to="/search" color="inherit" disableRipple>
        {!isMobile && <span style={{ marginRight: "5px" }}>Search</span>}
          <SearchIcon  />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default Navbar;
