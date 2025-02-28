import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Account = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState("");

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.themoviedb.org/3/account/21017366", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `${import.meta.env.VITE_API_KEY}`,
          },
        });

        const data = await response.json();
        setAccountInfo(data);
        setAvatarSrc(`https://image.tmdb.org/t/p/w200${data.avatar.tmdb.avatar_path}`);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountInfo();
  }, []);

  return (
    <Box className="about flex flex-col items-center h-fit bg-zinc-950 text-white" sx={{ paddingY: '8rem'}}>
      <Typography variant="h4" className="text-center font-bold p-2">
        My Account
      </Typography>
      <Box className="w-1/4 h-1 mt-5 rounded-xl bg-zinc-700" />

      {/* Avatar */}
      <Box className="mt-5 min-h-[6rem] ">
        {loading ? (
          <CircularProgress />
        ) : (
          <Avatar src={avatarSrc} alt="User Avatar" className="invert" sx={{ width: 100, height: 100 }} />
        )}
      </Box>

      <Box className="w-1/6 h-1 m-5 rounded-xl bg-zinc-900" />

      {/* Account Details */}
      <div className="min-h-[10rem]">
      {accountInfo && (
        <Box className="flex flex-col gap-2 p-5 text-left">
          <Typography variant="body1" className="text-zinc-300">
            <strong>Name:</strong> {accountInfo.name}
          </Typography>
          <Typography variant="body1" className="text-zinc-300">
            <strong>Username:</strong> {accountInfo.username}
          </Typography>
          <Typography variant="body1" className="text-zinc-300">
            <strong>Account ID:</strong> {accountInfo.id}
          </Typography>
          <Typography variant="body1" className="text-zinc-300">
            <strong>Language:</strong> {accountInfo.iso_639_1}
          </Typography>
        </Box>
      )}
      </div>

      {/* Footer */}
      <Typography className="text-md text-zinc-400 mt-10">
        Powered by <a href="https://www.themoviedb.org/" title="The movie database">TMDB</a> API
      </Typography>

      <Button component={Link} to="/about" variant="contained" sx={{ mt: 2, backgroundColor: "#999" }}>
        About
      </Button>
    </Box>
  );
};

export default Account;
