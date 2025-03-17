import { Box, Typography, Avatar, Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const ProfileHeader = ({ user }) => {
  const isLoading = !user; // Check if user data is still loading

  return (
    <Box sx={{ textAlign: "center", py: 4, background: "rgba(0,0,0,0.3)", borderRadius: 2 }}>
      {isLoading ? (
        <Skeleton variant="circular" width={80} height={80} sx={{ margin: "0 auto" }} />
      ) : (
        <Avatar
          src={user.avatar || "/default-avatar.png"}
          alt={user.display_name}
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto",
            border: "3px solid #e50914",
          }}
        />
      )}

      <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold", color: "#fff", justifyContent: "center"}}>
        {isLoading ? <Skeleton width={120} sx={{ marginInline: "auto" }} /> : user.display_name}
      </Typography>

      <Typography variant="body2" sx={{ color: "#aaa" }}>
        {isLoading ? <Skeleton width={180} sx={{ marginInline: "auto" }} /> : user.email}
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 0 }}>
        {["Movies", "Followers", "Following"].map((label, index) => (
          <Grid item key={index}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#e50914" }}>
              {isLoading ? <Skeleton width={40} sx={{ marginInline: "auto" }} /> : [user?.favorite_movies?.length, 151, 204][index]}
            </Typography>
            <Typography variant="body2" sx={{ color: "#aaa" }}>{label}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    display_name: PropTypes.string,
    email: PropTypes.string,
    favorite_movies: PropTypes.array
  }),
};

export default ProfileHeader;
