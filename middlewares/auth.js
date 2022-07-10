const admin = require('../firebase/firebase-config');
const CustomError = require('../utils/CustomError');
const asyncCatcher = require('../utils/asyncCatcher');
const jwt = require('jsonwebtoken');

const {
  INVALID_TOKEN,
  UNAUTHORIZED,
  TOKEN_DOES_NOT_EXIST,
} = require('../constants/errorConstants');

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

const isLoggedIn = asyncCatcher(async (req, res, next) => {
  if (!req.cookies['server_token']) {
    return next(new Error(TOKEN_DOES_NOT_EXIST));
  }

  const userIdToken = req.cookies['server_token'];
  console.log(userIdToken);
  const userId = jwt.verify(userIdToken, process.env.TOKEN_SECRET);
  req.userId = userId;

  next();
});

module.exports = {
  verifyToken,
  isLoggedIn,
};
