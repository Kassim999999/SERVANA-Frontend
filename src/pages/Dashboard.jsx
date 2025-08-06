import './Dashboard.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';


const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState({
    users: 0,
    workers: 0,
    bookings: 0,
    services: 0,
  });


const [salesData, setSalesData] = useState([]);

useEffect(() => {
  // Fetch dashboard stats
  fetch('http://127.0.0.1:5000/api/dashboard-stats', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => setStats(data))
    .catch((err) => console.error('Dashboard fetch error:', err));

  // Fetch sales data
  fetch('http://127.0.0.1:5000/api/sales-data', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => setSalesData(data))
    .catch((err) => console.error('Sales fetch error:', err));
}, [token]);



  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/dashboard-stats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch dashboard stats');
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => console.error('Dashboard fetch error:', err));
  }, [token]);

return (
  <div className="dashboard">
    <h2>Admin Dashboard Overview</h2>
    <div className="dashboard-stats">
      <div className="stat-card">
        <h3>{stats.users}</h3>
        <p>Users</p>
      </div>
      <div className="stat-card">
        <h3>{stats.workers}</h3>
        <p>Workers</p>
      </div>
      <div className="stat-card">
        <h3>{stats.services}</h3>
        <p>Services</p>
      </div>
      <div className="stat-card">
        <h3>{stats.bookings}</h3>
        <p>Bookings</p>
      </div>
    </div>
<div className="dashboard-chart">
  <h3>Sales Tracker (KES)</h3>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="sales" stroke="#116530" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
</div>


  </div>
);
};

export default Dashboard;
