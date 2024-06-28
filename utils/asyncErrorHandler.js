const CustomError = require("./CustomError");

const asyncErrorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    next(new CustomError(err.message, 500));
  });
};

module.exports = asyncErrorHandler;
