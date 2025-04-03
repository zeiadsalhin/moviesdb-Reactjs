import { Box } from "@mui/material";
import MediaList from "../../components/MediaList"; // Reusing existing media list component

// This component fetches and displays a list of recommended movies using the MediaList component
// It uses the TMDB API to get the top-rated movies and passes the data to the MediaList component for rendering

const Recommendations = () => {
  const endPoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`;

  return (
    <Box>
        <MediaList title="Recommended Movies" apiEndpoint={endPoint} mediaType="movie" viewAllRoute="/all/toprated/movie" />   
    </Box>
  );
};

export default Recommendations;
