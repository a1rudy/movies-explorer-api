const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

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
        throw new BadRequestError('Переданы некорректные данные при создании фильма.');
      }
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user._id;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм с указанным id не найден.'))
    .then((movie) => {
      if (movie.owner.toString() === owner) {
        Movie.findByIdAndDelete(movieId)
          .then((item) => res.status(OK).send(item))
          .catch(next);
      } else {
        throw new ForbiddenError('Отсутствуют права на уделение фильма.');
      }
      return res.status(OK).send({ message: 'Фильм удален.' });
    });
};

module.exports = {
  getMovies,
  createMovie,
  removeMovie,
};
