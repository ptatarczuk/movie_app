const mongoose = require('mongoose')
const { model, Schema } = mongoose;

const movieSchema = new Schema({
    id: Number,
    title: String,
    year: Number,
    runtime: Number,
    genres: [String],
    director: String,
    actors: [String],
    plot: String,
    url: String,
})

const Movie = model('Movie', movieSchema);

module.exports = Movie;