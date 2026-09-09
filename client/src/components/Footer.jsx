import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Heart, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 border-t border-gray-800">
      {/* Back to top bar at the very top of footer / bottom of page */}
      <div className="bg-gray-800/80 hover:bg-gray-800 transition-colors border-b border-gray-700/50">
        <button
          onClick={scrollToTop}
          className="w-full py-3.5 text-center text-xs sm:text-sm font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer group"
          aria-label="Back to top of page"
        >
          <span>Back to Top</span>
          <ArrowUp size={16} className="transition-transform duration-200 group-hover:-translate-y-1 text-primary" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-[8%] py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="md:col-span-1">
          <div className="text-2xl font-extrabold tracking-tight text-white mb-3">
            Naik<span className="text-primary">Foods</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Authentic Maharashtrian snacks, pickles, and sweets crafted with love, heritage, and traditional home recipes.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>in Maharashtra</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wide">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" onClick={scrollToTop} className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/store" onClick={scrollToTop} className="hover:text-primary transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={scrollToTop} className="hover:text-primary transition-colors">
                About Our Heritage
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={scrollToTop} className="hover:text-primary transition-colors">
                Culinary Stories & Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={scrollToTop} className="hover:text-primary transition-colors">
                Contact & Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wide">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/store?category=Snacks" onClick={scrollToTop} className="hover:text-primary transition-colors">
                Traditional Snacks
              </Link>
            </li>
            <li>
              <Link to="/store?category=Pickles" onClick={scrollToTop} className="hover:text-primary transition-colors">
                Homemade Pickles
              </Link>
            </li>
            <li>
              <Link to="/store?category=Sweets" onClick={scrollToTop} className="hover:text-primary transition-colors">
                Festive Sweets
              </Link>
            </li>
            <li>
              <Link to="/store?category=Spices" onClick={scrollToTop} className="hover:text-primary transition-colors">
                Authentic Masalas
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wide">Get in Touch</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-primary shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-primary shrink-0" />
              <span>orders@naikfoods.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Pune, Maharashtra, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-800 px-5 lg:px-[8%] py-5 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} Naik Foods. All rights reserved.</p>
        <button
          onClick={scrollToTop}
          className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Top of page</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
