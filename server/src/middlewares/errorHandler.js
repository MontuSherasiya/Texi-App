function notFound(req, res, next){
    res.status(404).json({
        message: `Route not found: ${req.originalUrl}`
    })
}

// eslint-disable-next-line   no-unused-varss
function errorHandler(err, req, res, next){
    console.error(err.stack);

    const status = err.status || 500;

    res.status(status).json({
        message: err.message || "Something went wrong on the server....",
    });
}

export {notFound ,errorHandler};