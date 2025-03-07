import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Avatar, Button } from "@mui/material";
import DOMPurify from "dompurify";

const Reviews = ({ mediaId, mediaType }) => {
  const [reviews, setReviews] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(3);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${mediaId}/reviews?language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: import.meta.env.VITE_API_KEY,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        if (data.results.length === 0) {
          setError("Not Available");
        } else {
          setReviews((prev) => {
            const existingIds = new Set(prev.map((r) => r.id));
            const newReviews = data.results.filter((r) => !existingIds.has(r.id));
            return [...prev, ...newReviews];
          });
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [mediaId, mediaType]);

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + 4);
  };

  if (error) {
    return (
      <Box sx={{ py: 2, px: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Reviews
        </Typography>
        <Typography color="error" variant="body1" sx={{ textAlign: "center", mt: 4 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3, mx: 1, py: 2}}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Reviews {reviews.length > 0 && `(${reviews.length})`}
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 1 }}>
          {reviews.slice(0, displayedCount).map((review) => {
            const isExpanded = expandedReviews[review.id];
            const isLongText = review.content.length > 300;

            return (
              <Box
                key={review.id}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  textAlign: "left",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={
                      review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
                        : "/error.svg"
                    }
                    alt={review.author}
                    sx={{ width: 45, height: 45 }}
                  />
                  <Box sx={{ alignItems: "center", gap: 0 }}>
                    <Typography>{review.author}</Typography>
                    
                    {/* Dynamic date update */}
                    <Typography variant="caption" color="text.secondary">

                      {review.updated_at && review.updated_at !== review.created_at
                      ? `Updated ${new Date(review.updated_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}`
                      : `Posted ${new Date(review.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}`}

                    </Typography>
                  </Box>
                </Box>

                {review.author_details.rating !== null && (
                  <Typography sx={{ mt: 1, fontWeight: "bold", color: "goldenrod" }}>
                    ⭐ {review.author_details.rating}/10
                  </Typography>
                )}

                {/* handle html tags with safety */}
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    opacity: 0.8,
                    display: isExpanded ? "block" : "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: isExpanded ? "none" : 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      isExpanded
                        ? review.content
                        : review.content.length > 300
                        ? `${review.content.slice(0, 300)}...`
                        : review.content
                    ),
                  }}
                >
                  {/* {review.content} */}
                </Typography>

                {/* see more */}
                {isLongText && (
                  <Button
                    onClick={() => toggleExpand(review.id)}
                    sx={{ textTransform: "none", mt: 1, fontWeight: "bold" }}
                    disableTouchRipple
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </Button>
                )}
              </Box>
            );
          })}
        </Box>
      )}

      {/* Load More Button */}
      {displayedCount < reviews.length && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button onClick={handleLoadMore} sx={{ textTransform: "none", fontWeight: "bold" }} disableTouchRipple>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

Reviews.propTypes = {
  mediaId: PropTypes.number.isRequired,
  mediaType: PropTypes.string.isRequired,
};

export default Reviews;
