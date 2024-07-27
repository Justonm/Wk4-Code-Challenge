document.addEventListener('DOMContentLoaded', () => {
    const filmList = document.getElementById('films');
    const movieDetails = {
        poster: document.getElementById('poster'),
        title: document.getElementById('title'),
        runtime: document.getElementById('runtime'),
        showtime: document.getElementById('showtime'),
        availableTickets: document.getElementById('available-tickets'),
        description: document.getElementById('description'),
        buyTicketButton: document.getElementById('buy-ticket')
    };
    let currentMovie = {};

    // Fetch and display the list of films
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(films => {
            filmList.innerHTML = ''; // Clear placeholder
            films.forEach(film => {
                const filmItem = document.createElement('li');
                filmItem.textContent = film.title;
                filmItem.classList.add('film-item');
                if (film.capacity - film.tickets_sold <= 0) {
                    filmItem.classList.add('sold-out');
                }
                filmItem.addEventListener('click', () => displayMovieDetails(film));
                filmList.appendChild(filmItem);
            });

            // Display the first movie's details by default
            if (films.length > 0) {
                displayMovieDetails(films[0]);
            }
        });

    // Display movie details
    function displayMovieDetails(film) {
        currentMovie = film;
        movieDetails.poster.src = film.poster;
        movieDetails.title.textContent = film.title;
        movieDetails.runtime.textContent = `Runtime: ${film.runtime} minutes`;
        movieDetails.showtime.textContent = `Showtime: ${film.showtime}`;
        const availableTickets = film.capacity - film.tickets_sold;
        movieDetails.availableTickets.textContent = `Available Tickets: ${availableTickets}`;
        movieDetails.description.textContent = film.description;
        movieDetails.buyTicketButton.textContent = availableTickets > 0 ? 'Buy Ticket' : 'Sold Out';
        movieDetails.buyTicketButton.disabled = availableTickets <= 0;
    }

    // Handle ticket purchase
    movieDetails.buyTicketButton.addEventListener('click', () => {
        if (currentMovie.capacity - currentMovie.tickets_sold > 0) {
            currentMovie.tickets_sold++;
            displayMovieDetails(currentMovie);
        }
    });
});