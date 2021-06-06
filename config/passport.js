const passport = require("passport");

const { Strategy, ExtractJwt } = require("passport-jwt");

const usersModel = require("../model/users-model");

require("dotenv").config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await usersModel.getById(payload.id);

      if (!user) {
        return done(new Error("User not found"), false);
      }

      if (!user.token) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
