const { CONFLICT } = require('../utils/constants');

class ConflictError extends Error {
  constructor(marker, message = 'Конфликтное обращение к ресурсу') {
    super(message);
    this.statusCode = CONFLICT;
    this.message = message;
    this.marker = this.messageHandler(marker);
  }

  messageHandler(marker) {
    if (marker === 'email') {
      this.message = 'Пользователь с таким email уже существует';
    }
  }
}
module.exports = ConflictError;
