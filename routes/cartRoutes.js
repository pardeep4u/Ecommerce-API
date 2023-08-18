const express = require("express");

const cartRouter = express.Router();
const {
  addItemToCart,
  decreaseQuantityOfProduct,
  getAllCart,
} = require("../controller/cartController");
const { verifyToken } = require("../util/jwt");

cartRouter.post("/add", verifyToken, addItemToCart);
cartRouter.put("/decrease", verifyToken, decreaseQuantityOfProduct);
cartRouter.get("/show", verifyToken, getAllCart);

module.exports = {
  cartRouter,
};
