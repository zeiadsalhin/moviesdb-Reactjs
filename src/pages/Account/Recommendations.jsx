import { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import { supabase } from "../../utils/authConfig";
import { fetchFavorites } from "../../utils/favoritesUtils";
import axios from "axios";
import MediaCard from "../../components/movieCard";

const Recommendations = () => {
  useEffect(() => {
    document.title = "My Recommendation | The Movies";
  }, []);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (user) {
        const { success, favorites } = await fetchFavorites(user.id, "movie");

        if (success && favorites.length > 0) {
          // 🎲 Get a random movie ID
          const randomIndex = Math.floor(Math.random() * favorites.length);
          const randomMovieId = favorites[randomIndex];
          // console.log(randomIndex);
          

          try {
            const { data: tmdbRes } = await axios.get(
              `https://api.themoviedb.org/3/movie/${randomMovieId}/recommendations`
            );

            setRecommendations(tmdbRes.results || []);
            setLoading(false);
            // console.log(tmdbRes);
            
          } catch (err) {
            console.error("TMDB recommendations error:", err);
          }
        }
        setLoading(false);
      }
  
    };

    fetchRecs();
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
        Recommendations
      </Typography>
      <Typography sx={{ mt: 2, mb: 4 }}>
        Movies and TV shows recommended for you.
      </Typography>

      {recommendations.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <FavoriteBorder sx={{ fontSize: 80, color: "#999" }} />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
            Start adding your favorite movies!
          </Typography>
          <Typography sx={{ color: "#777", mt: 1 }}>
            Add movies to your watchlist to get personalized recommendations here.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {recommendations.map((media) => (
            <Grid item xs={6} md={3} key={media.id}>
              <MediaCard result={media} type="movie" />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Recommendations;
