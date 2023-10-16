const { promisify } = require('util')
const handleError = require('../error')
const jwt = require('jsonwebtoken')
const Login = require('../models/Login')


async function protect(req, res, next) {
    try {
        let token
        //getting token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        
        //and check of it's there
        if (!token) {
            return next(res.status(401).json({ message: 'You are not logged in. Please log in to get access' }));
        }

        //verification token
        const decoded = await promisify(jwt.verify)(token, process.env.ACCES_TOKEN_SECRET)

        //check if user still exists
        const freshUser = await Login.findById(decoded.id)
        if (!freshUser) {
            return next(res.status(401).json({ message: 'The user belonging to this token does no longer exist' }))
        }

        //grant access to protected - put the entire user data on the request 
        next()
        req.user = freshUser;
    } catch (error) {
        handleError(error, res)
    }
}

module.exports = protect; 
