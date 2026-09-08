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
    <div className="blog-page" style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "var(--text-dark)" }}>
        Latest Articles
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "30px" }}>
        {blogs.map(blog => (
          <div key={blog.id} style={{ border: "1px solid var(--border-color)", borderRadius: "12px", overflow: "hidden", background: "white", display: "flex", flexDirection: "column" }}>
            <img src={blog.image} alt={blog.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px", color: "var(--text-dark)" }}>{blog.title}</h3>
              <p style={{ color: "var(--text-light)", marginBottom: "20px", fontSize: "14px", flex: 1 }}>{blog.excerpt}</p>
              <Link to="#" style={{ color: "var(--primary-color)", fontWeight: "bold", textDecoration: "none", alignSelf: "flex-start" }}>
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
