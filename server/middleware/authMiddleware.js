// Protect routes middleware
module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/auth/google');
      }
    }
  };
  