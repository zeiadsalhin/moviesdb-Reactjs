import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

// This is the main layout for the dashboard, which includes a sidebar and a content area
// The Sidebar component is imported and used here, and the Outlet component is used to render the current route inside the layout
const DashboardLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        backgroundColor: "#111111",
      }}
    >
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <Box sx={{ flexGrow: 1, padding: {xs: 1.45, md: 2.5}, maxWidth: {xs: "100%", md: "calc(100% - 16rem)"}, justifyContent: "center", gap: 3 }}>
        <Outlet /> {/* This will render the current route inside the layout */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
