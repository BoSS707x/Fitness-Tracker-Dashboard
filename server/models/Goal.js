const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  goalType: String, // steps, distance, calories
  target: Number,
  current: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Goal', GoalSchema);
