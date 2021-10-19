const knex = require('../db/connection');

const list = (query) => {
    return knex('movies')
                .select('*');
                
};
const listQuery = (value) => {
    return knex('movies as m')
                .leftJoin('movies_theaters as mt', 'mt.movie_id', 'm.movie_id')
                .select('m.*')
                .where({is_showing:value})
                .groupBy('m.movie_id')
                .orderBy('movie_id');
                
};

const read = (movie_id) => {
    return knex('movies')
            .select('*')
            .where({movie_id})
            .first();
};

const readTheaters = (movie_id) => {
    return knex('movies_theaters as mt')
            .join('theaters as t', 't.theater_id', 'mt.theater_id')
            .select("t.*",'mt.*')
            .where({ movie_id })
};

const readReviews = (movie_id) => {
    return knex('reviews as r')
            .join('critics as c', 'r.critic_id', 'c.critic_id')
            .select("r.*",'c.*')
            .where({ movie_id })
};

module.exports ={
    list,
    listQuery,
    read,
    readTheaters,
    readReviews,
}