import './Bookings.css';
import { useEffect, useState, useContext } from 'react';
import BookingForm from '../components/BookingForm';
import { AuthContext } from '../context/AuthContext';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState(null);
  const { token } = useContext(AuthContext);

  const [bookingStats, setBookingStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
  });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/bookings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        const stats = {
          total: data.length,
          pending: data.filter(b => b.status === 'Pending').length,
          confirmed: data.filter(b => b.status === 'Confirmed').length,
          completed: data.filter(b => b.status === 'Completed').length,
        };
        setBookingStats(stats);
      });
  }, [token]);

const handleBookingSaved = (booking) => {
  setBookings((prev) => {
    const updated = prev.some((b) => b.id === booking.id)
      ? prev.map((b) => (b.id === booking.id ? booking : b))
      : [...prev, booking];

    updateBookingStats(updated);
    return updated;
  });
};


const handleDelete = (id) => {
  if (!window.confirm('Are you sure you want to cancel this booking?')) return;

  fetch(`http://127.0.0.1:5000/api/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      setBookings((prev) => {
        const updated = prev.filter((b) => b.id !== id);
        updateBookingStats(updated);
        return updated;
      });
    }
  });
};


const updateBookingStats = (data) => {
  const stats = {
    total: data.length,
    pending: data.filter(b => b.status === 'Pending').length,
    confirmed: data.filter(b => b.status === 'Confirmed').length,
    completed: data.filter(b => b.status === 'Completed').length,
  };
  setBookingStats(stats);
};


  return (
    <div className="bookings">
      <div className="bookings-header">
        <h2>Bookings</h2>
        <button className="btn-primary" onClick={() => setFormData({})}>+ New Booking</button>
      </div>

      {/* ✅ Stats Cards Section */}
      <div className="booking-cards">
        <div className="card">
          <h3>{bookingStats.total}</h3>
          <p>Total Bookings</p>
        </div>
        <div className="card">
          <h3>{bookingStats.pending}</h3>
          <p>Pending</p>
        </div>
        <div className="card">
          <h3>{bookingStats.confirmed}</h3>
          <p>Confirmed</p>
        </div>
        <div className="card">
          <h3>{bookingStats.completed}</h3>
          <p>Completed</p>
        </div>
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
