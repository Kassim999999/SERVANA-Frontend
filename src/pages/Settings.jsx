import './Settings.css';

const Settings = () => {
  return (
    <div className="settings">
      <h2>Platform Settings</h2>
      <form className="settings-form">
        <div className="form-group">
          <label htmlFor="platformName">Platform Name</label>
          <input type="text" id="platformName" placeholder="Enter platform name" />
        </div>

        <div className="form-group">
          <label htmlFor="supportEmail">Support Email</label>
          <input type="email" id="supportEmail" placeholder="support@servana.com" />
        </div>

        <div className="form-group">
          <label htmlFor="timezone">Time Zone</label>
          <select id="timezone">
            <option value="EAT">East Africa Time (EAT)</option>
            <option value="GMT">Greenwich Mean Time (GMT)</option>
            <option value="EST">Eastern Standard Time (EST)</option>
          </select>
        </div>

        <div className="form-group toggle">
          <label htmlFor="maintenance">Maintenance Mode</label>
          <input type="checkbox" id="maintenance" />
        </div>

        <button type="submit" className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;