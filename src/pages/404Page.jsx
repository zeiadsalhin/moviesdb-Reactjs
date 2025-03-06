import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Page Not Found | The Movies';
  }, []);
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
        pt: 16,
      }}
    >
      <Typography color="secondary" sx={{ fontWeight: "bold", fontSize: {xs: "4.5rem", md: "6rem"} }}>
        404
      </Typography>

      {/* Message & Button */}
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Page Not Found 🎬
      </Typography>
      <Typography variant="h6" sx={{ mt: 1, color: "#BDBDBD" }}>
        Looks like this page got cut from the right location.
      </Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
