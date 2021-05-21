const mongoose = require("mongoose");
require("dotenv").config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to database");
});

mongoose.connection.on("error", (error) => {
  console.log(`Database connection error: ${error.message}`);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from database");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Disconnected from MongoDB");
    process.exit();
  });
});

module.exports = db;
