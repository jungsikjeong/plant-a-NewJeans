const passport = require('passport');
const User = require('../models/User');

const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.initialize();
passport.session();

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },

    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { username } = req.body;

        let user = await User.findOne({ email });

        if (user) {
          return done(null, false, {
            msg: '이메일이 이미 존재합니다..',
          });
        }

        user = new User({
          email,
          username,
          password,
        });

        await user.save();

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user || user === null) {
          return done(null, false, {
            errors: { msg: '사용자가 존재하지 않습니다.' },
          });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {
            errors: { msg: '패스워드가 일치하지 않습니다.' },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = { passport };
