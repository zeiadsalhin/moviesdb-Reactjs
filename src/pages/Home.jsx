import { useEffect, lazy, Suspense } from "react";
import Banner from "../components/Banner";
const MediaList = lazy(() => import("../components/MediaList")); // Lazy load MediaList;

// This component is responsible for rendering the home page of the application.
// It includes a banner and sections for latest movies, latest TV shows, trending movies, and trending TV shows.
// The data for these sections is fetched from an external API using the MediaList component.
const Home = () => {
  useEffect(() => {
    document.title = "Home | The Movies";
  }, []);

  return (
    <div className="relative bg-black">
      {/* Banner Section */}
      <Banner />

      {/* SVG Gradient Overlay */}
      <svg
        className="absolute w-full h-[12vh] -mt-[12vh] pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <defs>
          <linearGradient id="topGradient" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="black" />
            <stop offset="40%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#topGradient)" />
      </svg>

      <div className="pb-20 md:px-8 md:max-w-[120rem] min-h-[1200px] mx-auto">
        {/* Movies and TV Shows Sections with lazy loaded */}
        <Suspense>
          <MediaList
            title="Latest Movies"
            apiEndpoint="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
            viewAllRoute="/all/latest/movie"
            mediaType="movie"
          />
        </Suspense>

        <Suspense>
          <MediaList
            title="Latest TV Shows"
            apiEndpoint="https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1"
            viewAllRoute="/all/latest/tv"
            mediaType="tv"
          />
        </Suspense>

        <Suspense>
          <MediaList
            title="Trending Movies"
            apiEndpoint="https://api.themoviedb.org/3/trending/movie/week?language=en-US"
            viewAllRoute="/all/trending/movie"
            mediaType="movie"
          />
        </Suspense>

        <Suspense>
          <MediaList
            title="Trending TV Shows"
            apiEndpoint="https://api.themoviedb.org/3/trending/tv/week?language=en-US"
            viewAllRoute="/all/trending/tv"
            mediaType="tv"
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
