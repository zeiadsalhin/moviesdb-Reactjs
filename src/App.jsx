import { useState, useLayoutEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";
import AnimatedRoutes from "./utils/AnimatedRoutes";
import Navbar from "./layouts/navBar";
import MobileNav from "./layouts/mobileNav";
import NProgressHandler from "./utils/NProgressHandler"; // Global route progress bar
import darkTheme from "./styles/theme";

// Lazy Load Sidebar & Footer
const Sidebar = lazy(() => import("./layouts/sideBar"));
const Footer = lazy(() => import("./layouts/Footer"));

// Wrapper to Scroll to Top on Route Change
const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Wrapper>
          <NProgressHandler />

          {/* Sidebar (Lazy Loaded) */}
          <Suspense fallback={null}>
            {!isMobile && <Sidebar drawerOpen={drawerOpen} toggleDrawer={() => setDrawerOpen(!drawerOpen)} />}
          </Suspense>

          <Navbar toggleDrawer={() => setDrawerOpen(!drawerOpen)} display={isMobile} />

          <Box sx={{ minHeight: "calc(100vh - 156px)", background: "#000", color: "#fff", marginTop: "0rem" }}>
            <AnimatedRoutes /> {/* Fade Animation when Navigating */}
          </Box>

          {/* Footer (Lazy Loaded) */}
          <Suspense fallback={null}>
            <Footer />
          </Suspense>

          {/* MobileNav (Regular Import) */}
          {isMobile && <MobileNav />}
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
