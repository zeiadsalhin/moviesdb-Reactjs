import PropTypes from "prop-types";
import * as React from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { ChevronLeft, ChevronRight, Whatshot as WhatshotIcon } from "@mui/icons-material";
import MovieCard from "./movieCard";
import axios from "axios";

const SimilarMedia = ({ mediaType, mediaId }) => {
    const [media, setMedia] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const scrollRef = React.useRef(null);

    React.useEffect(() => {
        const fetchSimilarMedia = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${mediaId}/similar`, {
                    params: {
                        include_adult: false,
                        language: "en-US",
                        page: 1,
                    },
                });

                setMedia(data.results || []);
            } catch (error) {
                console.error("Error fetching similar media:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSimilarMedia();
    }, [mediaType, mediaId]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    if (media.length === 0) {
        return (
            <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
                No similar {mediaType === "movie" ? "movies" : "TV shows"} found.
            </Typography>
        );
    }

    return (
        <Box sx={{ mt: 4, mx: 1 }}>
            <Box display="flex" alignItems="center">
                <WhatshotIcon color="error" sx={{ fontSize: 32, mr: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                    Similar {mediaType === "movie" ? "Movies" : "TV Shows"}
                </Typography>
            </Box>

            <Box position="relative" sx={{ overflow: "hidden", mt: 2 }}>
                <IconButton
                    onClick={() => scroll("left")}
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: "40%",
                        zIndex: 2,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "white",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                        boxShadow: 3,
                    }}
                >
                    <ChevronLeft />
                </IconButton>

                <Box
                    ref={scrollRef}
                    sx={{
                        display: "flex",
                        overflowX: "auto",
                        scrollBehavior: "smooth",
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {media?.map((item) => (
                        <MovieCard key={item.id} result={item} type={mediaType} />
                    ))}
                </Box>

                <IconButton
                    onClick={() => scroll("right")}
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: "40%",
                        zIndex: 2,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "white",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                        boxShadow: 3,
                    }}
                >
                    <ChevronRight />
                </IconButton>
            </Box>
        </Box>
    );
};

SimilarMedia.propTypes = {
    mediaId: PropTypes.number.isRequired,
    mediaType: PropTypes.string.isRequired,
};

export default SimilarMedia;
