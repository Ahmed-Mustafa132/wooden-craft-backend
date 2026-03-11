const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

const app = express();
dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRouter = require("./router/user");
const productRouter = require("./router/product");
const checkoutRouter = require("./router/order");
const categoryRouter = require("./router/category");
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", checkoutRouter);

// db require
const dbConnection = require("./db/mongoConfige");
dbConnection();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
