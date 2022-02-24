const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userSlackId: {
    type: String,
    required: true
  },
  botUserId: {
    type: String,
    required: true
  },
  teamId: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true,
  },
  name: String,
  email: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);