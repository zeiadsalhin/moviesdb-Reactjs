import { Box, Typography, Button } from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This component is used to display a confirmation message after the user has signed up
// and is redirected to confirm their email address. It shows a message indicating that a confirmation email has been sent to the user's email address.
// The email address is extracted from the URL query parameters. The user can click a button to navigate back to the home page.
const ConfirmEmail = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email"); // Get email from URL

  useEffect(() => {
    document.title = "Confirm Your Email | The Movies";
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 9rem)",
        textAlign: "center",
        background: "#141414",
        color: "#fff",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          background: "rgba(0, 0, 0, 0.7)",
          padding: 4,
          borderRadius: 2,
          maxWidth: 500,
          boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box sx={{ margin: "0 auto 10px" }}>
          <MarkEmailReadIcon sx={{ fontSize: "8rem", m: 2, color: "#fff" }} />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Confirm Your Email
        </Typography>

        <Typography sx={{ marginBottom: 2, fontSize: "1.1rem", color: "#ddd" }}>
          We’ve sent a confirmation email to <b>{decodeURIComponent(email)}</b>.
          <br />
          Please check your inbox and click the link to verify your account.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#e50914",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#b20710" },
          }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmEmail;
