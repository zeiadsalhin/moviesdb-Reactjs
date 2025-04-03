import { useState, useEffect, useRef } from "react";
import { Box, CircularProgress, Typography, MenuItem, Select, FormControl } from "@mui/material";
import MovieCard from "../components/movieCard";
import { useParams } from "react-router-dom";
import axios from "axios";

// Displays a list of movies or TV shows based on the selected category and type.
// Fetches data from the TMDB API and implements infinite scrolling and sorting functionality.
const ViewAll = () => {
  const { category, type } = useParams();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(""); // Default sorting is determined dynamically
  const observer = useRef();

  // **Dynamic API Endpoints based on category and type**
  // The API endpoints are constructed based on the type (movie or tv) and the selected category.
  const apiEndpoints = {
    latest: `https://api.themoviedb.org/3/${type === "movie" ? "movie/now_playing" : "tv/on_the_air"}?language=en-US`,
    trending: `https://api.themoviedb.org/3/trending/${type}/week?language=en-US`,
    upcoming: `https://api.themoviedb.org/3/movie/upcoming?language=en-US`,
    toprated: `https://api.themoviedb.org/3/${type}/top_rated?language=en-US`,
    action: `https://api.themoviedb.org/3/discover/${type}?with_genres=28&language=en-US`,
    adventure: `https://api.themoviedb.org/3/discover/${type}?with_genres=12&language=en-US`,
    crime: `https://api.themoviedb.org/3/discover/${type}?with_genres=80&language=en-US`,
    documentary: `https://api.themoviedb.org/3/discover/${type}?with_genres=99&language=en-US`,
    history: `https://api.themoviedb.org/3/discover/${type}?with_genres=36&language=en-US`,
    horror: `https://api.themoviedb.org/3/discover/${type}?with_genres=27&language=en-US`,
    "sci-fi": `https://api.themoviedb.org/3/discover/${type}?with_genres=878&language=en-US`,
    thriller: `https://api.themoviedb.org/3/discover/${type}?with_genres=53&language=en-US`,
    war: `https://api.themoviedb.org/3/discover/${type}?with_genres=10752&language=en-US`,
  };

  // **Dynamic Fetching Logic**
  // The fetchItems function is responsible for fetching data from the TMDB API based on the selected category and type.
  // It handles pagination and ensures that duplicate items are not added to the state.
  // The function is called when the component mounts and whenever the category or type changes.
  // It also implements infinite scrolling by using the Intersection Observer API to detect when the user has scrolled to the bottom of the page.
  const fetchItems = async () => {
    if (loading || !apiEndpoints[category]) return;
    setLoading(true);

    try {
      const { data } = await axios.get(`${apiEndpoints[category]}&page=${page}`, {
        headers: { Authorization: import.meta.env.VITE_API_KEY },
      });

      if (data.results) {
        setItems((prev) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const newItems = data.results.filter((item) => item.id && !existingIds.has(item.id));
          return [...prev, ...newItems];
        });
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // **Dynamic Title Logic**
  // The document title is updated based on the selected category and type.
  useEffect(() => {
    document.title = `${category.replace("-", " ").charAt(0).toUpperCase() + category.slice(1) + (type === "movie" ? " Movies" : " TV Shows")} | The Movies`;

    setItems([]);
    setPage(1);
    fetchItems();
  }, [category, type]);

  // **Dynamic Infinite Scrolling Logic**
  // The Intersection Observer API is used to detect when the user has scrolled to the bottom of the page.
  useEffect(() => {
    const handleObserver = (entries) => {
      if (entries[0].isIntersecting) fetchItems();
    };

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(handleObserver);
    const target = document.getElementById("load-more");
    if (target) observer.current.observe(target);

    return () => observer.current?.disconnect();
  }, [items]);

  // **Dynamic Sorting Logic**
  const sortedItems = [...items].sort((a, b) => {
    // Default sorting based on category
    if (category === "trending" || category === "toprated") {
      return (b.vote_average || 0) - (a.vote_average || 0); // Sort by rating for trending/top-rated
    }
    return new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date); // Default to release date
  });

  // Apply manual sorting from dropdown if selected
  if (sortBy === "release_date") {
    sortedItems.sort((a, b) => new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date));
  } else if (sortBy === "rating") {
    sortedItems.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
  } else if (sortBy === "name") {
    sortedItems.sort((a, b) => (a.title || a.name || "").localeCompare(b.title || b.name || ""));
  }

  return (
    <Box sx={{ py: 3 }}>
      {/* Title and Sort Dropdown */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: { xs: 2.5, md: 5 }, mb: 2, mt: 10 }}>
        <Typography variant="h5">
          {category.replace("-", " ").charAt(0).toUpperCase() + category.slice(1)} {type === "movie" ? "Movies" : "TV Shows"}
        </Typography>

        <FormControl
          size="small"
          sx={{
            minWidth: 80,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" }, // Outline color white
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        >
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            displayEmpty
            sx={{
              color: "white",
              fontSize: "0.875rem",
            }}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="release_date">Date</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="name">A-Z</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Movies List */}
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2, px: 1 }}>
        {sortedItems.map((item) => (
          <MovieCard key={item.id} result={item} type={type} />
        ))}
      </Box>

      {/* Loading Indicator */}
      <div id="load-more" style={{ height: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {loading && <CircularProgress />}
      </div>
    </Box>
  );
};

export default ViewAll;
