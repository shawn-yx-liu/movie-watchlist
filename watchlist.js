const movieListEl = document.getElementById('movie-list')
let watchlist = JSON.parse(localStorage.getItem('watchlist'))

movieListEl.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        // add the clicked movie to the watchlist and flip the icon
        const idx = watchlist.findIndex(movie => movie.imdbID.toString() === e.target.dataset.id.toString())
        watchlist.splice(idx, 1)
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
        renderMovieList()
    }

    if (e.target.dataset.nav) {
        window.location.href = "index.html"
    }
})

function renderMovieList() {
    if (!watchlist || watchlist.length === 0) {
        movieListEl.innerHTML = `
        <h2 class="default-text">Your watchlist is looking a little empty...</h2>
        <div class="add-watchlist" data-nav="true">
            <img class="icon" src="images/add-icon.png" data-nav="true">
            <p data-nav="true">Let's add some more movies!</p>
        </div>
        `
    } else {
        let innerHtml = ''
        watchlist.forEach(details => {
            innerHtml += `
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
                        <div class="add-watchlist" data-id="${details.imdbID}">
                            <img class="icon" src="images/remove-icon.png" data-id="${details.imdbID}">
                            <p data-id="${details.imdbID}">Watchlist</p>
                        </div>
                    </div>
                    <p class="description">${details.Plot}</p>
                </div>
            </div>
            `
        })
        movieListEl.innerHTML = innerHtml
    }
}

renderMovieList()