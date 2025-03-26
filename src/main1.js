document.addEventListener("DOMContentLoaded", async function () {
    const searchResults = document.getElementById("searchResults");
    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const movieBtn = document.querySelector(".movie-results");
    const tvBtn = document.querySelector(".tv-results");
    const bothBtn = document.querySelector(".all-results");
    const apiKey = "5bf4d6fe"; // OMDb API key
    const apiUrl = "http://www.omdbapi.com/";
    let currentType = "movie"; // Default type
    let currentPage = 1;
    let currentQuery = "Avengers"; // Default query
    let loading = false;

    // Initial fetch
    await fetchMovies(currentQuery, currentType, currentPage);

    async function fetchMovies(query, type, page) {
        if (loading) return;
        loading = true;
        try {
            const typeParam = type === "both" ? "" : `&type=${type}`;
            const response = await fetch(`${apiUrl}?apikey=${apiKey}&s=${encodeURIComponent(query)}${typeParam}&page=${page}`);
            const data = await response.json();

            if (data.Response === "False") {
                if (page === 1) {
                    searchResults.innerHTML = "<p class='text-warning'>No movies or TV shows found.</p>";
                }
                loading = false;
                return;
            }

            displayMovies(data.Search);
        } catch (error) {
            console.error("Error fetching movies:", error);
            if (page === 1) {
                searchResults.innerHTML = "<p class='text-danger'>Failed to fetch movies. Try again later.</p>";
            }
            loading = false;
        }
    }

    function displayMovies(movies) {
        if (currentPage === 1) {
            searchResults.innerHTML = "";
            searchResults.classList.add("fullscreen-grid");
        }

        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            movieCard.innerHTML = `
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}" class="movie-poster" alt="${movie.Title}">
                <h5 class="movie-title">${movie.Title} (${movie.Year})</h5>
            `;

            movieCard.addEventListener("click", async function () {
                await showMovieDetails(movie.imdbID);
            });

            searchResults.appendChild(movieCard);
        });
        loading = false;
    }

    async function showMovieDetails(imdbID) {
        try {
            const response = await fetch(`${apiUrl}?apikey=${apiKey}&i=${imdbID}`);
            const movie = await response.json();

            alert(`Title: ${movie.Title}\nYear: ${movie.Year}\nGenre: ${movie.Genre}\nPlot: ${movie.Plot}`);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }

    // Handle search form submission
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            currentQuery = query;
            currentPage = 1;
            fetchMovies(currentQuery, currentType, currentPage);
        }
    });

    // Event listeners for category buttons
    movieBtn.addEventListener("click", function () {
        currentType = "movie";
        currentQuery = "Avengers";
        currentPage = 1;
        fetchMovies(currentQuery, currentType, currentPage);
        setActiveButton(movieBtn);
    });

    tvBtn.addEventListener("click", function () {
        currentType = "series";
        currentQuery = "Breaking Bad";
        currentPage = 1;
        fetchMovies(currentQuery, currentType, currentPage);
        setActiveButton(tvBtn);
    });

    bothBtn.addEventListener("click", function () {
        currentType = "both";
        currentQuery = "Batman";
        currentPage = 1;
        fetchMovies(currentQuery, currentType, currentPage);
        setActiveButton(bothBtn);
    });

    function setActiveButton(activeButton) {
        document.querySelectorAll(".result-btn").forEach(btn => btn.classList.remove("active"));
        activeButton.classList.add("active");
    }

    // Infinite scroll handling
    window.addEventListener("scroll", function () {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 200 && !loading) {
            currentPage++;
            fetchMovies(currentQuery, currentType, currentPage);
        }
    });
});