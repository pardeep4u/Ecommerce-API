const express = require("express");
const orderRouter = express.Router();

const {
  addOrder,
  showOrder,
  fetchDetail,
} = require("../controller/orderController");
const { verifyToken } = require("../util/jwt");

orderRouter.post("/place", verifyToken, addOrder);
orderRouter.get("/get-order-detail/:orderId", verifyToken, fetchDetail);
orderRouter.get("/show", verifyToken, showOrder);

module.exports = {
  orderRouter,
};
