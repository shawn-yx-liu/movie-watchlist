searchForm = document.getElementById("search-form")
searchInput = document.getElementById("search-input")
movieListEl = document.getElementById("movie-list")

let movieList = []
let watchlist = JSON.parse(localStorage.getItem('watchlist')) ?? []

searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(searchInput.value)
    fetch(`https://www.omdbapi.com/?apikey=306279c6&s=${searchInput.value}&type=movie`)
        .then(response => response.json())
        .then(data => updateMovieList(data.Search))
})

movieListEl.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        // add the clicked movie to the watchlist and update the icon
        const clickedIcon = document.querySelector(`img[data-id=${e.target.dataset.id}`)
        const idx = watchlist.findIndex(movie => movie.imdbID === e.target.dataset.id)

        if (idx === -1) {
            watchlist.push(movieList.find(movie => movie.imdbID === e.target.dataset.id))
            clickedIcon.src = "images/remove-icon.png"
        } else {
            watchlist.splice(idx, 1)
            clickedIcon.src = "images/add-icon.png"
        }

        localStorage.setItem('watchlist', JSON.stringify(watchlist))
    }
    console.log(e.target.dataset.id)
})

function updateMovieList(movies){
    if (!movies){
        movieListEl.innerHTML = `<h2 class="default-text">Unable to find what you're looking for. Please try another search.</h2>`
        return
    }
    
    movieList = []
    movieListEl.innerHTML = ""
    movies.forEach(movie => {
        getMovieDetails(movie.imdbID).then(details => {
            if (details.Poster === "N/A" || details.imdbRating === "N/A" || details.Runtimee === "N/A" || details.Genre === "N/A" || details.Plot === "N/A") 
            {
                return
            }
            movieList.push(details)

            // set the add or remove icon
            const idx = watchlist.findIndex(movie => movie.imdbID === details.imdbID)
            let iconSrc = idx > -1 ? "images/remove-icon.png" : "images/add-icon.png"
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
                        <div class="add-watchlist" data-id="${details.imdbID}">
                            <img class="icon" src=${iconSrc} data-id="${details.imdbID}">
                            <p data-id="${details.imdbID}">Watchlist</p>
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