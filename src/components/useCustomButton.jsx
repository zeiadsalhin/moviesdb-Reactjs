import { Button, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const CustomButton = ({
  text,
  color = "primary",
  icon = null,
  variant = "contained",
  component,
  href,
  to,
  onClick,
  size = "medium",
  sx = {},
  props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      startIcon={icon}
      component={component}
      onClick={onClick}
      size={size}
      {...(to ? { component: Link, to } : {})} // Handle internal navigation
      {...(href ? { component: "a", href, target: "_blank", rel: "noopener noreferrer" } : {})} // Fix: Allows opening links
      {...props}
      sx={{ 
        textTransform: "none", 
        display: "flex", 
        alignItems: "center", 
        gap: 0.5, 
        ...sx 
      }} // 👈 Prevents all-uppercase text
    >
      <Typography variant={size === "small" ? "body2" : "body1"} sx={{mt: 0.25}}>
        {text}
      </Typography>
    </Button>
  );
};
CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  icon: PropTypes.element,
  variant: PropTypes.string,
  component: PropTypes.elementType,
  href: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
  sx: PropTypes.object,
  props: PropTypes.object
};

export default CustomButton;
