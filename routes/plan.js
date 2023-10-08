var express = require("express");
var router = express.Router();
const {
  checkDegree,
  checkPlanObjectId,
  checkProgramObjectId,
} = require("../middleware/checkCourse");
const Plan = require("../models/Plan");
const Program = require("../models/Program");
const { default: mongoose } = require("mongoose");

/* GET home page. */
router.get("/:degree", [checkDegree], async function (req, res, next) {
  return res.json({ success: true });
});

router.get(
  "/:degree/:planId",
  [checkDegree, checkPlanObjectId],
  async function (req, res, next) {
    const id = req.id;
    try {
      const plan = await Plan.findOne({
        _id: new mongoose.Types.ObjectId(id),
      });
      return res.json({ plan: plan });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
);

router.get(
  "/:degree/:programId/plans",
  [checkProgramObjectId, checkDegree],
  async function (req, res, next) {
    const program = await Program.findOne(
      { _id: req.id },
      { _id: 1, type: 1, name_en: 1, name_th: 1 }
    )
      .populate("type", "name_th name_en")
      .exec();
    return res.json({ program: program });
  }
);

router.get(
  "/:degree/:programId/plans/all",
  [checkProgramObjectId, checkDegree],
  async function (req, res, next) {
    const program = await Program.findOne({ _id: req.id })
      .populate("type", "content en th")
      .exec();
    return res.json({ program: program });
  }
);

router.post(
  "/:degree/:programId/:planId",
  [checkDegree, checkProgramObjectId, checkPlanObjectId],
  async function (req, res, next) {
    const { degree, programId, planId } = req.params;
    try {
      const plan = await Plan.updateOne({ _id: planId }, { ...req.body });
      return res.json({ success: true });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
);

router.put(
  "/:degree/:programId",
  [checkDegree, checkProgramObjectId],
  async function (req, res, next) {
    try {
      const plan = await Plan.create({
        ...req.body,
      });
      const program = await Program.updateOne(
        { _id: req.id },
        { $push: { type: plan._id } }
      );
      return res.json({ success: true });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
);

router.delete(
  "/:degree/:planId",
  [checkDegree, checkPlanObjectId],
  async function (req, res, next) {
    const id = req.id;
    try {
      await Plan.deleteOne({ _id: id });
      return res.json({ success: true });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
);

module.exports = router;
