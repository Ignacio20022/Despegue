const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  // lastname:{
  //     type: String,
  //     required: true
  // },

  // age:{
  //     type: Number,
  //     required: true
  // },

  password: {
    type: String,
    required: true,
  },

  purchaseHistory: {
    type: mongoose.Schema.Types.ObjectId,ref:'History'
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  // gender: {
  //     type: String,
  //     required: true
  // },
  // phone: {
  //     type: Number,
  //     required: false
  // },
  // admin: {
  //     type: Boolean,
  //     required: false
  // },
  googleId: {
    type: String,
  },
});
User.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

User.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", User);
