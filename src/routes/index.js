const router = require('express').Router();
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');
const NotFoundError = require('../errors/not-found-error');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const { NOT_FOUND_ADDRESS_ERROR } = require('../utils/constantsError');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('*', () => {
  throw new NotFoundError(NOT_FOUND_ADDRESS_ERROR);
});

module.exports = router;
