import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MovieCard = ({ result }) => {
  return (
    <Box className="movie-item" sx={{ flexBasis: "14%", height: "fit-content", padding: "8px" }}>
      <Link to={`/info/${result.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Box className="imagecover" sx={{ width: "11rem", height: "fit-content", overflow: "hidden", borderRadius: "8px" }}>
          <img
            src={result.poster_path ? `https://image.tmdb.org/t/p/w342${result.poster_path}` : "/error.svg"}
            alt={result.title || "Movie Poster"}
            className="poster mx-auto hover:scale-105 transform transition ease-in-out duration-300"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Box>
        <Box className="text mx-auto" sx={{ width: "11rem", textAlign: "center", color: "white", mt: 1 }}>
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            {result.title || result.original_name}
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
    title: PropTypes.string,
    original_name: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
