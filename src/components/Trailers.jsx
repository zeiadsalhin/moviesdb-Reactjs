import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { Box, Typography, IconButton, Modal } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TrailerPhotos = ({ id, type }) => {
  const [images, setImages] = useState([]);
  const [videoKey, setVideoKey] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/images`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: import.meta.env.VITE_API_KEY,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setImages(data.backdrops || []);

        if(data.backdrops.length == 0) {
          setError('Not Available')
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setError(error.message);
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: import.meta.env.VITE_API_KEY,
            },
          }
        );
        fetchImages();
        const data = await res.json();
        if (data.results.length > 0) {
          setVideoKey(data.results[0].key);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideos();
  }, [id, type]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 200 : 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Trailer & Photos
      </Typography>
        <Typography color="error" variant="body1" sx={{ textAlign: "center", mt: 4}}>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mx: 1, position: "relative", overflow: "hidden" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Trailer & Photos
      </Typography>

      {/* Scrollable Container */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "scroll",
          flexWrap: "nowrap",
          pb: 2,
          "&::-webkit-scrollbar": { display: "none" },
          "&::-webkit-scrollbar-thumb": { display: "none" },
          "&::-webkit-scrollbar-track": { display: "none" },
          gap: 2,
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        {/* Trailer */}
        {videoKey && (
          <Box
            sx={{
              minWidth: { xs: "100%", sm: "50%", md: "50rem" },
              maxWidth: { md: "400px", lg: "800px" },
              aspectRatio: "16/9",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              scrollSnapAlign: "start",
            }}
            onClick={() => setOpenModal(true)}
          >
            <img
              src={`https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`}
              alt="Trailer"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <PlayArrowIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: { xs: 50, sm: 60 },
                color: "white",
                backgroundColor: "rgba(0,0,0,0.5)",
                borderRadius: "50%",
                padding: 1,
              }}
            />
          </Box>
        )}

        {/* Photos */}
        {images.slice(0, 6).map((image, index) => (
          <Box
            key={index}
            sx={{
              minWidth: { xs: "100%", sm: "50%", md: "fit-content" },
              maxWidth: { md: "400px", lg: "600px" },
              aspectRatio: "16/9",
              borderRadius: 2,
              overflow: "hidden",
              scrollSnapAlign: "start",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
              alt="Movie Scene"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons */}
      <IconButton
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
        onClick={() => handleScroll("left")}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
        onClick={() => handleScroll("right")}
      >
        <ChevronRightIcon />
      </IconButton>

      {/* Modal for Trailer */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "70%", md: "60%" },
            bgcolor: "black",
            boxShadow: 24,
            borderRadius: 2,
            outline: "none",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%", // 16:9 aspect ratio
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
            ></iframe>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

TrailerPhotos.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default TrailerPhotos;
