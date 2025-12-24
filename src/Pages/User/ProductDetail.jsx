import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaMinus,
  FaPlus,
  FaTruck,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:9000/product/${id}`);
        const data = await res.json();
        if (data.success) setProduct(data.product);
        else setProduct(null);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!product) return <div className="text-center py-5">Product not found</div>;

  return (
    <div className="product-detail py-5">
        <div className="container">
      <div className="row g-5">
        {/* LEFT - IMAGES */}
        <div className="col-lg-6">
          <div className="main-image mb-3">
            <img
              src={`http://localhost:9000${product.images?.[activeImg] || product.image}`}
              alt={product.title}
              className="img-fluid rounded"
            />
          </div>

          <div className="thumbs d-flex gap-2 flex-wrap">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:9000${img}`}
                alt=""
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
        <div className="col-lg-6">
          <h1 className="mb-2">{product.title}</h1>

          <div className="rating mb-2 d-flex align-items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color="#f5c518" />
            ))}
            <span className="ms-2 text-muted">
              {product.reviewCount || 0} Reviews
            </span>
          </div>

          <div className="price mb-3">
            <span className="fs-4 fw-bold">₹{product.price}</span>
            {product.oldPrice && (
              <>
                <del className="ms-2 text-muted">₹{product.oldPrice}</del>
                <span className="ms-2 text-danger fw-semibold">
                  {Math.abs(
                    Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100
                    )
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          <p className="text-muted">{product.description}</p>

          {/* QTY */}
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
              onClick={() => setQty(qty + 1)}
            >
              <FaPlus />
            </button>
          </div>

          {/* ACTIONS */}
          <div className="d-grid gap-2 mb-4">
            <button className="btn btn-warning fw-bold">BUY NOW</button>
            <button className="btn btn-outline-dark fw-semibold">
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
                <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#overview">
                  Overview
                </button>
              </h2>
              <div id="overview" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  {product.description}
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#features">
                  Features & Specs
                </button>
              </h2>
              <div id="features" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <ul>
                    <li>Brand: {product.brand}</li>
                    <li>Category: {product.category}</li>
                    <li>Usage: {product.usageType}</li>
                    <li>Suitable For: {product.suitable}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#care">
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
      {/* YOU MAY ALSO LIKE */}
<div className="related-section">
  <h3 className="related-title">You May Also Like</h3>

  <div className="related-grid">
    {[1,2,3,4].map((item) => (
      <div className="related-card" key={item}>
        <img src="/images/sample-product.jpg" alt="related" />
        <h6>Premium Product</h6>
        <span>₹1,299</span>
      </div>
    ))}
  </div>
</div>
</div>

    </div>
  );
};

export default ProductDetail;
