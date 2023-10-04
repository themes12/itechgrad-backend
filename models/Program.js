const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  degree: String,
  type: mongoose.Types.Array({
    content: mongoose.Types.Array({
      en: {
        name: String,
        html: String,
      },
      th: {
        name: String,
        html: String,
      },
    }),
    name_en: String,
    name_th: String,
  }),
  name_en: String,
  name_th: String,
});

module.exports = mongoose.model("Program", ProgramSchema);
