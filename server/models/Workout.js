const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
}, { timestamps: true }); // ✅ important for createdAt

module.exports = mongoose.model('Workout', WorkoutSchema);
