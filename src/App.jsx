import { useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";
import AnimatedRoutes from "./utils/AnimatedRoutes";
import Sidebar from "./layouts/sideBar";
import Navbar from "./layouts/navBar";
import MobileNav from "./layouts/mobileNav";
// import Footer from "./layouts/Footer"
import NProgressHandler from "./utils/NProgressHandler"; // Import the handler
import darkTheme from "./styles/theme";

const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Check if screen width is 768px or smaller


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Ensures the dark background applies correctly */}
    <Router>
    <Wrapper>
    <NProgressHandler /> {/* Global route progress bar */}
      {!isMobile && <Sidebar drawerOpen={drawerOpen} toggleDrawer={() => setDrawerOpen(!drawerOpen)} />}
      <Navbar toggleDrawer={() => setDrawerOpen(!drawerOpen)} display={isMobile} />
      <Box sx={{ minHeight: "calc(100vh - 156px)", background: "#000", color: "#fff", marginTop: "0rem" }}>      
          <AnimatedRoutes /> {/* Fade Animation when Navigating */}
      </Box>
      {/* <Footer /> */}
      {isMobile && <MobileNav />}
      </Wrapper>
    </Router>
    </ThemeProvider>
  );
};

export default App;
