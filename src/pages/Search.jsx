import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import MovieCard from "../components/movieCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    document.title = "The Movies - Search Movies & TV Shows";

    const handleScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 40 &&
        !loading &&
        search !== ""
      ) {
        loadMoreResults();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, search]);

  const clearSearch = () => {
    setSearch("");
    setResults([]);
  };

  // Function to fetch search results
  const fetchResults = async (query, page = 1) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`,
        {
          method: "GET",
          headers: { accept: "application/json", Authorization: import.meta.env.VITE_API_KEY },
        }
      );
      const data = await response.json();

      if (page === 1) {
        setResults(data.results || []);
        setCurrentPage(2);

        // **Scroll to top only when a new search starts**
        window.scrollTo({ top: 0, behavior: "auto" });

        // **Ensure input field stays in view on first search**
        setTimeout(() => searchRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
      } else {
        setResults((prevResults) => {
          const existingIds = new Set(prevResults.map((movie) => movie.id));
          const newResults = data.results.filter((movie) => !existingIds.has(movie.id));
          return [...prevResults, ...newResults];
        });
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced input handler
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchResults(value);
    }, 500);
  };

  // Load more results for infinite scroll
  const loadMoreResults = async () => {
    if (loading || !search.trim()) return;
    await fetchResults(search, currentPage);
  };

  return (
    <Box className="main mt-4a mb-10 h-fit" sx={{ paddingY: "4rem" }}>
      {/* Search Bar */}
      <Box
        className="search-bar w-11/12 mx-auto"
        sx={{
          mt: 0,
          mb: 6,  
          position: "sticky",
          top: 60,
          zIndex: 1000,
          boxShadow: "8px 0px 10px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "1rem",
        }}
        ref={searchRef}
      >
        <Box display="flex" alignItems="center" sx={{ backgroundColor: "#27272a", borderRadius: 2, padding: "8px" }}>
          <InputBase
            fullWidth
            placeholder="Search Movies, TV Shows..."
            value={search}
            onChange={handleInputChange}
            sx={{ paddingLeft: 2, paddingY: 0.5, color: "white" }}
          />
          {search.length > 0 && (
            <IconButton onClick={clearSearch}>
              <ClearIcon sx={{ color: "white" }} />
            </IconButton>
          )}
        </Box>

      </Box>
      <Box 
        sx={{ 
          width: "calc(11/12 * 100%)", 
          marginInline: "auto",
          fontSize: { xs: "1rem", md: "1.2rem" },
          fontWeight: 500,
          opacity: 0.7 
        }}
      >
        {results.length > 0 && `${results.length} results found`}
      </Box>


      {/* Movie List */}
      {results.length > 0 ? (
        <Box className="movie-list flex justify-center">
          <Box className="movie-row p-1" display="flex" flexWrap="wrap" justifyContent="center" sx={{ gap: 3, pt: 3, marginInline: {xl: 8} }}>
            {results.map((result) => (
              <MovieCard key={result.id} result={result} />
            ))}
          </Box>
        </Box>
      ) : !loading && search.length > 0 ? ( // Show "No results found" if search is not empty and no results
        <Box className="no-results flex justify-center p-5 opacity-50">
          <h1>No results found</h1>
        </Box>
      ) : (
        !loading && (
          <Box className="tip flex justify-center p-5 opacity-50">
            <h1>Start Searching</h1>
          </Box>
        )
      )}

      {/* Loading Indicator */}
      {loading && (
        <Box display="flex" justifyContent="center" sx={{ mt: 12 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Search;
