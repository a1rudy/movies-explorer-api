const userRouter = require('express').Router();
const { getUser, updateUser } = require('../controllers/user');
const { validateId, validateUpdateUser } = require('../middlewares/validation');

userRouter.get('/me', validateId, getUser);
userRouter.patch('/me', validateUpdateUser, updateUser);

module.exports = userRouter;
