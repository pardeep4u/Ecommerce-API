const mongoose = require("mongoose");

const { Schema } = mongoose;

const authSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AuthModel = mongoose.model("trivious-user", authSchema);

module.exports = {
  AuthModel,
};
