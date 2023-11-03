const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const helper = require('./test_helper');

describe('get blogs', () => {
  beforeEach(helper.prepareNotesDb);

  test('correct number of blogs are returned as JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('returned objects have id property', async () => {
    const response = await api
      .get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('login', () => {
  beforeEach(helper.prepareUsersDb);

  test('logging in with valid user returns token', async () => {
    const users = helper.initialUsers;
    const user = users[0];

    const loginInfo = { username: user.username, password: user.password };

    const result = await api
      .post('/api/login')
      .send(loginInfo)
      .expect(200);

    expect(result.body.token).toBeDefined();
  });
});

describe('create blog', () => {
  beforeEach(async () => {
    await helper.prepareUsersDb();
    await helper.prepareNotesDb();
  });

  test('posted blog is actually created in database', async () => {
    const newBlog = {
      title: 'New blog!',
      author: 'Test',
      url: 'test.fi',
      likes: 55,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', await helper.getToken())
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfter = await helper.getBlogsInDb();

    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAfter.map((blog) => blog.title);

    expect(titles).toContain(newBlog.title);
  });

  test('if header does not contain jwt, return 401 Unauthorized', async () => {
    const newBlog = {
      title: 'New blog!',
      author: 'Test',
      url: 'test.fi',
      likes: 55,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);
  });

  test('if likes not included, default to zero', async () => {
    const newBlog = {
      title: 'New blog!',
      author: 'Test',
      url: 'test.fi',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', await helper.getToken())
      .send(newBlog);

    expect(response.body.likes).toBe(0);
  });

  test('if title is missing, return 400', async () => {
    const newBlog = {
      author: 'No title guy',
      url: 'no-title.fi',
    };
    await api
      .post('/api/blogs')
      .set('Authorization', await helper.getToken())
      .send(newBlog)
      .expect(400);
  });

  test('if url is missing, return 400', async () => {
    const newBlog = {
      title: 'No url',
      author: 'No url guy',

    };
    await api
      .post('/api/blogs')
      .set('Authorization', await helper.getToken())
      .send(newBlog)
      .expect(400);
  });
});

describe('delete blog by id', () => {
  beforeEach(helper.prepareNotesDb);

  test('delete returns 204 and blog is deleted from db', async () => {
    const copiedBlog = helper.initialBlogs[0];

    const postResult = await api
      .post('/api/blogs')
      .set('Authorization', await helper.getToken())
      .send(copiedBlog);

    const blogToBeDeleted = postResult.body;

    const blogsBefore = await helper.getBlogsInDb();

    expect(blogsBefore.map((blog) => blog.id)).toContain(blogToBeDeleted.id);

    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set('Authorization', await helper.getToken())
      .expect(204);

    const blogsAfter = await helper.getBlogsInDb();
    expect(blogsAfter.map((blog) => blog.id)).not.toContain(blogToBeDeleted.id);
  });

  test('returns 400 when receiving invalid id', async () => {
    const invalidId = '500';
    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', await helper.getToken())
      .expect(400);
  });

  test('if header does not contain jwt, return 401 Unauthorized', async () => {
    const copiedBlog = helper.initialBlogs[0];

    const postResult = await api
      .post('/api/blogs')
      .set('Authorization', await helper.getToken())
      .send(copiedBlog);

    const blogToBeDeleted = postResult.body;

    const blogsBefore = await helper.getBlogsInDb();

    expect(blogsBefore.map((blog) => blog.id)).toContain(blogToBeDeleted.id);

    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .expect(401);

    await helper.getBlogsInDb();
  });
});

describe('update blog', () => {
  beforeEach(helper.prepareNotesDb);

  test('returns 200 and updated blog', async () => {
    const blogsInDb = await helper.getBlogsInDb();

    const blogToBeUpdated = blogsInDb[0];

    const updatedBlog = {
      title: 'Updated blog!',
      author: 'Update guy',
      url: 'update.fi',
      likes: 1000,
    };

    const result = await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(updatedBlog)
      .expect(200);

    expect(result.body).toEqual({ ...updatedBlog, id: blogToBeUpdated.id, comments: [] });
  });

  test('changes only properties sent', async () => {
    const blogsInDb = await helper.getBlogsInDb();

    const blogToBeUpdated = blogsInDb[0];

    const updatedBlog = {
      title: 'Updated blog!',
      likes: 4500,
    };

    const result = await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(updatedBlog)
      .expect(200);

    expect(result.body).toEqual({ ...blogToBeUpdated, ...updatedBlog });
  });

  test('returns 404, if id does not exist', async () => {
    const nonExistingId = await helper.nonExistingId();

    const updatedBlog = {
      title: 'Updated blog!',
      author: 'Update guy',
      url: 'update.fi',
      likes: 1000,
    };

    await api
      .put(`/api/blogs/${nonExistingId}`)
      .send(updatedBlog)
      .expect(404);
  });

  test('returns 400, if invalid id', async () => {
    const invalidId = 'invalid';

    const updatedBlog = {
      title: 'Updated blog!',
      author: 'Update guy',
      url: 'update.fi',
      likes: 1000,
    };

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(updatedBlog)
      .expect(400);
  });
});

describe('create user', () => {
  beforeEach(helper.prepareUsersDb);

  test('valid user is created and returned as json', async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = { username: 'new user', password: 'secret' };

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.getUsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);

    expect(usernames).toContain(newUser.username);
  });

  test('user without password is not created', async () => {
    const invalidUser = { username: 'invalid user' };

    const result = await api.post('/api/users')
      .send(invalidUser)
      .expect(400);

    expect(result.body.error).toMatch(/`password` is required/);
  });

  test('user with password under shorter than 3 characters is not created', async () => {
    const invalidUser = { username: 'invalid user', password: 'ab' };

    const result = await api.post('/api/users')
      .send(invalidUser)
      .expect(400);

    expect(result.body.error).toMatch(/`password` has to be at least 3 characters long/);
  });

  test('user without username is not created', async () => {
    const invalidUser = { password: 'password' };

    const result = await api.post('/api/users')
      .send(invalidUser)
      .expect(400);

    expect(result.body.error).toMatch(/`username` is required/);
  });

  test('user with username under shorter than 3 characters is not created', async () => {
    const invalidUser = { username: 'in', password: 'password' };

    const result = await api.post('/api/users')
      .send(invalidUser)
      .expect(400);

    expect(result.body.error).toMatch(/`username` .* is shorter than the minimum allowed length \(3\)/);
  });

  test('user with non-unique username is not created', async () => {
    const usersInDb = await helper.getUsersInDb();
    const usedUsername = usersInDb[0].username;

    const invalidUser = { username: usedUsername, password: 'password' };

    const result = await api.post('/api/users')
      .send(invalidUser)
      .expect(400);

    expect(result.body.error).toMatch(/expected `username` to be unique/);
  });
});

describe('get users', () => {
  beforeEach(helper.prepareUsersDb);

  test('returns users in json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
