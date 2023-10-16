const express = require("express");
const router = express.Router();
const usersControllers = require('../controllers/users');

router.post('/', usersControllers.logInUser)
router.get('/', usersControllers.getUsers)
router.patch("/add/:userName", usersControllers.addToWatchlist);
router.patch("/del/:userName", usersControllers.deleteFromWatchlist);
router.get("/:id", usersControllers.getMovieIds);


module.exports = router;
