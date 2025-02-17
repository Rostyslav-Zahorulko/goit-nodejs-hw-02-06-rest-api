const passport = require("passport");

const { Strategy, ExtractJwt } = require("passport-jwt");

const usersModel = require("../model/users-model");

require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await usersModel.getById(payload.id);

      if (!user) {
        return done(new Error("User is not found"), false);
      }

      if (!user.token) {
        return done(null, false);
      }

      if (!user.isVerified) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
