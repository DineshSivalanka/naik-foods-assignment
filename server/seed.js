const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  // ==================== SNACKS & NAMKEEN ====================

  {
    name: "Traditional Poha Chivda",
    description: "Crispy and flavorful Maharashtrian-style poha chivda.",
    category: "Snacks & Namkeen",
    price: 180,
    originalPrice: 220,
    rating: 4.5,
    reviews: 128,
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
    tags: ["snacks", "namkeen", "poha", "chivda"],
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
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    tags: ["snacks", "spicy", "bhakarwadi"],
    stock: 40,
    featured: true,
  },

  {
    name: "Masala Sev",
    description: "Crunchy gram flour sev seasoned with traditional spices.",
    category: "Snacks & Namkeen",
    price: 150,
    originalPrice: 180,
    rating: 4.6,
    reviews: 85,
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1599487405902-1279ecfb5737?auto=format&fit=crop&w=800&q=80",
    tags: ["snacks", "sev", "namkeen", "masala"],
    stock: 60,
    featured: true,
  },

  {
    name: "Crispy Chakali",
    description: "Traditional crispy chakali made with a flavorful spice blend.",
    category: "Snacks & Namkeen",
    price: 190,
    originalPrice: 230,
    rating: 4.5,
    reviews: 72,
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    tags: ["snacks", "chakali", "crispy"],
    stock: 45,
    featured: false,
  },

  {
    name: "Classic Khakhra",
    description: "Thin and crispy roasted khakhra perfect for tea time.",
    category: "Snacks & Namkeen",
    price: 160,
    originalPrice: 200,
    rating: 4.4,
    reviews: 67,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    tags: ["khakhra", "snacks", "roasted"],
    stock: 55,
    featured: true,
  },

  {
    name: "Spicy Mixture Namkeen",
    description: "Crunchy mixture of sev, peanuts and traditional spices.",
    category: "Snacks & Namkeen",
    price: 170,
    originalPrice: 210,
    rating: 4.6,
    reviews: 92,
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
    tags: ["namkeen", "mixture", "spicy"],
    stock: 70,
    featured: false,
  },

  {
    name: "Classic Shankarpali",
    description: "Golden crispy traditional sweet snack.",
    category: "Snacks & Namkeen",
    price: 200,
    originalPrice: 240,
    rating: 4.7,
    reviews: 104,
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1589301773822-6b9c9f4d7b1a?auto=format&fit=crop&w=800&q=80",
    tags: ["shankarpali", "snacks", "sweet"],
    stock: 40,
    featured: true,
  },

  // ==================== PICKLES ====================

  {
    name: "Traditional Mango Pickle",
    description: "Tangy and spicy mango pickle prepared with traditional spices.",
    category: "Pickles & Condiments",
    price: 190,
    originalPrice: 230,
    rating: 4.8,
    reviews: 156,
    weight: "300g",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
    tags: ["pickle", "mango", "spicy"],
    stock: 60,
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
    image:
      "https://images.unsplash.com/photo-1599909533730-f9d4f7c1b9a1?auto=format&fit=crop&w=800&q=80",
    tags: ["pickle", "vegetable", "spicy"],
    stock: 35,
    featured: true,
  },

  {
    name: "Spicy Lemon Pickle",
    description: "Tangy lemon pickle made with aromatic Indian spices.",
    category: "Pickles & Condiments",
    price: 150,
    originalPrice: 180,
    rating: 4.6,
    reviews: 88,
    weight: "300g",
    image:
      "https://images.unsplash.com/photo-1599909533730-f9d4f7c1b9a1?auto=format&fit=crop&w=800&q=80",
    tags: ["pickle", "lemon", "spicy"],
    stock: 50,
    featured: false,
  },

  {
    name: "Green Chilli Pickle",
    description: "Hot and flavorful green chilli pickle.",
    category: "Pickles & Condiments",
    price: 140,
    originalPrice: 170,
    rating: 4.5,
    reviews: 61,
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    tags: ["pickle", "green chilli", "spicy"],
    stock: 45,
    featured: false,
  },

  {
    name: "Garlic Pickle",
    description: "Flavorful garlic pickle with a perfect balance of spice and tang.",
    category: "Pickles & Condiments",
    price: 180,
    originalPrice: 220,
    rating: 4.7,
    reviews: 79,
    weight: "300g",
    image:
      "https://images.unsplash.com/photo-1599909533730-f9d4f7c1b9a1?auto=format&fit=crop&w=800&q=80",
    tags: ["pickle", "garlic", "spicy"],
    stock: 40,
    featured: true,
  },

  {
    name: "Dry Garlic Chutney",
    description: "Traditional dry garlic chutney with roasted spices.",
    category: "Pickles & Condiments",
    price: 130,
    originalPrice: 160,
    rating: 4.6,
    reviews: 71,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80",
    tags: ["chutney", "garlic", "spicy"],
    stock: 55,
    featured: false,
  },

  // ==================== SWEETS ====================

  {
    name: "Besan Ladoo",
    description:
      "Traditional sweet made with roasted gram flour and aromatic ingredients.",
    category: "Sweets & Bakery",
    price: 280,
    originalPrice: 320,
    rating: 4.6,
    reviews: 89,
    weight: "500g",
    image:
      "https://images.unsplash.com/photo-1605809559367-9c94bc1cd8d4?auto=format&fit=crop&w=800&q=80",
    tags: ["sweet", "ladoo", "dessert"],
    stock: 25,
    featured: true,
  },

  {
    name: "Motichoor Ladoo",
    description: "Soft and delicious traditional motichoor ladoos.",
    category: "Sweets & Bakery",
    price: 300,
    originalPrice: 350,
    rating: 4.8,
    reviews: 134,
    weight: "500g",
    image:
      "https://images.unsplash.com/photo-1605809559367-9c94bc1cd8d4?auto=format&fit=crop&w=800&q=80",
    tags: ["sweet", "ladoo", "motichoor"],
    stock: 30,
    featured: true,
  },

  {
    name: "Traditional Barfi",
    description: "Rich and creamy milk-based Indian sweet.",
    category: "Sweets & Bakery",
    price: 320,
    originalPrice: 380,
    rating: 4.7,
    reviews: 96,
    weight: "500g",
    image:
      "https://images.unsplash.com/photo-1626132647820-2f96e480d1cd?auto=format&fit=crop&w=800&q=80",
    tags: ["sweet", "barfi", "milk"],
    stock: 35,
    featured: true,
  },

  {
    name: "Kaju Katli",
    description: "Premium cashew-based sweet with a smooth melt-in-mouth texture.",
    category: "Sweets & Bakery",
    price: 450,
    originalPrice: 500,
    rating: 4.9,
    reviews: 182,
    weight: "500g",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
    tags: ["sweet", "kaju", "cashew"],
    stock: 20,
    featured: true,
  },

  {
    name: "Milk Peda",
    description: "Soft milk peda prepared with rich dairy ingredients.",
    category: "Sweets & Bakery",
    price: 280,
    originalPrice: 330,
    rating: 4.6,
    reviews: 73,
    weight: "500g",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=800&q=80",
    tags: ["sweet", "peda", "milk"],
    stock: 30,
    featured: false,
  },

  {
    name: "Coconut Modak",
    description: "Soft traditional modak filled with sweet coconut mixture.",
    category: "Sweets & Bakery",
    price: 300,
    originalPrice: 350,
    rating: 4.7,
    reviews: 81,
    weight: "500g",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
    tags: ["sweet", "modak", "coconut"],
    stock: 25,
    featured: true,
  },

  {
    name: "Gulab Jamun",
    description: "Soft and juicy gulab jamuns soaked in aromatic sugar syrup.",
    category: "Sweets & Bakery",
    price: 250,
    originalPrice: 300,
    rating: 4.8,
    reviews: 143,
    weight: "500g",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    tags: ["sweet", "gulab jamun", "dessert"],
    stock: 35,
    featured: true,
  },

  // ==================== SPICES ====================

  {
    name: "Premium Garam Masala",
    description: "Aromatic spice blend suitable for everyday Indian cooking.",
    category: "Spices & Masalas",
    price: 150,
    originalPrice: 180,
    rating: 4.7,
    reviews: 110,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    tags: ["spices", "masala", "garam masala"],
    stock: 80,
    featured: true,
  },

  {
    name: "Pure Turmeric Powder",
    description: "Fine turmeric powder suitable for everyday cooking.",
    category: "Spices & Masalas",
    price: 100,
    originalPrice: 120,
    rating: 4.5,
    reviews: 82,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80",
    tags: ["spices", "turmeric", "cooking"],
    stock: 100,
    featured: false,
  },

  {
    name: "Red Chilli Powder",
    description: "Bright and spicy red chilli powder for Indian dishes.",
    category: "Spices & Masalas",
    price: 120,
    originalPrice: 150,
    rating: 4.6,
    reviews: 95,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    tags: ["spices", "chilli", "masala"],
    stock: 90,
    featured: true,
  },

  {
    name: "Coriander Powder",
    description: "Freshly ground coriander powder with rich aroma.",
    category: "Spices & Masalas",
    price: 110,
    originalPrice: 140,
    rating: 4.5,
    reviews: 76,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    tags: ["spices", "coriander", "cooking"],
    stock: 85,
    featured: false,
  },

  {
    name: "Kitchen King Masala",
    description: "Balanced spice blend for flavorful Indian vegetable dishes.",
    category: "Spices & Masalas",
    price: 140,
    originalPrice: 170,
    rating: 4.6,
    reviews: 64,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596450514735-e11b9eb6b6fa?auto=format&fit=crop&w=800&q=80",
    tags: ["spices", "masala", "kitchen king"],
    stock: 70,
    featured: true,
  },

  {
    name: "Chaat Masala",
    description: "Tangy and spicy masala perfect for chaats and snacks.",
    category: "Spices & Masalas",
    price: 130,
    originalPrice: 160,
    rating: 4.7,
    reviews: 91,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596450514735-e11b9eb6b6fa?auto=format&fit=crop&w=800&q=80",
    tags: ["spices", "chaat", "masala"],
    stock: 65,
    featured: false,
  },

  // ==================== MUKHVAS ====================

  {
    name: "Digestive Mukhvas",
    description: "Aromatic traditional mouth freshener blend.",
    category: "Mukhvas & Digestives",
    price: 140,
    originalPrice: 170,
    rating: 4.3,
    reviews: 61,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1579624898144-86a01b7a942a?auto=format&fit=crop&w=800&q=80",
    tags: ["mukhvas", "digestive", "mouth freshener"],
    stock: 45,
    featured: false,
  },

  {
    name: "Sweet Fennel Mukhvas",
    description: "Sweet aromatic fennel mouth freshener.",
    category: "Mukhvas & Digestives",
    price: 130,
    originalPrice: 160,
    rating: 4.5,
    reviews: 70,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1579624898144-86a01b7a942a?auto=format&fit=crop&w=800&q=80",
    tags: ["mukhvas", "fennel", "sweet"],
    stock: 60,
    featured: true,
  },

  {
    name: "Roasted Sesame Mukhvas",
    description: "Crunchy roasted sesame blend with aromatic ingredients.",
    category: "Mukhvas & Digestives",
    price: 150,
    originalPrice: 180,
    rating: 4.4,
    reviews: 54,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    tags: ["mukhvas", "sesame", "digestive"],
    stock: 50,
    featured: false,
  },

  // ==================== DAIRY & BEVERAGES ====================

  {
    name: "Masala Buttermilk",
    description: "Refreshing spiced buttermilk with a traditional Indian flavor.",
    category: "Dairy & Beverages",
    price: 120,
    originalPrice: 150,
    rating: 4.2,
    reviews: 43,
    weight: "500ml",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    tags: ["beverage", "buttermilk", "refreshing"],
    stock: 30,
    featured: false,
  },

  {
    name: "Fresh Mango Lassi",
    description: "Creamy and refreshing mango lassi made with quality dairy.",
    category: "Dairy & Beverages",
    price: 150,
    originalPrice: 180,
    rating: 4.7,
    reviews: 102,
    weight: "500ml",
    image:
      "https://images.unsplash.com/photo-1579624898144-86a01b7a942a?auto=format&fit=crop&w=800&q=80",
    tags: ["lassi", "mango", "beverage"],
    stock: 25,
    featured: true,
  },

  {
    name: "Classic Sweet Lassi",
    description: "Smooth and creamy traditional sweet lassi.",
    category: "Dairy & Beverages",
    price: 130,
    originalPrice: 160,
    rating: 4.5,
    reviews: 68,
    weight: "500ml",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    tags: ["lassi", "dairy", "beverage"],
    stock: 30,
    featured: false,
  },

  {
    name: "Traditional Chaas",
    description: "Light and refreshing Indian spiced buttermilk.",
    category: "Dairy & Beverages",
    price: 100,
    originalPrice: 130,
    rating: 4.4,
    reviews: 51,
    weight: "500ml",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    tags: ["chaas", "buttermilk", "dairy"],
    stock: 35,
    featured: false,
  },

  // ==================== DRY & INSTANT GROCERY ====================

  {
    name: "Instant Upma Mix",
    description: "Convenient instant breakfast mix for quick preparation.",
    category: "Dry & Instant Grocery",
    price: 130,
    originalPrice: 160,
    rating: 4.1,
    reviews: 38,
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    tags: ["instant", "breakfast", "upma"],
    stock: 55,
    featured: false,
  },

  {
    name: "Instant Poha Mix",
    description: "Quick and tasty poha mix for an easy breakfast.",
    category: "Dry & Instant Grocery",
    price: 125,
    originalPrice: 150,
    rating: 4.3,
    reviews: 46,
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
    tags: ["instant", "poha", "breakfast"],
    stock: 60,
    featured: true,
  },

  {
    name: "Crispy Papad",
    description: "Thin and crispy papad perfect with Indian meals.",
    category: "Dry & Instant Grocery",
    price: 110,
    originalPrice: 140,
    rating: 4.5,
    reviews: 69,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    tags: ["papad", "grocery", "roasted"],
    stock: 80,
    featured: false,
  },

  {
    name: "Masala Papad",
    description: "Spiced papad with a delicious crispy texture.",
    category: "Dry & Instant Grocery",
    price: 125,
    originalPrice: 150,
    rating: 4.6,
    reviews: 75,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    tags: ["papad", "masala", "snacks"],
    stock: 65,
    featured: true,
  },

  {
    name: "Traditional Dal Papad",
    description: "Crunchy dal papad made using traditional recipes.",
    category: "Dry & Instant Grocery",
    price: 140,
    originalPrice: 170,
    rating: 4.5,
    reviews: 58,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    tags: ["papad", "dal", "grocery"],
    stock: 70,
    featured: false,
  },

  // ==================== MORE PRODUCTS ====================

  {
    name: "Roasted Peanut Chivda",
    description: "Crunchy poha chivda loaded with roasted peanuts.",
    category: "Snacks & Namkeen",
    price: 175,
    originalPrice: 210,
    rating: 4.6,
    reviews: 84,
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
    tags: ["chivda", "peanut", "snacks"],
    stock: 50,
    featured: false,
  },

  {
    name: "Garlic Sev",
    description: "Crispy sev infused with roasted garlic flavor.",
    category: "Snacks & Namkeen",
    price: 160,
    originalPrice: 190,
    rating: 4.5,
    reviews: 62,
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1599487405902-1279ecfb5737?auto=format&fit=crop&w=800&q=80",
    tags: ["sev", "garlic", "snacks"],
    stock: 45,
    featured: false,
  },

  {
    name: "Premium Cashew Ladoo",
    description: "Rich ladoos made with premium cashews and aromatic ingredients.",
    category: "Sweets & Bakery",
    price: 380,
    originalPrice: 430,
    rating: 4.8,
    reviews: 97,
    weight: "500g",
    image:
      "https://images.unsplash.com/photo-1605809559367-9c94bc1cd8d4?auto=format&fit=crop&w=800&q=80",
    tags: ["ladoo", "cashew", "sweet"],
    stock: 20,
    featured: true,
  },

  {
    name: "Coconut Barfi",
    description: "Soft coconut barfi with a rich traditional taste.",
    category: "Sweets & Bakery",
    price: 290,
    originalPrice: 340,
    rating: 4.6,
    reviews: 65,
    weight: "500g",
    image:
      "https://images.unsplash.com/photo-1626132647820-2f96e480d1cd?auto=format&fit=crop&w=800&q=80",
    tags: ["barfi", "coconut", "sweet"],
    stock: 30,
    featured: false,
  },

  {
    name: "Premium Mixed Masala",
    description: "Aromatic Indian spice blend for everyday cooking.",
    category: "Spices & Masalas",
    price: 180,
    originalPrice: 220,
    rating: 4.7,
    reviews: 86,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596450514735-e11b9eb6b6fa?auto=format&fit=crop&w=800&q=80",
    tags: ["masala", "spices", "cooking"],
    stock: 75,
    featured: true,
  },

  {
    name: "Authentic Jeera Powder",
    description: "Freshly ground cumin powder with a strong natural aroma.",
    category: "Spices & Masalas",
    price: 115,
    originalPrice: 140,
    rating: 4.5,
    reviews: 57,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    tags: ["jeera", "spices", "cumin"],
    stock: 80,
    featured: false,
  },

  {
    name: "Sweet Mango Chutney",
    description: "Sweet and tangy mango chutney prepared traditionally.",
    category: "Pickles & Condiments",
    price: 155,
    originalPrice: 190,
    rating: 4.5,
    reviews: 63,
    weight: "300g",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
    tags: ["chutney", "mango", "condiment"],
    stock: 40,
    featured: false,
  },

  {
    name: "Spicy Green Chutney",
    description: "Fresh and spicy green chutney with herbs and traditional spices.",
    category: "Pickles & Condiments",
    price: 120,
    originalPrice: 150,
    rating: 4.4,
    reviews: 48,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    tags: ["chutney", "green", "spicy"],
    stock: 45,
    featured: false,
  },

  {
    name: "Roasted Fennel Mukhvas",
    description: "Aromatic roasted fennel mouth freshener.",
    category: "Mukhvas & Digestives",
    price: 135,
    originalPrice: 165,
    rating: 4.6,
    reviews: 59,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1579624898144-86a01b7a942a?auto=format&fit=crop&w=800&q=80",
    tags: ["mukhvas", "fennel", "digestive"],
    stock: 50,
    featured: true,
  },

  {
    name: "Cardamom Mukhvas",
    description: "Premium mouth freshener with aromatic cardamom flavor.",
    category: "Mukhvas & Digestives",
    price: 170,
    originalPrice: 210,
    rating: 4.7,
    reviews: 74,
    weight: "200g",
    image:
      "https://images.unsplash.com/photo-1579624898144-86a01b7a942a?auto=format&fit=crop&w=800&q=80",
    tags: ["mukhvas", "cardamom", "digestive"],
    stock: 40,
    featured: false,
  },

  {
    name: "Masala Milk",
    description: "Rich dairy beverage flavored with aromatic Indian spices.",
    category: "Dairy & Beverages",
    price: 140,
    originalPrice: 170,
    rating: 4.3,
    reviews: 39,
    weight: "500ml",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    tags: ["milk", "beverage", "masala"],
    stock: 25,
    featured: false,
  },

  {
    name: "Rose Lassi",
    description: "Refreshing creamy lassi with a delicate rose flavor.",
    category: "Dairy & Beverages",
    price: 145,
    originalPrice: 175,
    rating: 4.5,
    reviews: 52,
    weight: "500ml",
    image:
      "https://images.unsplash.com/photo-1579624898144-86a01b7a942a?auto=format&fit=crop&w=800&q=80",
    tags: ["lassi", "rose", "beverage"],
    stock: 25,
    featured: true,
  },

  {
    name: "Instant Masala Dosa Mix",
    description: "Easy-to-prepare dosa mix with traditional South Indian flavors.",
    category: "Dry & Instant Grocery",
    price: 160,
    originalPrice: 200,
    rating: 4.4,
    reviews: 61,
    weight: "500g",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    tags: ["dosa", "instant", "breakfast"],
    stock: 50,
    featured: true,
  },

  {
    name: "Instant Idli Mix",
    description: "Soft and fluffy idlis made easily with this instant mix.",
    category: "Dry & Instant Grocery",
    price: 150,
    originalPrice: 185,
    rating: 4.5,
    reviews: 69,
    weight: "500g",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    tags: ["idli", "instant", "breakfast"],
    stock: 55,
    featured: false,
  },
];

// Make sure exactly 50 products are inserted
console.log(`Total products prepared: ${products.length}`);

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Remove old products
    await Product.deleteMany({});

    console.log("Old products deleted");

    // Insert 50 products
    await Product.insertMany(products);

    console.log(`${products.length} products inserted successfully`);

    await mongoose.connection.close();

    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
