const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  age: Number,
  height: Number,
  weight: Number
});

module.exports = mongoose.model('User', UserSchema);
