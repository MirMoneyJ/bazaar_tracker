const mongoose = require('mongoose');

// Define the schema for the item
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, {collection: 'users'});

// Export the model for use in other files
module.exports = mongoose.model('userCredentials', userSchema);