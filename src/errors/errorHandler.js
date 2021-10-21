module.exports = (error, req, res, next)=>{
    const { status=500 , message = error } = error;
    res.status(status).json({ error: message });
};