const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { clientId, customerInfo, products, summary, paymentMethod } = req.body;

    if (!customerInfo || !products || products.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = await Order.create({
      clientId: clientId || "anonymous",
      customerInfo,
      products,
      summary,
      paymentMethod,
    });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error creating order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ clientId: req.params.clientId })
      .populate('products.product')
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ message: "Server error fetching order" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};
