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
    document.title = 'The Movies - Search Movies & TV Shows';

    if (window.pageYOffset === 0) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => searchRef.current.focus(), 500);
    }
    
    const handleScroll = () => {
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 40 && !loading && search !== "") {
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

  const fetchResults = async () => {
    setResults([]);
    setCurrentPage(1);
    await loadMoreResults();
  };

  const loadMoreResults = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=${currentPage}`,
        {
          method: "GET",
          headers: { accept: "application/json", Authorization: import.meta.env.VITE_API_KEY },
        }
      );
      const data = await response.json();
  
      setResults((prevResults) => {
        // Create a Set of existing IDs
        const existingIds = new Set(prevResults.map((movie) => movie.id));
  
        // Filter out duplicates
        const newResults = data.results.filter((movie) => !existingIds.has(movie.id));
  
        return [...prevResults, ...newResults];
      });
  
      setCurrentPage((prevPage) => prevPage + 1);
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
      fetchResults();
    }, 500);
  };

  return (
    <Box className="main mt-4a mb-10 h-fit" sx={{paddingY: '4rem'}}>
      {/* Search Bar */}
      <Box
        className="search-bar w-11/12 mx-auto"
        sx={{
          position: "sticky",
          top: 60,
          zIndex: 1000,
          boxShadow: "8px 0px 10px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "1rem"
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

      {/* Movie List */}
      {results.length > 0 ? (
        <Box className="movie-list flex justify-center">
          <Box className="movie-row p-1" display="flex" flexWrap="wrap" justifyContent="center" sx={{gap:3}}>
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
        <Box display="flex" justifyContent="center" sx={{ height: "20vh" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Search;
