const { Product } = require("../model/productModel");
const createError = require("http-errors");

/*
const dummyProducts = [
  {
    title: "Smartphone",
    price: 699.99,
    description: "A high-end smartphone with the latest features.",
    availability: true,
    category: "Electronics",
  },
  {
    title: "Laptop",
    price: 1299.99,
    description: "A powerful laptop for professional work and gaming.",
    availability: true,
    category: "Electronics",
  },
  {
    title: "Running Shoes",
    price: 89.99,
    description:
      "Comfortable running shoes for athletes and fitness enthusiasts.",
    availability: true,
    category: "Sports & Outdoors",
  },
  {
    title: "Coffee Maker",
    price: 49.99,
    description:
      "A compact coffee maker for brewing your favorite coffee at home.",
    availability: true,
    category: "Home & Kitchen",
  },
  {
    title: "Wireless Earbuds",
    price: 79.99,
    description:
      "High-quality wireless earbuds for an immersive audio experience.",
    availability: true,
    category: "Electronics",
  },
  {
    title: "Fitness Tracker",
    price: 49.99,
    description: "Track your fitness goals with this advanced fitness tracker.",
    availability: true,
    category: "Electronics",
  },
  {
    title: "Gaming Mouse",
    price: 39.99,
    description: "Precision gaming mouse for professional gamers.",
    availability: true,
    category: "Electronics",
  },
];

const addProduct = async (req, res, next) => {
  Product.insertMany(dummyProducts)
    .then(() => {
      console.log(
        "More dummy data with the same category inserted successfully"
      );
      res.send("added");
    })
    .catch((err) => {
      console.error(
        "Error inserting more dummy data with the same category:",
        err
      );
    });
};

*/

// To get all the products
const allProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(createError(500, "Error fetching products"));
  }
};

// To get a single product

const singleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    next(createError(500, "Error fetching product"));
  }
};

const getAllCategory = async (req, res) => {
  try {
    const uniqueCategories = await Product.distinct("category");
    res.status(200).json(uniqueCategories);
  } catch (err) {
    next(createError(500, "Error fetching Categories"));
  }
};

module.exports = { allProduct, singleProduct, getAllCategory };
