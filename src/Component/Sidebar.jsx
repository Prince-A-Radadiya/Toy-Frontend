import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    DashboardOutlined,
    TeamOutlined,
    CarOutlined,
    PlusSquareOutlined,
    CalendarOutlined,
    MailOutlined,
    SettingOutlined,
    StarOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import { Button, Menu } from "antd";

const items = [
    { key: "/Admin-dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/Admin-dashboard/product-add", icon: <TeamOutlined />, label: "Product-Add" },
    { key: "/Admin-dashboard/product-manage", icon: <CarOutlined />, label: "Product-Manage" },
    { key: "/Admin-dashboard/inventory", icon: <PlusSquareOutlined />, label: "Inventory" },
    { key: "/Admin-dashboard/orders", icon: <CalendarOutlined />, label: "Orders" },
    { key: "/Admin-dashboard/users", icon: <MailOutlined />, label: "Users" },
    { key: "/Admin-dashboard/coupen", icon: <SettingOutlined />, label: "Coupen" },
    { key: "/Admin-dashboard/coupen-edit", icon: <StarOutlined />, label: "Coupen Edit" },
    { key: "/Admin-dashboard/payments", icon: <StarOutlined />, label: "Payments" },
    { key: "/Admin-dashboard/return-and-refund", icon: <StarOutlined />, label: "Return / Refund" }
];

const Sidebar = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => setCollapsed(!collapsed);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/";
    };

    return (
        <div style={{ minHeight: "100vh", width: collapsed ? 80 : 250, display: "flex", flexDirection: "column", background: "#001529" }}>
            
            <div style={{ padding: 16 }}>
                <Button type="primary" onClick={toggleCollapsed} style={{ width: "100%" }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div>

            <Menu
                onClick={(e) => navigate(e.key)}
                theme="dark"
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
                style={{ flex: 1 }}
            />

            <div style={{ padding: 16 }}>
                <Button danger type="primary" icon={<LogoutOutlined />} onClick={handleLogout} style={{ width: "100%" }}>
                    {!collapsed && "Logout"}
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
