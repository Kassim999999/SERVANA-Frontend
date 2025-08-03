import './Bookings.css';
import { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/bookings')
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  const handleBookingSaved = (booking) => {
    setBookings((prev) => {
      const exists = prev.find((b) => b.id === booking.id);
      if (exists) {
        return prev.map((b) => (b.id === booking.id ? booking : b));
      } else {
        return [...prev, booking];
      }
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    fetch(`http://127.0.0.1:5000/api/bookings/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    });
  };

  return (
    <div className="bookings">
      <div className="bookings-header">
        <h2>Bookings</h2>
        <button className="btn-primary" onClick={() => setFormData({})}>+ New Booking</button>
      </div>

      {formData && (
        <BookingForm
          initialData={formData}
          onClose={() => setFormData(null)}
          onSave={handleBookingSaved}
        />
      )}

      <div className="table-wrapper">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Worker</th>
              <th>Service</th>
              <th>Scheduled Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.user_name}</td>
                <td>{b.worker_name}</td>
                <td>{b.service_name}</td>
                <td>{b.scheduled_date}</td>
                <td><span className={`badge ${b.status.toLowerCase()}`}>{b.status}</span></td>
                <td>
                  <button className="link" onClick={() => setFormData(b)}>Edit</button>
                  <button className="link danger" onClick={() => handleDelete(b.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
