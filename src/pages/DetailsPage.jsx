import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Typography, Button, CircularProgress, Grid, Rating } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from '@mui/icons-material/Add';
import Trailers from "../components/Trailers"

const DetailsPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rating, setRating] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

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

  if (error) {
    return (
      <Box sx={{ textAlign: "center", pt: 20 }}>
        <Typography color="error" variant="h6">{error}</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <> 
      {/* Banner Section */}
      <Box sx={{ position: "relative", height: { xs: "50vh", md: "70vh" }, background: "#000", color: "#fff", overflow: "hidden" }}>
        {/* Preload Image */}
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt="Movie Background"
          onLoad={() => setImageLoaded(true)}
          style={{ display: "none" }}
        />

        {/* Parallax Background with Gradient */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: imageLoaded
              ? `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), 
                 linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2)), 
                 url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
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
            <Link to={`/${type}/${data.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <Typography sx={{ typography: { xs: "h4", md: "h3" }, fontWeight: { xs: 600, md: 700 } }}>
                {data.title || data.name}
              </Typography>
            </Link>
            <Grid container direction={{ xs: "column", md: "row" }} alignItems="left" spacing={0.4} sx={{ mt: 2, opacity: 0.9 }}>
              <Grid item>
                    <Rating value={Number(rating)} readOnly size="large" />
              </Grid>
              {data.popularity && (
                <Grid item>
                  <Typography variant="body1">{data.popularity.toFixed()} Reviews</Typography>
                </Grid>
              )}
              <Grid item>
                <Typography variant="body1">{data.vote_count} Votes</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{data.release_date?.slice(0, 4)}</Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.9, display: { xs: "none", md: "block" } }}>
              {data.overview ? data.overview.slice(0, 300) + "..." : "No overview available."}
            </Typography>
            
            {/* Watch Now and save Buttons */}
             <Box sx={{display: "flex", gap:2, mt: 2}}>
             <Button
              variant="contained"
              color="error"
              startIcon={<PlayArrowIcon />}
              href={data.homepage ? data.homepage : `https://yts.mx/movies/${data.title.toLowerCase().replace(/ /g, '-') + '-' + data.release_date.slice(0, 4)}`}
              target="_blank"
              rel="noopener noreferrer"
              >
              <Typography variant="body2" sx={{mt: 0.2}}>Watch</Typography>
            </Button>
            <Button onClick={undefined} startIcon={isSaved ? <BookmarkIcon /> : <AddIcon />} variant="outlined" color="secondary">
            <Typography variant="body2" sx={{mt: 0.2}}>{isSaved ? " Saved" : " Save"}</Typography>
            </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Typography variant="h4" sx={{ mt: 4, opacity: 0.8, textAlign:"center" }}>
        About
      </Typography>

      {/* Movie/TV Details */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, m:3,py:2, alignItems: "center" }}>
        {/* Poster Image */}
        <Box sx={{ width: { xs: "100%", md: "300px" } }}>
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
          <Typography variant="h5" sx={{ fontWeight: "light", mb: 1 }}>
            Storyline
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, mb: 2 }}>
            {data.overview || "No overview available."}
          </Typography>

          {/* Watch Now and save Buttons */}
             <Box sx={{display: "flex", gap:2, mt: 2}}>
             <Button
              variant="contained"
              color="error"
              startIcon={<PlayArrowIcon />}
              href={data.homepage ? data.homepage : `https://yts.mx/movies/${data.title.toLowerCase().replace(/ /g, '-') + '-' + data.release_date.slice(0, 4)}`}
              target="_blank"
              rel="noopener noreferrer"
              >
              <Typography variant="body2" sx={{mt: 0.2}}>Watch</Typography>
            </Button>
            <Button onClick={undefined} startIcon={isSaved ? <BookmarkIcon /> : <AddIcon />} variant="outlined" color="secondary">
            <Typography variant="body2" sx={{mt: 0.2}}>{isSaved ? " Saved" : " Save"}</Typography>
            </Button>
            </Box>

          <div className="h-1 w-[10rem] rounded-2xl bg-gray-800 mx-auto my-8"></div>

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Genres: {data.genres?.map((genre) => genre.name).join(", ") || "N/A"}
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
            Release Date: {data.release_date || data.first_air_date || "N/A"}
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
            Rating: {data.vote_average ? `${data.vote_average}/10` : "N/A"}
          </Typography>

          {/* Additional Details */}
          {type === "movie" && (
            <>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Duration: {data.runtime ? `${data.runtime} min` : "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Budget: {data.budget ? `$${data.budget.toLocaleString()}` : "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Revenue: {data.revenue ? `$${data.revenue.toLocaleString()}` : "N/A"}
              </Typography>
            </>
          )}

          {type === "tv" && (
            <>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Seasons: {data.number_of_seasons || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                Total Episodes: {data.number_of_episodes || "N/A"}
              </Typography>
            </>
          )}

          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
            Language: {data.original_language?.toUpperCase() || "N/A"}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
            Production: {data.production_companies?.map((p) => p.name).join(", ") || "N/A"}
          </Typography>  
        </Box>
      </Box> 
      <Box sx={{px:1}}>
      <Trailers id={data.id} type={type}  /> 
      </Box>
    </>
  );
};

export default DetailsPage;
