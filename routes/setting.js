var express = require("express");
var router = express.Router();
const Setting = require("../models/Setting");

router.get("/academic-year", async function (req, res, next) {
  const academic_year = await Setting.findOne({
    _id: "academic-year",
  }).exec();
  return res.json({ academic_year });
});

router.post("/acdemic-year", async function (req, res, next) {
  console.log(req.body);
  try {
    await Setting.updateOne({ _id: "academic-year" }, { ...req.body });
    return res.json({ success: true });
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = router;
