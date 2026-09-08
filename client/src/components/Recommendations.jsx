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
    <section className="recommendations">

      <h2>You May Also Like</h2>

      <p className="recommendation-subtitle">
        Similar products you might enjoy
      </p>

      <div className="recommendation-grid">
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
