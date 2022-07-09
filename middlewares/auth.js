const admin = require('../firebase/firebase-config');
const CustomError = require('../utils/CustomError');

const asyncCatcher = require('../utils/asyncCatcher');
const { INVALID_TOKEN, UNAUTHORIZED } = require('../constants/errorConstants');

const verifyToken = asyncCatcher(async (req, res, next) => {
  const [bearer, token] = req.body.accessToken.split(' ');

  if (bearer !== 'BEARER') {
    return next(new CustomError(INVALID_TOKEN));
  }

  const userInfo = await admin.auth().verifyIdToken(token);

  if (!userInfo.email_verified) {
    return next(new CustomError(UNAUTHORIZED));
  }

  req.userInfo = userInfo;

  next();
});

module.exports = {
  verifyToken,
};
