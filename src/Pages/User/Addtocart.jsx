import { useState, useEffect } from "react";
import { useCart } from "../../Context/CartContext";
import { FaLock, FaMinus, FaPlus, FaTruck, FaShieldAlt, FaBox, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Addtocart = () => {
  const { user } = useCart();
  const [cart, setCart] = useState({ items: [], totalQty: 0, totalAmount: 0 });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const navigate = useNavigate();
  const tax = 0;

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem("userToken");
      const res = await fetch("https://toy-backend-fsek.onrender.com/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setCart(data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Update quantity
  const updateQty = async (productId, newQty) => {
    if (newQty <= 0) return removeItem(productId);
    if (!user) return alert("Please login first");

    try {
      const token = localStorage.getItem("userToken");
      const res = await fetch("https://toy-backend-fsek.onrender.com/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId, qty: newQty }),
      });
      const data = await res.json();
      if (data.success) setCart(data.cart);
      else alert(data.message || "Failed to update quantity");
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity");
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    if (!user) return alert("Please login first");
    try {
      const token = localStorage.getItem("userToken");
      const res = await fetch("https://toy-backend-fsek.onrender.com/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.success) setCart(data.cart);
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  const checkout = () => navigate("/checkout");

  // Fetch coupons
  useEffect(() => {
    fetch("https://toy-backend-fsek.onrender.com/coupen-list")
      .then(res => res.json())
      .then(data => {
        if (data.success) setCoupons(data.coupens.filter(c => c.active));
      });
  }, []);

  const applyCoupon = (coupon) => {
    if (cart.items.length === 0) return alert("Cart is empty");

    const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalBeforeCoupon = subtotal + tax;

    const isFirstOrder = !user?.orders || user.orders.length === 0;
    if (coupon.code === "WELCOME20" && !isFirstOrder) {
      return alert("This coupon is valid only on first order");
    }

    if (totalBeforeCoupon < 2500) return alert("Cart total must be at least ₹2500");

    setAppliedCoupon(coupon);
    const discount = coupon.discountType === "percentage"
      ? (totalBeforeCoupon * coupon.discountValue) / 100
      : coupon.discountValue;

    setDiscountAmount(discount);
    setDrawerOpen(false);
  };

  const removeAppliedCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalBeforeCoupon = subtotal + tax;
  const total = totalBeforeCoupon - discountAmount;

  return (
    <div className="cart-page py-4">
      <div className="container">
        <div className="row">
          {/* LEFT */}
          <div className="col-lg-8">
            <h3 className="fw-bold">Your Cart ({cart.items.reduce((sum, i) => sum + i.qty, 0)} items)</h3>
            <p className="secure-text"><FaLock /> Secure & Discreet Shipping Guaranteed</p>

            {cart.items.length === 0 && <p>Your cart is empty</p>}

            {cart.items.map(item => (
              <div className="cart-item bg-primary" key={item.productId}>
                <img src={`https://toy-backend-fsek.onrender.com${item.image}`} alt={item.title} />
                <div className="cart-info">
                  <h6>{item.title}</h6>
                  <div className="cart-actions">
                    <div className="qty">
                      <button onClick={() => updateQty(item.productId, item.qty - 1)}><FaMinus /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.productId, item.qty + 1)}><FaPlus /></button>
                    </div>
                    <span className="link" onClick={() => removeItem(item.productId)}>Remove</span>
                  </div>
                </div>
                <div className="price">
                  <strong>₹{item.price.toFixed(2)}</strong>
                  <p>Total: ₹{(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT */}
          <div className="col-lg-4">
            <div className="summary">
              <h5>Order Summary</h5>
              <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="summary-row"><span>Shipping</span><span className="text-success">Free</span></div>
              {/* <div className="summary-row"><span>Estimated Tax</span><span>₹{tax.toFixed(2)}</span></div> */}
              {appliedCoupon && <div className="summary-row text-success"><span>Coupon Discount</span><span>-₹{discountAmount.toFixed(2)}</span></div>}
              <hr />
              <div className="summary-total"><span>Total</span><strong>₹{total.toFixed(2)}</strong></div>
              <button className="checkout-btn d-flex align-items-center justify-content-center" onClick={checkout}><FaLock className="me-2" /> SECURE CHECKOUT</button>
              <div className="icons mt-3">
                <div><FaTruck /> Discreet Shipping</div>
                <div><FaShieldAlt /> SSL Secure</div>
                <div><FaBox /> Plain Packaging</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Addtocart;
