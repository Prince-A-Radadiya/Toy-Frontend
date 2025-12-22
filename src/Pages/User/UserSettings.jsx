import { useState } from "react";
import { useCart } from "../../Context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const { user, setUser, logout } = useCart();
  const navigate = useNavigate();

  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Update user info
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:9000/update",
        { fullname, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setMessage("Profile updated successfully!");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  // Delete account
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:9000/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });

      logout();
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="user-settings container py-4">
      <h3>User Settings</h3>
      {message && <p className="text-success">{message}</p>}

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
    logout();           // clear user + cart
    navigate("/"); // redirect to login/account page
  }}
>
  Logout
</button>

    </div>
  );
};

export default UserSettings;
