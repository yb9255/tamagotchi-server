const User = require('../models/User');
const asyncCatcher = require('../utils/asyncCatcher');
const { createServerToken } = require('../services/userService');

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
      profileName: targetUser.profileName,
      profileDescription: targetUser.profileDescription,
    },
  });
});

const patchUserInformation = asyncCatcher(async (req, res, next) => {
  const { userId } = req;
  const newInformation = req.body.newInformation;

  await User.findByIdAndUpdate(userId, {
    state: newInformation.state,
    growth: newInformation.growth,
    fun: newInformation.fun,
    hunger: newInformation.hunger,
    birthCount: newInformation.birthCount,
    tiredness: newInformation.tiredness,
    exp: newInformation.exp,
    happiness: newInformation.happiness,
    profileName: newInformation.profileName,
    profileDescription: newInformation.profileDescription,
  });

  res.json({
    ok: true,
    status: 200,
  });
});

const patchProfile = asyncCatcher(async (req, res, next) => {
  const { userId } = req;
  const { profileName, profileDescription } = req.body.newProfile;

  await User.findByIdAndUpdate(userId, {
    profileName,
    profileDescription,
  });

  res.json({
    ok: true,
    status: 200,
  });
});

module.exports = {
  postLogin,
  getUserInformation,
  patchUserInformation,
  patchProfile,
};
