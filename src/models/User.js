const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  name: String,
  description: String,
});

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
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
  profile: {
    type: profileSchema,
    deafult: null,
  },
});

module.exports = mongoose.model('User', UserSchema);
