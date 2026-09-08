import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Healthy Snacks for Guilt-Free Munching",
      image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=800&auto=format&fit=crop",
      excerpt: "Discover our top picks for nutritious and delicious snacks that you can enjoy anytime without the guilt.",
    },
    {
      id: 2,
      title: "The Secret Behind Authentic Spices",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop",
      excerpt: "Learn how sourcing the right spices can transform your daily meals into extraordinary culinary experiences.",
    },
    {
      id: 3,
      title: "Traditional Recipes You Need to Try",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop",
      excerpt: "Bring the taste of heritage to your dining table with these easy-to-follow traditional family recipes.",
    },
    {
      id: 4,
      title: "Why Farm-to-Kitchen Matters",
      image: "https://images.unsplash.com/photo-1605623048598-a2624da97843?q=80&w=800&auto=format&fit=crop",
      excerpt: "Explore the journey of your food and understand why fresh, locally sourced ingredients are better for you.",
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-10">
      <h1 className="text-center mb-10 text-3xl font-bold text-gray-900">
        Latest Articles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {blogs.map(blog => (
          <div key={blog.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <img src={blog.image} alt={blog.title} className="w-full h-[200px] object-cover" />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-bold mb-2.5 text-gray-900">{blog.title}</h3>
              <p className="text-gray-500 mb-5 text-sm flex-1 leading-relaxed">{blog.excerpt}</p>
              <Link to="#" className="text-primary font-bold hover:text-[#c2410c] transition-colors self-start">
                Read More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
