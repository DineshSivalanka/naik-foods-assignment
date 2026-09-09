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
    const orders = await Order.find({ clientId: req.params.clientId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
