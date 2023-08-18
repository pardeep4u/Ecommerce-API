const express = require("express");

const authRouter = express.Router();
const { postSignUp, postLogin } = require("../controller/authController");

authRouter.post("/signup", postSignUp);
authRouter.post("/login", postLogin);

module.exports = {
  authRouter,
};
