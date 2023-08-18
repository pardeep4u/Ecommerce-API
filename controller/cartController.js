const { CartModel } = require("../model/cartModel");
const { Product } = require("../model/productModel");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const createHttpError = require("http-errors");

const addItemToCart = async (req, res, next) => {
  jwt.verify(
    req.token,
    process.env.JWT_SECRET,
    async (errorToken, authdata) => {
      if (errorToken) {
        next(createHttpError(401, "Your Session Has Expired"));
        return;
      }

      try {
        const { productId, quantity } = req.body;

        // Find the product to add to the cart
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        const ID = authdata.id;

        // Find the user's cart or create a new cart
        let cart = await CartModel.findOne({ userId: ID });
        if (!cart) {
          cart = new CartModel({ userId: ID });
        }

        // Check if the product is already in the cart, if so, update the quantity
        const existingProductIndex = cart.products.findIndex((item) =>
          item.productId.equals(productId)
        );
        if (existingProductIndex !== -1) {
          cart.products[existingProductIndex].quantity += Number(quantity);
        } else {
          cart.products.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error adding item to cart", error: err });
      }
    }
  );
};

const decreaseQuantityOfProduct = async (req, res, next) => {
  jwt.verify(
    req.token,
    process.env.JWT_SECRET,
    async (errorToken, authdata) => {
      if (errorToken) {
        next(createHttpError(401, "Your Session Has Expired"));
        return;
      }

      try {
        const { productId } = req.body;

        // Find tHE CART
        const cart = await CartModel.findOne({ userId: authdata.id });
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }

        const existingProductIndex = cart.products.findIndex((item) =>
          item.productId.equals(productId)
        );
        if (existingProductIndex === -1) {
          return res.status(404).json({ message: "Product not found in cart" });
        }

        const product = cart.products[existingProductIndex];
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          cart.products.splice(existingProductIndex, 1);
        }

        await cart.save();
        res.json(cart);
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error adding item to cart", error: err });
      }
    }
  );
};

const getAllCart = async (req, res, next) => {
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
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }

        res.json(cart);
      } catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err });
      }
    }
  );
};

module.exports = {
  addItemToCart,
  getAllCart,
  decreaseQuantityOfProduct,
};
