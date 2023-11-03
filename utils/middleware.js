const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('./logger');

/**
 * Handles most uncaught errors
 */
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  } if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  return next(error);
};

/**
 * Parses possible Bearer token to request.token
 */
const tokenParser = (request, response, next) => {
  const authorization = request.get('authorization');

  const authTypeRegex = /^Bearer /i;

  if (authorization?.match(authTypeRegex)) {
    request.token = authorization.replace(authTypeRegex, '');
  }

  return next();
};

const userParser = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) return response.status(401).json({ error: 'token invalid' });

  request.user = await User.findById(decodedToken.id);

  if (!request.user) return response.status(401).json({ error: 'user does not exist' });

  return next();
};

module.exports = { errorHandler, tokenParser, userParser };
