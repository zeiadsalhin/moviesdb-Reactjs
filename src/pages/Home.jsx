import { useEffect } from "react";
import Banner from "../components/Banner";
import MediaList from "../components/MediaList";

const Home = () => {

  useEffect(()=> {
    document.title = 'The Movies - Home';
  },[])

  return (
    <>
      {/* Banner Section */}
      <Banner />
      
      <div className="pb-20 md:px-8 md:max-w-[120rem] mx-auto">
      {/* Movies and TV Shows Sections */}
      <MediaList
        title="Latest Movies"
        apiEndpoint="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
        viewAllRoute="/all/latest/movie"
        mediaType="movie"
      />

      <MediaList
        title="Latest TV Shows"
        apiEndpoint="https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1"
        viewAllRoute="/all/latest/tv"
        mediaType="tv"
      />

      <MediaList
        title="Trending Movies"
        apiEndpoint="https://api.themoviedb.org/3/trending/movie/week?language=en-US"
        viewAllRoute="/all/trending/movie"
        mediaType="movie"
      />

      <MediaList
        title="Trending TV Shows"
        apiEndpoint="https://api.themoviedb.org/3/trending/tv/week?language=en-US"
        viewAllRoute="/all/trending/tv"
        mediaType="tv"
      />
    </div>
    </>
  );
};

export default Home;
