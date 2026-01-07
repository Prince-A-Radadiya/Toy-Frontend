import { useState, useEffect } from "react";
import { FaUserCog, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const { user, setUser, logout } = useCart();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("settings");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================
     ACCOUNT SETTINGS STATES
  ========================== */
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  /* SYNC USER DATA */
  useEffect(() => {
    if (user) {
      setFullname(user.fullname || "");
      setEmail(user.email || "");
      setPreview(user.profile || "/img/user.webp");
    }
  }, [user]);


  /* UPDATE USER */
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");

      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      if (password) formData.append("password", password);
      if (profile) formData.append("profile", profile);

      const res = await axios.put("https://toy-backend-fsek.onrender.com/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        const updatedUser = res.data.user;

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setMessage("Profile updated successfully!");
      }
    } catch (err) {
      setMessage("Update failed");
    }
  };

  /* DELETE ACCOUNT */
  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete("https://toy-backend-fsek.onrender.com/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
      navigate("/");
    } catch {
      setMessage("Delete failed");
    }
  };

  return (
    <div className="container">
      <div className="account-wrapper">
        {/* MOBILE HEADER */}
        <div className="mobile-header">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* SIDEBAR */}
        <aside className={`account-sidebar ${sidebarOpen ? "open" : ""}`}>
          <button
            className={activeSection === "settings" ? "active" : ""}
            onClick={() => {
              setActiveSection("settings");
              setSidebarOpen(false);
            }}
          >
            <FaUserCog /> Account Settings
          </button>

          <button
            className={activeSection === "orders" ? "active" : ""}
            onClick={() => {
              setActiveSection("orders");
              setSidebarOpen(false);
            }}
          >
            <FaShoppingBag /> My Orders
          </button>
        </aside>

        {/* CONTENT */}
        <main className="account-content">
          <div key={activeSection} className="content-animate">
            {activeSection === "orders" && <MyOrders />}
            {activeSection === "settings" && (
              <div className="user-settings py-4">
                <h3>User Settings</h3>

                {message && <p className="text-success">{message}</p>}

                {/* PROFILE IMAGE */}
                <div className="mb-3 text-center">
                  <img
                    src={preview}
                    alt="profile"
                    className="rounded-circle"
                    width="120"
                    height="120"
                  />
                  <input
                    type="file"
                    className="form-control mt-2"
                    accept="image/*"
                    onChange={(e) => {
                      setProfile(e.target.files[0]);
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </div>

                <form onSubmit={handleUpdate}>
                  <div className="form-group my-2">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group my-2">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Leave blank to keep current"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary my-2">
                    Update Profile
                  </button>
                </form>

                <hr />

                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Account
                </button>

                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserSettings;

/* ========================================
   MY ORDERS COMPONENT (updated)
======================================== */

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Return drawer states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  // ⭐ Rating states
  const [ratingDrawerOrderId, setRatingDrawerOrderId] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);

  const renderStars = (value, onSelect) => {
    return (
      <div style={{ display: "flex", gap: "6px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => onSelect(star)}
            style={{
              cursor: "pointer",
              fontSize: "22px",
              color: star <= value ? "#facc15" : "#d1d5db",
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const submitRating = async (productId) => {
    if (!ratingValue) return alert("Please select rating");

    try {
      setRatingLoading(true);
      const token = localStorage.getItem("userToken");

      await axios.post(
        `https://toy-backend-fsek.onrender.com/product/${productId}/rate`,
        { value: ratingValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRatingDrawerOrderId(null);
      setRatingValue(0);
      alert("Thanks for rating ⭐");
    } catch {
      alert("Rating failed");
    } finally {
      setRatingLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get("https://toy-backend-fsek.onrender.com/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const now = new Date();

      // Keep cancelled orders only for 48 hrs
      const filtered = (res.data.orders || []).filter((order) => {
        if (order.orderStatus === "cancelled") {
          const diff =
            (now - new Date(order.updatedAt)) / (1000 * 60 * 60);
          return diff <= 48;
        }
        return true;
      });

      setOrders(filtered);
    } catch (err) {
      console.error("Fetch orders failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CANCEL ORDER ================= */
  const cancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      const token = localStorage.getItem("userToken");

      const res = await axios.put(
        `https://toy-backend-fsek.onrender.com/cancel-order/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId
              ? {
                ...o,
                orderStatus: "cancelled",
                updatedAt: new Date().toISOString(),
              }
              : o
          )
        );
      }
    } catch (err) {
      alert("Unable to cancel order");
    }
  };

  /* ================= DOWNLOAD INVOICE ================= */
  const downloadInvoice = async (orderId) => {
    try {
      const token = localStorage.getItem("userToken");

      const res = await axios.get(
        `https://toy-backend-fsek.onrender.com/invoice/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice-${orderId}.pdf`;
      link.click();
    } catch {
      alert("Invoice download failed");
    }
  };

  /* ================= SUBMIT RETURN ================= */
  //  const submitReturn = async () => {
  //   if (!reason) return alert("Please select a reason");

  //   try {
  //     const token = localStorage.getItem("userToken");

  //     await axios.post(
  //       `https://toy-backend-fsek.onrender.com/order/${selectedOrder._id}/return`,
  //       { reason, comment },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     setDrawerOpen(false);
  //     setReason("");
  //     setComment("");
  //     fetchOrders();
  //   } catch (err) {
  //     alert("Return request failed");
  //   }
  // };


  if (loading) {
    return <div className="text-center py-5">Loading orders...</div>;
  }

  return (
    <div className="orders-page">
      <h3 className="mb-4">My Orders</h3>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          You have not placed any orders yet.
        </div>
      ) : (
        orders.map((order) => (
          <div className="card mb-3 shadow-sm" key={order._id}>
            <div className="card-body">
              <div className="row align-items-center">
                {/* LEFT */}
                <div className="col-md-8">
                  <p className="mb-1">
                    <strong>Order ID:</strong> {order.orderId}
                  </p>
                  <p className="mb-1">
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mb-1">
                    <strong>Payment:</strong> {order.paymentMethod}
                  </p>
                  <p className="mb-0">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${order.orderStatus === "delivered"
                        ? "bg-success"
                        : order.orderStatus === "cancelled"
                          ? "bg-danger"
                          : order.orderStatus === "confirmed"
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                    >
                      {order.orderStatus.toUpperCase()}
                    </span>
                  </p>
                </div>

                {/* RIGHT */}
                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                  <h5 className="mb-2">₹{order.total}</h5>

                  <button
                    className="btn btn-outline-danger btn-sm me-2"
                    disabled={
                      order.orderStatus === "cancelled" ||
                      order.orderStatus === "delivered"
                    }
                    onClick={() => cancelOrder(order._id)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    disabled={order.orderStatus === "cancelled"}
                    onClick={() => downloadInvoice(order.orderId)}
                    title={
                      order.orderStatus === "cancelled"
                        ? "Invoice not available for cancelled orders"
                        : "Download Invoice"
                    }
                  >
                    Invoice
                  </button>

                  {order.orderStatus === "delivered" && (
                    <>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() =>
                          setRatingDrawerOrderId(
                            ratingDrawerOrderId === order._id ? null : order._id
                          )
                        }
                      >
                        ⭐ Rate Order
                      </button>

                      {/* ⭐ RATING DRAWER */}
                      {ratingDrawerOrderId === order._id && (
                        <div
                          className="mt-3 p-3 border rounded bg-light"
                          style={{ animation: "fadeSlide 0.25s ease" }}
                        >
                          <p className="mb-2 fw-semibold">Rate your experience</p>

                          {renderStars(ratingValue, setRatingValue)}

                          <button
                            className="btn btn-primary btn-sm mt-3"
                            disabled={ratingLoading}
                            onClick={() => submitRating(order.items[0].productId)}
                          >
                            {ratingLoading ? "Submitting..." : "Submit Rating"}
                          </button>
                        </div>
                      )}
                    </>
                  )}


                  {/* RETURN BUTTON */}
                  {/* {order.orderStatus === "delivered" &&
                    !order.returnRequest?.requested && (
                      <button
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setDrawerOpen(true);
                        }}
                      >
                        Return
                      </button>
                    )} */}

                  {/* {order.returnRequest?.requested && (
                    <span className="badge bg-warning text-dark ms-2">
                      Return {order.returnRequest.status}
                    </span>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* ================= RETURN DRAWER ================= */}
      {/* {drawerOpen && (
        <>
          <div
            className="drawer-overlay"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="return-drawer">
            <h5 className="mb-3">Return Order</h5>

            <select
              className="form-select mb-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="">Select Reason</option>
              <option>Damaged Product</option>
              <option>Wrong Item</option>
              <option>Quality Issue</option>
              <option>Other</option>
            </select>

            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Additional comments (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className="btn btn-danger w-100"
              onClick={submitReturn}
            >
              Submit Return
            </button>
          </div>
        </>
      )} */}
    </div>
  );
};

