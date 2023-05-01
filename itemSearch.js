const mongoose = require('mongoose');

// Define the schema for the craftable item
const craftableItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  requirements: String 
});

// Export the model for use in other files
module.exports = mongoose.model('Item', craftableItemSchema);
