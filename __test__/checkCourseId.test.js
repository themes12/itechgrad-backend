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

describe('checkCourseId', () => {

    // When a valid course_id is provided in the request parameters, the function should set the course_id in the request object and call the next middleware.
    it('should set the course_id in the request object and call the next middleware when a valid course_id is provided', () => {
      const req = { params: { course_id: 'validCourseId' } };
      const res = {};
      const next = jest.fn();

      checkCourseId(req, res, next);

      expect(req.course_id).toBe('validCourseId');
      expect(next).toHaveBeenCalled();
    });

    // When a valid course_id is provided in the request parameters, the function should not send any response.
    it('should not send any response when a valid course_id is provided', () => {
      const req = { params: { course_id: 'validCourseId' } };
      const res = { sendStatus: jest.fn() };
      const next = jest.fn();

      checkCourseId(req, res, next);

      expect(res.sendStatus).not.toHaveBeenCalled();
    });

    // When no course_id is provided in the request parameters, the function should send a 404 status response.
    it('should send a 404 status response when no course_id is provided', () => {
      const req = { params: {} };
      const res = { sendStatus: jest.fn() };
      const next = jest.fn();

      checkCourseId(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    // When the course_id is an empty string, the function should send a 404 status response.
    it('should send a 404 status response when the course_id is an empty string', () => {
      const req = { params: { course_id: '' } };
      const res = { sendStatus: jest.fn() };
      const next = jest.fn();

      checkCourseId(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    // When the course_id is not a string, the function should send a 404 status response.
    it('should send a 404 status response when the course_id is not a string', () => {
      const req = { params: { course_id: null } };
      const res = { sendStatus: jest.fn() };
      const next = jest.fn();

      checkCourseId(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    // When the course_id contains special characters, the function should not send a 404 status response.
    it('should not send a 404 status response when the course_id contains special characters', () => {
      const req = { params: { course_id: 'course@id' } };
      const res = { sendStatus: jest.fn() };
      const next = jest.fn();

      checkCourseId(req, res, next);

      expect(res.sendStatus).not.toHaveBeenCalledWith(404);
    });

    // When the course_id is longer than 50 characters, the function should not send a 404 status response.
    it('should not send a 404 status response when the course_id is longer than 50 characters', () => {
      const req = { params: { course_id: 'a'.repeat(51) } };
      const res = { sendStatus: jest.fn() };
      const next = jest.fn();

      checkCourseId(req, res, next);

      expect(res.sendStatus).not.toHaveBeenCalledWith(404);
      expect(next).toHaveBeenCalled();
    });

    // When the course_id is a negative number, the function should call the next function.
    it('should call the next function when the course_id is a negative number', () => {
      const req = { params: { course_id: -1 } };
      const res = { sendStatus: jest.fn() };
      const next = jest.fn();

      checkCourseId(req, res, next);

      expect(res.sendStatus).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    // When the course_id is a decimal number, the function should send a 404 status response.
    it('should send a 404 status response when the course_id is a decimal number', () => {
      const req = { params: { course_id: undefined } };
      const res = { sendStatus: jest.fn() };
      const next = jest.fn();

      checkCourseId(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
      expect(next).not.toHaveBeenCalled();
    });
});
