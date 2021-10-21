const service = require('./reviews.service');
const mapProperties = require('../utils/map-properties');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

//Check if review exists
const reviewExists = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if(review){
        res.locals.review = review;
        next();
    }else{
        return next({
            status: 404,
            message: `Review ${reviewId} cannot be found!`,
        });
    };
};

//Check if update entry has content and score props
const bodyHasProperties = (req, res, next) => {
    const validProps = ['score', 'content'];
    const update = req.body.data;
    const invalidProps = Object.keys(update).filter(prop => !validProps.includes(prop));
    if(!invalidProps.length) { 
        res.locals.reviewUpdate = update;
        return next()
    };
    return next({
        status: 400,
        message: `not_supported. Data must include content and score properties!`
    });
}; 

//Update review and return it with critic's info as a nested object
const update = async (req, res, next) => {
    const { review, reviewUpdate } = res.locals;
    //const { update } = req.locals;
    const updatedReview = {
        ...reviewUpdate,
        review_id: review.review_id,
    };
    const update = await service.update(updatedReview);
    const criticConfig = {
        preferred_name: "critic.preferred_name",
        surname: "critic.surname",
        organization_name: "critic.organization_name",
    };
    const categorizedReview  = mapProperties(criticConfig)(update);
    res.status(201).json({ data: categorizedReview});
};


//Delete sepecified review
const destroy = async (req, res, next) => {
    await service.delete(req.params.reviewId);
    res.sendStatus(204);
};


module.exports = {
    update: [asyncErrorBoundary(reviewExists), bodyHasProperties, asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}