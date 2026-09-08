const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      minRating,
      sort,
    } = req.query;

    const filter = {};

    // Search
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Category
    if (category) {
      filter.category = category;
    }

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Rating
    if (minRating) {
      filter.rating = {
        $gte: Number(minRating),
      };
    }

    // Sorting
    let sortOption = {};

    if (sort === "price-low") {
      sortOption.price = 1;
    } else if (sort === "price-high") {
      sortOption.price = -1;
    } else if (sort === "rating") {
      sortOption.rating = -1;
    } else {
      sortOption.createdAt = -1;
    }

    const products = await Product.find(filter).sort(sortOption);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const recommendations = await Product.find({
      _id: { $ne: product._id },
      $or: [
        {
          category: product.category,
        },
        {
          tags: {
            $in: product.tags || [],
          },
        },
      ],
    })
      .sort({
        rating: -1,
        reviews: -1,
      })
      .limit(4);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch recommendations",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getRecommendations,
};
