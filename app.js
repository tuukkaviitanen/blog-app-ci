const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const cors = require('cors');
const { MONGODB_URI, NODE_ENV } = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

const app = express();

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.tokenParser);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.errorHandler);

module.exports = app;
