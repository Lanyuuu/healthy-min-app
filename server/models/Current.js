const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  id: { type: String },
});
module.exports = mongoose.model("Current", schema);
