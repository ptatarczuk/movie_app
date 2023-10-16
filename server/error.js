function handleError(error, res) {
    res.status(error.status || 500).send({
        error: {
            error: error.status || 500,
            message: error.message || "Internal Server Error"
        }
    });
}

module.exports = handleError