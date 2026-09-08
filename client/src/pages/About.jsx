import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "var(--text-dark)" }}>
        About Naik Foods
      </h1>

      <div className="about-section" style={{ marginBottom: "30px", padding: "20px", background: "#f8fafc", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "15px", color: "var(--primary-color)" }}>Our Story</h2>
        <p style={{ lineHeight: "1.6", color: "var(--text-light)" }}>
          Born from a passion for authentic flavors and traditional recipes, Naik Foods brings the 
          warmth of home-cooked meals to your kitchen. Inspired by our Aaji's secret blends, 
          we started with a simple mission: to preserve and share our rich culinary heritage.
        </p>
      </div>

      <div className="about-section" style={{ marginBottom: "30px", padding: "20px", background: "#f8fafc", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "15px", color: "var(--primary-color)" }}>Our Values</h2>
        <p style={{ lineHeight: "1.6", color: "var(--text-light)" }}>
          We believe in authenticity, quality, and tradition. Every product is crafted with 
          sincerity, ensuring no artificial preservatives or colors compromise the genuine taste.
          We value the trust our customers place in us to deliver safe, delicious, and healthy food.
        </p>
      </div>

      <div className="about-section" style={{ marginBottom: "40px", padding: "20px", background: "#f8fafc", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "15px", color: "var(--primary-color)" }}>Our Process</h2>
        <p style={{ lineHeight: "1.6", color: "var(--text-light)" }}>
          Our farm-to-kitchen approach ensures that only the finest, freshest ingredients are used. 
          We maintain rigorous quality assurance standards at every step, from sourcing spices 
          directly from local farmers to careful, hygienic packaging.
        </p>
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/store" className="primary-button" style={{ display: "inline-block", padding: "12px 24px", textDecoration: "none" }}>
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default About;
