import React, { useState } from "react";
import { FaHeart, FaStar, FaFilter } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../../Context/CartContext";

/* ------------------ PRODUCTS ------------------ */
const BRANDS = ["MsChief", "Durex", "Manforce"];

const PRODUCTS = Array.from({ length: 148 }, (_, i) => ({
  id: i + 1,
  brand: BRANDS[i % BRANDS.length],
  title: `Product ${i + 1}`,
  gender: i % 2 === 0 ? "Women" : "Men",
  price: 2330 + i * 5,
  oldPrice: 4668 + i * 5,
  discount: `${(i % 50) + 1}% Off`,
  rating: 5,
  image: require("../../Img/t1.png"),
  freeLube: i % 2 === 0,

  // ✅ ADD THESE
  isNew: i % 4 === 0,
  isBestSeller: i % 6 === 0,

  condomType: "Thin",
  usageType: "Internal",
  suitableFor:
    i % 3 === 0
      ? ["Beginner", "Solo"]
      : i % 3 === 1
        ? ["Couples"]
        : ["Advanced"],
}));


/* ------------------ PRODUCT CARD ------------------ */
const ProductCard = ({ product, onAddToCart }) => (
  <div className="product-card">
    <div className="product-image">
      <span className="discount-badge">{product.discount}</span>
      <img src={product.image} alt={product.title} />
      {product.freeLube && <span className="free-badge">Free Lube!</span>}
    </div>

    <div className="product-info">
      <small className="brand">{product.brand}</small>
      <h6>{product.title}</h6>

      <div className="rating">
        <FaStar /> {product.rating}.0
      </div>

      <div className="price">
        ₹{product.price}
        <span>₹{product.oldPrice}</span>
      </div>

      <div className="card-actions">
        <button className="wishlist">
          <FaHeart />
        </button>
        <button className="add-cart" onClick={onAddToCart}>Add to cart</button>
      </div>
    </div>
  </div>
);

