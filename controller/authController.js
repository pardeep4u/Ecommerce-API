const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { AuthModel } = require("../model/authModel");

const postSignUp = async (req, res, next) => {
  // Check if email is already exist.

  const ifAlreadyEmailExist = await AuthModel.findOne({
    email: req.body.email,
  });
  if (ifAlreadyEmailExist) {
    res.status(409).json({
      message: "email Already exist",
    });
    return;
  }

  // setting up Hashed Password
  const newPass = await bcrypt.hash(req.body.password, 7);
  const data = {
    email: req.body.email,
    password: newPass,
  };

  try {
    // Put in try catch block
    await AuthModel.insertMany([{ ...data, verified: false }]);

    res.status(200).json({
      message: "Succesfully Regetired!",
    });
  } catch (errorInTryCatch) {
    createError(createError(500, errorInTryCatch));
  }
};

const postLogin = async (req, res, next) => {
  // Finding the USer
  const ifAlreadyExist = await AuthModel.findOne({
    email: req.body.email,
  });

  // Succesfully find a user
  if (ifAlreadyExist) {
    bcrypt.compare(req.body.password, ifAlreadyExist.password).then((value) => {
      // PassWord Matched
      if (value) {
        const obj = {
          email: ifAlreadyExist.email,
          id: ifAlreadyExist.id,
        };
        jwt.sign(
          obj,
          process.env.JWT_SECRET,
          { expiresIn: "10m" },
          (tokenError, token) => {
            // IF there is any token error
            if (tokenError) {
              res.status(500).json({
                tokenError,
              });
              return;
            }
            res.status(200).json({
              user: obj,
              isVerified: value,
              token,
            });
          }
        );
      } else {
        next(createError(400, "Incorrect Password!"));
      }
    });
  } else {
    // If no user found
    next(createError(400, "No user Find With this email"));
    return;
  }
};

module.exports = {
  postSignUp,
  postLogin,
};
