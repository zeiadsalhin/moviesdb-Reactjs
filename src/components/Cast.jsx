import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import axios from "axios";

const Cast = ({ id, type, display }) => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits`, {
          params: { language: "en-US" }
        });

        setCast(data.cast || []);

        if (data.cast.length === 0) {
          setError("Not Available");
        }
      } catch (error) {
        console.error("Error fetching cast:", error);
        setError("Failed to load cast");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [id, type]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return (
      <Box sx={{ py: 2, px: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Cast
        </Typography>
        <Typography color="error" variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mx: 1, p: 2, bgcolor: "background.default", borderRadius: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0 }}>
        Cast
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : cast.length > 0 ? (
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          {(display || (!display && cast.length > 12)) && (
            <IconButton
              onClick={() => scroll("left")}
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              }}
            >
              <ChevronLeft />
            </IconButton>
          )}

          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              gap: 2,
              pt: 2,
              px: 0.5,
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              scrollBehavior: "smooth",
            }}
          >
            {cast.map((person) => (
              <Box key={person.id} sx={{ textAlign: "center", minWidth: 120, maxWidth: 128 }}>
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w154${person.profile_path}`
                      : "/error.svg"
                  }
                  alt={person.name}
                  style={{
                    width: "100%",
                    maxWidth: "8rem",
                    borderRadius: "8px",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
                  {person.name}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {person.character}
                </Typography>
              </Box>
            ))}
          </Box>

          {(display || (!display && cast.length > 12)) && (
            <IconButton
              onClick={() => scroll("right")}
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              }}
            >
              <ChevronRight />
            </IconButton>
          )}
        </Box>
      ) : (
        <Typography sx={{ textAlign: "center", opacity: 0.7 }}>Cannot find Cast</Typography>
      )}
    </Box>
  );
};

Cast.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  display: PropTypes.bool.isRequired,
};

export default Cast;
