const service = require('./theaters.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const reduceProperties = require('../utils/reduce-properties')


const list = async (req, res, next) => {
    const data = await service.list();
    const movieConfig = {
        "movie_id": ["movies", null, "movie_id"],
        "title": ["movies", null, "title"],
        "rating": ["movies", null, "rating"],
        "is_showing" : ['movies', null, "is_showing"],
        "runtime_in_minutes": ['movies', null, "runtime_in_minutes"],
        "description":['movies', null, "description"],
        "image_url": ['movies', null, "image_url"]
    };
    const theaters = reduceProperties('theater_id', movieConfig)
    res.json({ data: theaters(data) });
};


module.exports = {
    list: asyncErrorBoundary(list),
}