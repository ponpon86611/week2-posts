const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, '貼文姓名未填寫']
    },
    image: {
      type: String,
      default: ""
    },
    createAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    likes: {
      type: Number,
      default: 0
    }  
  },
  {
    versionKey: false
  }
);

const Post = mongoose.model(
  'Post',
  postsSchema
);

module.exports = Post;
