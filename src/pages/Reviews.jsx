import './Reviews.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/reviews', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error('Error fetching reviews:', err));
  }, [token]);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    fetch(`http://127.0.0.1:5000/api/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    });
  };

  return (
    <div className="reviews">
      <h2>Customer Reviews</h2>
      <div className="table-wrapper">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id}>
                <td>{r.user_name}</td>
                <td>{r.comment}</td>
                <td>{r.rating}</td>
                <td>{r.date}</td>
                <td>
                  <button className="link danger" onClick={() => handleDelete(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
