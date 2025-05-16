const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMiddleware');
const Goal = require('../models/Goal');

// Add new goal
router.post('/', ensureAuth, async (req, res) => {
  try {
    await Goal.create({
      user: req.user.id,
      ...req.body
    });
    res.status(201).json({ message: 'Goal added' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get all goals
router.get('/', ensureAuth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
