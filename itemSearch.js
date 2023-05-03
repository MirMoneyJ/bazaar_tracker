/*
file name: itemSearch.js
purpose: creates Schema for items all of type String
authors: Lawrence, Ahmir, Krishna, Chic, Trent, Mya
version: 4/30/23
*/
const mongoose = require('mongoose');

// Define the schema for the craftable item
const craftableItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contents: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
}, {collection: 'craftableItems'});

// Export the model for use in other files
module.exports = mongoose.model('CraftableItem', craftableItemSchema);

