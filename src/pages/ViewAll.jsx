import { useState, useEffect, useRef } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import MovieCard from "../components/movieCard";
import { useParams } from "react-router-dom";

const ViewAll = () => {
  const { category, type } = useParams(); // Get category and type from URL
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  // Define API endpoints based on type (movie/tv) and category
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

  const fetchItems = async () => {
    if (loading || !apiEndpoints[category]) return;
    setLoading(true);
    
    try {
      const response = await fetch(`${apiEndpoints[category]}&page=${page}`, {
        headers: { Authorization: import.meta.env.VITE_API_KEY },
      });
      const data = await response.json();

      if (data.results && Array.isArray(data.results)) {
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

  useEffect(() => {
    document.title = `The Movies - ${category.replace("-", " ").charAt(0).toUpperCase() + category.slice(1) + (type === "movie" ? " Movies" : " TV Shows")}`;

    setItems([]); // Reset items when category changes
    setPage(1);
    fetchItems();
  }, [category, type]);

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

  return (
    <Box sx={{ py: 3 }}>
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, mt: 10 }}>
    <Typography variant="h5" textAlign="center" sx={{ mb: 2, px: 3.5 }}>
      {category.replace("-", " ").charAt(0).toUpperCase() + category.slice(1)} {type === "movie" ? "Movies" : "TV Shows"}
    </Typography>
  </Box>

  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 2,
      px:1
    }}
  >
    {items.map((item) => (
      <MovieCard key={item.id} result={item} type={type} />
    ))}
  </Box>

  <div id="load-more" style={{ height: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
    {loading && <CircularProgress />}
  </div>
</Box>
  );
};

export default ViewAll;
