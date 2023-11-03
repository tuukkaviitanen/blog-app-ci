const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      content: {
        type: String,
        required: true,
      },
      id: mongoose.Schema.ObjectId,
    },
  ],
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    if (!returnedObject.comments) return;

    returnedObject.comments.forEach((c) => {
      c.id = c._id;
      delete c._id;
    });
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
