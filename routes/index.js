var express = require("express");
var router = express.Router();
const degreeJson = require("../utils/degree.json");
const Course = require("../models/Course");
const datatablesQuery = require("datatables-query");
/* GET home page. */
router.get("/courses/:degree", async function (req, res, next) {
    const degree = degreeJson[req.params.degree];
    if (!degree) {
        return res.sendStatus(404);
    }
    const courses = await Course.find({ degree: degree, is_show: true }).exec();
    return res.json({ courses: courses });
});

module.exports = router;
