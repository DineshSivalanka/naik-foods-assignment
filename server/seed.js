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

// Dynamically generate 90 more products to reach 100 total
const adjectives = ["Spicy", "Sweet", "Tangy", "Roasted", "Fried", "Masala", "Crispy", "Authentic", "Premium", "Classic", "Special", "Zesty", "Garlic", "Chatpata", "Crunchy", "Traditional", "Homemade", "Rich", "Nutty", "Golden"];

const baseItems = [
  { name: "Chivda", category: "Snacks & Namkeen", tags: ["snacks", "poha", "chivda"], image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=800&auto=format&fit=crop" },
  { name: "Sev", category: "Snacks & Namkeen", tags: ["snacks", "sev", "besan"], image: "https://images.unsplash.com/photo-1599487405902-1279ecfb5737?q=80&w=800&auto=format&fit=crop" },
  { name: "Chakali", category: "Snacks & Namkeen", tags: ["snacks", "chakali", "crunchy"], image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop" },
  { name: "Shankarpali", category: "Sweets & Bakery", tags: ["sweet", "shankarpali", "snack"], image: "https://images.unsplash.com/photo-1589301773822-6b9c9f4d7b1a?q=80&w=800&auto=format&fit=crop" },
  { name: "Ladoo", category: "Sweets & Bakery", tags: ["sweet", "ladoo", "festive"], image: "https://images.unsplash.com/photo-1605809559367-9c94bc1cd8d4?q=80&w=800&auto=format&fit=crop" },
  { name: "Modak", category: "Sweets & Bakery", tags: ["sweet", "modak", "coconut"], image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?q=80&w=800&auto=format&fit=crop" },
  { name: "Pickle", category: "Pickles & Condiments", tags: ["pickle", "spicy", "condiment"], image: "https://images.unsplash.com/photo-1599909533730-f9d4f7c1b9a1?q=80&w=800&auto=format&fit=crop" },
  { name: "Thecha", category: "Pickles & Condiments", tags: ["thecha", "spicy", "chutney"], image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop" },
  { name: "Papad", category: "Dry & Instant Grocery", tags: ["papad", "roasted", "meal-accompaniment"], image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop" },
  { name: "Khakhra", category: "Snacks & Namkeen", tags: ["snacks", "khakhra", "roasted"], image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop" },
  { name: "Mukhvas", category: "Mukhvas & Digestives", tags: ["mukhvas", "fennel", "digestive"], image: "https://images.unsplash.com/photo-1579624898144-86a01b7a942a?q=80&w=800&auto=format&fit=crop" },
  { name: "Masala", category: "Spices & Masalas", tags: ["spice", "masala", "cooking"], image: "https://images.unsplash.com/photo-1596450514735-e11b9eb6b6fa?q=80&w=800&auto=format&fit=crop" },
  { name: "Chutney Powder", category: "Pickles & Condiments", tags: ["chutney", "dry", "spicy"], image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=800&auto=format&fit=crop" },
  { name: "Peda", category: "Sweets & Bakery", tags: ["sweet", "peda", "milk"], image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?q=80&w=800&auto=format&fit=crop" },
  { name: "Barfi", category: "Sweets & Bakery", tags: ["sweet", "barfi", "dessert"], image: "https://images.unsplash.com/photo-1626132647820-2f96e480d1cd?q=80&w=800&auto=format&fit=crop" }
];

for (let i = 11; i <= 100; i++) {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const item = baseItems[Math.floor(Math.random() * baseItems.length)];
  const basePrice = Math.floor(Math.random() * 200) + 50; // 50 to 250
  
  products.push({
    name: `${adj} ${item.name} ${i}`,
    description: `Delicious ${adj.toLowerCase()} ${item.name.toLowerCase()} prepared with authentic traditional recipes. Perfect for every occasion.`,
    category: item.category,
    price: basePrice,
    originalPrice: basePrice + Math.floor(Math.random() * 50) + 20, // Discounted
    rating: (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1), // 3.5 to 5.0
    reviews: Math.floor(Math.random() * 300) + 10,
    weight: Math.random() > 0.5 ? "250g" : "500g",
    image: item.image, // Use the highly accurate static Unsplash image for this specific food
    tags: item.tags,
    stock: Math.floor(Math.random() * 100) + 10,
    featured: Math.random() > 0.8 // 20% chance to be featured
  });
}

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
