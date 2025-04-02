import React, { useEffect } from 'react';
import { formatDate } from '../../utils/formatters';

const MovieModal = ({ movie, backdropUrl, onClose }) => {
  const {
    title,
    release_date,
    vote_average,
    overview,
    genres
  } = movie;
  
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Handle escape key press
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  
  // Handle click outside modal content
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };
  
  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        <button className="close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <img src={backdropUrl} alt={title} />
          <div className="modal-title-container">
            <h2 className="modal-title">{title}</h2>
          </div>
        </div>
        
        <div className="modal-body">
          <p className="modal-release-date">
            Release Date: {formatDate(release_date)} | Rating: {vote_average ? vote_average.toFixed(1) : '?'}/10
          </p>
          
          {genres && genres.length > 0 && (
            <div className="modal-genres mb-3">
              {genres.map(genre => (
                <span key={genre.id} className="badge bg-secondary me-2">{genre.name}</span>
              ))}
            </div>
          )}
          
          <p className="modal-overview">{overview || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;