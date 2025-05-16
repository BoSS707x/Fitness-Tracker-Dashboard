const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMiddleware');
const User = require('../models/User');

router.post('/', ensureAuth, async (req, res) => {
  try {
    const { age, height, weight } = req.body;

    if (!age || !height || !weight) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    await User.findByIdAndUpdate(req.user.id, {
      age: Number(age),
      height: Number(height),
      weight: Number(weight)
    });

    res.status(200).json({ message: 'Profile saved' });
  } catch {
    res.status(500).json({ message: 'Error saving profile' });
  }
});

module.exports = router;
