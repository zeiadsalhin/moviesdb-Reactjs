import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ChangeEmailSection from "../../components/Account/ChangeEmail";
import ChangePasswordSection from "../../components/Account/ChangePassword";
import { supabase } from "../../utils/authConfig";
import { BASE_URL } from "../../utils/BASE_URL_Config";

const SettingsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, color: "#fff" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
        Account Settings
      </Typography>

      {/* Tabs for Navigation */}
      <Tabs
        value={tabIndex}
        onChange={(_, newIndex) => setTabIndex(newIndex)}
        centered
        sx={{
          "& .MuiTab-root": { color: "#bbb" },
          "& .MuiTab-root.Mui-selected": { color: "#e50914", fontWeight: "bold" },
          "& .MuiTabs-indicator": { backgroundColor: "#e50914" },
        }}
      >
        <Tab label="Change Email" />
        <Tab label="Change Password" />
      </Tabs>

      {/* Render the selected section */}
      <Box sx={{ mt: 3 }}>
        {tabIndex === 0 && <ChangeEmailSection supabase={supabase} BASE_URL={BASE_URL} />}
        {tabIndex === 1 && <ChangePasswordSection supabase={supabase} BASE_URL={BASE_URL} />}
      </Box>
    </Box>
  );
};

SettingsPage.propTypes = {
  supabase: PropTypes.object.isRequired,
};

export default SettingsPage;
