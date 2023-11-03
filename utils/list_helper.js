const lodash = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => {
  if (blogs === null) {
    return null;
  }

  const likes = blogs.reduce((sum, iter) => sum + iter.likes, 0);

  return likes;
};

const favoriteBlog = (blogs) => {
  if (blogs === null || blogs.length === 0) {
    return null;
  }

  const mostLikedBlog = blogs.reduce(
    (maxLikedBlog, currentBlog) => (currentBlog.likes > maxLikedBlog.likes
      ? currentBlog
      : maxLikedBlog),
  );

  return mostLikedBlog;
};

const mostBlogs = (blogList) => {
  if (blogList === null || blogList.length === 0) {
    return null;
  }

  const authorCount = lodash.countBy(blogList, 'author');

  const authors = lodash.map(authorCount, (blogs, author) => ({ author, blogs }));

  const authorWithMostBlogs = lodash.maxBy(authors, 'blogs');

  return authorWithMostBlogs;
};

const mostLikes = (blogList) => {
  if (blogList === null || blogList.length === 0) {
    return null;
  }

  const groupedByAuthor = lodash.groupBy(blogList, 'author');

  const mappedAuthors = lodash.map(
    groupedByAuthor,
    (blogs, author) => ({ author, likes: lodash.sumBy(blogs, 'likes') }),
  );

  const authorWithMostLikes = lodash.maxBy(mappedAuthors, 'likes');

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
