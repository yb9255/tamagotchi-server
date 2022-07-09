const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  picture: String,
  state: {
    type: String,
    default: 'INIT',
  },
  growth: {
    type: String,
    default: 'INIT',
  },
  fun: {
    type: Number,
    default: -1,
  },
  hunger: {
    type: Number,
    default: -1,
  },
  birthCount: {
    type: Number,
    default: -1,
  },
  tiredness: {
    type: Number,
    default: -1,
  },
  exp: {
    type: Number,
    default: -1,
  },
  happiness: {
    type: Number,
    default: -1,
  },
  profileName: {
    type: String,
    default: null,
  },
  profileDescription: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('User', UserSchema);
