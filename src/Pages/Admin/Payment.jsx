import { useState } from "react";
import Sidebar from "../../Component/Sidebar";
import { FaCog } from "react-icons/fa";

const Payment = () => {
    const transactionsData = [
        {
            id: "TXN-99821",
            status: "Paid",
            customer: "Alice Smith",
            email: "alice.s@example.com",
            amount: 120,
            method: "Mastercard •••• 4242",
            date: "Oct 24, 2023 10:30 AM",
        },
        {
            id: "TXN-99822",
            status: "Pending",
            customer: "Bob Jones",
            email: "bob.j@example.com",
            amount: 45,
            method: "PayPal",
            date: "Oct 24, 2023 09:15 AM",
        },
        {
            id: "TXN-99823",
            status: "Failed",
            customer: "Charlie Day",
            email: "charlie@example.com",
            amount: 299,
            method: "Visa •••• 1111",
            date: "Oct 23, 2023 04:20 PM",
        },
        {
            id: "TXN-99820",
            status: "Paid",
            customer: "David Kim",
            email: "david.k@example.com",
            amount: 850,
            method: "Amex •••• 0005",
            date: "Oct 22, 2023 02:45 PM",
        },
        {
            id: "TXN-99819",
            status: "Paid",
            customer: "Elena Sanchez",
            email: "elena.s@example.com",
            amount: 64.5,
            method: "Stripe",
            date: "Oct 21, 2023 11:15 AM",
        },
        {
            id: "TXN-99818",
            status: "Pending",
            customer: "Ryan Howard",
            email: "ryan.h@example.com",
            amount: 180,
            method: "PayPal",
            date: "Oct 20, 2023 05:30 PM",
        },
        {
            id: "TXN-99817",
            status: "Failed",
            customer: "Michael Scott",
            email: "michael.s@example.com",
            amount: 420,
            method: "Visa •••• 4321",
            date: "Oct 19, 2023 03:10 PM",
        },
    ];

    const itemsPerPage = 5; // ✅ UPDATED

    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState("All");

    // 🔹 Filter logic
    const filteredData =
        filterStatus === "All"
            ? transactionsData
            : transactionsData.filter(
                (item) => item.status === filterStatus
            );

    // 🔹 Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="admin">
            <Sidebar />

            <div className="admin-content payment-page">
                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0">Payments Management</h2>
                    <div className="d-flex align-items-center gap-3">
                        <FaCog className="fs-5 cursor-pointer text-muted" />

                        <img
                            src={require('../../Img/admin.webp')}
                            alt="Admin"
                            className="admin-avatar"
                        />
                    </div>
                </div>

                {/* FILTER BUTTONS */}
                <div className="btn-group mb-4">
                    {["All", "Paid", "Pending", "Failed"].map((status) => (
                        <button
                            key={status}
                            className={`btn filter-btn ${filterStatus === status ? "active" : ""
                                }`}
                            onClick={() => {
                                setFilterStatus(status);
                                setCurrentPage(1); // reset pagination
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* STATS */}
                <div className="row g-3 mb-4">
                    <StatCard title="Total Revenue" value="$1,204,500" color="green" />
                    <StatCard title="Pending Payouts" value="$12,450" color="blue" />
                    <StatCard title="Refund Rate" value="2.4%" color="orange" />
                    <StatCard title="Failed Txns" value="24" color="red" />
                </div>

                {/* TABLE */}
                <div className="card payment-card">
                    <div className="card-body">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Transaction</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentData.length > 0 ? (
                                    currentData.map((item) => (
                                        <tr key={item.id} className="fade-in">
                                            <td>
                                                <span
                                                    className={`status-badge ${item.status.toLowerCase()}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td>
                                                <strong>{item.id}</strong>
                                                <br />
                                                <small className="text-muted">{item.date}</small>
                                            </td>
                                            <td>
                                                <strong>{item.customer}</strong>
                                                <br />
                                                <small className="text-muted">{item.email}</small>
                                            </td>
                                            <td className="fw-bold">${item.amount}</td>
                                            <td>{item.method}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">
                                            No {filterStatus} transactions found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* PAGINATION */}
                        {filteredData.length > itemsPerPage && (
                            <div className="d-flex justify-content-between align-items-center">
                                <small>
                                    Showing {startIndex + 1} to{" "}
                                    {Math.min(
                                        startIndex + itemsPerPage,
                                        filteredData.length
                                    )}{" "}
                                    of {filteredData.length}
                                </small>

                                <div>
                                    <button
                                        className="btn btn-sm border border-secondary btn-outline-secondary me-2"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((p) => p - 1)}
                                    >
                                        Previous
                                    </button>

                                    <button
                                        className="btn btn-sm border border-primary btn-outline-primary"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((p) => p + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => {
    return (
        <div className="col-lg-3 col-md-6">
            <div className={`stat-card ${color}`}>
                <p>{title}</p>
                <h5>{value}</h5>
            </div>
        </div>
    );
};

export default Payment;
