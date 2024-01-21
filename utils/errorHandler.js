function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.json( { error: err })
}

 function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
}

module.exports = {errorHandler,logErrors}
