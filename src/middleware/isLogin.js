const passport = require('passport');

module.exports = function isLogin(req, res, next) {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    // console.log(req.header('Authorization'));
    // passport.jwt token === undefined
    if (!user) {
      return res
        .status(401)
        .json([{ msg: 'JsonWebTokenError: invalid signature' }]);
    }
    if (user) {
      req.user = user._id;
    }
    next();
  })(req, res, next);
};
