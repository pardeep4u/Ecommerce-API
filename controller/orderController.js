const { CartModel } = require("../model/cartModel");
const { Product } = require("../model/productModel");
const { OrderModel } = require("../model/orderModel");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const createHttpError = require("http-errors");

const addOrder = async (req, res, next) => {
  // First Verify token and then extract ID of User
  jwt.verify(
    req.token,
    process.env.JWT_SECRET,
    async (errorToken, authdata) => {
      if (errorToken) {
        next(createHttpError(401, "Your Session Has Expired"));
        return;
      }

      try {
        const userId = authdata.id;
        const { shippingAddress } = req.body;

        // Fetch the cart
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }

        const productsInCart = cart.products;

        // Calculate the total amount based on product prices and quantities
        let totalAmount = 0;
        for (const product of productsInCart) {
          const productInfo = await Product.findById(product.productId);
          if (!productInfo) {
            return res.status(404).json({
              message: `Product with ID ${product.productId} not found`,
            });
          }
          totalAmount += productInfo.price * product.quantity;
        }

        // Create the order
        const order = new OrderModel({
          userId,
          products: productsInCart,
          totalAmount,
          shippingAddress,
        });

        await order.save();

        // Clear the cart after placing the order
        cart.products = [];
        await cart.save();

        res.json(order);
      } catch (err) {
        res.status(500).json({ message: "Error placing order", error: err });
      }
    }
  );
};

const showOrder = async (req, res, next) => {
  jwt.verify(
    req.token,
    process.env.JWT_SECRET,
    async (errorToken, authdata) => {
      if (errorToken) {
        next(createHttpError(401, "Your Session Has Expired"));
        return;
      }

      try {
        const userId = authdata.id;

        const orders = await OrderModel.find({ userId });
        res.json(orders);
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error fetching user orders", error: err });
      }
    }
  );
};

const fetchDetail = async (req, res) => {
  // First Verify Token
  jwt.verify(
    req.token,
    process.env.JWT_SECRET,
    async (errorToken, authdata) => {
      // If there is any error in token
      if (errorToken) {
        next(createHttpError(401, "Your Session Has Expired"));
        return;
      }

      try {
        const orderId = req.params.orderId;
        const order = await OrderModel.findById(orderId);
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error fetching order details", error: err });
      }
    }
  );
};

module.exports = {
  addOrder,
  showOrder,
  fetchDetail,
};
