import './Communications.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Communications = () => {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/communications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error('Error fetching messages:', err));
  }, [token]);

  return (
    <div className="communications">
      <h2>Communications</h2>
      <div className="table-wrapper">
        <table className="communications-table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.sender}</td>
                <td>{msg.subject}</td>
                <td>{msg.body}</td>
                <td>{msg.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Communications;
