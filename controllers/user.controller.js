const User = require('../models/User');
const asyncCatcher = require('../utils/asyncCatcher');

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

  res.json({
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
      id: targetUser._id,
    },
  });
});

module.exports = {
  postLogin,
};
