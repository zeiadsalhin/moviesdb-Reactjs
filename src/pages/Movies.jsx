import { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import MediaList from "../components/MediaList";

const MoviesPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <Box sx={{ scale: 1, py: 20, mx: "auto", overflow: "hidden" }}>
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
          <Typography variant="h4" textAlign="center" sx={{ mb: 2 }}>
            Browse Movies and TV
          </Typography>

          {/* Movie & TV Show Sections */}
          <MediaList
            title="Upcoming Movies"
            apiEndpoint="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
            viewAllRoute="/upcoming/movie"
            mediaType="movie"
          />

          <MediaList
            title="Top Rated Movies"
            apiEndpoint="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
            viewAllRoute="/toprated/movie"
            mediaType="movie"
          />

          <MediaList
            title="Action Movies"
            apiEndpoint="https://api.themoviedb.org/3/discover/movie?with_genres=28&language=en-US&page=1"
            viewAllRoute="/action/movies"
            mediaType="movie"
          />

          <MediaList
            title="Adventure Movies"
            apiEndpoint="https://api.themoviedb.org/3/discover/movie?with_genres=12&language=en-US&page=1"
            viewAllRoute="/adventure/movies"
            mediaType="movie"
          />

          <MediaList
            title="Crime Movies"
            apiEndpoint="https://api.themoviedb.org/3/discover/movie?with_genres=80&language=en-US&page=1"
            viewAllRoute="/crime/movies"
            mediaType="movie"
          />

          <MediaList
            title="Documentaries"
            apiEndpoint="https://api.themoviedb.org/3/discover/movie?with_genres=99&language=en-US&page=1"
            viewAllRoute="/documentary/movies"
            mediaType="movie"
          />

          <MediaList
            title="History Movies"
            apiEndpoint="https://api.themoviedb.org/3/discover/movie?with_genres=36&language=en-US&page=1"
            viewAllRoute="/history/movies"
            mediaType="movie"
          />

          <MediaList
            title="Horror Movies"
            apiEndpoint="https://api.themoviedb.org/3/discover/movie?with_genres=27&language=en-US&page=1"
            viewAllRoute="/horror/movies"
            mediaType="movie"
          />

          <MediaList
            title="Sci-Fi Movies"
            apiEndpoint="https://api.themoviedb.org/3/discover/movie?with_genres=878&language=en-US&page=1"
            viewAllRoute="/sci-fi/movies"
            mediaType="movie"
          />

          <MediaList
            title="Thriller Movies"
            apiEndpoint="https://api.themoviedb.org/3/discover/movie?with_genres=53&language=en-US&page=1"
            viewAllRoute="/thriller/movies"
            mediaType="movie"
          />

          <MediaList
            title="War Movies"
            apiEndpoint="https://api.themoviedb.org/3/discover/movie?with_genres=10752&language=en-US&page=1"
            viewAllRoute="/war/movies"
            mediaType="movie"
          />

          <MediaList
            title="Latest Movies"
            apiEndpoint="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
            viewAllRoute="/latest/movies"
            mediaType="movie"
          />

          <MediaList
            title="Latest TV Shows"
            apiEndpoint="https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1"
            viewAllRoute="/latest/tv"
            mediaType="tv"
          />

          <MediaList
            title="Trending Movies"
            apiEndpoint="https://api.themoviedb.org/3/trending/movie/week?language=en-US"
            viewAllRoute="/trending/movies"
            mediaType="movie"
          />

          <MediaList
            title="Trending TV Shows"
            apiEndpoint="https://api.themoviedb.org/3/trending/tv/week?language=en-US"
            viewAllRoute="/trending/tv"
            mediaType="tv"
          />

          <MediaList
            title="Top Rated TV Shows"
            apiEndpoint="https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1"
            viewAllRoute="/toprated/tv"
            mediaType="tv"
          />
        </>
      )}
    </Box>
  );
};

export default MoviesPage;
