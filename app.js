const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const { notFound } = require("./errorHandler/notFound");
const { authRouter } = require("./routes/authRoutes");
const { homeRouter } = require("./routes/homeRoutes");
const { cartRouter } = require("./routes/cartRoutes");
const { orderRouter } = require("./routes/orderRoutes");
const { errorHanlding } = require("./errorHandler/errorHandler");

require("dotenv").config();

const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 25, // Limit each IP to 25 requests per windowMs
});

app.use(limiter);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/", homeRouter);

app.use(notFound);
app.use(errorHanlding);

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB)
  .then((val) => {
    console.log(`Connted To Db ${val}`);
    app.listen(process.env.PORT, () => {
      console.log(`currently ON ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Failed To Connected To DB ${err}`);
  });
