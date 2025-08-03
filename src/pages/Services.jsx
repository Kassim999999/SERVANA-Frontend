import './Services.css';
import { useEffect, useState } from 'react';
import ServiceForm from '../components/ServiceForm';

const Services = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/services')
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error('Failed to fetch services:', err));
  }, []);

  const handleServiceSaved = (service) => {
    setServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) {
        return prev.map((s) => (s.id === service.id ? service : s));
      } else {
        return [...prev, service];
      }
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    fetch(`http://127.0.0.1:5000/api/services/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) {
          setServices((prev) => prev.filter((s) => s.id !== id));
        } else {
          console.error('Failed to delete service');
        }
      })
      .catch((err) => {
        console.error('Error deleting service:', err);
      });
  };

  return (
    <div className="services">
      <div className="services-header">
        <h2>Services</h2>
        <button className="btn-primary" onClick={() => setFormData({})}>+ Add Service</button>
      </div>

      {formData && (
        <ServiceForm
          initialData={formData}
          onClose={() => setFormData(null)}
          onSave={handleServiceSaved}
        />
      )}

      <div className="table-wrapper">
        <table className="services-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.category || 'N/A'}</td>
                <td>KES {s.price.toFixed(2)}</td>
                <td><span className={`badge ${s.status.toLowerCase()}`}>{s.status}</span></td>
                <td>
                  <button className="link" onClick={() => setFormData(s)}>Edit</button>
                  <button className="link danger" onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
