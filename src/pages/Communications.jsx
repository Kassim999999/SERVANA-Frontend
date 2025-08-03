import './Communications.css';

const Communications = () => {
  const cards = [
    {
      title: 'Push Notifications',
      desc: 'Send in-app alerts and updates to users.',
      button: 'Create Campaign'
    },
    {
      title: 'Email Campaigns',
      desc: 'Design and send marketing or transactional emails.',
      button: 'New Email Blast'
    },
    {
      title: 'In-App Banners',
      desc: 'Manage banners or alerts seen in the user dashboard.',
      button: 'Add Banner'
    }
  ];

  return (
    <div className="communications">
      <h2>Communications</h2>

      <div className="communications-grid">
        {cards.map((card, i) => (
          <div key={i} className="comm-card">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <button className="btn-primary">{card.button}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communications;
