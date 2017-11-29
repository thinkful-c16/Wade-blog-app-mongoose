'use strict';

const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: String,
  author: {
    firstName: String,
    lastName: String
  }
});

// any virtuals or methods

blogPostSchema.virtual('fullName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`;
});

blogPostSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.fullName
  };
};

const BlogPost = mongoose.model('BlogPost', blogPostSchema, 'stories');

module.exports = {BlogPost};