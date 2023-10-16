const Movie = require("../models/Movie");
const handleError = require("../error");

const getMovies = async function (req, res) {
    try {
            const movies = await Movie.find();
            res.json(movies);
    } catch (error) {
        handleError(error, res);
    }
};

const getChosenMovies = async function (req, res) {
    try {
            const movies = await Movie.find({ _id: req.body.movieIds });
            res.json(movies);
    } catch (error) {
        handleError(error, res);
    }
};

const getMovie = async function (req, res) {
    try {
        const movie = await Movie.findOne({ _id: req.params.id });
        res.json(movie);
    } catch (error) {
        handleError(error, res);
    }
};

async function getPosters(movies) {
    try {
        movies.forEach(async (movie) => {
            const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=c2602b91&t=${movie.title}`);
            const film = await response.json();
            updateMovie(movie._id, film);
        });
    } catch (error) {
        console.error(error);
    }
}

async function updateMovie(id, film) {
    try {
        const movie = await Movie.findOneAndUpdate({ _id: id }, { url: film.Poster });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getMovies, getMovie, getChosenMovies, updateMovie };
