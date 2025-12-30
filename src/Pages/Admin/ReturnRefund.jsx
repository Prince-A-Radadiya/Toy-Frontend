import { useState } from "react";
import Sidebar from "../../Component/Sidebar";
import { FaCog } from "react-icons/fa";

const ReturnsRefunds = () => {
    const data = [
        {
            returnId: "RET-8832",
            orderId: "ORD-1029",
            product: "Nike Air Zoom (Sz 10)",
            customer: "John Doe",
            email: "john@example.com",
            date: "Oct 24, 2023",
            amount: 120,
            status: "Pending",
            action: "Review",
        },
        {
            returnId: "RET-8831",
            orderId: "ORD-0922",
            product: "Mech Keyboard K2",
            customer: "Sarah Smith",
            email: "sarah@mail.com",
            date: "Oct 23, 2023",
            amount: 89,
            status: "Approved",
            action: "Process Refund",
        },
        {
            returnId: "RET-8829",
            orderId: "ORD-0911",
            product: "Classic Watch",
            customer: "Michael Brown",
            email: "mike.b@web.net",
            date: "Oct 21, 2023",
            amount: 240,
            status: "Rejected",
            action: "Details",
        },
    ];

    const [filter, setFilter] = useState("All");

    const filteredData =
        filter === "All" ? data : data.filter((d) => d.status === filter);

    return (
        <div className="admin">
            <Sidebar />

            <div className="admin-content returns-page">

                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0">Returns & Refunds</h2>
                    <div className="d-flex align-items-center gap-3">
                        <FaCog className="fs-5 cursor-pointer text-muted" />

                        <img
                            src={require('../../Img/admin.webp')}
                            alt="Admin"
                            className="admin-avatar"
                        />
                    </div>
                </div>

                {/* STATS */}
                <div className="row g-3 mb-4">
                    <StatCard title="Pending Requests" value="12" tag="+2 new" color="orange" />
                    <StatCard title="Total Refunded (Mo)" value="$4,230.50" tag="+12.5%" color="green" />
                    <StatCard title="Avg. Processing Time" value="24 hrs" tag="-2 hrs" color="purple" />
                </div>

                {/* FILTER BAR */}
                <div className="card filter-card mb-3">
                    <div className="card-body d-flex flex-wrap justify-content-between gap-3">
                        <div className="btn-group">
                            {["All", "Pending", "Approved", "Rejected"].map((s) => (
                                <button
                                    key={s}
                                    className={`btn filter-btn ${filter === s ? "active" : ""}`}
                                    onClick={() => setFilter(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        <div className="d-flex gap-2">
                            <select className="form-select form-select-sm">
                                <option>Newest First</option>
                                <option>Oldest First</option>
                            </select>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Filter by ID..."
                            />
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="card table-card">
                    <div className="card-body">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Return ID</th>
                                    <th>Order & Product</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.returnId} className="fade-in">
                                        <td>
                                            <strong>#{item.returnId}</strong>
                                        </td>

                                        <td>
                                            <strong className="text-primary">
                                                #{item.orderId}
                                            </strong>
                                            <br />
                                            <small className="text-muted">{item.product}</small>
                                        </td>

                                        <td>
                                            <strong>{item.customer}</strong>
                                            <br />
                                            <small className="text-muted">{item.email}</small>
                                        </td>

                                        <td>{item.date}</td>

                                        <td className="fw-bold">${item.amount.toFixed(2)}</td>

                                        <td>
                                            <span className={`status ${item.status.toLowerCase()}`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        <td>
                                            <button className="btn btn-sm btn-outline-primary">
                                                {item.action}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredData.length === 0 && (
                            <div className="text-center py-4 text-muted">
                                No records found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, tag, color }) => (
    <div className="col-lg-4 col-md-6">
        <div className={`stat-card ${color}`}>
            <div className="d-flex justify-content-between">
                <p>{title}</p>
                <span className="tag">{tag}</span>
            </div>
            <h5>{value}</h5>
        </div>
    </div>
);

export default ReturnsRefunds;
