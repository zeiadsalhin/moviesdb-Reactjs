import Banner from "../components/Banner";
import MediaList from "../components/MediaList";

const Home = () => {
  return (
    <div className="pb-20">
      {/* Banner Section */}
      <Banner />

      {/* Movies and TV Shows Sections */}
      <MediaList
        title="Latest Movies"
        apiEndpoint="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
        viewAllRoute="/all/latest/movies"
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
        viewAllRoute="/all/trending/movies"
        mediaType="movie"
      />

      <MediaList
        title="Trending TV Shows"
        apiEndpoint="https://api.themoviedb.org/3/trending/tv/week?language=en-US"
        viewAllRoute="/all/trending/tv"
        mediaType="tv"
      />
    </div>
  );
};

export default Home;
