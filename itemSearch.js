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
  requirements: [{
    item: String,
    quantity: Number
  }],
}, {collection: 'craftableItems'});

// Export the model for use in other files
module.exports = mongoose.model('CraftableItem', craftableItemSchema);

