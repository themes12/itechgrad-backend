var express = require("express");
var router = express.Router();
const Course = require("../models/Course");
const Setting = require("../models/Setting");
const { checkDegree, checkCourseId } = require("../middleware/checkCourse");

/* GET home page. */
router.get("/courses/:degree", [checkDegree], async function (req, res, next) {
  const degree = req.degree;
  const courses = await Course.find({ degree: degree, is_show: true }).exec();
  return res.json({ courses: courses });
});

router.get(
  "/courses/:degree/all",
  [checkDegree],
  async function (req, res, next) {
    const degree = req.degree;
    const courses = await Course.find({ degree: degree }).exec();
    return res.json({ courses: courses });
  }
);

router.post(
  "/course/:course_id/change-show-status",
  [checkCourseId],
  async function (req, res, next) {
    const course_id = req.course_id;
    const { is_show } = req.body;
    try {
      await Course.updateOne({ _id: course_id }, { is_show: is_show });
      return res.json({ success: true });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
);

router.delete(
  "/course/:course_id",
  [checkCourseId],
  async function (req, res, next) {
    const course_id = req.course_id;
    try {
      await Course.deleteOne({ _id: course_id });
      return res.json({ success: true });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
);

router.get("/setting/academic-year", async function (req, res, next) {
  const academic_year = await Setting.findOne({
    _id: "academic-year",
  }).exec();
  return res.json({ academic_year });
});

// router.post(
//   "/setting/acdemic-year",
//   async function (req, res, next) {
//     const { semester, year } = req.body;
// 	if(semester) {
// 		try {
// 			await Setting.updateOne({ _id: course_id }, { is_show: is_show });
// 			return res.json({ success: true });
// 		} catch (error) {
// 		return res.sendStatus(500);
// 		}
// 	}
//   }
// );

module.exports = router;
