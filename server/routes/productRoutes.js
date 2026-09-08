const express = require("express");

const {
  getProducts,
  getProductById,
  getRecommendations,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);

router.get("/recommendations/:id", getRecommendations);

router.get("/:id", getProductById);

module.exports = router;
