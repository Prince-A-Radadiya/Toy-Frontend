import { useEffect, useState } from "react";
import Sidebar from "../../Component/Sidebar";
import { FaCog } from "react-icons/fa";
import axios from "axios";

const ReturnsRefunds = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        axios
            .get("http://localhost:9000/admin/returns", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            })
            .then((res) => setData(res.data.orders || []))
            .catch((err) => console.error(err));
    }, []);

    const filteredData =
        filter === "All"
            ? data
            : data.filter(
                (d) =>
                    d.returnRequest?.status?.toLowerCase() === filter.toLowerCase()
            );

    const updateReturn = async (orderId, status) => {
        try {
            await axios.put(
                `http://localhost:9000/admin/returns/${orderId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                }
            );

            // update UI instantly
            setData((prev) =>
                prev.map((o) =>
                    o._id === orderId
                        ? {
                            ...o,
                            returnRequest: { ...o.returnRequest, status },
                        }
                        : o
                )
            );
        } catch (err) {
            alert("Failed to update return");
        }
    };


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
                            src={require("../../Img/admin.webp")}
                            alt="Admin"
                            className="admin-avatar"
                        />
                    </div>
                </div>

                {/* STATS (unchanged) */}
                <div className="row g-3 mb-4">
                    <StatCard title="Pending Requests" value="—" tag="Live" color="orange" />
                    <StatCard title="Total Refunded (Mo)" value="—" tag="—" color="green" />
                    <StatCard title="Avg. Processing Time" value="—" tag="—" color="purple" />
                </div>

                {/* FILTER BAR */}
                <div className="card filter-card mb-3">
                    <div className="card-body d-flex flex-wrap justify-content-between gap-3">
                        <div className="btn-group">
                            {["All", "Pending", "Approved", "Rejected"].map((s) => (
                                <button
                                    key={s}
                                    className={`btn filter-btn ${filter === s ? "active" : ""
                                        }`}
                                    onClick={() => setFilter(s)}
                                >
                                    {s}
                                </button>
                            ))}
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
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted py-4">
                                            No records found
                                        </td>
                                    </tr>
                                )}

                                {filteredData.map((item) => (
                                    <tr key={item._id} className="fade-in">
                                        <td>
                                            <strong>{item.orderId}</strong>
                                        </td>

                                        <td>
                                            <strong className="text-primary">
                                                #{item.orderId}
                                            </strong>
                                            <br />
                                            <small className="text-muted">
                                                {item.items?.[0]?.title || "—"}
                                            </small>
                                        </td>

                                        <td>
                                            <strong>{item.userId?.fullname}</strong>
                                            <br />
                                            <small className="text-muted">
                                                {item.userId?.email}
                                            </small>
                                        </td>

                                        <td>
                                            {new Date(
                                                item.returnRequest.requestedAt
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="fw-bold">
                                            ₹{Number(item.total || 0).toFixed(2)}
                                        </td>

                                        <td>
                                            <span
                                                className={`status ${item.returnRequest.status}`}
                                            >
                                                {item.returnRequest.status}
                                            </span>
                                        </td>

                                        <td>
                                            {item.returnRequest.status === "pending" && (
                                                <>
                                                    <button
                                                        className="btn green btn-sm btn-outline-success me-2"
                                                        onClick={() => updateReturn(item._id, "approved")}
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        className="btn red btn-sm btn-outline-danger"
                                                        onClick={() => updateReturn(item._id, "rejected")}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}

                                            {item.returnRequest.status !== "pending" && (
                                                <span className="text-muted">
                                                    {item.returnRequest.status.toUpperCase()}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                {/* <span className="tag">{tag}</span> */}
            </div>
            <h5>{value}</h5>
        </div>
    </div>
);

export default ReturnsRefunds;
