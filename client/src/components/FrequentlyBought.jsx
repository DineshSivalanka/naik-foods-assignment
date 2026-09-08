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
    <section className="mt-10 pt-10 border-t border-gray-200">

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Bought Together</h2>

      <p className="text-gray-500 mb-8 font-medium">
        Complete your order with these products
      </p>

      <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 p-8 rounded-xl border border-gray-200">

        <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">

          <div className="flex flex-col items-center gap-2.5 flex-1 max-w-[200px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-[120px] h-[120px] object-cover rounded-lg shadow-sm border border-gray-100"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
            />

            <p className="font-bold text-gray-900 text-center m-0 text-sm">{product.name}</p>
          </div>

          {items.map((item) => (
            <div
              className="flex flex-col sm:flex-row items-center gap-6 flex-1 max-w-[250px]"
              key={item._id}
            >
              <span className="text-3xl font-bold text-gray-300 mx-2">+</span>

              <div className="flex flex-col items-center gap-2.5 flex-1">
                <Link
                  to={`/product/${item._id}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[120px] h-[120px] object-cover rounded-lg shadow-sm border border-gray-100 hover:scale-105 transition-transform"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
                  />
                </Link>

                <p className="font-bold text-gray-900 text-center m-0 text-sm">{item.name}</p>
              </div>
            </div>
          ))}

        </div>

        <div className="flex flex-col justify-center items-center lg:items-start lg:border-l lg:border-gray-200 lg:pl-8 min-w-[200px]">

          <p className="text-gray-500 font-medium mb-1">Bundle price</p>

          <strong className="text-3xl font-extrabold text-gray-900 mb-5">
            ₹{total}
          </strong>

          <button className="w-full py-3 bg-primary hover:bg-[#c2410c] text-white font-bold rounded-lg transition-colors shadow-sm">
            🛒 Add Bundle
          </button>

        </div>

      </div>

    </section>
  );
};

export default FrequentlyBought;
