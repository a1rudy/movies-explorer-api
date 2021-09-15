const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  BAD_REQUEST_MOVIE_ERROR,
  NOT_FOUND_MOVIE_ERROR,
  FORBIDDEN_MOVIE_ERROR,
  REMOVE_MOVIE_OK,
} = require('../utils/constantsError');

const OK = 200;

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((card) => res.status(OK).send(card))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(BAD_REQUEST_MOVIE_ERROR);
      }
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user._id;
  Movie.findById(movieId)
    .orFail(new NotFoundError(NOT_FOUND_MOVIE_ERROR))
    .then((movie) => {
      if (movie.owner.toString() === owner) {
        Movie.findByIdAndDelete(movieId)
          .then(() => res.status(OK).send({ message: REMOVE_MOVIE_OK }))
          .catch(next);
      } else {
        throw new ForbiddenError(FORBIDDEN_MOVIE_ERROR);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  removeMovie,
};
