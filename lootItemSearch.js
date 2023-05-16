const mongoose = require('mongoose');

// Define the schema for the item
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
}, {collection: 'items'});

// Export the model for use in other files
module.exports = mongoose.model('lootItem', itemSchema);

