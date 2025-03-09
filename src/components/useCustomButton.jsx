import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CustomButton = ({
  text,
  color = "primary",
  startIcon = null,
  variant = "contained",
  component,
  href,
  to,
  onClick,
  size = "medium",
  sx = {},
  ...props // Fixed spread syntax for additional props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      startIcon={startIcon} // 👈 Properly handles startIcon
      component={component}
      onClick={onClick}
      size={size}
      {...(to ? { component: Link, to } : {})} // Internal navigation
      {...(href ? { component: "a", href, target: "_blank", rel: "noopener noreferrer" } : {})} // External link handling
      {...props}
      sx={{
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        gap: 1, // Increased spacing for better alignment
        ...sx,
      }}
    >
      <Typography
        variant={size === "small" ? "body2" : "body1"}
        sx={{ mt: 0.25 }}
      >
        {text}
      </Typography>
    </Button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  startIcon: PropTypes.element, // Updated prop name for clarity
  variant: PropTypes.string,
  component: PropTypes.elementType,
  href: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  sx: PropTypes.object,
};

export default CustomButton;
