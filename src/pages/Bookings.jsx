import './Bookings.css';

const Bookings = () => {
  const bookings = [
    {
      id: '#1001',
      customer: 'Alice Wambui',
      service: 'House Cleaning',
      date: '2025-08-03 10:00 AM',
      worker: 'Grace Mwende',
      status: 'Pending',
      payment: 'Paid'
    },
    {
      id: '#1002',
      customer: 'John Kipkoech',
      service: 'AC Repair',
      date: '2025-08-04 2:00 PM',
      worker: 'Samuel Otieno',
      status: 'Completed',
      payment: 'Paid'
    }
  ];

  return (
    <div className="bookings">
      <div className="bookings-header">
        <h2>Bookings Management</h2>
        <button className="btn-primary">+ Create Booking</button>
      </div>

      <div className="table-wrapper">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Date/Time</th>
              <th>Worker</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i}>
                <td>{b.id}</td>
                <td>{b.customer}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td>{b.worker}</td>
                <td>
                  <span className={`badge ${b.status.toLowerCase()}`}>{b.status}</span>
                </td>
                <td>{b.payment}</td>
                <td>
                  <button className="link">View</button>
                  <button className="link danger">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
