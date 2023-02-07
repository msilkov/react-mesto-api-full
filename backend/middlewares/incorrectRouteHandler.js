const NotFoundError = require('../errors/not-found-err');

const incorrectRouteHandler = (req, res, next) => {
  next(new NotFoundError('page'));
};

module.exports = {
  incorrectRouteHandler,
};
