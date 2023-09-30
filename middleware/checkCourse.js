const degreeJson = require("../utils/degree.json");
const checkDegree = (req, res, next) => {
  const degree = degreeJson[req.params.degree];
  if (!degree) {
    return res.sendStatus(404);
  }

  req.degree = degree;
  return next();
};

const checkCourseId = (req, res, next) => {
  const course_id = req.params.course_id;
  if (!course_id) {
    return res.sendStatus(404);
  }

  req.course_id = course_id;
  return next();
};

module.exports = {
  checkDegree,
  checkCourseId,
};
