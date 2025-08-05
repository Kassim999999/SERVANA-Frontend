import { useState, useEffect, useContext } from 'react';
import './Users.css';
import UserForm from '../components/UserForm';
import { AuthContext } from '../context/AuthContext';

const Users = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [token]);

  const handleNewUser = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  const handleUpdateUser = (updated) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    fetch(`http://127.0.0.1:5000/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      }
    });
  };

  return (
    <div className="users">
      <div className="users-header">
        <h2>User Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Add User
        </button>
      </div>

      {(showForm || editingUser) && (
        <UserForm
          initialData={editingUser}
          onClose={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
          onUserAdded={handleNewUser}
          onUserUpdated={handleUpdateUser}
        />
      )}

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="link" onClick={() => setEditingUser(u)}>
                    Edit
                  </button>
                  <button
                    className="link danger"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
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
