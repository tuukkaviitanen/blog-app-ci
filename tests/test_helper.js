const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'My food blog!',
    author: 'Tuukka',
    url: 'tuukka.fi',
    likes: 50,
  },
  {
    title: 'Franks food blog!',
    author: 'Frank',
    url: 'frank.com',
    likes: 10,
  },
];

const initialUsers = [
  { username: 'testuser1', name: 'first tester', password: 'password1' },
  { username: 'testuser2', name: 'second tester', password: 'password2' },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'removed blog!',
    author: 'removed guy',
    url: 'removed.fi',
    likes: 1000,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const getBlogsInDb = async () => (await Blog.find({})).map((blog) => blog.toJSON());

const getUsersInDb = async () => (await User.find({})).map((user) => user.toJSON());

const prepareNotesDb = async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
};

const prepareUsersDb = async () => {
  await User.deleteMany({});

  const usersPromiseArray = initialUsers.map(async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    return new User({ username: user.username, name: user.name, passwordHash });
  });

  const userObjects = await Promise.all(usersPromiseArray);

  const saveUsersPromiseArray = userObjects.map((user) => user.save());

  await Promise.all(saveUsersPromiseArray);
};

const getToken = async () => {
  const users = await getUsersInDb();
  const firstUser = users[0];

  const userForToken = { username: firstUser.username, id: firstUser.id };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return `Bearer ${token}`;
};

module.exports = {
  initialBlogs,
  initialUsers,
  getBlogsInDb,
  getUsersInDb,
  nonExistingId,
  prepareNotesDb,
  prepareUsersDb,
  getToken,
};
