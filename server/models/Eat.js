const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  openid: { type: String },
  eat_score: { type: Number },
  exercise: { type: Number },
  breakfast: [
    {
      eat_id: { type: String },
      eat_time: { type: String },
      food_name: { type: String },
      unit_name: { type: String },
      fid: { type: String },
      eat_num: { type: Number },
      unit_id: { type: Number },
      calorie: { type: Number },
      fat: { type: Number },
      carbohydrate: { type: Number },
      protein: { type: Number },
      eat_type: { type: Number },
    }
  ],
  lunch: [{
    eat_id: { type: String },
    eat_time: { type: String },
    food_name: { type: String },
    unit_name: { type: String },
    fid: { type: String },
    eat_num: { type: Number },
    unit_id: { type: Number },
    calorie: { type: Number },
    fat: { type: Number },
    carbohydrate: { type: Number },
    protein: { type: Number },
    eat_type: { type: Number },
  }],
  dinner: [{
    eat_id: { type: String },
    eat_time: { type: String },
    food_name: { type: String },
    unit_name: { type: String },
    fid: { type: String },
    eat_num: { type: Number },
    unit_id: { type: Number },
    calorie: { type: Number },
    fat: { type: Number },
    carbohydrate: { type: Number },
    protein: { type: Number },
    eat_type: { type: Number },
  }],
  snacks: [{
    eat_id: { type: String },
    eat_time: { type: String },
    food_name: { type: String },
    unit_name: { type: String },
    fid: { type: String },
    eat_num: { type: Number },
    unit_id: { type: Number },
    calorie: { type: Number },
    fat: { type: Number },
    carbohydrate: { type: Number },
    protein: { type: Number },
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
  eatCurrent: [
    {
      name: { type: String },
      id: { type: String },
    },
  ],
  eatRank: [
    {
      name: { type: String },
      kind: { type: String },
    },
  ],
});
module.exports = mongoose.model("Eat", schema, "eats");
