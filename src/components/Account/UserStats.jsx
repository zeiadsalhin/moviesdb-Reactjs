import { Box, Grid, Typography, Paper } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const UserStats = () => {
  const randomStats = {
    watchlist: Math.floor(Math.random() * 150) + 5, // between 5 - 150
    avgRating: (Math.random() * (5 - 2) + 2).toFixed(1), // between 2.0 - 5.0
    favGenre: ["Drama", "Action", "Comedy", "Thriller", "Sci-Fi", "Horror", "Romance"][Math.floor(Math.random() * 7)],
    totalHours: Math.floor(Math.random() * 600) + 20, // between 20 - 620 hrs
  };

  const statsArray = [
    {
      label: "Watchlist Items",
      value: randomStats.watchlist,
      icon: <MovieIcon sx={{ color: '#e50914', mr: 1 }} />,
    },
    {
      label: "Avg. Rating",
      value: randomStats.avgRating,
      icon: <StarRateIcon sx={{ color: '#e50914', mr: 1 }} />,
    },
    {
      label: "Fav Genre",
      value: randomStats.favGenre,
      icon: <FavoriteIcon sx={{ color: '#e50914', mr: 1 }} />,
    },
    {
      label: "Watched",
      value: `${randomStats.totalHours} hrs`,
      icon: <AccessTimeIcon sx={{ color: '#e50914', mr: 1 }} />,
    },
  ];

  return (
    <Box sx={{ mt: { xs: 3, md: 0 }, p: 0.175 }}>
      <Grid container spacing={1}>
        {statsArray.map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: "#111", color: "#fff", display: 'flex', alignItems: 'center' }}>
              {stat.icon}
              <Box>
                <Typography variant="h6">{stat.value}</Typography>
                <Typography variant="body2" sx={{opacity: 0.7}}>{stat.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserStats;
