const mongoose = require("mongoose");
const Db = require("../db");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

module.exports = Db.model("User", UserSchema);
