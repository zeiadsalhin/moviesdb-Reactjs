import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";

const NProgressHandler = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start(); // Start loading bar
    const timer = setTimeout(() => NProgress.done(), 200); // Prevent flickering

    return () => {
      clearTimeout(timer);
      NProgress.done(); // Ensure NProgress completes
    };
  }, [location.pathname]); // Runs on route change

  return null; // No UI needed
};

export default NProgressHandler;
