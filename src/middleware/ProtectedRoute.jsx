import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/authConfig";
import DashboardLayout from "../pages/Account/layout/DashboardLayout"; // New Layout

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      setUser(data?.session?.user || null);
      setLoading(false);
    };
  
    checkUser();
  
    // Subscribe to authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });
  
    // Cleanup the subscription on unmount
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);
  

  if (loading) return null; // Show nothing while checking authentication

  return user ? <DashboardLayout /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
