const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc Auth with Google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc Google auth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const { age, height, weight } = req.user;
    if (!age || !height || !weight) {
      return res.redirect('/setup.html');
    }
    res.redirect('/dashboard.html');
  }
);


// @desc Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
