const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const {
  REQUIRED_INPUT_ERROR,
  VALIDATION_EMAIL_ERROR,
  AUTHENTIFICATION_ERROR,
} = require('../utils/constantsError');

const userSchema = new mongoose.Schema({
  // почта пользователя, по которой он регистрируется
  email: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: VALIDATION_EMAIL_ERROR,
    },
  },
  // хеш пароля
  password: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
    select: false,
    minlength: 8,
  },
  // имя пользователя
  name: {
    type: String,
    required: [true, REQUIRED_INPUT_ERROR],
    minlength: 2,
    maxlength: 30,
  },
});

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(AUTHENTIFICATION_ERROR));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error(AUTHENTIFICATION_ERROR));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
