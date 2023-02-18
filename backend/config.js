const { NODE_ENV, JWT_SECRET, PORT = 3000 } = process.env;

module.exports = {
  NODE_ENV, JWT_SECRET, PORT,
};
