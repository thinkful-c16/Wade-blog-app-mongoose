'use strict';

const express = require('express');
const router = express.Router();

// var data = require('../db/dummy-data');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { DATABASE } = require('../config');
const knex = require('knex')(DATABASE);

/* ========== GET/READ ALL ITEMS ========== */
router.get('/stories', (req, res) => {

  knex('stories')
    .select()
    .then( results => {
      return res.status(200, 'OK').json(results);
    })
    .catch(err => {
      console.error(err);
    });

});

/* ========== GET/READ SINGLE ITEMS ========== */
router.get('/stories/:id', (req, res) => {

  knex('stories')
    .select()
    .where( 'stories.id', Number(req.params.id))
    .debug(true)
    .then(([result]) => {
      return res.status(200, 'OK').json(result);
    })
    .catch(err => {
      console.error(err);
    });
});

// /* ========== POST/CREATE ITEM ========== */
router.post('/stories', jsonParser, (req, res) => {

  const requiredFields = ['title', 'content'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  /***** Never Trust Users! *****/
  
  knex('stories').returning(['title', 'id', 'content'])
    .insert({
      title: req.body.title,
      content: req.body.content
    }).then(([newItem]) => {
      return res.status(201)
        .location(`/stories/${newItem.id}`)
        .json(newItem);
    });
});

// /* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/stories/:id', jsonParser, (req, res) => {
//   const {title, content} = req.body;
  const requiredFields = ['title', 'content', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }

  //   /***** Never Trust Users! *****/
  
  knex('stories').returning(['title', 'id', 'content'])
    .where('stories.id', req.params.id)
    .update({
      title: req.body.title,
      content: req.body.content
    }).then(([updatedItem]) => {
      return res.status(200).json(updatedItem);
    });
});

// /* ========== DELETE/REMOVE A SINGLE ITEM ========== */

router.delete('/stories/:id', (req, res) => {
  knex('stories').where('stories.id', req.params.id)
    .del().then(emptyBody => {
      return res.status(204);
    });
});

module.exports = router;