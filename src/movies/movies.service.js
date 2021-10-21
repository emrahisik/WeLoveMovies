const knex = require('../db/connection');


//Query all movies
const list = () => {
    return knex('movies')
                .select('*');
                
};

//Query all movies where is_showing is true
const listQuery = () => {
    return knex('movies as m')
                .join('movies_theaters as mt', 'mt.movie_id', 'm.movie_id')
                .select('m.*')
                .where({is_showing: true})
                .groupBy('m.movie_id')
                .orderBy('movie_id');
                
};

//Query specified movie
const read = (movie_id) => {
    return knex('movies')
            .select('*')
            .where({movie_id})
            .first();
};

//Query theaters for specified movie
const readTheaters = (movie_id) => {
    return knex('movies_theaters as mt')
            .join('theaters as t', 't.theater_id', 'mt.theater_id')
            .select("t.*",'mt.*')
            .where({ movie_id })
};

//Query reviews for specified movie
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