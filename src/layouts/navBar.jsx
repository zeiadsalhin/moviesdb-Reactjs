import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ display }) => {

  return (
    <AppBar position="fixed" sx={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="flex" style={{ display: "flex", alignItems: "center" }}>
      {!display && (
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: "bold",
                fontSize: "0.7rem",
                letterSpacing: "0.1rem",
              }}
            >
              PORTAL
            </Typography>
          )}
        <img src="/logo.webp" alt="Logo" width="50" height="100%" style={{ marginRight: "auto", padding:0, marginLeft: display ? undefined : "20px" }} loading="lazy" />
        <h1 className="md:text-xl font-black mt-0.5 md:mt-0 ml-2">The Movies</h1>
      </div>

        <Button component={Link} aria-label="search" to="/search" color="inherit" disableRipple>
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
