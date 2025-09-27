const mongoose = require("mongoose");

// Hard-code DEBUG for development
process.env.DEBUG = "development:*";
const dbgr = require("debug")("development:mongoose");

const config = require("config");

// Basic console.log to prove file runs
console.log("mongoose-connection.js is executing");

mongoose.connect(`${config.get("MONGODB_URI")}/ecom`)
  .then(() => {
    dbgr("DB connected successfully");
    // console.log("MongoDB connected successfully"); // visible even without DEBUG
  })
  .catch((err) => {
    dbgr(err);
    // console.error("MongoDB connection error:", err);
  });

module.exports = mongoose.connection;

//  $env:DEBUG="development:*"; npx nodemon - set the env in the terminal to run the db
