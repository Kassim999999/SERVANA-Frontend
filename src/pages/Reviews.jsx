import './Reviews.css';

const Reviews = () => {
  const reviews = [
    {
      id: '#REV001',
      user: 'Alice Wambui',
      worker: 'Grace Mwende',
      rating: 4,
      comment: 'Excellent service! Very professional and polite.',
      date: '2025-08-01'
    },
    {
      id: '#REV002',
      user: 'John Kipkoech',
      worker: 'Samuel Otieno',
      rating: 2,
      comment: 'The worker arrived late and left the job unfinished.',
      date: '2025-08-02'
    }
  ];

  return (
    <div className="reviews">
      <h2>Customer Reviews</h2>
      <div className="table-wrapper">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Review ID</th>
              <th>User</th>
              <th>Worker</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r, i) => (
              <tr key={i}>
                <td>{r.id}</td>
                <td>{r.user}</td>
                <td>{r.worker}</td>
                <td><span className={`rating-badge rate-${r.rating}`}>{r.rating}⭐</span></td>
                <td>{r.comment}</td>
                <td>{r.date}</td>
                <td>
                  <button className="link">Reply</button>
                  <button className="link danger">Delete</button>
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