import { useState, useEffect, lazy, Suspense } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
const MediaList = lazy(() => import("../components/MediaList")); // Lazy load MediaList

const MoviesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    document.title = "Browse All Movies & TV Shows | The Movies";

    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  const mediaCategories = [
    { title: "Upcoming Movies", endpoint: "movie/upcoming", genre: "upcoming", type: "movie" },
    { title: "Top Rated Movies", endpoint: "movie/top_rated", genre: "toprated", type: "movie" },
    { title: "Action Movies", endpoint: "discover/movie?with_genres=28", genre: "action", type: "movie" },
    { title: "Adventure Movies", endpoint: "discover/movie?with_genres=12", genre: "adventure", type: "movie" },
    { title: "Crime Movies", endpoint: "discover/movie?with_genres=80", genre: "crime", type: "movie" },
    { title: "Documentaries", endpoint: "discover/movie?with_genres=99", genre: "documentary", type: "movie" },
    { title: "History Movies", endpoint: "discover/movie?with_genres=36", genre: "history", type: "movie" },
    { title: "Horror Movies", endpoint: "discover/movie?with_genres=27", genre: "horror", type: "movie" },
    { title: "Sci-Fi Movies", endpoint: "discover/movie?with_genres=878", genre: "sci-fi", type: "movie" },
    { title: "Thriller Movies", endpoint: "discover/movie?with_genres=53", genre: "thriller", type: "movie" },
    { title: "War Movies", endpoint: "discover/movie?with_genres=10752", genre: "war", type: "movie" },
    { title: "Latest Movies", endpoint: "movie/now_playing", genre: "latest", type: "movie" },
    { title: "Latest TV Shows", endpoint: "tv/on_the_air", genre: "latest", type: "tv" },
    { title: "Trending Movies", endpoint: "trending/movie/week", genre: "trending", type: "movie" },
    { title: "Trending TV Shows", endpoint: "trending/tv/week", genre: "trending", type: "tv" },
    { title: "Top Rated TV Shows", endpoint: "tv/top_rated", genre: "toprated", type: "tv" },
  ];

  return (
    <Box sx={{ pb: 20, px: { md: 4 }, mx: "auto", overflow: "hidden" }}>
      {isLoading ? (
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            backgroundColor: "black",
            position: "absolute",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* 🔹 Banner */}
          <Box
            sx={{ position: "relative", width: "100%", height: { xs: "250px", md: "400px" }, overflow: "hidden", borderRadius: "8px"}}>
            
            {/* 🔹 Preload Image */}
            <img
              src="/Banner_logo_lr.webp"
              alt="Banner Background"
              onLoad={() => setImageLoaded(true)}
              style={{ display: "none" }}
            />

            {/* 🔹 Parallax Background with Gradient */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: imageLoaded
                  ? `linear-gradient(to right, rgba(0,0,0,0.8) 20%, transparent 80%), 
                     url(/Banner_logo_lr.webp)`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
              }}
            />

            {/* 🔹 Banner Text */}
            <Box
              sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", color: "#fff", zIndex: 2, mt: 10 }}>
              <Typography
                sx={{
                  variant: "h3",
                  fontWeight: "bold",
                  textShadow: "4px 4px 10px rgba(0,0,0,0.8)",
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Browse Movies and TV
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 1,
                  maxWidth: { xs: "90%", md: "70%" },
                  textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  opacity: 0.85,
                }}
              >
                Watch the latest blockbusters, trending series, and timeless classics.
              </Typography>
            </Box>
          </Box>

          {/* 🔹 Loop through mediaCategories with lazy load */}
          <Suspense>
          {mediaCategories.map(({ title, endpoint, genre, type }) => (
            <MediaList
              key={title}
              title={title}
              apiEndpoint={`https://api.themoviedb.org/3/${endpoint}?language=en-US&page=1`}
              viewAllRoute={`/all/${genre.replace(/\//g, "-")}/${type}`}
              mediaType={type}
            />
          ))}
          </Suspense>
        </>
      )}
    </Box>
  );
};

export default MoviesPage;
