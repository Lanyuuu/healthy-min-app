const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  href: { type: String },
  type: { type: Number, default: 1 },
  components: [
    {
      unit_name: { type: String },
      calorie: { type: Number },
      fat: { type: Number },
      carbohydrate: { type: Number },
      protein: { type: Number },
      fat_calorie_rate: { type: Number },
      carbohydrate_calorie_rate: { type: Number },
      protein_calorie_rate: { type: Number },
    },
  ],
});
module.exports = mongoose.model("Sport", schema, "sports");
