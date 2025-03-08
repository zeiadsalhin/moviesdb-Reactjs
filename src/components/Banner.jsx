import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography, Rating, Grid } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import CustomButton from "./useCustomButton";
import { useMediaQuery } from "@mui/material";

const HomeBanner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [randomMovie, setRandomMovie] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rating, setRating] = useState(null);
  const scrollY = useRef(0);
  const isSaved = false;
  const isMobile = useMediaQuery("(max-width: 899px)");

  useEffect(() => {
    fetchRandomMovie();

    const handleScroll = () => {
      scrollY.current = window.scrollY * 0.6; // Parallax effect
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
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          include_adult: false,
          include_video: false,
          language: "en-US",
          page: 1,
          sort_by: "popularity.desc",
        }
      });

      const movies = data.results.filter((movie) => movie.backdrop_path);
      if (movies.length === 0) {
        setIsLoading(false);
        return;
      }

      const randomIndex = Math.floor(Math.random() * movies.length);
      const selectedMovie = movies[randomIndex];

      setRandomMovie(selectedMovie);
      setRating((selectedMovie.vote_average / 2).toFixed(1));

      // Preload the image
      const imageSrc = `https://image.tmdb.org/t/p/${isMobile ? "w1280" : "original"}${selectedMovie.backdrop_path}`;
      const img = new Image();
      img.src = imageSrc;
      img.loading = "eager"; // Load ASAP
      img.fetchPriority = "high"; // Prioritize download
      img.onload = () => setTimeout(() => setImageLoaded(true), 300);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "50vh", md: "70vh", lg: "60vh", xl: "60vh" },
        background: "#000",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <CircularProgress />
        </Box>
      ) : (
        randomMovie && (
          <>
            {/* Parallax Background with Fade-In */}
            <Box
              id="banner-image"
              sx={{
                position: "absolute",
                inset: 0,
                height: { xs: "50vh", md: "70vh", lg: "60vh", xl: "60vh" },
                maxHeight: { xs: "50vh", md: "70vh", lg: "60vh", xl: "60vh" },
                backgroundImage: imageLoaded
                  ? `linear-gradient(to right, black 25%, transparent 85%), 
                     url(https://image.tmdb.org/t/p/${isMobile ? "w1280" : "original"}${randomMovie.backdrop_path})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: imageLoaded ? 1 : 0, // Starts invisible, fades in when loaded
                transition: "opacity 0.5s ease-in-out", // Smooth fade-in effect
              }}
            />

            {/* Movie Info */}
            <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", px: { xs: 2, md: 6 }, zIndex: 1 }}>
              <Box sx={{ maxWidth: "600px", borderRadius: 2 }}>
                <Link to={`/details/movie/${randomMovie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <Typography sx={{ typography: { xs: "h5", md: "h3" }, fontWeight: { xs: 600, md: 700 } }}>
                    {randomMovie.title}
                  </Typography>
                </Link>

                <Grid container direction={{ xs: "column", md: "col" }} alignItems="left" spacing={0} sx={{ mt: 1, opacity: 0.9 }}>
                  <Grid container>
                    <Grid item>
                      <Rating value={Number(rating)} readOnly size={isMobile ? "small" : "large"} />
                    </Grid>
                  </Grid>

                  <Grid container direction={{ xs: "column", md: "row" }} gap={1}>
                    <Grid item>
                      <Typography variant="body1">{Number(randomMovie.popularity?.toFixed()).toLocaleString()} Reviews</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">{randomMovie.vote_count?.toLocaleString()} Votes</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">{randomMovie.release_date.slice(0, 4)}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Typography variant="body2" sx={{ mt: 2, opacity: 0.9, display: { xs: "none", md: "block" } }}>
                  {randomMovie.overview.slice(0, 300)}...
                </Typography>

                {/* Watch Now and Save Buttons */}
                <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, md: 3 } }}>
                  <CustomButton
                    text="View"
                    color="secondary"
                    size={isMobile ? "small" : "medium"}
                    icon={<PlayArrowIcon />}
                    component={Link}
                    to={`/details/movie/${randomMovie.id}`}
                    sx={{ gap: 0 }}
                  />

                  <CustomButton
                    text={isSaved ? "Saved" : "Save"}
                    color="secondary"
                    size={isMobile ? "small" : "medium"}
                    variant="outlined"
                    icon={isSaved ? <BookmarkIcon /> : <AddIcon />}
                    sx={{ gap: 0 }}
                  />
                </Box>
              </Box>
            </Box>
          </>
        )
      )}
    </Box>
  );
};

export default HomeBanner;
