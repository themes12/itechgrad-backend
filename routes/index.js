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

router.get(
  "/course/:course_id",
  [checkCourseId],
  async function (req, res, next) {
    const course_id = req.course_id;
    try {
      const course = await Course.findOne({ _id: course_id });
      return res.json({ course: course });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
);

router.post(
  "/course/:degree/:course_id",
  [checkCourseId, checkDegree],
  async function (req, res, next) {
    const course_id = req.course_id;
    const degree = req.degree;
    try {
      await Course.updateOne(
        {
          _id: course_id,
        },
        {
          ...req.body,
          degree: degree,
        }
      );
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

router.put("/course/:degree", [checkDegree], async function (req, res, next) {
  const degree = req.degree;
  try {
    await Course.create({
      ...req.body,
      degree: degree,
    });
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/setting/acdemic-year", async function (req, res, next) {
  console.log(req.body);
  try {
    await Setting.updateOne({ _id: "academic-year" }, { ...req.body });
    return res.json({ success: true });
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = router;
