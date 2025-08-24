import './Payments.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/payments', {
      headers: {
        Authorization: `Bearer ${token}`, // Secure API request
      },
    })
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => console.error('Error fetching payments:', err));
  }, [token]);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) return;

    fetch(`http://127.0.0.1:5000/api/payments/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        setPayments((prev) => prev.filter((p) => p.id !== id));
      } else {
        console.error('Failed to delete payment');
      }
    });
  };

  return (
    <div className="payments">
      <h2>Payments</h2>
      <div className="table-wrapper">
        <table className="payments-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.user_name}</td>
                <td>KES {p.amount.toFixed(2)}</td>
                <td>{p.date}</td>
                <td><span className={`badge ${p.status.toLowerCase()}`}>{p.status}</span></td>
                <td>
                  <button className="link danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
