const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  openid: { type: String },
  exercise: { type: Number },
  sport: [
    {
      eat_time: { type: String },
      unit_name: { type: String },
      food_id: { type: String },
      eat_num: { type: Number },
      unit_id: { type: Number },
      eat_type: { type: Number },
      type: { type: Number },
    }
  ],
  score: {
    first_target: { type: Number },
    second_target: { type: Number },
    third_target: { type: Number },
    fourth_target: { type: Number },
    first_step: { type: Number },
    second_step: { type: Number },
    third_step: { type: Number },
    fourth_step: { type: Number },
    first_date: { type: String },
    second_date: { type: String },
    third_date: { type: String },
    fourth_date: { type: String }
  },
});
module.exports = mongoose.model("Do", schema, "dos");
