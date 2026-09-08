import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-[1300px] mx-auto px-[30px] pt-[60px] pb-[50px]">
      <div className="text-center mb-7">
        <h1 className="text-[42px] mb-3 font-bold text-gray-900">My Wishlist ❤️</h1>
        <p className="text-lg text-gray-500">{wishlist.length} {wishlist.length === 1 ? 'saved product' : 'saved products'}</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200 my-8">
          <div className="text-5xl mb-4 opacity-50 text-red-500">♡</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h3>
          <p className="mb-4">Explore our store and add some favorites!</p>
          <Link to="/store" className="inline-block bg-primary hover:bg-[#c2410c] text-white px-6 py-3 rounded-lg font-bold transition-colors mt-5">
            Go to Store
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
