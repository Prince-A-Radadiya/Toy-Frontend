import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState({
    items: [],
    totalQty: 0,
    totalAmount: 0,
  });

  // Load cart from backend on user change
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return setCart({ items: [], totalQty: 0, totalAmount: 0 });
      try {
        const { data } = await axios.get("http://localhost:9000/cart", {
          headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        });
        if (data.success) {
          const items = data.cart.items;
          const totalQty = items.reduce((a, i) => a + i.qty, 0);
          const totalAmount = items.reduce((a, i) => a + i.qty * i.price, 0);
          setCart({ items, totalQty, totalAmount });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();
  }, [user]);

  // ✅ Add to cart
  const addToCart = async (product, qty = 1) => {
    if (!user) {
      alert("Please login to add items");
      return;
    }

    try {
      await axios.post(
        "http://localhost:9000/cart/add",
        { productId: product.id, qty },
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );

      // Refresh cart
      const { data } = await axios.get("http://localhost:9000/cart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });

      if (data.success) {
        const items = data.cart.items;
        const totalQty = items.reduce((a, i) => a + i.qty, 0);
        const totalAmount = items.reduce((a, i) => a + i.qty * i.price, 0);
        setCart({ items, totalQty, totalAmount });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add item to cart");
    }
  };

  // ✅ Update quantity
  const updateQty = async (productId, qty) => {
    if (qty <= 0) return removeItem(productId);
    try {
      await axios.post(
        "http://localhost:9000/cart/add",
        { productId, qty: 0 }, // we will handle exact qty below
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );

      // Workaround: manually update each qty via full refresh
      const { data } = await axios.get("http://localhost:9000/cart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });

      if (data.success) {
        const items = data.cart.items.map((i) =>
          i.productId === productId ? { ...i, qty } : i
        );
        const totalQty = items.reduce((a, i) => a + i.qty, 0);
        const totalAmount = items.reduce((a, i) => a + i.qty * i.price, 0);
        setCart({ items, totalQty, totalAmount });

        // Optionally, sync backend exact qty
        await axios.post(
          "http://localhost:9000/cart/add",
          { productId, qty },
          { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Remove item
  const removeItem = async (productId) => {
    try {
      await axios.post(
        "http://localhost:9000/cart/remove",
        { productId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );

      setCart((prev) => {
        const items = prev.items.filter((i) => i.productId !== productId);
        const totalQty = items.reduce((a, i) => a + i.qty, 0);
        const totalAmount = items.reduce((a, i) => a + i.qty * i.price, 0);
        return { items, totalQty, totalAmount };
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    if (!user) return;
    try {
      await axios.post(
        "http://localhost:9000/cart/clear",
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
      );
      setCart({ items: [], totalQty: 0, totalAmount: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    setUser(null);
    setCart({ items: [], totalQty: 0, totalAmount: 0 });
  };

  return (
    <CartContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        logout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
