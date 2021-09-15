const movieRouter = require('express').Router();
const { getMovies, createMovie, removeMovie } = require('../controllers/movie');
const { validateMovie, validateRemoveMovie } = require('../middlewares/validation');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovie, createMovie);
movieRouter.delete('/:movieId', validateRemoveMovie, removeMovie);

module.exports = movieRouter;
