import { useState, useEffect } from 'react';

const WorkerForm = ({ initialData = {}, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    status: 'Available',
  });

  useEffect(() => {
    setForm({
      name: initialData.name || '',
      email: initialData.email || '',
      service: initialData.service || '',
      status: initialData.status || 'Available',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = initialData.id ? 'PUT' : 'POST';
    const url = initialData.id
      ? `http://127.0.0.1:5000/api/workers/${initialData.id}`
      : 'http://127.0.0.1:5000/api/workers';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        onSave(data);
        onClose();
      })
      .catch((err) => console.error('Save error:', err));
  };

  return (
    <div className="form-modal">
      <form className="form-box" onSubmit={handleSubmit}>
        <h3>{initialData.id ? 'Edit Worker' : 'Add Worker'}</h3>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="service" placeholder="Service" value={form.service} onChange={handleChange} required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <div className="form-buttons">
          <button type="submit" className="btn-primary">Save</button>
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default WorkerForm;
