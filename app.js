const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts-router");

const app = express();

const loggerFormats = app.get("env") === "development" ? "dev" : "short";

app.use(logger(loggerFormats));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res
    .status(404)
    .json({ status: "error", code: 404, message: "Incorrect route" });
});

app.use((err, req, res, next) => {
  const code = err.code || 500;
  const status = err.status || "fail";

  res.status(code).json({ status, code, message: err.message });
});

module.exports = app;
