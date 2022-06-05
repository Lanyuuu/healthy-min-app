const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  openid: { type: String },
  data: { type: String },
  eat_score: { type: Number },
  exercise: { type: Number },
  breakfast: [
    {
      eat_time: { type: String },
      unit_name: { type: String },
      food_id: { type: String },
      eat_num: { type: Number },
      unit_id: { type: Number },
      // calorie: { type: Number },
      // fat: { type: Number },
      // carbohydrate: { type: Number },
      // protein: { type: Number },
      eat_type: { type: Number },
    }
  ],
  lunch: [{
    eat_time: { type: String },
    unit_name: { type: String },
    food_id: { type: String },
    eat_num: { type: Number },
    unit_id: { type: Number },
    // calorie: { type: Number },
    // fat: { type: Number },
    // carbohydrate: { type: Number },
    // protein: { type: Number },
    eat_type: { type: Number },
  }],
  dinner: [{
    eat_time: { type: String },
    unit_name: { type: String },
    food_id: { type: String },
    eat_num: { type: Number },
    unit_id: { type: Number },
    eat_type: { type: Number },
  }],
  snacks: [{
    eat_time: { type: String },
    unit_name: { type: String },
    food_id: { type: String },
    eat_num: { type: Number },
    unit_id: { type: Number },
    // calorie: { type: Number },
    // fat: { type: Number },
    // carbohydrate: { type: Number },
    // protein: { type: Number },
    eat_type: { type: Number },
  }],
  score: {
    calorie_target: { type: Number },
    fat_target: { type: Number },
    carbohydrate_target: { type: Number },
    protein_target: { type: Number },
    calorie_today: { type: Number },
    fat_today: { type: Number },
    carbohydrate_today: { type: Number },
    protein_today: { type: Number }
  },
});
module.exports = mongoose.model("Eat", schema, "eats");
