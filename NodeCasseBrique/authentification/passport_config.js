const userModel = require('../models').User;
const passport = require('passport');
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('login', new localStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {

    const user = await userModel.findOne({ where:{username: username}  });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return done(null, false, { message: 'Wrong Password' });
    }
    else {
      return done(null, user, { message: 'Logged in Successfully' });
    }
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JWTstrategy({
  secretOrKey: 'top_secret',
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));