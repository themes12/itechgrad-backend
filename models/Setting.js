const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema(
  {
    _id: String,
    semester: Number,
    year: Date,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Setting", SettingSchema);
