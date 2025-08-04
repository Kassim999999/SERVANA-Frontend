import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          login(data.user, data.token);
          navigate('/dashboard'); // redirect to dashboard
        } else {
          setError(data.error || 'Login failed');
        }
      })
      .catch(() => setError('Network error'));
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
