import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/navBar";
import MobileNav from "./components/mobileNav";
import NProgressHandler from "./NProgressHandler"; // Import the handler
import Home from "./pages/Home";
import Account from "./pages/Account";
import Movies from "./pages/Movies";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Search from "./pages/Search";
import darkTheme from "./theme";


const fetchUserData = async (setUser) => {
  try {
    const response = await fetch("https://api.themoviedb.org/3/account/21017366", {
      method: "GET",
      headers: { accept: "application/json", Authorization: import.meta.env.VITE_API_KEY },
    });
    const data = await response.json();
    setUser({
      name: data.name,
      avatar: `https://image.tmdb.org/t/p/w200${data.avatar.tmdb.avatar_path}`,
    });
  } catch (error) {
    console.error(error);
  }
};

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState({ name: "", avatar: "" });
  const isMobile = useMediaQuery("(max-width: 768px)"); // Check if screen width is 768px or smaller

  useEffect(() => {
    fetchUserData(setUser);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Ensures the dark background applies correctly */}
    <Router>
    <NProgressHandler /> {/* Global route progress bar */}
      {!isMobile && <Sidebar drawerOpen={drawerOpen} toggleDrawer={() => setDrawerOpen(!drawerOpen)} user={user} />}
      <Navbar toggleDrawer={() => setDrawerOpen(!drawerOpen)} />
      <Box sx={{ minHeight: "calc(100vh - 56px)", background: "#000", color: "#fff", marginTop: "0rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Box>
      {isMobile && <MobileNav />}
    </Router>
    </ThemeProvider>
  );
};

export default App;
