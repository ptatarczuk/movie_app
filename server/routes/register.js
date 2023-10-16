const express = require("express");
const router = express.Router();
const Login = require("../models/Login.js");
const jwt = require("jsonwebtoken");
const handleError = require("../error");

router.post("/", async (req, res) => {
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

        const token = jwt.sign({ id: newUser._id }, process.env.ACCES_TOKEN_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        const data = await newUser.save();
        res.status(201).json({
            status: "success",
            token,
            data,
        });
    } catch (err) {
        handleError(err, res);
    }
});

module.exports = router;
