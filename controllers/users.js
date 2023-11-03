const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password) {
    return response.status(400).json({ error: '`password` is required' });
  }
  if (password.length < 3) {
    return response.status(400).json({ error: '`password` has to be at least 3 characters long' });
  }

  const salt = 10;

  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await newUser.save();

  return response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1 });

  return response.status(200).json(users);
});

module.exports = usersRouter;
