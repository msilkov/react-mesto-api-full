const { BAD_REQUEST } = require('../utils/utils');

class BadRequestError extends Error {
  constructor(message = 'Переданы некорректные данные') {
    super(message);
    this.statusCode = BAD_REQUEST;
    this.message = message;
  }
}

module.exports = BadRequestError;
