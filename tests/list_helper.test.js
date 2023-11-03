const listHelper = require('../utils/list_helper');

const emptyList = [];

const listWithOneBlog = [
  {
    _id: '64ef954e3a882f399a3966e4',
    title: 'My food blog!',
    author: 'Tuukka',
    url: 'google.fi',
    likes: 10,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: '64ef954e3a882f399a3966e4',
    title: 'My food blog!',
    author: 'Jose',
    url: 'google.fi',
    likes: 50,
    __v: 0,
  },
  {
    _id: '64ef954e3a882f399a3966e4',
    title: 'My food blog!',
    author: 'Tuukka',
    url: 'google.fi',
    likes: 30,
    __v: 0,
  },
  {
    _id: '64ef954e3a882f399a3966e4',
    title: 'My food blog!',
    author: 'Tuukka',
    url: 'google.fi',
    likes: 22,
    __v: 0,
  },
];

test('dummy return one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(10);
  });

  test('when list has multiple blogs, equals the combined likes of all blogs', () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(102);
  });

  test('of empty list, is zero', () => {
    const result = listHelper.totalLikes(emptyList);
    expect(result).toBe(0);
  });

  test('if gets null as parameter, returns null', () => {
    const result = listHelper.totalLikes(null);
    expect(result).toEqual(null);
  });
});

describe('favorite blog', () => {
  test('when empty list, output null', () => {
    const result = listHelper.favoriteBlog(emptyList);

    expect(result).toEqual(null);
  });

  test('when only one blog, output that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);

    expect(result).toEqual(listWithOneBlog[0]);
  });

  test('when multiple blogs, output one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);

    expect(result).toEqual(listWithManyBlogs[0]);
  });

  test('if gets null as parameter, returns null', () => {
    const result = listHelper.favoriteBlog(null);
    expect(result).toEqual(null);
  });
});

describe('most blogs', () => {
  test('should return author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);

    const expectedResult = {
      author: 'Tuukka',
      blogs: 2,
    };

    expect(result).toEqual(expectedResult);
  });

  test('if empty array, should return null', () => {
    const result = listHelper.mostBlogs(emptyList);

    expect(result).toEqual(null);
  });

  test('if gets null as parameter, returns null', () => {
    const result = listHelper.mostBlogs(null);
    expect(result).toEqual(null);
  });
});

describe('most likes', () => {
  test('should return author with most likes', () => {
    const result = listHelper.mostLikes(listWithManyBlogs);

    const expectedResult = {
      author: 'Tuukka',
      likes: 52,
    };

    expect(result).toEqual(expectedResult);
  });

  test('if empty array, should return null', () => {
    const result = listHelper.mostLikes(emptyList);

    expect(result).toEqual(null);
  });

  test('if null parameter, should return null', () => {
    const result = listHelper.mostLikes(null);

    expect(result).toEqual(null);
  });
});
