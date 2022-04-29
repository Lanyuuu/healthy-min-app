const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  openid: { type: String },
  session_key: { type: String, select: false },
  username: { type: String },
  avatar: { type: String },
  gender: { type: Number },
  height: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  target: { type: Number, default: 0 },
  age: { type: Number, default: 0 },
});
module.exports = mongoose.model("User", schema, "users");
