const service = require('./movies.service');

const list = async (req,res,next) => {
    const { is_showing } = req.query;
    let movies = [];
    if(!is_showing){
        movies = await service.list();
    }else{
        movies = await service.qList(is_showing);
    }
    res.json({data: movies})
};

module.exports = {
    list,
};