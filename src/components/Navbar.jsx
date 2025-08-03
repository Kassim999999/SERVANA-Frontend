import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <h1 className="navbar-title">Admin Dashboard</h1>
      <div className="navbar-right">
        <span className="navbar-user">Admin</span>
        <img
          src="https://via.placeholder.com/32"
          alt="Profile"
          className="navbar-avatar"
        />
      </div>
    </header>
  );
};

export default Navbar;