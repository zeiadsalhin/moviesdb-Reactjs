import { Box, Typography } from "@mui/material";

const Watchlist = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: "#e50914", fontWeight: "bold" }}>
        Watchlist
      </Typography>
      <Typography sx={{ mt: 2 }}>Your saved movies and shows.</Typography>
    </Box>
  );
};

export default Watchlist;
