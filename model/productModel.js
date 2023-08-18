const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
    default: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Trivious-Product", productSchema);

module.exports = {
  Product,
};
