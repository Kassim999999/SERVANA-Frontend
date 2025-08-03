import { useState } from 'react';

const AddWorkerForm = ({ onClose, onWorkerAdded }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    status: 'Available',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:5000/api/workers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        onWorkerAdded(data); // update parent list
        onClose(); // close the form
      })
      .catch((err) => {
        console.error('Failed to add worker:', err);
      });
  };

  return (
    <div className="form-modal">
      <form className="form-box" onSubmit={handleSubmit}>
        <h3>Add New Worker</h3>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="service" placeholder="Service" value={form.service} onChange={handleChange} required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <div className="form-buttons">
          <button type="submit" className="btn-primary">Add Worker</button>
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkerForm;
