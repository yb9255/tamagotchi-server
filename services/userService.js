const jwt = require('jsonwebtoken');

function createServerToken(id) {
  return jwt.sign(id.toHexString(), process.env.TOKEN_SECRET);
}

module.exports = {
  createServerToken,
};
