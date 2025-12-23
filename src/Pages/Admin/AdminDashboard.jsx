import {
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaExclamationTriangle,
  FaCog
} from "react-icons/fa";
import { BsCheckCircleFill, BsHourglassSplit } from "react-icons/bs";
import Sidebar from "../../Component/Sidebar";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

/* SALES DATA (DATES INSTEAD OF MONTHS) */
const salesData = {
  labels: [
    "01 Oct",
    "05 Oct",
    "10 Oct",
    "15 Oct",
    "20 Oct",
    "25 Oct",
    "30 Oct"
  ],
  datasets: [
    {
      label: "Sales",
      data: [12000, 15000, 18000, 22000, 26000, 30000, 34000],
      fill: true,
      borderColor: "#4f46e5",
      backgroundColor: "rgba(79,70,229,0.15)",
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

const AdminDashboard = () => {

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: "#6b7280" },
        grid: { display: false }
      },
      y: {
        ticks: { color: "#6b7280" },
        grid: { color: "#e5e7eb" }
      }
    }
  };

  return (
    <div className="admin d-flex">
      <Sidebar />

      <div className="admin-content p-4">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Dashboard</h2>

          <div className="d-flex align-items-center gap-3">
            <FaCog className="fs-5 cursor-pointer text-muted" />

            <img
              src={require('../../Img/admin.webp')}
              alt="Admin"
              className="admin-avatar"
            />
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="row g-4 mb-4">
          <StatCard title="Total Revenue" value="$124,500" icon={<FaDollarSign />} color="success" />
          <StatCard title="Total Orders" value="1,450" icon={<FaShoppingCart />} color="primary" />
          <StatCard title="Completed Payments" value="$98,200" icon={<BsCheckCircleFill />} color="success" />
          <StatCard title="Pending Orders" value="45" icon={<BsHourglassSplit />} color="warning" />
          <StatCard title="Total Users" value="3,200" icon={<FaUsers />} color="success" />
          <StatCard title="Low Stock" value="12" icon={<FaExclamationTriangle />} color="danger" />
        </div>

        {/* SALES + ORDER STATUS */}
        <div className="row g-4 mb-4">

          {/* SALES */}
          <div className="col-lg-8">
            <div className="card dashboard-card h-100">
              <div className="card-header bg-transparent border-0">
                <h5 className="mb-1">Sales Overview</h5>
                <small className="text-muted">Last 30 days</small>
              </div>
              <div className="card-body" style={{ height: 280 }}>
                <Line data={salesData} options={salesOptions} />
              </div>
            </div>
          </div>

          {/* ORDER STATUS */}
          <div className="col-lg-4">
            <div className="card dashboard-card h-100">
              <div className="card-header bg-transparent border-0">
                <h5>Order Status</h5>
              </div>

              <div className="card-body text-center">
                <div className="order-ring">
                  <span>1,450</span>
                </div>

                <ul className="list-unstyled text-start small mt-3">
                  <li><span className="dot completed"></span> Completed — 65%</li>
                  <li><span className="dot shipped"></span> Shipped — 20%</li>
                  <li><span className="dot pending"></span> Pending — 10%</li>
                  <li><span className="dot return"></span> Returns — 5%</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* RECENT ORDERS */}
        {/* <div className="card dashboard-card">
          <div className="card-header bg-transparent border-0 d-flex justify-content-between">
            <h5>Recent Orders</h5>
            <span className="text-primary cursor-pointer">View All</span>
          </div>

          <div className="table-responsive">
            <table className="table table-light table-borderless align-middle mb-0">
              <thead className="text-muted">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-5542</td>
                  <td>Michael Scott</td>
                  <td>24 Oct 2023</td>
                  <td>$320.00</td>
                  <td><span className="badge bg-success">Completed</span></td>
                </tr>
                <tr>
                  <td>#ORD-5541</td>
                  <td>Dwight Schrute</td>
                  <td>24 Oct 2023</td>
                  <td>$150.50</td>
                  <td><span className="badge bg-warning text-dark">Processing</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}

      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="col-xl-2 col-lg-4 col-md-6">
    <div className="card dashboard-card">
      <div className="card-body d-flex justify-content-between ">
        <div >
          <p className="text-muted mb-1">{title}</p>
          <h5 className="mb-0">{value}</h5>
        </div>
        <div className={`icon-box d-flex align-items-start text-${color}`}>{icon}</div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
