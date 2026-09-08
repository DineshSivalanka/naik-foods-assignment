const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Traditional Poha Chivda",
    description: "Crispy and flavorful Maharashtrian-style poha chivda.",
    category: "Snacks & Namkeen",
    price: 180,
    originalPrice: 220,
    rating: 4.5,
    reviews: 128,
    weight: "250g",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027",
    tags: ["snacks", "namkeen", "poha", "maharashtrian"],
    stock: 50,
    featured: true,
  },

  {
    name: "Spicy Bhakarwadi",
    description: "Crunchy rolled snack with a delicious spicy filling.",
    category: "Snacks & Namkeen",
    price: 220,
    originalPrice: 260,
    rating: 4.7,
    reviews: 96,
    weight: "250g",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    tags: ["snacks", "spicy", "bhakarwadi"],
    stock: 40,
    featured: true,
  },

  {
    name: "Mixed Vegetable Pickle",
    description: "Traditional Indian-style mixed vegetable pickle.",
    category: "Pickles & Condiments",
    price: 160,
    originalPrice: 190,
    rating: 4.4,
    reviews: 74,
    weight: "300g",
    image: "https://images.unsplash.com/photo-1599909533730-f9d4f7c1b9a1",
    tags: ["pickle", "vegetable", "spicy"],
    stock: 35,
    featured: true,
  },

  {
    name: "Mango Pickle",
    description: "Tangy and spicy mango pickle prepared with traditional spices.",
    category: "Pickles & Condiments",
    price: 190,
    originalPrice: 230,
    rating: 4.8,
    reviews: 156,
    weight: "300g",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7",
    tags: ["pickle", "mango", "spicy"],
    stock: 60,
    featured: true,
  },

  {
    name: "Besan Ladoo",
    description: "Traditional sweet made with roasted gram flour and aromatic ingredients.",
    category: "Sweets & Bakery",
    price: 280,
    originalPrice: 320,
    rating: 4.6,
    reviews: 89,
    weight: "500g",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    tags: ["sweet", "ladoo", "dessert"],
    stock: 25,
    featured: false,
  },

  {
    name: "Masala Buttermilk",
    description: "Refreshing spiced buttermilk with a traditional Indian flavor.",
    category: "Dairy & Beverages",
    price: 120,
    originalPrice: 150,
    rating: 4.2,
    reviews: 43,
    weight: "500ml",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
    tags: ["beverage", "buttermilk", "refreshing"],
    stock: 30,
    featured: false,
  },

  {
    name: "Digestive Mukhvas",
    description: "Aromatic traditional mouth freshener blend.",
    category: "Mukhvas & Digestives",
    price: 140,
    originalPrice: 170,
    rating: 4.3,
    reviews: 61,
    weight: "200g",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    tags: ["mukhvas", "digestive", "mouth freshener"],
    stock: 45,
    featured: false,
  },

  {
    name: "Garam Masala",
    description: "Aromatic spice blend suitable for everyday Indian cooking.",
    category: "Spices & Masalas",
    price: 150,
    originalPrice: 180,
    rating: 4.7,
    reviews: 110,
    weight: "200g",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
    tags: ["spices", "masala", "garam masala"],
    stock: 80,
    featured: true,
  },

  {
    name: "Turmeric Powder",
    description: "Fine turmeric powder suitable for everyday cooking.",
    category: "Spices & Masalas",
    price: 100,
    originalPrice: 120,
    rating: 4.5,
    reviews: 82,
    weight: "200g",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7",
    tags: ["spices", "turmeric", "cooking"],
    stock: 100,
    featured: false,
  },

  {
    name: "Instant Upma Mix",
    description: "Convenient instant breakfast mix for quick preparation.",
    category: "Dry & Instant Grocery",
    price: 130,
    originalPrice: 160,
    rating: 4.1,
    reviews: 38,
    weight: "250g",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b",
    tags: ["instant", "breakfast", "upma"],
    stock: 55,
    featured: false,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products inserted successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
