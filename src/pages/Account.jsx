import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Account = () => {

  useEffect(() => {
    document.title = "The Movies - My Account";
  }, []);

  return (
    <Box className="about flex flex-col items-center bg-zinc-950 text-white" sx={{ paddingY: "8rem", minHeight: "calc(100vh - 10rem)" }}>
     

      {/* Authentication Notice */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          backgroundColor: "rgba(255, 165, 0, 0.1)", // Light orange background
          border: "1px solid rgba(255, 165, 0, 0.5)", // Orange border
          borderRadius: "8px",
          textAlign: "center",
          mx: 2,
          mb: 4,
        }}
      >
        <Typography variant="body1" sx={{ color: "orange", fontWeight: "bold" }}>
          🔐 Authentication Coming Soon!
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          You will be able to log in to access personalized features.
        </Typography>
      </Box>


      {/* Footer */}
      <Typography className="text-md text-zinc-400" sx={{ display: "flex", justifyContent: "center" }}>
        Powered by
        <a href="https://www.themoviedb.org/" title="The movie database" className="mx-1 font-bold">
          TMDB
        </a>
        API
      </Typography>

      <Button component={Link} to="/about" variant="contained" sx={{ mt: 2, backgroundColor: "#999" }}>
        About
      </Button>
    </Box>
  );
};

export default Account;
