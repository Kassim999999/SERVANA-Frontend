import './Dashboard.css';

const Dashboard = () => {
  const topCards = [
    { label: 'Active Users', value: 1200 },
    { label: 'Active Providers', value: 180 },
    { label: 'New Users', value: 95 },
    { label: 'Total Bookings', value: 3100 },
    { label: 'Monthly Revenue', value: 'KES 845,000' }
  ];

  const sections = [
    'Recent Bookings',
    'Top Providers',
    'Live Updates',
    'Issue Reports',
    'Worker Availability',
    'Job Overview',
    'Earnings Overview',
    'Categories Summary'
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        {topCards.map((card) => (
          <div key={card.label} className="card">
            <h4 className="card-title">{card.label}</h4>
            <p className="card-value">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        {sections.map((section) => (
          <div key={section} className="dashboard-box">
            {section} (Mock)
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
