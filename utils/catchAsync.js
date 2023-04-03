function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

module.exports = catchAsync;

//Wrapper function for catching errors in async functions
