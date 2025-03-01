import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WhatshotIcon from '@mui/icons-material/Whatshot'; // Fire Icon 🔥
import CircularProgress from "@mui/material/CircularProgress";

const Favorites = () => {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const scrollContainerRef = React.useRef(null);

  React.useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_API_KEY,
      },
    };

    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
        options
      );
      const data = await response.json();
      setMovies(data.results || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box sx={{ px: 0, scale: 1, padding: '16px' }}>
      
      {/* 🔥 Fire Icon Added Next to Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, mt:10 }}>
        <WhatshotIcon color="error" sx={{ fontSize: 32 }} /> 
        <Typography variant="h5">Theatre Playing Movies</Typography>
      </Box>

      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            left: -10,
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box className='mx-auto min-h-[22rem]'
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth',
            whiteSpace: 'nowrap',
            paddingBottom: 1,
          }}
        >
          {loading ? (
           <div className="flex justify-center items-center w-full">
           <CircularProgress />
         </div> 
          ) : (
            movies.map((movie) => (
              <Card
                key={movie.id}
                sx={{
                  flex: '0 0 auto',
                  width: 180,
                  textAlign: 'center',
                  boxShadow: 3,
                  '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
                }}
              >
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  sx={{ height: 240, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="body2" noWrap>
                    {movie.title}
                  </Typography>
                  <Rating value={Math.random() * (5 - 2) + 2} precision={0.5} size="small" />
                  <Typography variant="caption" display="block">
                    Released: {movie.release_date}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>

        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            right: -10,
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Favorites;
