import PropTypes from "prop-types"
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Rating,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { Link } from "react-router-dom";

const MediaList = ({ title, apiEndpoint, mediaType, viewAllRoute }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_API_KEY,
        },
      });
      const data = await response.json();
      setItems(data.results || []);
    } catch (error) {
      console.error(`Error fetching ${title}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ px: 2, mt: 4 }}>
      {/* Title with Fire Icon */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {["Top Rated Movies", "Trending Movies", "Trending TV Shows", "Top Rated TV Shows"].includes(title) && (
          <WhatshotIcon color="error" sx={{ fontSize: 32, mr: 1 }} />
        )}
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Link to={viewAllRoute} style={{ textDecoration: "none", marginLeft: "auto" }}>
          <Typography variant="body2" sx={{ color: "skyblue", p: 2 }}>
            View All
          </Typography>
        </Link>
      </Box>

      {/* Scrollable List with Buttons */}
      <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: -10,
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#fff",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            minHeight: 330,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            scrollBehavior: "smooth",
            whiteSpace: "nowrap",
            paddingBottom: 1,
          }}
        >
          {loading ? (
            <Box sx={{ width: loading? "100vw" : "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "auto"}}>
            <CircularProgress />
          </Box>
          ) : (
            items.map((item) => (
              <Link
                key={item.id}
                to={`/${mediaType}/info/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    width: 160,
                    textAlign: "center",
                    cursor: "pointer",
                    "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                    alt={item.title || item.name}
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography sx={{ mt: 1, fontSize: 18 }} noWrap>
                    {item.title || item.name}
                  </Typography>

                  {/* Rating & Release Date (except for Upcoming Movies) */}
                  {!['Upcoming Movies'].includes(title) && (
                    <>
                      <Rating value={item.vote_average / 2} precision={0.5} size="small" readOnly />
                      {mediaType !== "tv" && (
                        <Typography variant="caption" display="block">
                          Released: {item.release_date}
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              </Link>
            ))
          )}
        </Box>

        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: -10,
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#fff",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

MediaList.propTypes = {
  title: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
  mediaType: PropTypes.string.isRequired,
  viewAllRoute: PropTypes.string.isRequired
}

export default MediaList;
