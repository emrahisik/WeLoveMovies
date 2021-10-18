const knex = require('../db/connection');

const list = (query) => {
    return knex('movies')
                .select('*');
                
};
const qList = (value) => {
    return knex('movies as m')
                .leftJoin('movies_theaters as mt', 'mt.movie_id', 'm.movie_id')
                .select('m.*')
                .where({is_showing:value})
                .groupBy('m.movie_id')
                .orderBy('movie_id');
                
};

module.exports ={
    list,
    qList,
}