if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require('morgan');
const moviesRouter = require('./movies/movies.router')

app.use(express.json());
app.use(morgan('tiny'));

app.use('/movies', moviesRouter)



module.exports = app;
