import { Box, Typography } from "@mui/material";

// This component is used to display the footer of the application.
// It contains the copyright information and the data provider information.
const Footer = () => {
  return (
    <Box sx={{ p: 4, textAlign: "center", mt: 0, mb: {xs: 5, md: 0}, opacity: 0.6 }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} — <strong>Ziadsalhin@github. Data provided by TMDb. All rights reserved.</strong>
      </Typography>
    </Box>
  );
};

export default Footer;
