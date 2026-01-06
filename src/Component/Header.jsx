import { Link, NavLink } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../Img/logo.png";
import f1 from '../Img/f1.svg';
import f2 from '../Img/f2.svg';
import f3 from '../Img/f3.svg';
import f4 from '../Img/f4.svg';
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Reusable MegaMenu component
const MegaMenu = ({
  title,
  items = [],
  isOpen,
  setIsOpen,
  isMobile,
  closeMobileMenu,
  linkPrefix = "",
}) => {
  return (
    <li
      className="nav-item mega-parent my-1 my-lg-0"
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <span
        className="cursor-pointer d-flex justify-content-between align-items-center"
        onClick={() => {
          if (!isMobile) return;
          setIsOpen(prev => !prev);
        }}
      >
        <Link to='/brand' className="text-decoration-none text-black">
          <span className="c-nav-link d-flex align-items-center">
            {title} <IoIosArrowDown className="d-lg-flex d-none ms-1" />
          </span>
        </Link>
        {isMobile && <span className={`arrow ${isOpen ? "rotate" : ""}`}>▾</span>}
      </span>

      <div className={`mega-menu ${isOpen ? "open" : ""}`}>
        <div className="container">
          <div className="row text-lg-center">
            {items.length > 0 ? (
              items.map(item => (
                <div key={item._id} className="p-0 col-md-3 col-12">
                  <Link
                    to={`${linkPrefix}/${item.slug}`}
                    onClick={closeMobileMenu}
                    className="text-uppercase m-0 my-1"
                  >
                    {item.name}
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center w-100">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

const Header = ({ cartCount }) => {
  const [brands, setBrands] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [colOpen, setColOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  const searchRef = useRef(null);
  const { user, cart } = useCart(); // single call
  const navigate = useNavigate();

  // Fetch brands from backend
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("https://toy-backend-fsek.onrender.com/brands"); // adjust API
        setBrands(res.data); // assuming [{ _id, name, slug }]
      } catch (err) {
        console.error("Failed to fetch brands:", err);
      }
    };
    fetchBrands();
  }, []);

  // Handle window resize for mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAccountClick = () => {
    if (user) navigate("/user-settings");
    else navigate("/account");
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setMenuOpen(false);
      setBrandOpen(false);
      setColOpen(false);
      setFaqOpen(false);
    }
  };

  return (
    <header className="main-header">
      <nav className="navbar navbar-expand-lg bg-white shadow-sm">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img className="logo" src={logo} alt="Logo" height="40" />
          </Link>

          {/* Mobile Toggle */}
          <button
            className={`navbar-toggler ${menuOpen ? "open" : ""}`}
            onClick={() => {
              setMenuOpen(prev => !prev);
              setBrandOpen(false);
              setColOpen(false);
              setFaqOpen(false);
            }}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item my-1 my-lg-0">
                <NavLink className="c-nav-link" to="/" onClick={closeMobileMenu}>Home</NavLink>
              </li>

              <li className="nav-item my-1 my-lg-0">
                <NavLink className="c-nav-link" to="/product" onClick={closeMobileMenu}>Product</NavLink>
              </li>

              {/* Brand Mega Menu */}
              <MegaMenu
                title="Brand"
                items={brands}
                isOpen={brandOpen}
                setIsOpen={setBrandOpen}
                isMobile={isMobile}
                closeMobileMenu={closeMobileMenu}
                linkPrefix="/brand"
              />

              {/* Collection Mega Menu (static for now, can also be dynamic) */}
              <li
                className="nav-item mega-parent my-1 my-lg-0"
                onMouseEnter={() => !isMobile && setColOpen(true)}
                onMouseLeave={() => !isMobile && setColOpen(false)}
              >
                <span
                  className="cursor-pointer d-flex justify-content-between align-items-center"
                  onClick={() => {
                    if (!isMobile) return;
                    setColOpen(prev => !prev);
                    setBrandOpen(false);
                    setFaqOpen(false);
                  }}
                >
                  <NavLink to='/collection' onClick={closeMobileMenu} className='c-nav-link d-flex align-items-center'>
                    Collection <IoIosArrowDown className="d-lg-flex d-none ms-1" />
                  </NavLink>
                  {isMobile && <span className={`arrow ${colOpen ? "rotate" : ""}`}>▾</span>}
                </span>

                <div className={`mega-menu ${colOpen ? "open" : ""}`}>
                  <div className="container">
                    <div className="row gy-4">
                      {[
                        { img: 'c1.png', path: 'new-arrivals', label: 'new arrivals' },
                        { img: 'c2.png', path: 'best-sellers', label: 'best sellers' },
                        { img: 'c3.png', path: 'deals', label: 'deals' },
                        { img: 'c4.png', path: 'feature-products', label: 'featured products' },
                        { img: 'c5.png', path: 'combos', label: 'combos' },
                        { img: 'c6.png', path: '#', label: 'shop under 1599' },
                        { img: 'c7.png', path: '#', label: 'shop under 2599' },
                        { img: 'c8.png', path: '#', label: 'shop under 5999' },
                      ].map((item, index) => (
                        <div key={index} className="p-0 col-md-3 col-12 d-flex align-items-center">
                          <img src={require(`../Img/${item.img}`)} alt="" />
                          <Link onClick={closeMobileMenu} to={`/collection/${item.path}`} className="text-uppercase m-0 ms-4">{item.label}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item my-1 my-lg-0">
                <NavLink className="c-nav-link" onClick={closeMobileMenu} to="/about-us">About</NavLink>
              </li>

              {/* FAQ Mega Menu */}
              <li
                className="nav-item mega-parent my-1 my-lg-0"
                onMouseEnter={() => !isMobile && setFaqOpen(true)}
                onMouseLeave={() => !isMobile && setFaqOpen(false)}
              >
                <span
                  className=" cursor-pointer d-flex justify-content-between align-items-center"
                  onClick={() => {
                    if (!isMobile) return;
                    setFaqOpen(prev => !prev);
                    setBrandOpen(false);
                    setColOpen(false);
                  }}
                >
                  <NavLink to='/faq' onClick={closeMobileMenu} className='c-nav-link d-flex align-items-center'>
                    Shopping & FAQs <IoIosArrowDown className="d-lg-flex d-none ms-1" />
                  </NavLink>
                  {isMobile && <span className={`arrow ${faqOpen ? "rotate" : ""}`}>▾</span>}
                </span>

                <div className={`mega-menu ${faqOpen ? "open" : ""}`}>
                  <div className="container">
                    <div className="row gy-4">
                      {[{ img: f1, path: 'how-we-deliver', label: 'how we deliver' },
                      { img: f2, path: 'track-my-order', label: 'track my order' },
                      { img: f3, path: 'return-&-refund', label: 'return & refunds' },
                      { img: f4, path: 'faq', label: 'FAQ' },
                      ].map((item, index) => (
                        <div key={index} className="p-0 col-md-3 col-12 d-flex align-items-center">
                          <img src={item.img} alt="" />
                          <Link onClick={closeMobileMenu} to={`/${item.path}`} className="text-uppercase m-0 ms-4">{item.label}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            {/* RIGHT ICONS */}
            <div className="header-icons d-flex align-items-center gap-3 position-relative my-1 my-lg-0 ms-2 ms-lg-0">
              {!isMobile && searchOpen && (
                <div ref={searchRef} className="desktop-search-box">
                  <input type="text" placeholder="Search products..." autoFocus />
                  <button onClick={() => setSearchOpen(false)}><FiX /></button>
                </div>
              )}

              {/* <button className="btn p-0" onClick={() => setSearchOpen(prev => !prev)}>
                <FiSearch size={20} />
              </button> */}

              <Link onClick={closeMobileMenu} to="/wishlist"><FiHeart size={20} /></Link>

              <button className="btn p-0 d-flex align-items-center" onClick={() => { handleAccountClick(); closeMobileMenu(); }}>
                {user ? (
                  <img
                    src={user.profile ? (user.profile.startsWith("http") ? user.profile : `https://toy-backend-fsek.onrender.com${user.profile}`) : "/img/user.webp"}
                    alt="profile"
                    className="rounded-circle header-profile-img"
                  />
                ) : <FaRegCircleUser size={20} />}
              </button>

              <Link onClick={closeMobileMenu} to="/add-to-cart" className="position-relative">
                <FiShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* MOBILE SEARCH BAR */}
      {/* {isMobile && searchOpen && (
        <div className="mobile-search-wrapper">
          <div className="mobile-search-box">
            <input type="text" placeholder="Search products..." autoFocus />
            <button onClick={() => setSearchOpen(false)}><FiX size={22} /></button>
          </div>
        </div>
      )} */}
    </header>
  );
};

export default Header;
