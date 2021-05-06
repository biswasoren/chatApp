const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  //   mId: {
  //     type: String,
  //     },
  message: {
    type: String,
    unique: false,
  },
  time: {
    type: Date,
    unique: false,
  },
  tone: {
    type: String,
    unique: false,
  },
  sent_from: {
    type: String,
    unique: false,
  },
});
module.exports = mongoose.model("Message", msgSchema);
