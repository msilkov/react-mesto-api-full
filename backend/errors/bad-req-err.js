const { BAD_REQUEST } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message = 'Переданы некорректные данные') {
    super(message);
    this.statusCode = BAD_REQUEST;
    this.message = message;
  }
}

module.exports = BadRequestError;
