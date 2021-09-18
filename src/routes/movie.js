const movieRouter = require('express').Router();
const { getMovies, createMovie, removeMovie } = require('../controllers/movie');
const { validateMovie, validateId } = require('../middlewares/validation');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovie, createMovie);
movieRouter.delete('/:movieId', validateId, removeMovie);

module.exports = movieRouter;
