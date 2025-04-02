import React, { useContext } from 'react';
import FeaturedMovie from '../components/movies/FeaturedMovie';
import MovieGrid from '../components/movies/MovieGrid';
import Loader from '../components/common/Loader';
import { MovieContext } from '../context/MovieContext';

const HomePage = () => {
  const { movies, featuredMovie, loading, error } = useContext(MovieContext);

  if (loading && !movies.length) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5">
        {error}
      </div>
    );
  }

  return (
    <div className="home-page">
      {featuredMovie && <FeaturedMovie movie={featuredMovie} />}
      <h2 className="section-title my-4">
        {movies.length ? 'Discover Movies' : 'No movies found'}
      </h2>
      <MovieGrid movies={movies} />
    </div>
  );
};

export default HomePage;