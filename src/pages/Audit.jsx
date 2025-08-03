import './Audit.css';

const Audit = () => {
  const logs = [
    {
      id: 1,
      user: 'Admin - Janet Njeri',
      action: 'Updated worker profile',
      timestamp: '2025-08-03 10:45 AM',
      ip: '102.45.210.19'
    },
    {
      id: 2,
      user: 'Support - Kevin Otieno',
      action: 'Suspended user John Kipkoech',
      timestamp: '2025-08-03 09:22 AM',
      ip: '197.23.88.12'
    }
  ];

  return (
    <div className="audit">
      <h2>Audit Logs</h2>
      <div className="table-wrapper">
        <table className="audit-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Timestamp</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.timestamp}</td>
                <td>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Audit;
