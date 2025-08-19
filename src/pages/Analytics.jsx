import './Analytics.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#116530', '#FFB400', '#FF4C4C', '#3B82F6', '#8B5CF6'];

const Analytics = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return; // ✅ Wait until token is available

    const controller = new AbortController();

    fetch('http://127.0.0.1:5000/api/analytics', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(`HTTP ${res.status} - ${errMsg}`);
        }
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error('Analytics fetch failed:', err);
        setError(err.message);
      });

    return () => controller.abort();
  }, [token]);

  if (!token) return <div>Please log in to view analytics.</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="analytics-page">
      <h2>Platform Analytics</h2>

      {/* Top Cards */}
      <div className="analytics-cards">
        <div className="card"><h3>{data.total_users}</h3><p>Users</p></div>
        <div className="card"><h3>{data.total_workers}</h3><p>Workers</p></div>
        <div className="card"><h3>{data.total_services}</h3><p>Services</p></div>
        <div className="card"><h3>{data.total_jobs}</h3><p>Bookings</p></div>
        <div className="card"><h3>${data.total_earnings}</h3><p>Total Earnings</p></div>
      </div>

      <div className="analytics-charts">
        {/* Pie Chart */}
      {/* Pie Chart */}
{/* Pie Chart */}
<div className="chart-box">
  <h3>Bookings Breakdown</h3>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={Object.entries(data.bookings_overview).map(([name, value]) => ({ name, value }))}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label
      >
        {Object.entries(data.bookings_overview).map(([name], index) => {
          let color = "#8884d8"; // default
          if (name.toLowerCase() === "cancelled") color = "#FF4C4C"; // red
          else if (name.toLowerCase() === "pending") color = "#FFB400"; // yellow
          else if (name.toLowerCase() === "completed") color = "#116530"; // green
          else if (name.toLowerCase() === "confirmed") color = "#3B82F6"; // blue

          return <Cell key={`cell-${index}`} fill={color} />;
        })}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>

  {/* Legend */}
  <div className="chart-legend">
    <div><span style={{ background: "#FF4C4C" }} className="legend-box"></span> Cancelled</div>
    <div><span style={{ background: "#FFB400" }} className="legend-box"></span> Pending</div>
    <div><span style={{ background: "#116530" }} className="legend-box"></span> Completed</div>
    <div><span style={{ background: "#3B82F6" }} className="legend-box"></span> Confirmed</div>
  </div>
</div>


        {/* Line Chart */}
        <div className="chart-box">
          <h3>Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.revenue_history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#116530" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Providers */}
      <div className="analytics-section">
        <h3>Top Providers</h3>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Completed Jobs</th>
            </tr>
          </thead>
          <tbody>
            {data.top_providers.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.jobs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Activity */}
      <div className="analytics-section">
        <h3>Recent Activity</h3>
        <ul>
          {data.recent_activity.map((act, i) => (
            <li key={i}>{act}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
