require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

const userRoutes = require('./src/routes/user');
const movieRoutes = require('./src/routes/movie');

const { login, createUser } = require('./src/controllers/user');
const auth = require('./src/middlewares/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.kind === 'ObjectId') {
    res.status(400).send({
      message: 'Переданы некорректные данные.',
    });
  } else {
    res.status(statusCode).send({
      message: statusCode === 500 ? 'На сервере произошла ошибка.'
        : message,
    });
  }

  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
