import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    'Dashboard', 'Users', 'Workers', 'Services', 'Bookings',
    'Payments', 'Reviews', 'Analytics', 'Settings', 'Team',
    'Communications', 'Audit', 'Content', 'Help'
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Servana Admin</h2>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            to={`/${item.toLowerCase()}`}
            key={item}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;