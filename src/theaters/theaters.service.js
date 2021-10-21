const knex = require('../db/connection');

//Query all theaters & return it with movies' information
const list  = () => {
    return knex('theaters as t')
            .join('movies_theaters as mt', 't.theater_id', 'mt.theater_id')
            .join('movies as m', 'm.movie_id', 'mt.movie_id')
            .select('*');
};

module.exports ={
    list,
}