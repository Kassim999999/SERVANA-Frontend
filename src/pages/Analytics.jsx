import './Analytics.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Analytics = () => {
  const [stats, setStats] = useState({});
  const { token } = useContext(AuthContext); // ✅ Get token

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/analytics', {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Secure fetch
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Analytics fetch failed:', err));
  }, [token]);

  return (
    <div className="analytics">
      <h2>Platform Analytics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.total_users ?? '...'}</p>
        </div>
        <div className="stat-card">
          <h3>Total Workers</h3>
          <p>{stats.total_workers ?? '...'}</p>
        </div>
        <div className="stat-card">
          <h3>Total Services</h3>
          <p>{stats.total_services ?? '...'}</p>
        </div>
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>{stats.total_bookings ?? '...'}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
