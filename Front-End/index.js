const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmE4ODA0YjA4NjAxYjExOGExZjFhZjZhMzgzNGI3NCIsInN1YiI6IjY0OWVmZmM0YzlkYmY5MDEwN2UxZTU0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EV_B46kJXwRaqfcfXunUdvSCCDyyRzkS13QBLwEgXK4'
  }
};

//POPULAR
function fetchMovies(url) {
fetch(url, options)
  .then(response => response.json())
  .then(data => {
    const movielist = data.results;
    const results = document.querySelector('.results');
    results.innerHTML = ''; // Clear previous results
    
    movielist.forEach(item => {
      const name = item.title;
      const poster_path = item.poster_path;
      const imageURL = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image+Available';
      const release_date = item.release_date || 'Unknown';
      const overview = item.overview || 'No description available.';
      const rating = item.vote_average || '?';
      const runtime = item.runtime || '?';

      // Create the movie card
      const card = document.createElement('div');
      card.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4');
      
      // Format overview to avoid JS errors with quotes
      const safeOverview = overview.replace(/'/g, '').replace(/"/g, '');
      
      card.innerHTML = `
        <div class="card">
          <img src="${imageURL}" class="card__img" alt="${name}">
          <div class="card__overlay">
            <div class="card__title">${name}</div>
            <div class="card__rating">Rating: ${rating}/10</div>
            <div class="card__runtime">Released: ${formatDate(release_date)}</div>
            <div class="card__description">${safeOverview.substring(0, 150)}${safeOverview.length > 150 ? '...' : ''}</div>
          </div>
        </div>
      `;
      
      // Add click event
      card.querySelector('.card').addEventListener('click', function() {
        showMovieDetails(name, imageURL, release_date, overview, rating);
      });
      
      results.appendChild(card);
    });
  })
  .catch(err => console.error(err));
}

// Format date nicely
function formatDate(dateString) {
if (!dateString || dateString === 'Unknown') return 'Unknown';

const options = { year: 'numeric', month: 'short', day: 'numeric' };
const date = new Date(dateString);
return date.toLocaleDateString('en-US', options);
}

// Fetch Movies on Page Load
fetchMovies('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc');

// Fetch Movie for Search
function fetchMovie() {
const searchInput = document.getElementById("searchInput");
const searchinput = searchInput.value.trim();

if (searchinput === '') {
  // Shake the input field if empty
  searchInput.classList.add('shake');
  setTimeout(() => searchInput.classList.remove('shake'), 500);
  return;
}

const searchURL = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchinput)}&include_adult=false&language=en-US&page=1`;
fetchMovies(searchURL);
}

// Event listener for search button
document.getElementById("searchButton").addEventListener("click", fetchMovie);

// Event listener for search input (enter key)
document.getElementById("searchInput").addEventListener("keypress", function(event) {
if (event.key === "Enter") {
  fetchMovie();
}
});

// Event listener for the "Now Playing" button
document.getElementById("nowPlayingButton").addEventListener("click", function() {
document.getElementById("nowPlayingButton").classList.add('active');
document.getElementById("topRatedButton").classList.remove('active');
fetchMovies("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1");
});

// Event listener for the "Top Rated" button
document.getElementById("topRatedButton").addEventListener("click", function() {
document.getElementById("topRatedButton").classList.add('active');
document.getElementById("nowPlayingButton").classList.remove('active');
fetchMovies("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1");
});

// Function to show the movie details in a modal
function showMovieDetails(title, image, releaseDate, overview, rating) {
const modal = document.createElement('div');
modal.classList.add('modal');

// Format overview to avoid JS errors with quotes
const safeOverview = overview.replace(/'/g, '').replace(/"/g, '');

modal.innerHTML = `
  <div class="modal-content">
    <button class="close" onclick="closeModal()">&times;</button>
    
    <div class="modal-header">
      <img src="${image}" alt="${title}">
      <div class="modal-title-container">
        <h2 class="modal-title">${title}</h2>
      </div>
    </div>
    
    <div class="modal-body">
      <p class="modal-release-date">Release Date: ${formatDate(releaseDate)} | Rating: ${rating}/10</p>
      <p class="modal-overview">${safeOverview}</p>
    </div>
  </div>
`;

document.body.appendChild(modal);

// Prevent background scrolling
document.body.style.overflow = 'hidden';

// Display with animation
setTimeout(() => {
  modal.style.display = 'flex';
  modal.style.opacity = '1';
}, 10);

// Close modal when clicking outside
modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
}

// Close the modal
function closeModal() {
const modal = document.querySelector('.modal');

// Animate out
modal.style.opacity = '0';

setTimeout(() => {
  document.body.removeChild(modal);
  document.body.style.overflow = 'auto';
}, 300);
}

// Add animation class
const style = document.createElement('style');
style.textContent = `
.shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.modal {
  opacity: 0;
  transition: opacity 0.3s ease;
}
`;
document.head.appendChild(style);