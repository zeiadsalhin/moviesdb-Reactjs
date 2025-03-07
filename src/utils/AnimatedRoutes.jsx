import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";

// Lazy Loading Pages
const Home = lazy(() => import("../pages/Home"));
const Search = lazy(() => import("../pages/Search"));
const Favorites = lazy(() => import("../pages/Favorites"));
const Movies = lazy(() => import("../pages/Movies"));
const Account = lazy(() => import("../pages/Account"));
const About = lazy(() => import("../pages/About"));
const ViewAll = lazy(() => import("../pages/ViewAll"));
const ViewDetails = lazy(() => import("../pages/DetailsPage"));
const ErrorPage = lazy(() => import("../pages/404Page"));

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
            <Suspense fallback={null}>
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <Component />
              </motion.div>
            </Suspense>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
