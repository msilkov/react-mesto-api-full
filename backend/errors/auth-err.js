const { UNAUTHORIZED } = require('../utils/utils');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}
module.exports = AuthError;
