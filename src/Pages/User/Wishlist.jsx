import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import axios from "axios";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

const Wishlist = () => {

  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("https://toy-backend-fsek.onrender.com/wishlist", {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        qty: 1,
        image: product.image,
      });

      // Remove from wishlist after adding to cart
      await axios.delete(`https://toy-backend-fsek.onrender.com/wishlist/${product.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });

      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    } catch (err) {
      console.error("Failed to add to cart or remove from wishlist", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://toy-backend-fsek.onrender.com/wishlist/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to remove wishlist item", err);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading wishlist...</p>;
  if (!wishlist.length) return <p className="text-center mt-5">Your wishlist is empty!</p>;

  return (
    <div className="wishlist-page my-5">
      <div className="container">
        <div className="row">
          {wishlist.map((item) => (
            <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="wishlist-card card h-100 shadow-sm border-0" data-aos="fade-up">
                <Link to={`/product/${item.id}`} className="text-decoration-none">
                  <div className="wishlist-img-container">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.title}
                      className="card-img-top wishlist-img"
                    />
                  </div>
                </Link>
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title text-truncate" title={item.title}>
                    {item.title}
                  </h6>
                  <p className="card-text fw-bold">₹{item.price}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-sm btn-success me-2 d-flex align-items-center justify-content-center"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FaShoppingCart className="me-1" /> Add to Cart
                    </button>
                    <button
                      className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
