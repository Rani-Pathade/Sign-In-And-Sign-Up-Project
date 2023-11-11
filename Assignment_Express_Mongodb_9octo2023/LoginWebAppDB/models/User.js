const mongoose = require("mongoose");

// create user scehma
const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
});

// create mongodb model using schema
const User = mongoose.model("User", userSchema);

// exports personModel
module.exports = User;
