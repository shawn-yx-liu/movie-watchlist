// example query: https://www.omdbapi.com/?apikey=306279c6&s=blade&type=movie
// http://www.omdbapi.com/?t=Blade+Runner

searchForm = document.getElementById("search-form")
searchInput = document.getElementById("search-input")
movieListEl = document.getElementById("movie-list")

searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(searchInput.value)
    fetch(`https://www.omdbapi.com/?apikey=306279c6&s=${searchInput.value}&type=movie`)
        .then(response => response.json())
        .then(data => updateMovieList(data.Search))
})

function updateMovieList(movies){
    if (!movies){
        movieListEl.innerHTML = `<h2 class="default-text">Unable to find what you're looking for. Please try another search.</h2>`
        return
    }
    
    movieListEl.innerHTML = ""
    movies.forEach(movie => {
        getMovieDetails(movie.imdbID).then(details => {
            if (details.Poster === "N/A" || details.imdbRating === "N/A" || details.Runtimee === "N/A" || details.Genre === "N/A" || details.Plot === "N/A") 
            {
                return
            }
            movieListEl.innerHTML += `
            <div class="movie" id="movie">
                <img class="poster" src="${details.Poster}">
                <div class="movie-info" id="movie-info">
                    <div class="movie-info-header" id="movie-info-header">
                        <h2>${details.Title}</h2>
                        <img class="icon" src="images/star-icon.png">
                        <p>${details.imdbRating}</p>
                    </div>
                    <div class="movie-info-secondary">
                        <p>${details.Runtime}</p>
                        <p>${details.Genre}</p>
                        <div class="add-watchlist">
                            <img class="icon" src="images/add-icon.png">
                            <p>Watchlist</p>
                        </div>
                    </div>
                    <p class="description">${details.Plot}</p>
                </div>
            </div>
            `
        })
    })
}

function getMovieDetails(imdbID) {
    return fetch(`https://www.omdbapi.com/?apikey=306279c6&i=${imdbID}`)
        .then(response => response.json())
        .then(data => {return data})
}