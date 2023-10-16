const express = require('express')
const router = express.Router();
const Movie = require('../models/Movie.js')
const moviesControllers = require('../controllers/movies')

router.get("/", moviesControllers.getMovies)
router.post("/", moviesControllers.getChosenMovies)
router.get("/:id", moviesControllers.getMovie )

module.exports = router