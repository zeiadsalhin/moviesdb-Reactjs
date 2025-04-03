import { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { fetchFavorites } from "../../utils/favoritesUtils";
import { supabase } from "../../utils/authConfig";
import MediaCard from "../../components/movieCard";
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from "axios";

// This component displays the user's watchlist, including saved movies and TV shows.
// It fetches the data from the Supabase database and TMDB API, and displays it in a grid format.
const Watchlist = () => {
  useEffect(() => {
    document.title = "My Watchlist | The Movies";
  }, []);
  
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch the user's watchlist data from Supabase and TMDB API
  // and set the state variables accordingly.
  // The fetchFavorites function retrieves the user's saved movies and TV shows from the database.
  // The TMDB API is used to fetch the details of each movie and TV show.
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
    <Box sx={{ m: { xs: 1, md: 3 } }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <BookmarkBorderIcon sx={{ color: "#e50914", mr: 1 }} />
        <Typography variant="h4" sx={{ color: "#e50914", fontWeight: "bold" }}>
          Watchlist
        </Typography>
      </Box>
      <Typography sx={{ mb: 4, color: "#aaa" }}>
        Your saved movies and shows.
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <MovieIcon sx={{ color: "#e50914", mr: 1 }} />
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Movies
        </Typography>
      </Box>
      {movies.length === 0 ? (
        <Typography sx={{ color: "#aaa", mb: 4 }}>No saved movies.</Typography>
      ) : (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {movies.map((movie) => (
            <Grid item xs={6} md={3} key={movie.id}>
              <MediaCard result={movie} type="movie" />
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <LiveTvIcon sx={{ color: "#e50914", mr: 1 }} />
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          TV Shows
        </Typography>
      </Box>
      {tvShows.length === 0 ? (
        <Typography sx={{ color: "#aaa" }}>No saved TV shows.</Typography>
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
