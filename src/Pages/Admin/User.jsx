import Sidebar from "../../Component/Sidebar";
import { FiSearch } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaCog } from "react-icons/fa";

const User = () => {
    const [usersData, setUsersData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Fetch users
    useEffect(() => {
        const token = localStorage.getItem("adminToken");

        axios
            .get("http://localhost:9000/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("USERS:", res.data); // 🔥 DEBUG
                setUsersData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);


    // Delete user
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const token = localStorage.getItem("adminToken");
            await axios.delete(`http://localhost:9000/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsersData((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.log(err);
            alert("Failed to delete user");
        }
    };

    // Filter users
    const filteredUsers = usersData.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // Pagination
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = filteredUsers.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="admin">
            <Sidebar />
            <div className="admin-content">
                <div className="user-page">

                    {/* PAGE HEADER */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold mb-0">User Management</h2>
                        <div className="d-flex align-items-center gap-3">
                            <FaCog className="fs-5 cursor-pointer text-muted" />

                            <img
                                src={require('../../Img/admin.webp')}
                                alt="Admin"
                                className="admin-avatar"
                            />
                        </div>
                    </div>

                    {/* Search */}
                    <div className="search-box d-flex align-items-center px-3 mt-3">
                        <FiSearch className="me-2" size={20} />
                        <input
                            type="text"
                            className="form-control bg-transparent border-0 shadow-none"
                            placeholder="Search users by name or email"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* User Table */}
                    <div className="table-card mt-4 rounded">
                        <table className="table custom-table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>Users</th>
                                    <th>Registration Date</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((u) => (
                                    <tr key={u.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img src={`http://localhost:9000${u.img}`} alt="" className="user-img me-2" />
                                                <div>
                                                    <p className="mb-0 fw-semibold">{u.name}</p>
                                                    <small className="text-secondary">{u.email}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-secondary">{u.date}</td>
                                        <td>
                                            <span className={`status-badge ${u.status.toLowerCase()}`}>{u.status}</span>
                                        </td>
                                        <td className="text-end">
                                            <MdEdit size={20} className="text-info me-3 action-btn" />
                                            <MdDelete size={20} className="text-danger action-btn" onClick={() => handleDelete(u.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="pagination d-flex justify-content-center py-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
