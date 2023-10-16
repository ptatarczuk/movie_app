const mongoose = require('mongoose')
const { model, Schema } = mongoose;

const userCommentSchema = new mongoose.Schema({
    userName: String,
    comment: String
});

const commentSchema = new mongoose.Schema({
    title: String,
    comments: [userCommentSchema]
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;