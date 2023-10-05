const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    _id: String,
    degree: String,
    name_en: String,
    name_th: String,
    credit: {
        total: { type: Number, required: false },
        lecture: { type: Number, required: true },
        lab: { type: Number, required: true },
        independent_study: { type: Number, required: true },
    },
    prerequisite: [mongoose.SchemaTypes.Mixed],
    description_en: String,
    description_th: String,
    is_show: Boolean,
});

module.exports = mongoose.model("Course", CourseSchema);
