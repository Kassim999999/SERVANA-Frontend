import './Dashboard.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState({
    users: 0,
    workers: 0,
    bookings: 0,
    services: 0,
  });

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
  </div>
);
};

export default Dashboard;
