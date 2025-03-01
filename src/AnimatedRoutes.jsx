import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Movies from "./pages/Movies";
import Account from "./pages/Account";
import About from "./pages/About";
import ViewAll from "./pages/ViewAll";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {[
          { path: "/", Component: Home },
          { path: "/search", Component: Search },
          { path: "/favorites", Component: Favorites },
          { path: "/movies", Component: Movies },
          { path: "/account", Component: Account },
          { path: "/about", Component: About },

          // View All Pages for Movies & TV Shows
          { path: "/:category/:type", Component: ViewAll },
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
