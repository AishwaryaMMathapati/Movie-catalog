import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_SIZES } from '../../services/api';

const FeaturedMovie = ({ movie }) => {
  const {
    id,
    title,
    backdrop_path,
    poster_path,
    overview,
    vote_average,
    release_date
  } = movie;
  
  const backdropUrl = backdrop_path 
    ? `${IMAGE_SIZES.backdrop.large}${backdrop_path}`
    : poster_path 
      ? `${IMAGE_SIZES.poster.large}${poster_path}`
      : '/img/no-backdrop.jpg';
  
  // Truncate overview for featured movie display
  const truncatedOverview = overview && overview.length > 200 
    ? `${overview.substring(0, 200)}...` 
    : overview;
  
  const releaseYear = release_date ? new Date(release_date).getFullYear() : '';
  
  return (
    <div className="featured-movie mb-5">
      <div className="featured-movie__backdrop" style={{ backgroundImage: `url(${backdropUrl})` }}>
        <div className="featured-movie__overlay">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-8 featured-movie__content">
                <h2 className="featured-movie__title">{title}</h2>
                
                <div className="featured-movie__meta">
                  {releaseYear && <span className="featured-movie__year">{releaseYear}</span>}
                  {vote_average && (
                    <span className="featured-movie__rating">
                      <i className="bi bi-star-fill"></i> {vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
                
                <p className="featured-movie__overview">{truncatedOverview}</p>
                
                <div className="featured-movie__actions">
                  <Link to={`/movie/${id}`} className="btn btn-primary me-2">
                    <i className="bi bi-info-circle-fill me-2"></i> Details
                  </Link>
                  <button className="btn btn-outline-light">
                    <i className="bi bi-plus-circle me-2"></i> Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;