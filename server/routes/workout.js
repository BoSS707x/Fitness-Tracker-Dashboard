const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMiddleware');
const Workout = require('../models/Workout');

// Get workouts for current user
router.get('/', ensureAuth, async (req, res) => {
  const workouts = await Workout.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(workouts);
});

// Create workout
router.post('/', ensureAuth, async (req, res) => {
  const { type, duration, calories } = req.body;
  const workout = await Workout.create({
    user: req.user.id,
    type,
    duration,
    calories
  });
  res.json(workout);
});

// Update workout
router.put('/:id', ensureAuth, async (req, res) => {
  const updated = await Workout.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { $set: req.body },
    { new: true }
  );
  res.json(updated);
});

// Delete workout
router.delete('/:id', ensureAuth, async (req, res) => {
  await Workout.deleteOne({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'Workout deleted' });
});

module.exports = router;
