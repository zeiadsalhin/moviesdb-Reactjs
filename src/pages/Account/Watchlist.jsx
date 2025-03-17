import { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { fetchFavorites } from "../../utils/favoritesUtils";
import { supabase } from "../../utils/authConfig";
import MediaCard from "../../components/movieCard";
import axios from "axios";


const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user;
      setUser(currentUser);

      if (currentUser) {
        const movieRes = await fetchFavorites(currentUser.id, "movie");
        const tvRes = await fetchFavorites(currentUser.id, "tv");

        const movieDetails = await Promise.all(
          (movieRes.favorites || []).map(async (id) => {
            try {
              const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`);
              return data;
            } catch (err) {
              console.error("Error fetching movie:", id, err);
              return null;
            }
          })
        );

        const tvDetails = await Promise.all(
          (tvRes.favorites || []).map(async (id) => {
            try {
              const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}`);
              return data;
            } catch (err) {
              console.error("Error fetching TV show:", id, err);
              return null;
            }
          })
        );

        // Filter out failed fetches (null values)
        setMovies(movieDetails.filter(Boolean));
        setTvShows(tvDetails.filter(Boolean));
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress color="error" />
      </Box>
    );
  }

  return (
    <Box sx={{m: {xs: 0, md: 4}}}>
      <Typography variant="h4" sx={{ color: "#e50914", fontWeight: "bold" }}>
        Watchlist
      </Typography>
      <Typography sx={{ mt: 2, mb: 4 }}>
        Your saved movies and shows.
      </Typography>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Movies
      </Typography>
      {movies.length === 0 ? (
        <Typography>No saved movies.</Typography>
      ) : (
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid item xs={6} md={3} key={movie.id}>
              <MediaCard result={movie} type="movie" />
            </Grid>
          ))}
        </Grid>
      )}

      <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
        TV Shows
      </Typography>
      {tvShows.length === 0 ? (
        <Typography>No saved TV shows.</Typography>
      ) : (
        <Grid container spacing={2}>
          {tvShows.map((tv) => (
            <Grid item xs={6} md={3} key={tv.id}>
              <MediaCard result={tv} type="tv" />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Watchlist;
