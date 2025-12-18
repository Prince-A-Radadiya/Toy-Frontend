import {
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="row gy-4">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-12">
            <div className="footer-brand">
              <h4 className="footer-logo mb-4">
                <img src={require('../Img/logo.png')} alt="" />
              </h4>

              <div className="footer-social">
                <FaGlobe />
                <FaInstagram />
                <FaTwitter />
                <FaFacebookF />
              </div>
            </div>
          </div>

          {/* Shop */}
          <div className="col-lg-2 col-md-4 col-sm-6 col-12">
            <h6 className="footer-title">Shop</h6>
            <ul className="footer-links">
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Vibrators</li>
              <li>For Couples</li>
              <li>Sale</li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <h6 className="footer-title">Support</h6>
            <ul className="footer-links">
              <li>Track Order</li>
              <li>Shipping & Returns</li>
              <li>Discreet Packaging</li>
              <li>FAQ</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-lg-3 col-md-4 col-12">
            <h6 className="footer-title">Legal</h6>
            <ul className="footer-links">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Age Verification</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© 2024 LUXE Wellness. All rights reserved. 18+ Only.</p>

          <div className="payment-icons">
            <img src={require('../Img/paypal.png')} alt="paypal" />
            <img src={require('../Img/card.png')} alt="master-card" />
            <img src={require('../Img/google-pay.png')} alt="google-pay" />
            <img src={require('../Img/visa.png')} alt="visa-pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
