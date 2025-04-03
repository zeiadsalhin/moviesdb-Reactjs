import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// MovieCard component to display individual movie or TV show details
// It takes in a result object and a type (movie or tv) as props
const MovieCard = ({ result, type }) => {  
  return (
    <Box className="movie-item" sx={{ flexBasis: "8%", height: "fit-content", paddingX: "4px" }}>
      <Link to={`/details/${result.media_type || type}/${result.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Box className="imagecover" sx={{ marginInline: "auto", width: 160, height: "fit-content", overflow: "hidden", borderRadius: "8px" }}>
          <img
            src={result.poster_path ? `https://image.tmdb.org/t/p/w154${result.poster_path}` : "/error.svg"}
            alt={result.title || "Movie Poster"}
            className="poster mx-auto hover:scale-105 transform transition ease-in-out duration-300"
            style={{ width: "100%", height:"240px", objectFit: "cover", borderRadius: "8px" }}
          />
        </Box>
        <Box className="text mx-auto" sx={{ width: "10rem", textAlign: "center", color: "white", mt: 1 }}>
          <Typography variant="h6" sx={{ fontSize: "1rem" }} noWrap>
            {(result.title || result.original_name)}
          </Typography>
          {result.release_date && (
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Released: {result.release_date.slice(0, 4)}
            </Typography>
          )}
        </Box>
      </Link>
    </Box>
  );
};

MovieCard.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.number.isRequired,
    media_type: PropTypes.string,
    title: PropTypes.string,
    original_name: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
  type: PropTypes.string,
};

export default MovieCard;
