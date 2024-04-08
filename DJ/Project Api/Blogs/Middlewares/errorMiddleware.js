function errorMiddleware(err, req, res, next) {
    console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }
    console.log("Error middleware called"); // Moved this inside the if condition


    res.status(500).json({
        message: "Internal server error",
        error: err.message
    });
}

module.exports = errorMiddleware;
