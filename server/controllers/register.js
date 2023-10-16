const Login = require('../models/Login')
const handleError = require('./error')

const createUser = async function (res, req) {
    try {
        const { username, password, passwordConfirmation } = req.body;
        const user = await Login.findOne({ username: username });
        if (user) {
            return res.status(409).json({ message: "user name allready exists" });
        }
        if (passwordConfirmation !== password) {
            return res.status(401).json({ message: "incorrect password" });
        }
        const newUser = new Login({
            username,
            password,
        });

        const data = await newUser.save();
        res.json(data);
    } catch (err) {
        handleError(err, res)
    }
} 

module.exports = { createUser }
   

