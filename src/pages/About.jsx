import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useEffect } from "react";

/// About Component
/// This component displays information about the website, including credits, license, and technologies used.
/// It also includes a link to the author's GitHub profile.
const About = () => {
  useEffect(()=> {
    document.title = 'About Us | The Movies';
  }, [])
  return (
    <Box className="about flex flex-col items-center text-center space-y-4" sx={{ paddingY: '6rem'}}>
      {/* Logo Section */}
      <Box className="flex items-center space-x-2">
        <Avatar src="/logo.webp" alt="Logo" sx={{ width: 50, height: 50 }} />
        <Typography variant="h6">The Movies&reg; Website</Typography>
      </Box>

      {/* Divider */}
      <Box className="w-1/5 h-1 bg-zinc-500 rounded-2xl mt-2" />

      {/* Credits */}
      <Typography variant="h5" sx={{ my: 2 }}>
        Credits:
      </Typography>

      <Typography className="opacity-75">© Ziadsalhin</Typography>

      {/* License Section */}
      <Box className="opacity-75 flex items-center justify-center space-x-1" sx={{ gap: 0.5 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
          <path d="M9 7l4 0" />
          <path d="M9 11l4 0" />
        </svg>
        <Typography>MIT License</Typography>
      </Box>

      <Typography className="opacity-75">v3.Final</Typography>

      {/* GitHub Link */}
      <Box className="opacity-75 mt-8 flex items-center space-x-1">
        <Typography>Follow me:</Typography>
        <Link to="https://github.com/zeiadsalhin" target="_blank" rel="noopener noreferrer">
          <GitHubIcon sx={{ fontSize: 30, color: "gray", "&:hover": { color: "white" } }} />
        </Link>
      </Box>

      {/* Created With Section */}
      <Typography sx={{mt: 3}}>Created with</Typography>
      <Box className="flex justify-center mt-2" sx={{ gap: 1, opacity: 0.75 }}>
        {/* React.js Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-10.5 -9.45 21 18.9">
        <circle cx="0" cy="0" r="2" fill="white"/>
        <g stroke="white" strokeWidth="1" fill="none">
          <ellipse rx="10" ry="4.5"/>
          <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
          <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
        </g>
        </svg>
        {/* Node.js Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 9v8.044a2 2 0 0 1 -2.996 1.734l-1.568 -.9a3 3 0 0 1 -1.436 -2.561v-6.635a3 3 0 0 1 1.436 -2.56l6 -3.667a3 3 0 0 1 3.128 0l6 3.667a3 3 0 0 1 1.436 2.561v6.634a3 3 0 0 1 -1.436 2.56l-6 3.667a3 3 0 0 1 -3.128 0" />
          <path d="M17 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3.5" />
        </svg>
        {/* Vite Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 4.5l6 -1.5l-2 6.5l2 -.5l-4 7v-5l-3 1z" />
          <path d="M15 6.5l7 -1.5l-10 17l-10 -17l7.741 1.5" />
        </svg>
        {/* MUI Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <path fill="white" fillRule="evenodd" d="M24 5.601V1.592a.344.344 0 0 0-.514-.298l-2.64 1.508a.688.688 0 0 0-.346.597v4.009c0 .264.285.43.514.298l2.64-1.508A.688.688 0 0 0 24 5.6ZM.515 1.295l7.643 4.383a.688.688 0 0 0 .684 0l7.643-4.383a.344.344 0 0 1 .515.298v12.03c0 .235-.12.453-.319.58l-4.65 2.953 3.11 1.832c.22.13.495.127.713-.009l4.61-2.878a.344.344 0 0 0 .161-.292v-4.085c0-.254.14-.486.362-.606l2.507-1.346a.344.344 0 0 1 .506.303v7.531c0 .244-.13.47-.34.593l-7.834 4.592a.688.688 0 0 1-.71-.009l-5.953-3.681A.344.344 0 0 1 9 18.808v-3.624c0-.115.057-.222.153-.286l4.04-2.694a.688.688 0 0 0 .307-.572v-4.39a.137.137 0 0 0-.208-.117l-4.44 2.664a.688.688 0 0 1-.705.002L3.645 7.123a.138.138 0 0 0-.208.118v7.933a.344.344 0 0 1-.52.295L.5 14.019C.19 13.833 0 13.497 0 13.135V1.593c0-.264.286-.43.515-.298Z" clipRule="evenodd"/>
        </svg>
        {/* Tailwind Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z" />
        </svg>
      </Box>
    </Box>
  );
};

export default About;
