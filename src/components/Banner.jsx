import { useState, useEffect, useRef } from "react";
import { Box, CircularProgress, Typography, Rating, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [randomMovie, setRandomMovie] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rating, setRating] = useState(null);
  const scrollY = useRef(0);

  useEffect(() => {
    fetchRandomMovie();

    const handleScroll = () => {
      scrollY.current = window.scrollY * 0.6; // Parallax speed
      requestAnimationFrame(() => {
        const bannerImage = document.getElementById("banner-image");
        if (bannerImage) {
          bannerImage.style.transform = `translateY(${scrollY.current}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchRandomMovie = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        {
          method: "GET",
          headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_API_KEY
        }
        }
      );

      const data = await response.json();
      const movies = data.results.filter((movie) => movie.backdrop_path);

      if (movies.length === 0) {
        setIsLoading(false);
        return;
      }

      const randomIndex = Math.floor(Math.random() * movies.length);
      const selectedMovie = movies[randomIndex];

      setRandomMovie(selectedMovie);
      setRating((selectedMovie.vote_average / 2).toFixed(1));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ position: "relative", height: { xs: "50vh", md: "70vh" }, background: "#000", color: "#fff", overflow: "hidden" }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <CircularProgress />
        </Box>
      ) : (
        randomMovie && (
          <>
            {/* Preload Image */}
            <img
              src={`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`}
              alt="Movie Background"
              onLoad={() => setImageLoaded(true)}
              style={{ display: "none" }}
            />

            {/* Parallax Background with Gradient */}
            <Box
              id="banner-image"
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: imageLoaded
                  ? `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), 
                     linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2)), 
                     url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            />

            {/* Movie Info */}
            <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", px: { xs: 2, md: 12 }, zIndex: 1 }}>
              <Box sx={{ maxWidth: "600px", borderRadius: 2 }}>
                <Link to={`/details/movie/${randomMovie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <Typography sx={{ typography: { xs: "h4", md: "h3" }, fontWeight: { xs: 600, md: 700 } }}>
                    {randomMovie.title}
                  </Typography>
                </Link>
                <Grid container direction={{ xs: "column", md: "row" }} alignItems="left" spacing={0.4} sx={{ mt: 2, opacity: 0.9 }}>
                  <Grid item>
                    <Rating value={Number(rating)} readOnly size="large" />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{randomMovie.popularity.toFixed()} Reviews</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{randomMovie.vote_count} Votes</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{randomMovie.release_date.slice(0, 4)}</Typography>
                  </Grid>
                </Grid>
                <Typography variant="body2" sx={{ mt: 2, opacity: 0.9, display: { xs: "none", md: "block" } }}>
                  {randomMovie.overview.slice(0, 300)}...
                </Typography>
              </Box>
            </Box>
          </>
        )
      )}
    </Box>
  );
};

export default HomeBanner;
