import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Account from "./pages/Account";
import Movies from "./pages/Movies";
import About from "./pages/About";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.125 } },
  exit: { opacity: 0, transition: { duration: 0.125 } },
};

const AnimatedRoutes = () => {
  const location = useLocation(); // Get current location

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {[
          { path: "/", Component: Home },
          { path: "/search", Component: Search },
          { path: "/favorites", Component: Favorites },
          { path: "/account", Component: Account },
          { path: "/movies", Component: Movies },
          { path: "/about", Component: About },
        ].map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Component />
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
