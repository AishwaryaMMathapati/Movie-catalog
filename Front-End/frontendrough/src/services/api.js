// Replace with your own TMDB API key
const API_KEY = 'dba8804b08601b118a1f1af6a3834b74';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// API request options
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

// Image sizes
export const IMAGE_SIZES = {
  poster: {
    small: `${IMAGE_BASE_URL}/w200`,
    medium: `${IMAGE_BASE_URL}/w342`, 
    large: `${IMAGE_BASE_URL}/w500`
  },
  backdrop: {
    small: `${IMAGE_BASE_URL}/w300`,
    medium: `${IMAGE_BASE_URL}/w780`,
    large: `${IMAGE_BASE_URL}/w1280`,
    original: `${IMAGE_BASE_URL}/original`
  }
};

// Fetch popular movies
export const fetchPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, 
    options
  );
  return response.json();
};

// Fetch now playing movies
export const fetchNowPlayingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?language=en-US&page=1`, 
    options
  );
  return response.json();
};

// Fetch top rated movies
export const fetchTopRatedMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?language=en-US&page=1`, 
    options
  );
  return response.json();
};

// Search movies
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, 
    options
  );
  return response.json();
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?language=en-US`, 
    options
  );
  return response.json();
};

// Get movie credits
export const getMovieCredits = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?language=en-US`, 
    options
  );
  return response.json();
};

// Get similar movies
export const getSimilarMovies = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?language=en-US&page=1`, 
    options
  );
  return response.json();
};