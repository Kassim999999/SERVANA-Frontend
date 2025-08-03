import './Workers.css';

const Workers = () => {
  const workers = [
    {
      id: 1,
      name: 'Grace Mwende',
      email: 'grace@servana.com',
      service: 'House Cleaning',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Samuel Otieno',
      email: 'samuel@servana.com',
      service: 'AC Repair',
      status: 'Unavailable'
    }
  ];

  return (
    <div className="workers">
      <div className="workers-header">
        <h2>Worker Management</h2>
        <button className="btn-primary">+ Add Worker</button>
      </div>

      <div className="table-wrapper">
        <table className="workers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((w) => (
              <tr key={w.id}>
                <td>{w.name}</td>
                <td>{w.email}</td>
                <td>{w.service}</td>
                <td><span className={`badge ${w.status.toLowerCase()}`}>{w.status}</span></td>
                <td>
                  <button className="link">Edit</button>
                  <button className="link danger">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workers;