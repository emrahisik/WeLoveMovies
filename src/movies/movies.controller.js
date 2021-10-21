const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const mapProperties = require('../utils/map-properties');

//Check if specified movie exists
const movieExists = async (req, res, next) => {
    const { movieId } = req.params;
    const data = await service.read(movieId);
    if(!data){
        next({
            status: 404,
            message: `The movie id ${movieId} not found!`
        });
    }else{
        res.locals.data = data;
        next();
    };
};

//List movies according to query if any exists
//otherwise list all movies
const list = async (req,res,next) => {
    const { is_showing } = req.query;
    let movies;
    if(is_showing === undefined){
        movies = await service.list();
    }else{
        movies = await service.listQuery();
    }
    res.json({ data: movies })
};

//Read specified movie
const read = (req, res, next) => {
    const { data } = res.locals;
    res.json({ data })
};

//Read theaters for specified movie
const readTheaters = async (req, res, next) => {
    const data = await service.readTheaters(req.params.movieId);
    res.json({data});
};

//Read reviews for specified movie
const readReviews = async (req, res, next) => {
    const data = await service.readReviews(req.params.movieId);
    const criticsConfig = {
        critic_id: "critic.critic_id",
        preferred_name: "critic.preferred_name",
        surname: "critic.surname",
        organization_name: "critic.organization_name",
    };
    const addCategory =  data.map(el => mapProperties(criticsConfig)(el))
    res.json({data: addCategory});
};

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    readTheaters: [asyncErrorBoundary(movieExists), readTheaters],
    readReviews: [asyncErrorBoundary(movieExists), readReviews]
};