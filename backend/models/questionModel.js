const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  correctOption: {
    type: Number,
    reuired: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
