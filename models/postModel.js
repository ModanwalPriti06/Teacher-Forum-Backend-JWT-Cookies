const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    // required: true,
    default: ''
  },
  description: {
    type: String,
    // required: true,
    default: ''
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  fileTitle: {
    type: String,
    default: '',
  },
  file: {
      type: String,
      default: '',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
},{timestamps:true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;