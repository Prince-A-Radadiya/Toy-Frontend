import { FaSearch, FaBoxOpen, FaTruck, FaCheckCircle } from "react-icons/fa";

const Track = () => {
  return (
    <div className="track-page py-5">

      <div className="container">
        {/* TITLE + SEARCH */}
        <div className="mb-4">
          <span className="badge bg-success-subtle text-success mb-3">
            ORDER IN TRANSIT
          </span>
          <h1 className="fw-bold mt-2">TRACK YOUR ORDER</h1>
          <p className="text-muted">
            Discreetly packaged, rapidly delivered. Your privacy is our priority.
          </p>

          <div className="input-group track-search">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Order ID"
            />
            <button className="btn btn-danger">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="row g-4">
          {/* CURRENT STATUS */}
          <div className="col-lg-6">
            <div className="card shadow-sm track-card h-100">
              <div className="card-body">
                <h6 className="text-uppercase text-muted">Current Status</h6>
                <h3 className="fw-bold text-danger">SHIPPED</h3>

                <div className="d-flex align-items-start discreet-box mt-3">
                  <FaBoxOpen className="icon" />
                  <div>
                    <strong>Discreet Packaging Guarantee</strong>
                    <p className="mb-0 text-muted">
                      Unbranded packaging. Sender listed as "PL Logistics".
                    </p>
                  </div>
                </div>

                <div className="progress mt-4">
                  <div className="progress-bar bg-danger" style={{ width: "60%" }} />
                </div>
                <small className="text-muted">Estimated Delivery: Aug 27</small>
              </div>
            </div>
          </div>

          {/* PRODUCT BOX */}
          <div className="col-lg-6">
            <div className="card shadow-sm track-card product-card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="product-icon me-3">📦</div>
                <div>
                  <h5 className="mb-1">The Wand – Sonic Massager</h5>
                  <h6>Order ID : s5ec1ecbee51</h6>
                  <strong>$129.00</strong>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVITY LOG */}
          <div className="col-12">
            <div className="card shadow-sm track-card">
              <div className="card-body">
                <h6 className="text-uppercase text-muted mb-3">Activity Log</h6>

                <ul className="list-unstyled timeline">
                  <li className="timeline-item inactive">
                    <FaCheckCircle />
                    <div>
                      <strong>Delivered</strong>
                      <p>Estimated: Aug 27, 8:00 PM</p>
                    </div>
                  </li>

                  <li className="timeline-item inactive">
                    <FaTruck />
                    <div>
                      <strong>Out for Delivery</strong>
                      <p>Estimated: Aug 27, 8:00 AM</p>
                    </div>
                  </li>

                  <li className="timeline-item active">
                    <FaTruck />
                    <div>
                      <strong>Shipped</strong>
                      <p>Aug 25, 9:00 AM – Transit Center, NY</p>
                    </div>
                  </li>

                  <li className="timeline-item">
                    <FaCheckCircle />
                    <div>
                      <strong>Packed with Care</strong>
                      <p>Aug 24, 2:00 PM</p>
                    </div>
                  </li>

                  <li className="timeline-item">
                    <FaCheckCircle />
                    <div>
                      <strong>Order Confirmed</strong>
                      <p>Aug 24, 10:00 AM</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
