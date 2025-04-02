import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieModal from './MovieModal';
import { formatDate } from '../../utils/formatters';
import { IMAGE_SIZES } from '../../services/api';

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  
  // Format movie data
  const {
    id,
    title,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    overview
  } = movie;
  
  const posterUrl = poster_path 
    ? `${IMAGE_SIZES.poster.medium}${poster_path}`
    : '/img/no-poster.jpg';
    
  const backdropUrl = backdrop_path
    ? `${IMAGE_SIZES.backdrop.medium}${backdrop_path}`
    : posterUrl;
    
  const rating = vote_average ? vote_average.toFixed(1) : '?';
  
  // Truncate overview
  const truncatedOverview = overview && overview.length > 150 
    ? `${overview.substring(0, 150)}...` 
    : overview || 'No description available.';
  
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div 
          className="card"
          onClick={() => setShowModal(true)}
        >
          <img src={posterUrl} className="card__img" alt={title} />
          <div className="card__overlay">
            <div className="card__title">{title}</div>
            <div className="card__rating">Rating: {rating}/10</div>
            <div className="card__runtime">Released: {formatDate(release_date)}</div>
            <div className="card__description">{truncatedOverview}</div>
          </div>
        </div>
      </div>
      
      {showModal && (
        <MovieModal
          movie={movie}
          backdropUrl={backdropUrl}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default MovieCard;