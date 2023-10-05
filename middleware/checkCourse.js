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

const checkTypeIndex = (req, res, next) => {
    const index = req.params.index;
    if (!index) {
        return res.sendStatus(404);
    }

    req.index = index;
    return next();
};

const checkTypeObjectId = (req, res, next) => {
    const id = req.params.typeId;
    if (!id) {
        return res.sendStatus(404);
    }

    req.id = id;
    return next();
};

const checkProgramObjectId = (req, res, next) => {
    const id = req.params.programId;
    if (!id) {
        return res.sendStatus(404);
    }

    req.id = id;
    return next();
};

const checkPlanObjectId = (req, res, next) => {
    const id = req.params.planId;
    if (!id) {
        return res.sendStatus(404);
    }

    req.id = id;
    return next();
};

module.exports = {
    checkDegree,
    checkCourseId,
    checkTypeIndex,
    checkTypeObjectId,
    checkProgramObjectId,
    checkPlanObjectId,
};
