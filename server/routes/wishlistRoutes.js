const express = require("express");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

router.get("/:clientId", getWishlist);
router.post("/:clientId/add", addToWishlist);
router.delete("/:clientId/remove/:productId", removeFromWishlist);

module.exports = router;
