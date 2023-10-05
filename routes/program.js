var express = require("express");
var router = express.Router();
const Program = require("../models/Program");
const {
    checkTypeObjectId,
    checkProgramObjectId,
    checkDegree,
} = require("../middleware/checkCourse");
const { default: mongoose } = require("mongoose");

// router.get("/:degree", [checkDegree], async function (req, res, next) {
//     const degree = req.degree;
//     const programs = await Program.find({ degree: degree }).exec();
//     return res.json({ programs: programs });
// });

router.get("/:degree", [checkDegree], async function (req, res, next) {
    const degree = req.degree;
    const programs = await Program.find({ degree: degree })
        .populate("type", "name_th name_en")
        .exec();
    return res.json({ programs: programs });
});

router.get(
    "/:degree/:programId",
    [checkProgramObjectId, checkDegree],
    async function (req, res, next) {
        const program = await Program.findById(req.id).exec();
        return res.json({ program: program });
    }
);

router.post(
    "/:degree/:programId",
    [checkProgramObjectId, checkDegree],
    async function (req, res, next) {
        const id = req.id;
        try {
            await Program.updateOne(
                {
                    _id: id,
                },
                {
                    ...req.body,
                }
            );
            return res.json({ success: true });
        } catch (error) {
            return res.sendStatus(500);
        }
    }
);

router.put("/:degree", [checkDegree], async function (req, res, next) {
    const degree = req.degree;
    try {
        await Program.create({
            ...req.body,
            type: [],
            degree: degree,
        });
        return res.json({ success: true });
    } catch (error) {
        return res.sendStatus(500);
    }
});

router.delete(
    "/:degree/:programId",
    [checkProgramObjectId, checkDegree],
    async function (req, res, next) {
        const id = req.id;
        try {
            await Program.deleteOne({ _id: id });
            return res.json({ success: true });
        } catch (error) {
            return res.sendStatus(500);
        }
    }
);

module.exports = router;
