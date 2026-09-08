const Wishlist = require("../models/Wishlist");

const getWishlist = async (req, res) => {
  try {
    const { clientId } = req.params;
    let wishlist = await Wishlist.findOne({ clientId }).populate("products");

    if (!wishlist) {
      wishlist = await Wishlist.create({ clientId, products: [] });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist", error: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ clientId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ clientId, products: [productId] });
    } else {
      const hasProduct = wishlist.products.some(id => id.toString() === productId);
      if (!hasProduct) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    const updatedWishlist = await Wishlist.findOne({ clientId }).populate("products");
    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to wishlist", error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { clientId, productId } = req.params;

    const wishlist = await Wishlist.findOne({ clientId });

    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
    }

    const updatedWishlist = await Wishlist.findOne({ clientId }).populate("products");
    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove from wishlist", error: error.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
