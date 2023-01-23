const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const noteSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User  ",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("Note", noteSchema);
