const passport = require("passport");
require("../config/passport");
const { httpCode } = require("./constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    let token = null;

    if (req.get("Authorization")) {
      token = req.get("Authorization").split(" ")[1];
    }

    if (!user || error || token !== user.token) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: "error",
        code: httpCode.UNAUTHORIZED,
        message: "Unathorized. Access is denied!",
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
