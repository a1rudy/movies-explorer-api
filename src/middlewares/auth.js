/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { UNAUTHORIZED_ERROR } = require('../utils/constantsError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'my-secret',
    );
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR);
  }

  req.user = payload;

  next();
};
