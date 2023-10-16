const Comment = require('../models/Comment')
const handleError = require('../error')

const addComment = async function (req, res) {
    try {
        const { movieTitle, userName, comment } = req.body;
        let movie = await Comment.findOne({ title: movieTitle })
        movie ? await movie.comments.push({ userName, comment }) : movie = await new Comment({ title: movieTitle, comments: [{ userName, comment }] })
        await movie.save()
        await res.json(movie)
    } catch (error) {
        handleError(error, res)
    }
}

const getComments = async function (req, res) {
    try {
        const movie = await Comment.findOne({ title: req.params.title });
        movie ? res.json(movie.comments) : res.json([])
    }
    catch (error) {
        handleError(error, res)
    }
}

module.exports = {
    addComment,
    getComments
}
