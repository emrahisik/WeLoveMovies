const service = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const mapProperties = require('../utils/map-properties');

const movieIdExists = async (req, res, next) => {
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

const list = async (req,res,next) => {
    const { is_showing } = req.query;
    console.log(is_showing)
    let movies;
    if(is_showing === undefined){
        movies = await service.list();
    }else{
        movies = await service.listQuery();
    }
    res.json({ data: movies })
};

const read = (req, res, next) => {
    const { data } = res.locals;
    res.json({ data })
};

const readTheaters = async (req, res, next) => {
    const data = await service.readTheaters(req.params.movieId);
    res.json({data});
};

const readReviews = async (req, res, next) => {
    const data = await service.readReviews(req.params.movieId);
    const criticsConfig = {
        critic_id: "critic.critic_id",
        preferred_name: "critic.preferred_name",
        surname: "critic.surname",
        organization_name: "critic.organization_name",
        //created_at: "critic.created_at",
        //updated_at: "critic.updated_at"
    }
    const addCategory = data.map(el => mapProperties(criticsConfig)(el))
    res.json({data: addCategory});
};

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieIdExists), read],
    readTheaters: [asyncErrorBoundary(movieIdExists), readTheaters],
    readReviews: [asyncErrorBoundary(movieIdExists), readReviews]
};