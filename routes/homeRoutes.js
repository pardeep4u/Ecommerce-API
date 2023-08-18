const express = require("express");

const homeRouter = express.Router();
const {
  allProduct,
  singleProduct,
  getAllCategory,
} = require("../controller/productController");

homeRouter.get("/all-products", allProduct);
homeRouter.get("/single-product/:id", singleProduct);
homeRouter.get("/get-all-categories", getAllCategory);

module.exports = {
  homeRouter,
};
