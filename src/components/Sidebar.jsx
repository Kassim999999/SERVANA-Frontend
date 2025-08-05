import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
const navItems = [
  { label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
  { label: 'Users', icon: 'fas fa-users' },
  { label: 'Workers', icon: 'fas fa-user-cog' },
  { label: 'Services', icon: 'fas fa-tools' },
  { label: 'Bookings', icon: 'fas fa-calendar-check' },
  { label: 'Payments', icon: 'fas fa-credit-card' },
  { label: 'Reviews', icon: 'fas fa-star' },
  { label: 'Analytics', icon: 'fas fa-chart-line' },
  { label: 'Settings', icon: 'fas fa-cog' },
  { label: 'Team', icon: 'fas fa-user-friends' },
  { label: 'Communications', icon: 'fas fa-comments' },
  { label: 'Audit', icon: 'fas fa-clipboard-check' },
  { label: 'Content', icon: 'fas fa-file-alt' },
  { label: 'Help', icon: 'fas fa-question-circle' }
];

return (
  <aside className="sidebar">
    <h2 className="sidebar-title"><i class="fa-solid fa-leaf"></i>SERVANA</h2>
    <nav className="sidebar-nav">
      {navItems.map(({ label, icon }) => (
        <NavLink
          to={`/${label.toLowerCase()}`}
          key={label}
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <i className={icon}></i>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);
};

export default Sidebar;