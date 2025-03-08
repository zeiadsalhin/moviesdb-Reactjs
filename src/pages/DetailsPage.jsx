import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Grid, Rating } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from '@mui/icons-material/Add';
import StarIcon from "@mui/icons-material/Star";
import Trailers from "../components/Trailers"
import Cast from "../components/Cast";
import Reviews from "../components/Reviews";
import SimilarMedia from "../components/SimilarMedia";
import ErrorComponent from "../components/ErrorShow";
import CustomButton from "../components/useCustomButton";
import { useMediaQuery } from "@mui/material"

const DetailsPage = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rating, setRating] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const isMobile = useMediaQuery("(max-width: 899px)");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: 'application/json',
              Authorization: import.meta.env.VITE_API_KEY
          }
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setData(result);
        setRating((result.vote_average / 2).toFixed(1));

        document.title = `${(result?.title || result?.name) } (${((result?.release_date || result.first_air_date)?.slice(0, 4))}) | The Movies`;

      } catch (error) {
        console.error("Error fetching details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <ErrorComponent message="Oops! 🎬 The item you are looking for is not found" />;

  return (
    <> 
      {/* Banner Section */}
      <Box sx={{ position: "relative", height: { xs: "60vh", md: "70vh" }, background: "#000", color: "#fff", overflow: "hidden" }}>
        {/* Preload Image */}
        <img
          src={`https://image.tmdb.org/t/p/${isMobile ? 'w1280' : 'original'}${data.backdrop_path}`}
          alt="Movie Background"
          onLoad={() => setTimeout(() => {setImageLoaded(true)},100)}
          style={{ display: "none" }}
        />

        {/* Parallax Background with Gradient */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: imageLoaded
              ? `linear-gradient(to right, rgba(0, 0, 0, 0.9)10%, rgba(0, 0, 0, 0)60%),
                 linear-gradient(to top, black 5% , transparent 50%),
                 url(https://image.tmdb.org/t/p/${isMobile ? 'w1280' : 'original'}${data.backdrop_path})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        />

        {/* Movie Info */}
        <Box sx={{ position: "absolute", inset: 10, display: "flex", alignItems: "center", px: { xs: 2, md: 12 }, zIndex: 1 }}>
          <Box sx={{ maxWidth: "600px", borderRadius: 2 }}>
              <Typography sx={{ typography: { xs: "h4", md: "h3" }, fontWeight: { xs: 500, md: 700 }, mt: 0 }}>
                {data.title || data.name}
              </Typography>
            
            <Grid container direction={{ xs: "column", md: "row" }} alignItems="left" spacing={0} sx={{ mt: {xs: 1, md: 2}, opacity: 0.9 }}>
              
              <Grid item>
                    <Rating value={Number(rating)} readOnly />
              </Grid>

              <Grid container spacing={1} direction={{ xs: "column", md: "row" }}>
              
              {data.popularity && (
                <Grid item>
                  <Typography variant="body1">{Number(data.popularity?.toFixed()).toLocaleString()} Reviews</Typography>
                </Grid>
              )}
              
              {!isMobile && data.vote_count > 0 && (
              <Grid item sx={{marginBlock: "auto", height: "90%"}} >
              •
              </Grid>
              )}
              
              {data.vote_count > 0 && (
              <Grid item>
                <Typography variant="body1">{data.vote_count?.toLocaleString()} Votes</Typography>
              </Grid>
              )}
              {!isMobile && data.release_date && (
              <Grid item sx={{marginBlock: "auto", height: "90%"}}>
              •
              </Grid>
              )}
              
              <Grid item>
                <Typography variant="body1" fontWeight="bold">{data.release_date?.slice(0, 4)}</Typography>
              </Grid>
              
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9, display: { xs: "none", md: "block" } }}>
              {data.overview ? data.overview.slice(0, 300) + "..." : "No overview available."}
            </Typography>
            
            {/* Watch Now and save Buttons */}
             <Box sx={{display: "flex", gap:2, mt: {xs: 2, md: 3}}}>
             <CustomButton
              text="Watch"
              component={CustomButton}
              size={isMobile ? "small" : "medium"}
              color="error"
              icon={<PlayArrowIcon />}
              href={data.homepage
                ? data.homepage
                : `https://yts.mx/movies/${data.title?.toLowerCase().replace(/ /g, "-") + "-" + data.release_date?.slice(0, 4)}`
            }
              target="_blank"
              rel="noopener noreferrer"
              sx={{textTransform: "uppercase", gap: 0}}
            />

            <CustomButton
              text={isSaved ? "Saved" : "Save"}
              size={isMobile ? "small" : "medium"}
              color="secondary"
              variant="outlined"
              icon={isSaved ? <BookmarkIcon /> : <AddIcon />}
              sx={{textTransform: "uppercase", gap: 0}}
            />
            </Box>
          </Box>
        </Box>
      </Box>

      <Typography sx={{ mt: 4, opacity: 0.8, textAlign:"center", fontSize: "2rem", fontWeight: 700 }}>
        About
      </Typography>

      <div className="h-1 w-[2rem] rounded-2xl bg-gray-200 opacity-30 mx-auto my-2"></div>

      {/* Movie/TV Details */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, m:3, py: 2, px: { xs: 0, md: 10 }, alignItems: "center" }}>
        {/* Poster Image */}
        <Box sx={{ width: { xs: "100%", md: "23rem" } }}>
          <img
            src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "/error.svg"}
            alt={data.title || data.name}
            style={{ width: "100%",minHeight: "30rem", marginInline:"auto", borderRadius: "8px" }}
          />
        </Box>

        {/* Info Section */}
        <Box sx={{ flex: 1, textAlign: { xs: "left", md: "left" } }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
            {data.title || data.name}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Storyline
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, mb: 5 }}>
            {data.overview || "No overview available."}
          </Typography>

          {/* Watch Now and save Buttons */}
             <Box sx={{display: "flex", flexDirection: {xs: 'column', md: 'row'}, gap: 2, mt: 2}}>
             <CustomButton
              text="Watch"
              color="error"
              size={isMobile ? "large" : "medium"}
              icon={<PlayArrowIcon />}
              href={data.homepage
                ? data.homepage
                : `https://yts.mx/movies/${data.title?.toLowerCase().replace(/ /g, "-") + "-" + data.release_date?.slice(0, 4)}`
              }
              target="_blank"
              rel="noopener noreferrer"
              sx={{gap: 0}}
            />

            <CustomButton
              text={isSaved ? "Saved" : "Save"}
              color="secondary"
              size={isMobile ? "large" : "medium"}
              variant="outlined"
              icon={isSaved ? <BookmarkIcon /> : <AddIcon />}
              sx={{gap: 0}}
            />
            </Box>

          <div className="h-1 w-[10rem] rounded-2xl bg-gray-200 opacity-15 mx-auto my-8"></div>

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Genres: <span style={{ opacity: 0.7, fontWeight: 500 }}>{data.genres?.map((genre) => genre.name).join(", ") || "N/A"}</span>
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
            Release Date:{" "}
            <span style={{ opacity: 0.7, fontWeight: 500 }}>
              {data.release_date
                ? new Date(data.release_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                : data.first_air_date
                ? new Date(data.first_air_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                : "N/A"}
            </span>
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
            Rating: <span style={{ opacity: 0.7, fontWeight: 500 }}>{data.vote_average ? `${(data.vote_average).toFixed(1)}` : "N/A"}</span>
            <StarIcon sx={{ fontSize: 18, color: "#FFD700", ml: 0.5, mb: 0.5 }} />
          </Typography>

          {/* Additional Details */}
          {type === "movie" && (
            <>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Duration:{" "}
                <span style={{ opacity: 0.7, fontWeight: 500 }}>
                  {data.runtime
                    ? `${Math.floor(data.runtime / 60)}h${data.runtime % 60 ? ` ${data.runtime % 60}m` : ""}`
                    : "N/A"}
                </span>
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Budget: <span style={{ opacity: 0.7, fontWeight: 500  }}>{data.budget ? `$${data.budget.toLocaleString()}` : "N/A"}</span>
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Revenue: <span style={{ opacity: 0.7, fontWeight: 500 }}>{data.revenue ? `$${data.revenue.toLocaleString()}` : "N/A"}</span>
              </Typography>
            </>
          )}

          {type === "tv" && (
            <>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Seasons: <span style={{ opacity: 0.7, fontWeight: 500  }}>{data.number_of_seasons || "N/A"}</span>
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Total Episodes: <span style={{ opacity: 0.7, fontWeight: 500  }}>{data.number_of_episodes || "N/A"}</span>
              </Typography>
            </>
          )}

          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
            Language: <span style={{ opacity: 0.7, fontWeight: 500  }}>{data.original_language?.toUpperCase() || "N/A"}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
            Production: <span style={{ opacity: 0.7, fontWeight: 500  }}>{data.production_companies?.map((p) => p.name).join(", ") || "N/A"}</span>
          </Typography>  
        </Box>
      </Box> 
      <Box sx={{display: "flex", flexDirection: "column", gap: {xs: 5, md: 8}, px: { xs: 2, md: 12 }, pb: 8, pt: 5}}>
      <Trailers id={data.id} type={type}  /> 
      <Cast id={data.id} type={type} display={isMobile}  />
      <Reviews mediaId={data.id} mediaType={type} />
      <SimilarMedia mediaId={data.id} mediaType={type}  />
      </Box>
    </>
  );
};

export default DetailsPage;
