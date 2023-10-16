const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const movieRoutes = require("./routes/movies");
const commentRoutes = require("./routes/comments");
const usersRoutes = require("./routes/users");
const registerRoutes = require("./routes/register");
const dotenv = require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => app.listen(3001, () => console.log("http://127.0.0.1:3001")))
    .catch((err) => console.error(err));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/movies", movieRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/register", registerRoutes);
