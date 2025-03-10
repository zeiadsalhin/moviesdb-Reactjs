import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../..//middleware/ProtectedRoute"; // Import middleware
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Watchlist from "./Watchlist";
import Recommendations from "./Recommendations";
import Settings from "./Settings";
import SignIn from "../Auth/Signin";
import SignUp from "../Auth/Signup";

function DashboardApp() {
  return (

    <div className="mt-12">
    <Routes>
      {/* Protected Account Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Public Routes */}
      <Route path="/account/signin" element={<SignIn />} />
      <Route path="/account/signup" element={<SignUp />} />
    </Routes>
    </div>
  );
}

export default DashboardApp;
