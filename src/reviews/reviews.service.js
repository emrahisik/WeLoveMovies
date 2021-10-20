const knex = require('../db/connection');


const read = (reviewId) => {
    return knex('reviews')
            .select('*')
            .where({review_id: reviewId})
            .first();
};

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

const destroy = (reviewId) => {
    return knex('reviews').where({review_id: reviewId}).del();
};

module.exports = {
    read,
    update,
    delete: destroy,
}