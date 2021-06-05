const rateLimit = require("express-rate-limit");
const { httpCode } = require("./constants");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    res.status(httpCode.BAD_REQUEST).json({
      status: "error",
      code: httpCode.BAD_REQUEST,
      message: "Too many requests, please try again later",
    });
  },
});

module.exports = limiter;
