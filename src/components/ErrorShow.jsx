import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Go Back Icon

const ErrorComponent = ({ message = "Oops! 🎬 The item you are looking for is not found." }) => {
    const navigate = useNavigate();
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        document.title = "404 - Not Found | The Movies";
        setFadeIn(true);
    }, []);

    return (
        <Fade in={fadeIn} timeout={300}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="calc(100lvh - 9rem)" 
                minHeight="calc(100svh - 9rem)"
                width="100%"
                position="relative"
                sx={{
                    backgroundImage: "url('/Banner_logo_lr.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Dark Overlay for better readability */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay
                    }}
                />

                {/* Text Content */}
                <Box
                    sx={{
                        position: "relative",
                        textAlign: "center",
                        color: "white",
                        zIndex: 2,
                        px: 3,
                    }}
                >
                    {/* 404 Number with Gradient */}
                    <Typography
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: "5rem", md: "6rem" }, 
                            textShadow: "12px 12px 12px rgba(0, 0, 0, 0.8)", 
                            background: "linear-gradient(45deg, #ff416c, #ff4b2b)", 
                            WebkitBackgroundClip: "text", 
                            WebkitTextFillColor: "transparent",
                            animation: "pulse 1.5s infinite alternate",
                            "@keyframes pulse": {
                                "0%": { transform: "scale(1)" },
                                "100%": { transform: "scale(1.05)" }
                            }
                        }}
                    >
                        404
                    </Typography>

                    {/* Message with slight animation */}
                    <Typography
                        variant="h6"
                        sx={{
                            textShadow: "5px 5px 12px rgba(0, 0, 0, 0.6)",
                            mb: 3,
                            fontWeight: "200",
                            opacity: 0.9,
                            animation: "fadeIn .5s ease-in-out",
                            "@keyframes fadeIn": {
                                "0%": { opacity: 0 },
                                "100%": { opacity: 1 }
                            }
                        }}
                    >
                        {message}
                    </Typography>

                    {/* Go Back Button with Arrow Icon */}
                    <Button
                        disableTouchRipple
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBackIcon />} // Arrow icon for better UI
                        sx={{
                            textTransform: "none",
                            fontSize: "1rem",
                            boxShadow: "3px 3px 12px rgba(0, 0, 0, 0.5)",
                            "&:hover": {
                                backgroundColor: "#ff416c",
                            }
                        }}
                    >
                        Go Back
                    </Button>
                </Box>
            </Box>
        </Fade>
    );
};

ErrorComponent.propTypes = {
    message: PropTypes.string,
};

export default ErrorComponent;
