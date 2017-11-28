'use strict';

const express = require('express');

const {DATABASE_URL} = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect(DATABASE_URL, { useMongoClient: true });

const {BlogPost} = require('../models');

const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/posts', (req, res) => {
  BlogPost
    .find()
    .limit(10)
    .then(posts => {
      res.json({
        posts: posts.map(
          (post) => post.apiRepr())
      });
    })
    .catch( err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

/* ========== GET/READ SINGLE ITEMS ========== */
router.get('/posts/:id', (req, res) => {
  BlogPost
    .findById(req.params.id)
    .then(post => res.json(post.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

// /* ========== POST/CREATE ITEM ========== */
router.post('/posts', jsonParser, (req, res) => {

  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  BlogPost
    .create({
      title: req.body.title,
      content: req.body.name,
      author: req.body.author})
    .then(
      post => res.status(201).json(post.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

// /* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/posts/:id', jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({message: message});
  }

  const toUpdate = {};
  const updateableFields = ['title', 'content', 'author'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  BlogPost
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findByIdAndUpdate(req.params.id, {$set: toUpdate}, {upsert: true, new: true})

    .then(post => res.status(204).json(post.apiRepr()))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

// /* ========== DELETE/REMOVE A SINGLE ITEM ========== */

router.delete('/posts/:id', (req, res) => {
  BlogPost
    .findByIdAndRemove(req.params.id)
    .then(post => res.status(204))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = router;