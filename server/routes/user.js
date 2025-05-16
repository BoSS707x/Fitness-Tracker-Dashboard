const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMiddleware');
const User = require('../models/User');

// GET current user info
router.get('/', ensureAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// UPDATE user info
router.put('/', ensureAuth, async (req, res) => {
  try {
    // Directly parse & prepare
    const displayName = typeof req.body.displayName === 'string' ? req.body.displayName.trim() : undefined;
    const age = parseInt(req.body.age);
    const height = parseInt(req.body.height);
    const weight = parseInt(req.body.weight);

    const update = {
      ...(displayName && { displayName }),
      ...(Number.isInteger(age) && { age }),
      ...(Number.isInteger(height) && { height }),
      ...(Number.isInteger(weight) && { weight })
    };

    // Final fallback
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: 'No valid data to update' });
    }

    await User.findByIdAndUpdate(req.user.id, update);
    res.status(200).json({ message: 'Profile updated', update });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

module.exports = router;
