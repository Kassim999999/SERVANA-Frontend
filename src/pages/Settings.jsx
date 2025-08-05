import './Settings.css';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const { token, user } = useContext(AuthContext); // ✅ Secure access
  const [settings, setSettings] = useState({ emailNotifications: true });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/settings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error('Failed to fetch settings:', err));
  }, [token]);

  const handleToggle = () => {
    const updated = { ...settings, emailNotifications: !settings.emailNotifications };

    fetch('http://127.0.0.1:5000/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // ✅ Include token
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error('Update failed:', err));
  };

  return (
    <div className="settings">
      <h2>Platform Settings</h2>
      <label className="toggle">
        <input
          type="checkbox"
          checked={settings.emailNotifications}
          onChange={handleToggle}
        />
        <span className="slider" />
        Enable Email Notifications
      </label>
    </div>
  );
};

export default Settings;