/* ------------------ FILTER CONTENT ------------------ */
const FilterContent = ({ filters, setFilters, isMobile, onApply }) => {
  const [open, setOpen] = useState({
    gender: true,
    brand: false,
    price: false,
    condomType: false,
    usageType: false,
    suitableFor: false,
  });

  const toggle = (type) => {
    setOpen((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleCheck = (type, value) => {
    setFilters((prev) => {
      const exists = prev[type].includes(value);
      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };

  return (
    <>
      <h6 className="mb-3">Filter</h6>

      {/* PRODUCT FOR */}
      <div className="filter-dropdown">
        <div className="filter-title" onClick={() => toggle("gender")}>
          Product For
          <span>{open.gender ? "−" : "+"}</span>
        </div>

        {open.gender && (
          <div className="filter-options">
            {["Men", "Women"].map((g) => (
              <label key={g}>
                <input
                  type="checkbox"
                  checked={filters.gender.includes(g)}
                  onChange={() => handleCheck("gender", g)}
                />
                {g}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* BRAND */}
      <div className="filter-dropdown">
        <div className="filter-title" onClick={() => toggle("brand")}>
          Brand
          <span>{open.brand ? "−" : "+"}</span>
        </div>

        {open.brand && (
          <div className="filter-options">
            {["MsChief", "Durex", "Manforce"].map((b) => (
              <label key={b}>
                <input
                  type="checkbox"
                  checked={filters.brand.includes(b)}
                  onChange={() => handleCheck("brand", b)}
                />
                {b}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* PRICE RANGE */}
      <div className="filter-dropdown">
        <div className="filter-title" onClick={() => toggle("price")}>
          Price
          <span>{open.price ? "−" : "+"}</span>
        </div>

        {open.price && (
          <div className="filter-options">
            {["Under 1000", "1000-2599", "2600-5000"].map((p) => (
              <label key={p}>
                <input
                  type="checkbox"
                  checked={filters.price.includes(p)}
                  onChange={() => handleCheck("price", p)}
                />
                {p}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* CONDOM TYPE */}
      <div className="filter-dropdown">
        <div className="filter-title" onClick={() => toggle("condomType")}>
          Condom Type
          <span>{open.condomType ? "−" : "+"}</span>
        </div>

        {open.condomType && (
          <div className="filter-options">
            {["Thin", "Fit"].map((c) => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={filters.condomType.includes(c)}
                  onChange={() => handleCheck("condomType", c)}
                />
                {c}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* USAGE TYPE */}
      <div className="filter-dropdown">
        <div className="filter-title" onClick={() => toggle("usageType")}>
          Usage Type
          <span>{open.usageType ? "−" : "+"}</span>
        </div>

        {open.usageType && (
          <div className="filter-options">
            {["Internal", "External", "Remote Control", "Dual Massager"].map((u) => (
              <label key={u}>
                <input
                  type="checkbox"
                  checked={filters.usageType.includes(u)}
                  onChange={() => handleCheck("usageType", u)}
                />
                {u}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* SUITABLE FOR */}
      <div className="filter-dropdown">
        <div
          className="filter-title"
          onClick={() => toggle("suitableFor")}
        >
          Suitable For
          <span>{open.suitableFor ? "−" : "+"}</span>
        </div>

        {open.suitableFor && (
          <div className="filter-options">
            {[
              "Beginner",
              "Advanced",
              "Couples",
              "Solo",
              "Sensitive Skin",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={filters.suitableFor.includes(item)}
                  onChange={() =>
                    handleCheck("suitableFor", item)
                  }
                />
                {item}
              </label>
            ))}
          </div>
        )}
      </div>



      {isMobile && (
        <button className="apply-filter-btn" onClick={onApply}>
          Apply Filters
        </button>
      )}
    </>
  );
};


/* ------------------ MAIN COMPONENT ------------------ */
const Product = ({ setCartCount }) => {
  const { addToCart } = useCart();
  const { brandSlug, collectionSlug } = useParams();
  const location = useLocation();

  const getRouteFilteredProducts = () => {
    // Default → All products (Product page)
    if (location.pathname === "/products") {
      return PRODUCTS;
    }

    // Brand page
    if (location.pathname.startsWith("/brand") && brandSlug) {
      return PRODUCTS.filter(
        (p) => p.brand.toLowerCase() === brandSlug.toLowerCase()
      );
    }

    // Collection page
    if (location.pathname.startsWith("/collection") && collectionSlug) {
      switch (collectionSlug) {
        case "new-arrivals":
          return PRODUCTS.filter((p) => p.isNew);
        case "best-sellers":
          return PRODUCTS.filter((p) => p.isBestSeller);
        case "under-1599":
          return PRODUCTS.filter((p) => p.price <= 1599);
        case "under-2599":
          return PRODUCTS.filter((p) => p.price <= 2599);
        default:
          return PRODUCTS;
      }
    }

    return PRODUCTS;
  };
  useEffect(() => {
    setPage(1);
  }, [brandSlug, collectionSlug, location.pathname]);

  const routeFilteredProducts = getRouteFilteredProducts();


  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("a-z");
  const [showFilter, setShowFilter] = useState(false);
  // const [cartCount, setCartCount] = useState(0);

  // const handleAddToCart = () => {
  //   setCartCount((prev) => prev + 1);
  // };

  const [filters, setFilters] = useState({
    gender: [],
    brand: [],
    price: [],
    condomType: [],
    usageType: [],
    suitableFor: [],
  });

  const [tempFilters, setTempFilters] = useState(filters);

  const itemsPerPage = 12;

  /* -------- FILTER -------- */
  const uiFilteredProducts = routeFilteredProducts.filter((p) => {
    const genderMatch =
      filters.gender.length === 0 ||
      filters.gender.includes(p.gender);

    const brandMatch =
      filters.brand.length === 0 ||
      filters.brand.includes(p.brand);

    const priceMatch =
      filters.price.length === 0 ||
      filters.price.some((range) => {
        if (range === "Under 1000") return p.price < 1000;
        if (range === "1000-2599") return p.price >= 1000 && p.price <= 2599;
        if (range === "2600-5000") return p.price >= 2600 && p.price <= 5000;
        return true;
      });

    const condomMatch =
      filters.condomType.length === 0 ||
      filters.condomType.includes(p.condomType);

    const usageMatch =
      filters.usageType.length === 0 ||
      filters.usageType.includes(p.usageType);

    const suitableMatch =
      filters.suitableFor.length === 0 ||
      filters.suitableFor.some((s) => p.suitableFor?.includes(s));

    const searchMatch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());

    return (
      genderMatch &&
      brandMatch &&
      priceMatch &&
      condomMatch &&
      usageMatch &&
      suitableMatch &&
      searchMatch
    );
  });
  const filteredProducts = uiFilteredProducts;



  /* -------- PAGINATION -------- */
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const visibleProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  /* -------- SORT -------- */
  const sortedProducts = [...visibleProducts].sort((a, b) => {
    switch (sortBy) {
      case "priceLowHigh":
        return a.price - b.price;
      case "priceHighLow":
        return b.price - a.price;
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      case "newOld":
        return b.id - a.id;
      case "oldNew":
        return a.id - b.id;
      default:
        return 0;
    }
  });

  const applyMobileFilter = () => {
    setFilters(tempFilters);
    setShowFilter(false);
    setPage(1);
  };

  return (
    <div className="product">
      <section className="hero-banner">
        <img
          className="d-md-block d-none w-100"
          src={require("../../Img/banner.jpg")}
          alt=""
        />
        <img
          className="d-md-none w-100"
          src={require("../../Img/banner2.jpg")}
          alt=""
        />
      </section>

      <section className="products-page">
        <div className="container">
          <div className="row">
            {/* DESKTOP FILTER */}
            <div className="col-lg-3 d-none d-lg-block">
              <div className="filter-sidebar">
                <FilterContent
                  filters={filters}
                  setFilters={setFilters}
                />
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="col-lg-9">
              <div className="products-header">
                <button
                  className="filter-btn d-lg-none"
                  onClick={() => setShowFilter(true)}
                >
                  <FaFilter /> Filter
                </button>

                <div className="search-sort-wrapper">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="search-input"
                  />

                  <div className="sort-box">
                    <label>Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setPage(1);
                      }}
                    >
                      <option value="az">Alphabetically, A–Z</option>
                      <option value="za">Alphabetically, Z–A</option>
                      <option value="priceLowHigh">Price, Low to High</option>
                      <option value="priceHighLow">Price, High to Low</option>
                      <option value="newOld">New to Old</option>
                      <option value="oldNew">Old to New</option>
                    </select>

                    <span className="product-count">
                      {filteredProducts.length} products
                    </span>
                  </div>
                </div>
              </div>


              <div className="product-grid">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
                ))}
              </div>

              {/* PAGINATION */}
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    if (totalPages <= 5) return true;
                    if (p >= page - 2 && p <= page + 2) return true;
                    if (page <= 3 && p <= 5) return true;
                    if (page >= totalPages - 2 && p >= totalPages - 4)
                      return true;
                    return false;
                  })
                  .map((p) => (
                    <button
                      key={p}
                      className={page === p ? "active" : ""}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE FILTER */}
          <div className={`mobile-filter ${showFilter ? "open" : ""}`}>
            <button
              className="close-btn"
              onClick={() => setShowFilter(false)}
            >
              ✕
            </button>

            <FilterContent
              filters={tempFilters}
              setFilters={setTempFilters}
              isMobile
              onApply={applyMobileFilter}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
