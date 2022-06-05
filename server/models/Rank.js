const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  kind: { type: String },
});
module.exports = mongoose.model("Rank", schema, "ranks");
