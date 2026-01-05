import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaMinus,
  FaPlus,
  FaTruck,
  FaLock,
  FaHeadset,
} from "react-icons/fa";
import { useCart } from "../../Context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

  const [userRating, setUserRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [canRate, setCanRate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token || !product?._id) return;

    fetch(`http://localhost:9000/can-rate/${product._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCanRate(data.canRate))
      .catch(() => setCanRate(false));
  }, [product]);


  const submitRating = async (value) => {
    try {
      setUserRating(value);
      setRatingLoading(true);

      const token = localStorage.getItem("userToken");
      if (!token) return alert("Login required to rate");

      const res = await fetch(
        `http://localhost:9000/product/${product._id}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ value }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setProduct((prev) => ({
          ...prev,
          averageRating: data.averageRating,
          ratingCount: data.ratingCount,
        }));
      }
    } catch {
      alert("Rating failed");
    } finally {
      setRatingLoading(false);
    }
  };



  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:9000/product/${id}`);
        const data = await res.json();
        if (data.success) setProduct(data.product);
        else setProduct(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!product) return <div className="text-center py-5">Product not found</div>;

  // Image URL helper
  const getImageUrl = (img) =>
    img ? `http://localhost:9000${img}` : product.image;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product._id,
        title: product.title,
        price: product.price,
        image: getImageUrl(product.images?.[0]),
      },
      qty
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout"); // Redirect to checkout page
  };

  return (
    <div className="product-detail py-5">
      <div className="container">
        <div className="row g-5">
          {/* LEFT - IMAGES */}
          <div className="col-lg-6" data-aos="fade-up">
            <div className="main-image mb-3">
              <img
                src={getImageUrl(product.images?.[activeImg])}
                alt={product.title}
                className="img-fluid rounded"
              />
            </div>

            <div className="thumbs d-flex gap-2 flex-wrap">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={getImageUrl(img)}
                  alt={`thumb-${i}`}
                  className={`img-thumbnail ${activeImg === i ? "border-primary" : ""}`}
                  style={{
                    cursor: "pointer",
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                  }}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT - PRODUCT INFO */}
          <div className="col-lg-6" data-aos="fade-up">
            <h1 className="mb-2">{product.title}</h1>

            <div className="rating mb-2 d-flex align-items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  style={{ cursor: canRate ? "pointer" : "default" }}
                  color={star <= Math.round(product.averageRating)
                    ? "#f5c518"
                    : "#e4e5e9"}
                  onClick={() => {
                    if (!canRate) return;
                    submitRating(star);
                  }}
                />
              ))}

              <span className="ms-2 text-muted">
                {product.averageRating?.toFixed(1)} / 5
                {" "}({product.ratingCount} ratings)
              </span>
            </div>

            {!canRate && (
              <small className="text-muted">
                ⭐ You can rate this product after purchasing it
              </small>
            )}


            <div className="price mb-3">
              <span className="fs-4 fw-bold">₹{product.price}</span>
              {product.oldPrice && (
                <>
                  <del className="ms-2 text-muted">₹{product.oldPrice}</del>
                  <span className="ms-2 text-danger fw-semibold">
                    {Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) * 100
                    )}
                    % OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-muted">{product.description}</p>

            {/* QUANTITY */}
            <div className="qty d-flex align-items-center mb-3">
              <span className="me-3 fw-semibold">Quantity</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              >
                <FaMinus />
              </button>
              <span className="mx-3 fw-semibold">{qty}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setQty(qty < 10 ? qty + 1 : 10)} // optional max limit
              >
                <FaPlus />
              </button>
            </div>

            {/* ACTIONS */}
            <div className="d-grid gap-2 d-flex mb-4">
              <button className="btn-buy w-50" onClick={handleBuyNow}>
                BUY NOW
              </button>

              <button className="btn-cart w-50" onClick={handleAddToCart}>
                ADD TO CART
              </button>
            </div>

            {/* TRUST */}
            <div className="trust d-flex flex-wrap gap-4 text-muted">
              <div>
                <FaTruck /> Discreet Shipping
              </div>
              <div>
                <FaLock /> Secure Checkout
              </div>
              <div>
                <FaHeadset /> 24/7 Support
              </div>
            </div>

            {/* ACCORDION */}
            <div className="accordion mt-4" id="productAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#overview"
                  >
                    Overview
                  </button>
                </h2>
                <div id="overview" className="accordion-collapse collapse show">
                  <div className="accordion-body">{product.description}</div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#features"
                  >
                    Features & Specs
                  </button>
                </h2>
                <div id="features" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <ul>
                      <li>Brand: {product.brand}</li>
                      <li>Category: {product.category}</li>
                      <li>Usage: {product.usageType}</li>
                      <li>
                        Suitable For: {product.suitableFor?.join(", ") || "N/A"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#care"
                  >
                    Safety & Care
                  </button>
                </h2>
                <div id="care" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    Always clean before and after use. Store in a dry place.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
