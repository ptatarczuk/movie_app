const Login = require('../models/Login')
const handleError = require('../error')
const jwt = require('jsonwebtoken')

const getUsers = async (req, res) => {
    try {
        const data = await Login.find();
        res.json(data);
    } catch (error) {
        handleError(error, res)
    }
}

const logInUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password' })
        }
        const user = await Login.findOne({ username }).select('+password')
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect username or password' })
        }
        const token = jwt.sign({ id: user._id }, process.env.ACCES_TOKEN_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        res.status(200).json({
            status: "success",
            token,
            user,
        })
    } catch (err) {
        handleError(err, res)

    }
}

const addToWatchlist = async function(req, res) {
    try {
        const data = await Login.updateOne({ username: req.params.userName }, { $addToSet: { watchlist: req.body._id } });
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false });
    }
}

const deleteFromWatchlist = async function(req, res) {
    try {
        const data = await Login.updateOne({ username: req.params.userName }, { $pull: { watchlist: req.body._id } });
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false });
    }
}

const getMovieIds = async function(req, res) {
    try {
        const data = await Login.findById(req.params.id);
        res.json(data.watchlist)
    } catch (error) {
        res.status(500).json({ success: false });
    }
}





module.exports = { getUsers, logInUser, addToWatchlist, deleteFromWatchlist, getMovieIds }