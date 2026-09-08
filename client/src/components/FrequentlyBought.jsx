import { Link } from "react-router-dom";

const FrequentlyBought = ({ product, recommendations }) => {
  const items = recommendations.slice(0, 2);

  if (items.length === 0) {
    return null;
  }

  const total =
    product.price +
    items.reduce(
      (sum, item) => sum + item.price,
      0
    );

  return (
    <section className="frequently-bought">

      <h2>Frequently Bought Together</h2>

      <p className="recommendation-subtitle">
        Complete your order with these products
      </p>

      <div className="bundle">

        <div className="bundle-products">

          <div className="bundle-product">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
            />

            <p>{product.name}</p>
          </div>

          {items.map((item) => (
            <div
              className="bundle-product"
              key={item._id}
            >
              <span className="plus">+</span>

              <Link
                to={`/product/${item._id}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
                />
              </Link>

              <p>{item.name}</p>
            </div>
          ))}

        </div>

        <div className="bundle-summary">

          <p>Bundle price</p>

          <strong>
            ₹{total}
          </strong>

          <button>
            🛒 Add Bundle to Cart
          </button>

        </div>

      </div>

    </section>
  );
};

export default FrequentlyBought;
