const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", UserSchema);
