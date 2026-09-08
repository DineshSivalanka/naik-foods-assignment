import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-[800px] mx-auto px-5 py-10">
      <h1 className="text-center mb-10 text-3xl font-bold text-gray-900">
        About Naik Foods
      </h1>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-primary">Our Story</h2>
        <p className="leading-relaxed text-gray-600">
          Born from a passion for authentic flavors and traditional recipes, Naik Foods brings the 
          warmth of home-cooked meals to your kitchen. Inspired by our Aaji's secret blends, 
          we started with a simple mission: to preserve and share our rich culinary heritage.
        </p>
      </div>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-primary">Our Values</h2>
        <p className="leading-relaxed text-gray-600">
          We believe in authenticity, quality, and tradition. Every product is crafted with 
          sincerity, ensuring no artificial preservatives or colors compromise the genuine taste.
          We value the trust our customers place in us to deliver safe, delicious, and healthy food.
        </p>
      </div>

      <div className="mb-10 p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-primary">Our Process</h2>
        <p className="leading-relaxed text-gray-600">
          Our farm-to-kitchen approach ensures that only the finest, freshest ingredients are used. 
          We maintain rigorous quality assurance standards at every step, from sourcing spices 
          directly from local farmers to careful, hygienic packaging.
        </p>
      </div>

      <div className="text-center">
        <Link to="/store" className="inline-block px-6 py-3 bg-primary hover:bg-[#c2410c] text-white font-semibold rounded-lg transition-colors">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default About;
