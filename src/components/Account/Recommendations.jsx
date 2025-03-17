import { Box } from "@mui/material";
import MediaList from "../../components/MediaList"; // Reusing existing media list component

const Recommendations = () => {
  const endPoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`;

  return (
    <Box>
        <MediaList title="Recommended Movies" apiEndpoint={endPoint} mediaType="movie" viewAllRoute="/all/toprated/movie" />   
    </Box>
  );
};

export default Recommendations;
