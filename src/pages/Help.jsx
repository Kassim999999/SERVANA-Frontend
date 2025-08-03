import './Help.css';

const Help = () => {
  const tickets = [
    {
      id: '#SUP1001',
      user: 'Alice Wambui',
      subject: 'Refund request for failed service',
      status: 'Open',
      submitted: '2025-08-02'
    },
    {
      id: '#SUP1002',
      user: 'John Kipkoech',
      subject: 'Change of contact email',
      status: 'Closed',
      submitted: '2025-07-30'
    }
  ];

  return (
    <div className="help">
      <h2>Help & Support Center</h2>

      <div className="table-wrapper">
        <table className="help-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>User</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.user}</td>
                <td>{ticket.subject}</td>
                <td>
                  <span className={`badge ${ticket.status.toLowerCase()}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>{ticket.submitted}</td>
                <td>
                  <button className="link">View</button>
                  <button className="link danger">Close</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Help;
