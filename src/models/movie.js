const mongoose = require('mongoose');
const validator = require('validator');
const {
  REQUIRED_INPUT_ERROR,
  VALIDATION_LINK_ERROR,
} = require('../utils/constantsError');

const movieSchema = new mongoose.Schema({
  // страна создания фильма
  country: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },
  // режиссёр фильма
  director: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },
  // длительность фильма
  duration: {
    type: Number,
    required: [true, REQUIRED_INPUT_ERROR],
  },
  // год выпуска фильма
  year: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },
  // описание фильма
  description: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },
  // ссылка на постер к фильму
  image: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: VALIDATION_LINK_ERROR,
    },
  },
  // ссылка на трейлер фильма
  trailer: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: VALIDATION_LINK_ERROR,
    },
  },
  // миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: VALIDATION_LINK_ERROR,
    },
  },
  // _id пользователя, который сохранил фильм
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, REQUIRED_INPUT_ERROR],
  },
  // id фильма (MoviesExplorer)
  movieId: {
    type: Number,
    required: [true, REQUIRED_INPUT_ERROR],
    unique: true,
  },
  // название фильма на русском
  nameRU: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },
  // название фильма на английском
  nameEN: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
  },
});

module.exports = mongoose.model('movie', movieSchema);
