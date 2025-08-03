import './Analytics.css';

const Analytics = () => {
  const summary = [
    { label: 'Total Jobs', value: 4120 },
    { label: 'Active Users', value: 1300 },
    { label: 'Workers', value: 240 },
    { label: 'Monthly Earnings', value: 'KES 920,000' },
    { label: 'Completed Jobs', value: 3985 }
  ];

  const charts = [
    'Bookings Overview',
    'Revenue Graph',
    'Top Providers',
    'User Growth by Region',
    'Worker Ratings Distribution',
    'Service Type Distribution'
  ];

  return (
    <div className="analytics">
      <h2>Analytics & Reports</h2>

      <div className="analytics-summary">
        {summary.map((item, i) => (
          <div key={i} className="analytics-card">
            <p className="analytics-card-label">{item.label}</p>
            <p className="analytics-card-value">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        {charts.map((chart, i) => (
          <div key={i} className="analytics-chart-box">
            {chart} (Chart Placeholder)
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;