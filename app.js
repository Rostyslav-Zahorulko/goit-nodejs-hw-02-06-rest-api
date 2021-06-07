const express = require("express");
const path = require("path");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const usersRouter = require("./routes/api/users/users-router");
const contactsRouter = require("./routes/api/contacts/contacts-router");
const { httpCode } = require("./helpers/constants");
const limiter = require("./helpers/limiter");

const app = express();

const loggerFormats = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(limiter);
app.use(logger(loggerFormats));
app.use(cors());
app.use(express.json({ limit: 15000 }));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(httpCode.NOT_FOUND).json({
    status: "error",
    code: httpCode.NOT_FOUND,
    message: "Incorrect route",
  });
});

app.use((err, req, res, next) => {
  const code = err.code || httpCode.INTERNAL_SERVER_ERROR;
  const status = err.status || "fail";

  res.status(code).json({ status, code, message: err.message });
});

module.exports = app;
