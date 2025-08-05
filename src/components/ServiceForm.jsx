import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ServiceForm = ({ initialData = {}, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    status: 'Active',
  });
  const { token } = useContext(AuthContext);


  useEffect(() => {
    setForm({
      name: initialData.name || '',
      category: initialData.category || '',
      price: initialData.price || '',
      status: initialData.status || 'Active',
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
      ? `http://127.0.0.1:5000/api/services/${initialData.id}`
      : 'http://127.0.0.1:5000/api/services';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 
                  Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
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
        <h3>{initialData.id ? 'Edit Service' : 'Add Service'}</h3>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="form-buttons">
          <button type="submit" className="btn-primary">Save</button>
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
