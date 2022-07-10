const User = require('../models/User');
const asyncCatcher = require('../utils/asyncCatcher');
const { createServerToken } = require('../services/userService');
const { NONAME } = require('dns');

const postLogin = asyncCatcher(async (req, res, next) => {
  const { userInfo } = req;

  let targetUser = await User.findOne({
    email: userInfo.email,
  });

  if (!targetUser) {
    const user = {
      email: userInfo.email,
      picture: userInfo.picture,
    };

    targetUser = (await User.create(user))._doc;
  }

  const serverToken = createServerToken(targetUser._id);
  console.log(serverToken);

  res.cookie('server_token', serverToken, { sameSite: 'none', secure: true });

  res.json({
    ok: true,
    status: 200,
    userInformation: {
      email: targetUser.email,
      picture: targetUser.picture,
      state: targetUser.state,
      growth: targetUser.growth,
      fun: targetUser.fun,
      hunger: targetUser.hunger,
      birthCount: targetUser.birthCount,
      tiredness: targetUser.tiredness,
      exp: targetUser.exp,
      happiness: targetUser.happiness,
    },
  });
});

const getUserInformation = asyncCatcher(async (req, res, next) => {
  const { userId } = req;
  const targetUser = await User.findById(userId);

  res.json({
    ok: true,
    status: 200,
    userInformation: {
      email: targetUser.email,
      picture: targetUser.picture,
      state: targetUser.state,
      growth: targetUser.growth,
      fun: targetUser.fun,
      hunger: targetUser.hunger,
      birthCount: targetUser.birthCount,
      tiredness: targetUser.tiredness,
      exp: targetUser.exp,
      happiness: targetUser.happiness,
    },
  });
});

module.exports = {
  postLogin,
  getUserInformation,
};
