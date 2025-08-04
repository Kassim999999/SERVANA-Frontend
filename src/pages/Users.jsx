import './Users.css';
import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    fetch(`http://127.0.0.1:5000/api/users/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          setUsers((prev) => prev.filter((u) => u.id !== id));
        }
      });
  };

  return (
    <div className="users">
      <h2>User Management</h2>
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="link">Edit</button>
                  <button className="link danger" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
