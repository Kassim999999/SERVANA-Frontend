import './Help.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Help = () => {
  const { token } = useContext(AuthContext);
  const [helpTopics, setHelpTopics] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/help', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch help topics');
        return res.json();
      })
      .then((data) => setHelpTopics(data))
      .catch((err) => console.error('Error fetching help:', err));
  }, [token]);

  return (
    <div className="help">
      <h2>Help Center</h2>
      <ul>
        {helpTopics.map((topic) => (
          <li key={topic.id}>
            <strong>{topic.title}</strong>
            <p>{topic.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Help;
