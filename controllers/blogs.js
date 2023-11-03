const appRouter = require('express').Router();
const { userParser } = require('../utils/middleware');
const Blog = require('../models/blog');

appRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

appRouter.post('/', userParser, async (request, response) => {
  const { user } = request;

  const blog = new Blog({ ...request.body, user: user.id });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result.id);

  await user.save();

  return response.status(201).json(result);
});

appRouter.delete('/:id', userParser, async (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const blogToBeDeleted = await Blog.findById(id);

  if (!blogToBeDeleted) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blogToBeDeleted.user.toString() !== user.id) {
    return response
      .status(401)
      .json({ error: 'user is not authorized to delete this blog' });
  }

  await blogToBeDeleted.deleteOne();

  user.blogs = user.blogs.filter((blog) => blog.toString() !== id);
  await user.save();

  return response.status(204).end();
});

appRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {
    title, author, url, likes,
  } = request.body;

  const updatedBlog = {
    title,
    author,
    url,
    likes,
  };

  const result = await Blog.findByIdAndUpdate(id, updatedBlog, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  if (result === null) {
    response.statusMessage = 'Blog not found';
    response.status(404);
  }

  response.json(result);
});

appRouter.post('/:id/comments', async (request, response) => {
  const { id } = request.params;

  const { content } = request.body;

  const blog = await Blog.findById(id);

  const result = await Blog.findByIdAndUpdate(
    id,
    { comments: [...blog.comments, { content }] },
    {
      new: true,
      runValidators: true,
      context: 'query',
    },
  );

  if (result === null) {
    response.statusMessage = 'Blog not found';
    response.status(404);
  }

  response.json(result);
});

module.exports = appRouter;
