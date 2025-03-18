import { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper, Skeleton } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const UserStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const randomStats = {
        watchlist: Math.floor(Math.random() * 150) + 5,
        avgRating: (Math.random() * (5 - 2) + 2).toFixed(1),
        favGenre: ["Drama", "Action", "Comedy", "Thriller", "Sci-Fi", "Horror", "Romance"][Math.floor(Math.random() * 7)],
        totalHours: Math.floor(Math.random() * 600) + 20,
      };
      setStats(randomStats);
    }, 500); // .5s delay to show skeleton

    return () => clearTimeout(timeout);
  }, []);

  const statsArray = stats ? [
    {
      label: "Watchlist Items",
      value: stats.watchlist,
      icon: <MovieIcon sx={{ color: '#e50914', mr: 1 }} />,
    },
    {
      label: "Avg. Rating",
      value: stats.avgRating,
      icon: <StarRateIcon sx={{ color: '#e50914', mr: 1 }} />,
    },
    {
      label: "Fav Genre",
      value: stats.favGenre,
      icon: <FavoriteIcon sx={{ color: '#e50914', mr: 1 }} />,
    },
    {
      label: "Watched",
      value: `${stats.totalHours} hrs`,
      icon: <AccessTimeIcon sx={{ color: '#e50914', mr: 1 }} />,
    },
  ] : [];

  return (
    <Box sx={{ mt: { xs: 3, md: 0 }, p: 0.175 }}>
      <Grid container spacing={1}>
        {statsArray.length > 0 ? (
          statsArray.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: "#111", color: "#fff", display: 'flex', alignItems: 'center' }}>
                {stat.icon}
                <Box>
                  <Typography variant="h6">{stat.value}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>{stat.label}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: "#111", display: 'flex', alignItems: 'center' }}>
                <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1, bgcolor: "grey.800" }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Skeleton width="60%" height={24} sx={{ mb: 1, bgcolor: "grey.800" }} />
                  <Skeleton width="80%" height={16} sx={{ bgcolor: "grey.800" }} />
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default UserStats;
