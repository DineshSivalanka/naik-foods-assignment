import { useEffect, useState } from "react";
import { getRecommendations } from "../services/api";
import ProductCard from "./ProductCard";

const Recommendations = ({ productId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendations(productId);
        setProducts(data);
      } catch (error) {
        console.error(
          "Recommendation error:",
          error
        );
      }
    };

    fetchRecommendations();
  }, [productId]);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 pt-10 border-t border-gray-200">

      <h2 className="text-2xl font-bold text-gray-900 mb-2">You May Also Like</h2>

      <p className="text-gray-500 mb-8 font-medium">
        Similar products you might enjoy
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
};

export default Recommendations;
