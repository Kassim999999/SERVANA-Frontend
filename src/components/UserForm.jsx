import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './UserForm.css';

const UserForm = ({ onClose, onUserAdded, onUserUpdated, initialData = null }) => {
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: initialData?.name || '',
    username: initialData?.username || '',
    email: initialData?.email || '',
    role: initialData?.role || 'User',
    password: '' // only used for creation
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = initialData ? 'PUT' : 'POST';
    const url = initialData
      ? `http://127.0.0.1:5000/api/users/${initialData.id}`
      : 'http://127.0.0.1:5000/api/users';

    const payload = {
      name: form.name,
      username: form.username,
      email: form.email,
      role: form.role,
    };

    if (!initialData && form.password) {
      payload.password = form.password;
    }

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          initialData ? onUserUpdated(data) : onUserAdded(data);
          onClose();
        } else {
          setError(data.error || 'Failed to save user');
        }
      })
      .catch(() => setError('Server error'));
  };

  return (
    <div className="form-overlay">
      <form className="form-box" onSubmit={handleSubmit}>
        <h3>{initialData ? 'Edit User' : 'Add User'}</h3>
        {error && <p className="error">{error}</p>}

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        {!initialData && (
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        )}

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Support">Support</option>
        </select>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {initialData ? 'Update' : 'Create'}
          </button>
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
