import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

const Account = () => {
  const navigate = useNavigate();
  const { setUser } = useCart(); // <-- CartContext

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://toy-backend-fsek.onrender.com", { email, password });

      if (res.data.token) {
        alert(res.data.message);

        // Check if user is admin or regular user
        if (res.data.role === "admin") {
          // 🔐 ADMIN LOGIN
          localStorage.setItem("adminToken", res.data.token);
          localStorage.setItem("adminUser", JSON.stringify(res.data.user));
          navigate("/Admin-dashboard");

        } else {
          // 🔐 USER LOGIN
          localStorage.setItem("userToken", res.data.token);

          const loggedInUser = {
            id: res.data.user.id || res.data.user._id,
            fullname: res.data.user.fullname,
            email: res.data.user.email,
            profile: res.data.user.profile.startsWith("http")
              ? res.data.user.profile
              : `https://toy-backend-fsek.onrender.com${res.data.user.profile}`
          };

          // Save in CartContext and localStorage
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          setUser(loggedInUser);

          navigate("/");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
      console.log(err);
      
    }
  };



  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://toy-backend-fsek.onrender.com", {
        fullname: name,
        email,
        password,
      });

      if (res.data.token) {
        alert(res.data.message);

        // 🚫 Register should NEVER log in admin
        localStorage.setItem("userToken", res.data.token);

        const newUser = {
          id: res.data.user.id || res.data.user._id,
          fullname: res.data.user.fullname,
          email: res.data.user.email,
          profile: res.data.user.profile,
        };

        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="container">
      <div className="account">
        <div className="bg"></div>
        <div className="panel">
          <input type="radio" id="switch-open" name="switch" />
          <input type="radio" id="switch-close" name="switch" />

          {/* LOGIN */}
          <div className="login">
            <h1>LOGIN</h1>
            <div className="group">
              <input
                type="text"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="LOGIN" onClick={login} />
          </div>

          {/* REGISTER */}
          <div className="register">
            <label className="button-open" htmlFor="switch-open"></label>
            <label className="button-close" htmlFor="switch-close"></label>
            <div className="inner">
              <h1>REGISTER</h1>
              <div className="group">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="group">
                <input
                  type="text"
                  placeholder="E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="REGISTER" onClick={register} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
