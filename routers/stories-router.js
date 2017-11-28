'use strict';

const express = require('express');

const {DATABASE_URL} = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect(DATABASE_URL, { useMongoClient: true });

const {STORY} = require('../models');

const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/stories', (req, res) => {
});

/* ========== GET/READ SINGLE ITEMS ========== */
router.get('/stories/:id', (req, res) => {
});

// /* ========== POST/CREATE ITEM ========== */
router.post('/stories', jsonParser, (req, res) => {
});

// /* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/stories/:id', jsonParser, (req, res) => {
});

// /* ========== DELETE/REMOVE A SINGLE ITEM ========== */

router.delete('/stories/:id', (req, res) => {
});

module.exports = router;