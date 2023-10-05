const mongoose = require("mongoose");
const PlanSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    content: [
        {
            en: {
                name: String,
                html: String,
            },
            th: {
                name: String,
                html: String,
            },
        },
    ],
    name_en: String,
    name_th: String,
});

module.exports = mongoose.model("Plan", PlanSchema);
