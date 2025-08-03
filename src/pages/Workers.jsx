import './Workers.css';
import { useEffect, useState } from 'react';
import AddWorkerForm from '../components/AddWorkerForm';

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/workers')
      .then(res => res.json())
      .then(data => setWorkers(data));
  }, []);

  const handleNewWorker = (worker) => {
    setWorkers(prev => [...prev, worker]);
  };

  return (
    <div className="workers">
      <div className="workers-header">
        <h2>Worker Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>+ Add Worker</button>
      </div>

      {showForm && (
        <AddWorkerForm
          onClose={() => setShowForm(false)}
          onWorkerAdded={handleNewWorker}
        />
      )}

      <div className="table-wrapper">
        <table className="workers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((w) => (
              <tr key={w.id}>
                <td>{w.name}</td>
                <td>{w.email || 'N/A'}</td>
                <td>{w.service}</td>
                <td><span className={`badge ${w.status.toLowerCase()}`}>{w.status}</span></td>
                <td>
                  <button className="link">Edit</button>
                  <button className="link danger">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workers;
