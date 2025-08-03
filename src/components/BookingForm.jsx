import { useState, useEffect } from 'react';

const BookingForm = ({ initialData = {}, onClose, onSave }) => {
  const [form, setForm] = useState({
    user_name: '',
    worker_name: '',
    service_name: '',
    scheduled_date: '',
    status: 'Pending',
  });

  useEffect(() => {
    setForm({
      user_name: initialData.user_name || '',
      worker_name: initialData.worker_name || '',
      service_name: initialData.service_name || '',
      scheduled_date: initialData.scheduled_date || '',
      status: initialData.status || 'Pending',
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
      ? `http://127.0.0.1:5000/api/bookings/${initialData.id}`
      : 'http://127.0.0.1:5000/api/bookings';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((data) => {
        onSave(data);
        onClose();
      })
      .catch((err) => console.error('Booking save failed:', err));
  };

  return (
    <div className="form-modal">
      <form className="form-box" onSubmit={handleSubmit}>
        <h3>{initialData.id ? 'Edit Booking' : 'New Booking'}</h3>

        <input name="user_name" placeholder="User Name" value={form.user_name} onChange={handleChange} required />
        <input name="worker_name" placeholder="Worker Name" value={form.worker_name} onChange={handleChange} required />
        <input name="service_name" placeholder="Service Name" value={form.service_name} onChange={handleChange} required />
        <input name="scheduled_date" type="date" value={form.scheduled_date} onChange={handleChange} required />
        
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">Save</button>
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
