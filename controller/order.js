const Order = require("../module/order");
const User = require("../module/user");
const order = require("../module/order");
const Product = require("../module/product");

const getAllOrders = async (req, res) => {
  const data = [];
  try {
    const orders = await Order.find({}, [
      "products",
      "address",
      "phone",
      "city",
      "postalCode",
      "userId",
      "totalPrice",
      "status",
      "createdAt",
    ]);
    totalOrders = await Order.countDocuments();
    const TotalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);
    for (const order of orders) {
      const user = await User.findById(order.userId, ["name"]);
      const productData = [];
      let productsCount = 0;
      for (product of order.products) {
        const productDetails = await Product.findById(product.productId, [
          "id",
          "title",
          "price",
        ]);
        const products = {
          id: product.productId || "UNKNOWN",
          productTitle: productDetails.title || "Unknown Product",
          quantity: product.quantity || "unknown",
          price: productDetails.price || "UNKNOWN",
        };
        productsCount += product.quantity;
        productData.push(products);
      }
      const orderData = {
        ...order._doc,
        userName: user.name || "Unknown User",
        products: productData || [],
        productsCount: productsCount || "Unknown",
      };
      data.push(orderData);
    }
    res.status(200).json({
      massage: "All orders fetched successfully",
      data: {
        totalOrders: totalOrders,
        orders: data,
        totalRevenue: TotalRevenue[0]?.totalRevenue || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message, error: error });
  }
};

const createOrder = async (req, res) => {
  try {
    // Verify token first
    const { fullName, products, totalPrice, address, phone, city, postalCode } =
      req.body;
    // Validate required fields
    if (!products || !fullName || !address || !phone || !city || !postalCode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create order
    const order = await Order.create({
      products,
      fullName,
      totalPrice,
      address,
      phone,
      city,
      postalCode,
      userId: req.user.id, // Use user ID from token
    });
    // Send response
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Validate status
    const validStatuses = ["pending", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Must be one of: pending, completed, cancelled",
      });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Dashboard = async (req, res) => {
  try {

    const orders = await Order.countDocuments();
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    res.status(200).json({
      orders: orders, users: users, products: products

    });

  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }

}

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  editOrderStatus,
  Dashboard,
  getOrdersByUser,
};
