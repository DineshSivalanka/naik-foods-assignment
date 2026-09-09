const express = require("express");
const { createOrder, getOrders, getOrderById } = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);
router.get("/:clientId", getOrders);
router.get("/detail/:id", getOrderById);

module.exports = router;
