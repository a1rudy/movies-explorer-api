const movieRouter = require('express').Router();
const { getMovies, createMovie, removeMovie } = require('../controllers/movie');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovie);
movieRouter.delete('/:movieId', removeMovie);

module.exports = movieRouter;
