const mongoose = require("mongoose");
const dotenv = require("dotenv");

module.exports = function DBConnect() {
  // read envionment variables from .env file
  dotenv.config();

  // establish connection with mongodb db
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connection with mongodb is established"))
    .catch((error) => console.error(error));
};
