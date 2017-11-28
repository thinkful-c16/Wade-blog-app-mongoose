'use strict';

const mongoose = require('mongoose');

const storySchema = mongoose.Schema({});

const Story = mongoose.model('Story', storySchema);

module.exports = {Story};