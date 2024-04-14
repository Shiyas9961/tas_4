// Function to fetch movies from TMDb API
async function fetchMoviesFromTMDB() {
    const apiKey = '2237c92b8b6c862f6bc261ba24b7fe48'; // Replace 'YOUR_API_KEY' with your actual TMDb API key
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch movies from TMDB');
        }
        const data = await response.json();
        return data.results; // Return only the results array containing movie data
    } catch (error) {
        console.error('Error fetching movies from TMDB:', error);
        return [];
    }
}

// Function to populate the movie list with fetched movies from TMDB
async function populateMoviesFromTMDB() {
    const movieList = document.querySelector('.movie-list');
    const moviesData = await fetchMoviesFromTMDB();
    moviesData.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie');
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.title}</p>
        `;
        movieList.appendChild(movieItem);
    });
}

// Call the function to populate movies from TMDB when the page loads
window.onload = populateMoviesFromTMDB;
