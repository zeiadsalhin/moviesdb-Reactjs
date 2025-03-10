import { Box, Typography } from "@mui/material";

const Recommendations = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: "#e50914", fontWeight: "bold" }}>
        Recommendations
      </Typography>
      <Typography sx={{ mt: 2 }}>Movies and TV shows recommended for you.</Typography>
    </Box>
  );
};

export default Recommendations;
