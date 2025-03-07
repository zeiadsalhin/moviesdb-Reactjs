import { useEffect, lazy, Suspense } from "react";
import Banner from "../components/Banner";
const MediaList = lazy(() => import("../components/MediaList")); // Lazy load MediaList;

const Home = () => {

  useEffect(()=> {
    document.title = 'The Movies - Home';
  },[])

  return (
    <>
    <div>
      {/* Banner Section */}
      <Banner />
      
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
    </>
  );
};

export default Home;
