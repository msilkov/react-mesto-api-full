const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

const { NODE_ENV, JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-some-secret-key');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;

  next();
};

module.exports = {
  auth,
};
