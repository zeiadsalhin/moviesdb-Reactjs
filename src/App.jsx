import { useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";
import AnimatedRoutes from "./routes/AnimatedRoutes";
import Sidebar from "./layouts/sideBar";
import Navbar from "./layouts/navBar";
import MobileNav from "./layouts/mobileNav";
import Footer from "./layouts/Footer";
import NProgressHandler from "./utils/NProgressHandler"; // Import the handler
import darkTheme from "./styles/theme";
import { supabase } from "./utils/authConfig";

const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

const App = () => {
  const isMobile = useMediaQuery("(max-width: 900px)"); // Check if screen width is 900px or smaller
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Ensures the dark background applies correctly */}
      <Router>
        <Wrapper>
          <NProgressHandler /> {/* Global route progress bar */}

          {/* Sidebar only on larger screens */}
          {!isMobile && <Sidebar setSidebarVisible={setSidebarVisible} passAuth={supabase} />}

          {/* Navbar for both mobile & desktop */}
          <Navbar display={isMobile} />

          {/* Main content with proper margin to avoid overlap */}
          <Box
            component="main"
            sx={{
              minHeight: "calc(100vh - 156px)",
              background: "#000",
              color: "#fff",
              marginTop: "0rem",
              marginLeft: sidebarVisible && !isMobile ? "75px" : 0, // Sidebar width adjustment
              transition: "margin 0.3s ease-in-out",
            }}
          >
            <AnimatedRoutes /> {/* Fade Animation when Navigating */}
          </Box>

          <Footer />

          {/* Bottom navigation for mobile */}
          {isMobile && <MobileNav sidebarVisible={sidebarVisible} />}
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
