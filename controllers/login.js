const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  if (!username) return response.status(400).json({ error: '`username` expected' });
  if (!password) return response.status(400).json({ error: '`password` expected' });

  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return response.status(401).json({ error: 'incorrect username or password' });
  }

  const userForToken = { username: user.username, id: user.id };

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });

  return response.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
