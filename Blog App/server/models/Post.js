const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        default: '' 
      },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    comments: [CommentSchema]
});

module.exports = mongoose.model('Post', PostSchema )