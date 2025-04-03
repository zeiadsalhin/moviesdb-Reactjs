import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import DashboardNavigation from "../../components/Account/Navigation";
import ProfileHeader from "../../components/Account/ProfileHeader";
import Watchlist from "../../components/Account/MyMovies";
import Recommendations from "../../components/Account/Recommendations";
import { supabase } from "../../utils/authConfig";
import { generateRandomUsername } from "../../utils/generateUsername";
import { getUserProfile } from "../../utils/getUserProfile";
import UserStats from "../../components/Account/UserStats";

// This component is the main dashboard for the user account page. It fetches user data, displays the profile header, watchlist, and recommendations.
// It also handles the generation of a random username if the user does not have one set.
const Dashboard = () => {
  useEffect(() => {
    document.title = "My Account | The Movies";
  }, []);

  const isMobile = useMediaQuery("(max-width: 900px)");
  const [user, setUser] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch user data from Supabase and set the user state
  // This includes the display name, email, and avatar URL.
  // If the display name is missing, generate a random username and update the user state.
  // The user state is then passed to the ProfileHeader component for display.
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData?.user) {
        console.error("Error fetching user:", authError?.message);
        return;
      }

      const userId = authData.user.id;
      const email = authData.user.email;

      // Fetch from custom profile table via util
      const profileData = await getUserProfile(userId);

      let displayName = authData.user.user_metadata?.display_name;

      // Auto-generate display name if missing
      if (!displayName && !isUpdating) {
        setIsUpdating(true);
        try {
          const randomUsername = await generateRandomUsername();
          const { error } = await supabase.auth.updateUser({
            data: { display_name: randomUsername },
          });

          if (error) {
            console.error("Error updating display name:", error.message);
          } else {
            displayName = randomUsername;
            setTimeout(() => {
              setUser((prev) => ({
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

      // Set user state using profileData
      setUser({
        display_name: displayName || "guest_user",
        email,
        avatar: profileData?.avatar_url || "/default-avatar.png",
        ...profileData, // add other fields if you have them (e.g., role, bio, etc.)
      });
    };

    fetchUserData();
  }, []);

  return (
    <Box
      sx={{
        padding: 0,
        maxWidth: "100%",
        minHeight: "600px",
        justifyContent: "center",
        gap: { xs: 0, md: 3 },
        display: "flex",
        flexDirection: "column",
        mt: 2,
      }}
    >
      <ProfileHeader user={user} />
      <UserStats />
      {isMobile && <DashboardNavigation passAuth={supabase} passUseState={useState} />}
      <Watchlist />
      <Recommendations />
    </Box>
  );
};

export default Dashboard;
