const service = require('./reviews.service');
const mapProperties = require('../utils/map-properties');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

//Check if review exists
//service.read returns a review object combined with related critic
const reviewExists = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if(review){
        console.log(review)
        res.locals.review = review;
        next();
    }else{
        return next({
            status: 404,
            message: `Review ${reviewId} cannot be found!`,
        });
    };
};


//1
// const update = async (req, res, next) => {
//     const reviewUpdate = req.body.data;
//     const { review } = res.locals;
//     const updatedReview = {
//         ...reviewUpdate,
//         review_id: review.review_id,
//     };
//     const update = await service.update(updatedReview);
//     const reviewCritic = {
//         ...review,
//         ...update,
//     };
//     const criticConfig = {
//         critic_id: "critic.critic_id",
//         preferred_name: "critic.preferred_name",
//         surname: "critic.surname",
//         organization_name: "critic.organization_name",
//     };
//     const categorizedData = mapProperties(criticConfig)(reviewCritic);
//     res.status(201).json({ data: categorizedData });
// };

//2
// const update = async (req, res, next) => {
//     const { review } = res.locals;
//     const criticConfig = {
//         critic_id: "critic.critic_id",
//         preferred_name: "critic.preferred_name",
//         surname: "critic.surname",
//         organization_name: "critic.organization_name",
//     };
//     const categorizedReview  = mapProperties(criticConfig)(review);

//     const reviewUpdate = req.body.data;
//     const updatedReview = {
//         ...reviewUpdate,
//         review_id: review.review_id,
//     };
//     const update = await service.update(updatedReview);
//     const reviewCritic = {
//         ...categorizedReview,
//         ...update,
//     };
    
//     res.status(201).json({ data: reviewCritic });
// };

const update = async (req, res, next) => {
    const { review } = res.locals;
    const reviewUpdate = req.body.data;
    const updatedReview = {
        ...reviewUpdate,
        review_id: review.review_id,
    };
    const update = await service.update(updatedReview);
    //console.log(update)
    // const reviewCritic = {
    //     ...review,
    //     ...update,
    // };
    const criticConfig = {
        preferred_name: "critic.preferred_name",
        surname: "critic.surname",
        organization_name: "critic.organization_name",
    };
    const categorizedReview  = mapProperties(criticConfig)(update);
    res.status(201).json({ data: categorizedReview});
};

const destroy = async (req, res, next) => {
    await service.delete(req.params.reviewId);
    res.sendStatus(204);
};


module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}