import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import DashboardNavigation from "../../components/Account/Navigation";
import ProfileHeader from "../../components/Account/ProfileHeader";
import Watchlist from "../../components/Account/MyMovies";
import Recommendations from "../../components/Account/Recommendations";
import { supabase } from "../../utils/authConfig";
import { generateRandomUsername } from "../../utils/generateUsername";

const Dashboard = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [user, setUser] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // Prevents infinite loop

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData?.user) {
        console.error("Error fetching user:", authError?.message);
        return;
      }

      const userId = authData.user.id;
      let displayName = authData.user.user_metadata?.display_name;
      const email = authData.user.email;

      // Fetch avatar from user_profiles
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("avatar_url")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
      }

      // If display_name is missing, generate one
      if (!displayName && !isUpdating) {
        setIsUpdating(true);
        try {
          const randomUsername = await generateRandomUsername();

          // Update Supabase Auth with new display name
          const { error } = await supabase.auth.updateUser({
            data: { display_name: randomUsername },
          });

          if (error) {
            console.error("Error updating display name:", error.message);
          } else {
            displayName = randomUsername;
            
            // Set the user displayName
            setTimeout(() => {
              setUser(prev => ({
                ...prev,
                display_name: randomUsername,
              }));
            }, 1000);
          }
        } catch (err) {
          console.error("Error generating username:", err.message);
        } finally {
          setIsUpdating(false);
        }
      }

      // Set the user state
      setUser({
        display_name: authData?.user.user_metadata.display_name || "guest_user",
        email,
        avatar: profileData?.avatar_url || "/default-avatar.png",
      });
    };

    fetchUserData();
  }, []);

  return (
    <Box sx={{ padding: 0, maxWidth: "100%", justifyContent: "center", gap: 3, display: "flex", flexDirection: "column", mt: 2 }}>
      {/* Profile */}
      <ProfileHeader user={user} />

      {/* Show Dashboard Navigation ONLY on mobile */}
      {isMobile && <DashboardNavigation />}

      {/* Display Sections */}
      <Watchlist />
      <Recommendations />
    </Box>
  );
};

export default Dashboard;
