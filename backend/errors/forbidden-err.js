const { FORBIDDEN } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(marker, message = 'У пользователя не хватает прав доступа к запрашиваемому ресурсу') {
    super(message);
    this.statusCode = FORBIDDEN;
    this.message = message;
    this.marker = this.messageHandler(marker);
  }

  messageHandler(marker) {
    if (marker === 'card') {
      this.message = 'Можно удалять только свои карточки';
    }
  }
}
module.exports = ForbiddenError;
