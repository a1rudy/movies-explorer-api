const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const {
  NOT_FOUND_USER_ERROR,
  BAD_REQUEST_UPDATE_USER_ERROR,
  CONFLICT_USER_ERROR,
  BAD_REQUEST_USER_ERROR,
} = require('../utils/constantsError');

const { NODE_ENV, JWT_SECRET } = process.env;

const OK = 200;

const getUser = (req, res, next) => {
  const owner = req.user._id;
  User.findById(owner)
    .orFail(new NotFoundError(NOT_FOUND_USER_ERROR))
    .then((user) => res.status(OK).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    {
      name,
      email,
    },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(NOT_FOUND_USER_ERROR))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(BAD_REQUEST_UPDATE_USER_ERROR);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((mail) => {
      if (mail) {
        throw new ConflictError(CONFLICT_USER_ERROR);
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => User.create({
            name,
            email,
            password: hash,
          }))
          .then((user) => res.status(OK).send(user))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              throw new BadRequestError(BAD_REQUEST_USER_ERROR);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'my-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((err) => {
      throw new UnauthorizedError(err.message);
    })
    .catch(next);
};

module.exports = {
  getUser,
  updateUser,
  login,
  createUser,
};
