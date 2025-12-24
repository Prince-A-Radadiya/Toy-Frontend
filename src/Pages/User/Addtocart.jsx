import { useCart } from "../../Context/CartContext";
import { FaLock, FaMinus, FaPlus, FaTruck, FaShieldAlt, FaBox } from "react-icons/fa";

const Addtocart = () => {
  const { cart, updateQty, removeItem } = useCart();

  const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = 21.5;
  const total = subtotal + tax;

  return (
    <div className="cart-page container py-4">
      <div className="row">
        {/* LEFT */}
        <div className="col-lg-8">
          <h3 className="fw-bold">
            Your Cart ({cart.totalQty} items)
          </h3>
          <p className="secure-text">
            <FaLock /> Secure & Discreet Shipping Guaranteed
          </p>

          {/* CART ITEMS */}
          {cart.items.map((item) => (
            <div className="cart-item" key={item.productId}>
              <img src={item.image} alt={item.title} />

              <div className="cart-info">
                <h6>{item.title}</h6>

                <div className="cart-actions">
                  <div className="qty">
                    <button onClick={() => updateQty(item.productId, item.qty - 1)}>
                      <FaMinus />
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.productId, item.qty + 1)}>
                      <FaPlus />
                    </button>
                  </div>

                  <span className="link" onClick={() => removeItem(item.productId)}>Remove</span>
                </div>
              </div>

              <div className="price">
                <strong>₹{item.price.toFixed(2)}</strong>
                <p className="mb-0">Total: ₹{(item.price * item.qty).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="col-lg-4">
          <div className="summary">
            <h5>Order Summary</h5>

            <input className="form-control my-3" placeholder="Enter promo code" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="text-success">Free</span>
            </div>

            <div className="summary-row">
              <span>Estimated Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total (USD)</span>
              <strong>₹{total.toFixed(2)}</strong>
            </div>

            <button className="checkout-btn">
              <FaLock /> SECURE CHECKOUT
            </button>

            <div className="icons">
              <div><FaTruck /> Discreet Shipping</div>
              <div><FaShieldAlt /> SSL Secure</div>
              <div><FaBox /> Plain Packaging</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addtocart;
