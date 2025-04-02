import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchPopularMovies, fetchNowPlayingMovies, fetchTopRatedMovies, searchMovies } from '../services/api';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('popular');

  const getMovies = useCallback(async (category = 'popular') => {
    setLoading(true);
    setError(null);
    try {
      let data;
      switch (category) {
        case 'now_playing':
          data = await fetchNowPlayingMovies();
          break;
        case 'top_rated':
          data = await fetchTopRatedMovies();
          break;
        case 'popular':
        default:
          data = await fetchPopularMovies();
      }
      
      setMovies(data.results);
      
      // Set a random movie as featured
      if (data.results && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
        setFeaturedMovie(data.results[randomIndex]);
      }
      
      setCurrentCategory(category);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query);
      setMovies(data.results);
      setFeaturedMovie(null);
      setCurrentCategory('search');
    } catch (err) {
      setError('Failed to search movies. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <MovieContext.Provider 
      value={{ 
        movies, 
        featuredMovie, 
        loading, 
        error, 
        currentCategory,
        getMovies,
        handleSearch
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};