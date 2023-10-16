const express = require('express')
const router = express.Router();
const commentsControllers = require('../controllers/comments')
const authenticationController = require('../controllers/authentication')

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.post('/', authenticationController, commentsControllers.addComment)

router.get('/:title', commentsControllers.getComments)

module.exports = router