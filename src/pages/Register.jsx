import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

const handleSubmit = (e) => {
  e.preventDefault();

  fetch('http://127.0.0.1:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        localStorage.setItem('hasRegistered', 'true'); //Save flag
        setSuccess(data.message);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.error || 'Registration failed');
      }
    })
    .catch(() => setError('Network error'));
};



  return (
    <div className="register-page">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Admin Register</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        
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
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
