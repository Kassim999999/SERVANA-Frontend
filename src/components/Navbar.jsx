import './Navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <h1 className="navbar-title">Admin Dashboard</h1>
      <div className="navbar-right">
        <span className="navbar-user">{user?.username || 'Admin'}</span>
        <img
          src="https://via.placeholder.com/32"
          alt="Profile"
          className="navbar-avatar"
        />
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
