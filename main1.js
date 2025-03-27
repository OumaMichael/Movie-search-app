document.addEventListener("DOMContentLoaded", async function () {
    const searchResults = document.getElementById("searchResults");
    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const movieBtn = document.querySelector(".movie-results");
    const tvBtn = document.querySelector(".tv-results");
    const bothBtn = document.querySelector(".all-results");
    const apiKey = "5bf4d6fe"; // OMDb API key
    const apiUrl = "http://www.omdbapi.com/";
    let currentType = "series"; // Default type is TV shows
    let loading = false;
    let initialLoadCompleted = false;

    // Fetch and display at least 50 TV shows before any user search
    await fetchInitialMovies("Friends", "series", 5);
    initialLoadCompleted = true;

    async function fetchInitialMovies(query, type, totalPages) {
        searchResults.innerHTML = "<p class='loading-message'>Fetching TV shows...</p>";
        let totalFetched = 0;
        for (let page = 1; page <= totalPages && totalFetched < 50; page++) {
            totalFetched += await fetchMovies(query, type, page);
        }
        document.querySelector(".loading-message")?.remove();
    }

    async function fetchMovies(query, type, page) {
        if (loading) return 0;
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
                return 0;
            }

            displayMovies(data.Search);
            loading = false;
            return data.Search.length;
        } catch (error) {
            console.error("Error fetching movies:", error);
            if (page === 1) {
                searchResults.innerHTML = "<p class='text-danger'>Failed to fetch movies. Try again later.</p>";
            }
            loading = false;
            return 0;
        }
    }

    function displayMovies(movies) {
        if (!searchResults.innerHTML.trim()) {
            searchResults.classList.add("fullscreen-grid");
        }

        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
            const moviePoster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : fallbackImage;

            movieCard.innerHTML = `
                <img src="${moviePoster}" class="movie-poster" alt="${movie.Title}">
                <h5 class="movie-title">${movie.Title} (${movie.Year})</h5>
            `;

            movieCard.addEventListener("click", async function () {
                await showMovieDetails(movie.imdbID);
            });

            searchResults.appendChild(movieCard);
        });
    }

    async function showMovieDetails(imdbID) {
        try {
            const response = await fetch(`${apiUrl}?apikey=${apiKey}&i=${imdbID}`);
            const movie = await response.json();

            let warningMessage = "";
            const adultRatings = ["R", "NC-17", "TV-MA", "18", "18+"];

            if (adultRatings.includes(movie.Rated)) {
                warningMessage = "\n⚠️ WARNING: This movie is rated for adults (18+). Viewer discretion is advised.";
            } else if (!movie.Rated || movie.Rated === "N/A" || movie.Rated === "Not Rated") {
                warningMessage = "\n⚠️ Be careful, the movie may contain explicit content.";
            }

            alert(`Title: ${movie.Title}\nYear: ${movie.Year}\nGenre: ${movie.Genre}\nRated: ${movie.Rated || "Not Available"}\nPlot: ${movie.Plot}${warningMessage}`);
        } catch (error) {
            console.error("Error fetching movie details:", error);
            alert("Failed to fetch movie details. Please try again.");
        }
    }

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!initialLoadCompleted) {
            alert("Please wait for the initial TV shows to load.");
            return;
        }

        const query = searchInput.value.trim();
        if (query === "") {
            alert("Sorry, type something");
            return;
        }
        searchResults.innerHTML = "";
        fetchInitialMovies(query, currentType, 5);
    });

    function setCategory(category, query) {
        if (!initialLoadCompleted) {
            alert("Please wait for the initial TV shows to load.");
            return;
        }
        currentType = category;
        searchResults.innerHTML = "";
        fetchInitialMovies(query, currentType, 5);
        setActiveButton(category === "movie" ? movieBtn : category === "series" ? tvBtn : bothBtn);
    }

    movieBtn.addEventListener("click", () => setCategory("movie", "Avengers"));
    tvBtn.addEventListener("click", () => setCategory("series", "Breaking Bad"));
    bothBtn.addEventListener("click", () => setCategory("both", "Batman"));

    function setActiveButton(activeButton) {
        document.querySelectorAll(".result-btn").forEach(btn => btn.classList.remove("active"));
        activeButton.classList.add("active");
    }
});
