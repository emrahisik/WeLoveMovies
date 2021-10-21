module.exports = (req, res, next) => {
    next({
        status: 404,
        message: `The route ${req.path} does not exist!`,
    });
};