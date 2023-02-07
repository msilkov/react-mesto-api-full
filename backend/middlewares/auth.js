const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-some-secret-key');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }
  req.user = payload;

  return next();
};

module.exports = {
  auth,
};
