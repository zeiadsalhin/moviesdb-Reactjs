import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";
import Movies from "../pages/Movies";
import Auth from "../pages/Auth/Index";
import Account from "../pages/Account/Index";
import About from "../pages/About";
import ViewAll from "../pages/ViewAll";
import ViewDetails from "../pages/DetailsPage";
import ErrorPage from "../pages/404Page";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  // directories where animation disabled
  const noAnimationRoutes = ["/account"];

  // Check of the disabled directories
  const disableAnimation = noAnimationRoutes.some((path) => location.pathname.startsWith(path));
  

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {[
          { path: "/", Component: Home },
          { path: "/search", Component: Search },
          { path: "/favorites", Component: Favorites },
          { path: "/movies", Component: Movies },
          { path: "/auth/*", Component: Auth },
          { path: "/account/*", Component: Account },
          { path: "/about", Component: About },

          // View All Pages for Movies & TV Shows
          { path: "/all/:category/:type", Component: ViewAll },
          // View Details Movies & TV Shows
          { path: "/details/:type/:id", Component: ViewDetails },
          // 404 Page
          { path: "*", Component: ErrorPage },
        ].map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              disableAnimation ? (
                <Component /> // No animation for specified directories
              ) : (
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <Component />
                </motion.div>
              )
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
