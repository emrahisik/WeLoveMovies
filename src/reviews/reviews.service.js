const knex = require('../db/connection');

//Query specified review
const read = (reviewId) => {
    return knex('reviews')
            .select('*')
            .where({review_id: reviewId})
            .first();
};

//Update specified review and return it with critic's information
const update = (updatedReview) => {
    const criticsJoin = knex('reviews as r')
                            .select('*')
                            .join('critics as c', 'c.critic_id', 'r.critic_id')
                            .where({review_id: updatedReview.review_id })
                            .first();
   
    return knex('reviews')
            .where({review_id: updatedReview.review_id })
            .update(updatedReview,'*')
            .then(() => criticsJoin)            
};

//Delete specified review
const destroy = (reviewId) => {
    return knex('reviews').where({review_id: reviewId}).del();
};

module.exports = {
    read,
    update,
    delete: destroy,
}