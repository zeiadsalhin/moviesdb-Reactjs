import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Navbar = ({ toggleDrawer, display }) => {

  return (
    <AppBar position="fixed" sx={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}>
      <Toolbar>
        {!display && (
        <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
          <MenuIcon fontSize="large" />
        </IconButton>
        )}
        <img src="/logo.png" alt="Logo" width="50" style={{ marginLeft: display? '0px' : "1raem", marginRight: "auto", padding:0 }} />
        <Button component={Link} to="/search" color="inherit" disableRipple>
        {!display && <span style={{ marginRight: "5px" }}>Search</span>}
          <SearchIcon  />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
};

export default Navbar;
