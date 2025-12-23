import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  PlusOutlined,
  InboxOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  GiftOutlined,
  EditOutlined,
  CreditCardOutlined,
  RollbackOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Button, Menu } from "antd";

const items = [
  { key: "/Admin-dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "/Admin-dashboard/product-add", icon: <PlusOutlined />, label: "Product Add" },
  { key: "/Admin-dashboard/inventory", icon: <InboxOutlined />, label: "Inventory" },
  { key: "/Admin-dashboard/orders", icon: <ShoppingCartOutlined />, label: "Orders" },
  { key: "/Admin-dashboard/users", icon: <UserOutlined />, label: "Users" },
  { key: "/Admin-dashboard/coupen", icon: <GiftOutlined />, label: "Coupon" },
  { key: "/Admin-dashboard/coupen-edit", icon: <EditOutlined />, label: "Coupon Edit" },
  { key: "/Admin-dashboard/payments", icon: <CreditCardOutlined />, label: "Payments" },
  { key: "/Admin-dashboard/return-and-refund", icon: <RollbackOutlined />, label: "Return / Refund" }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
     <div
      style={{
        maxHeight: "100vh",
        width: collapsed ? 80 : 250,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: 16 }}>
        <Button type="primary" onClick={toggleCollapsed} style={{ width: "100%" }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>

      <Menu
        theme="light" 
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[location.pathname]}
        items={items}
        onClick={(e) => navigate(e.key)}
        style={{ flex: 1, background: "transparent" }} // use parent div bg
      />

      <div style={{ padding: 16 }}>
        <Button
          danger
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ width: "100%" }}
        >
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
