import './Team.css';

const Team = () => {
  const members = [
    {
      id: 1,
      name: 'Janet Njeri',
      email: 'janet@servana.com',
      role: 'Admin',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Kevin Otieno',
      email: 'kevin@servana.com',
      role: 'Support',
      status: 'Suspended'
    }
  ];

  return (
    <div className="team">
      <div className="team-header">
        <h2>Team Management</h2>
        <button className="btn-primary">+ Add Team Member</button>
      </div>

      <div className="table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.role}</td>
                <td><span className={`badge ${m.status.toLowerCase()}`}>{m.status}</span></td>
                <td>
                  <button className="link">Edit</button>
                  <button className="link danger">Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Team;
