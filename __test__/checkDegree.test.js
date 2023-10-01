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
/*
    TEST
  */
describe('checkDegree', () => {

    // Returns the correct degree object when given a valid degree parameter in the request.
    it('should return the correct degree object when given a valid degree parameter', () => {
      const req = {
        params: {
          degree: 'master-degree'
        }
      };
      const res = {
        sendStatus: jest.fn()
      };
      const next = jest.fn();

      checkDegree(req, res, next);

      expect(req.degree).toBe('ms');
      expect(res.sendStatus).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    // Sets the degree object on the request object.
    it('should set the degree object on the request object', () => {
      const req = {
        params: {
          degree: 'phd'
        }
      };
      const res = {
        sendStatus: jest.fn()
      };
      const next = jest.fn();

      checkDegree(req, res, next);

      expect(req.degree).toBe('phd');
      expect(res.sendStatus).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    // Calls the next middleware function.
    it('should call the next middleware function', () => {
      const req = {
        params: {
          degree: 'phd'
        }
      };
      const res = {
        sendStatus: jest.fn()
      };
      const next = jest.fn();

      checkDegree(req, res, next);

      expect(req.degree).toBe('phd');
      expect(res.sendStatus).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    // Returns a 404 status code when given an invalid degree parameter in the request.
    it('should return a 404 status code when given an invalid degree parameter', () => {
      const req = {
        params: {
          degree: 'invalid-degree'
        }
      };
      const res = {
        sendStatus: jest.fn()
      };
      const next = jest.fn();

      checkDegree(req, res, next);

      expect(req.degree).toBeUndefined();
      expect(res.sendStatus).toHaveBeenCalledWith(404);
      expect(next).not.toHaveBeenCalled();
    });

    // Does not set the degree object on the request object when given an invalid degree parameter in the request.
    it('should not set the degree object on the request object when given an invalid degree parameter', () => {
      const req = {
        params: {
          degree: 'invalid-degree'
        }
      };
      const res = {
        sendStatus: jest.fn()
      };
      const next = jest.fn();

      checkDegree(req, res, next);

      expect(req.degree).toBeUndefined();
      expect(res.sendStatus).toHaveBeenCalledWith(404);
      expect(next).not.toHaveBeenCalled();
    });

    // Does not call the next middleware function when given an invalid degree parameter in the request.
    it('should not call the next middleware function when given an invalid degree parameter', () => {
      const req = {
        params: {
          degree: 'invalid-degree'
        }
      };
      const res = {
        sendStatus: jest.fn()
      };
      const next = jest.fn();

      checkDegree(req, res, next);

      expect(req.degree).toBeUndefined();
      expect(res.sendStatus).toHaveBeenCalledWith(404);
      expect(next).not.toHaveBeenCalled();
    });
});
