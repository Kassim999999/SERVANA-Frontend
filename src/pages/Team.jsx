import './Team.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Team = () => {
  const { token } = useContext(AuthContext);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/team', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error('Failed to fetch team:', err));
  }, [token]);

  return (
    <div className="team">
      <h2>Team Members</h2>
      <div className="table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Team;
