var express = require("express");
var router = express.Router();
const Program = require("../models/Program");
const { checkDegree, checkCourseId } = require("../middleware/checkCourse");

router.get("/", async function (req, res, next) {
  const programs = await Program.find().exec();
  return res.json({ programs: programs });
});

module.exports = router;
