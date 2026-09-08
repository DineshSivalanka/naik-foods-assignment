import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const FREE_DELIVERY_LIMIT = 999;

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    const purchased = JSON.parse(localStorage.getItem("purchasedItems") || "[]");
    const newPurchased = [...new Set([...purchased, ...cart.map(item => item._id)])];
    localStorage.setItem("purchasedItems", JSON.stringify(newPurchased));
    
    alert("Thank you for your purchase! You can now review these items.");
    if (clearCart) clearCart();
  };

  const remaining =
    FREE_DELIVERY_LIMIT - cartTotal;

  const deliveryFee = cartTotal >= FREE_DELIVERY_LIMIT ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee;

  const progress = Math.min(
    (cartTotal / FREE_DELIVERY_LIMIT) * 100,
    100
  );

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your Cart is Empty</h1>

        <p>
          Add some delicious products to your cart.
        </p>

        <Link to="/store">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1>Your Shopping Cart</h1>

      <div className="delivery-box">

        {remaining > 0 ? (
          <p>
            Add <strong>₹{remaining}</strong> more
            to get FREE delivery 🚚
          </p>
        ) : (
          <p>
            🎉 You unlocked FREE delivery!
          </p>
        )}

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <small>
          ₹{cartTotal} / ₹{FREE_DELIVERY_LIMIT}
        </small>

      </div>

      <div className="cart-container">

        <div className="cart-items">

          {cart.map((item) => (
            <div
              className="cart-item"
              key={item._id}
            >

              <img
                src={item.image}
                alt={item.name}
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1596647413669-e77894a4c6a6?q=80&w=600&auto=format&fit=crop"; }}
              />

              <div className="cart-item-info">

                <h3>{item.name}</h3>

                <p>
                  ₹{item.price}
                </p>

                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      decreaseQuantity(item._id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item._id)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                >
                  Remove
                </button>

              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>
          ))}

        </div>

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{cartTotal}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <strong>
              {deliveryFee === 0
                ? "FREE"
                : `₹${deliveryFee}`}
            </strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{finalTotal}</strong>
          </div>

          <button className="checkout-button" onClick={() => window.location.href = '/checkout'}>
            Proceed to Checkout
          </button>
          
          <Link to="/store" className="secondary-button" style={{ 
            display: 'block', 
            textAlign: 'center', 
            marginTop: '10px', 
            padding: '12px', 
            background: 'white', 
            border: '1px solid var(--primary-color)', 
            color: 'var(--primary-color)', 
            borderRadius: '8px', 
            fontWeight: '600', 
            textDecoration: 'none'
          }}>
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Cart;
