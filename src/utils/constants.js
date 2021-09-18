const MONGO_URL = 'mongodb://localhost:27017/moviesdb';
const OK = 200;
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
const allowedCors = [
  'https://project-movies-by-a1rudy.nomoredomains.club',
  'https://api.project-movies-a1rudy.nomoredomains.club',
  'http://localhost:3000',
];
module.exports = {
  MONGO_URL,
  OK,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
