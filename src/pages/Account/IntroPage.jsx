import { Box, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomButton from "../../components/useCustomButton"; // Import your custom button

const IntroPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Welcome to The Movies | The Movies";
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 9rem)",
        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url('/account_signup.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2, maxWidth: "700px", px: 2 }}>
        <Typography 
          variant="h3" 
          fontWeight="bold" 
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Unlimited Movies, TV Shows and More.
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            mt: 2, 
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            opacity: 0.8,
          }}
        >
          Watch anywhere. Recommend anytime.
        </Typography>

        {/* Responsive Buttons */}
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={2} 
          sx={{ mt: 4, width: "100%", justifyContent: "center" }}
        >
          <CustomButton
            text="Get Started"
            variant="contained"
            size="medium"
            sx={{
              color: "white",
              backgroundColor: "#e50914", // Netflix Red
              "&:hover": { backgroundColor: "#b20710" },
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1 },
              width: { xs: "100%", sm: "auto" }, // Full width on mobile
            }}
            onClick={() => navigate("/account/signup")}
          />
          <CustomButton
            text="Sign In"
            variant="outlined"
            size="medium"
            color="inherit"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1 },
              width: { xs: "100%", sm: "auto" }, // Full width on mobile
            }}
            onClick={() => navigate("/account/login")}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default IntroPage;
