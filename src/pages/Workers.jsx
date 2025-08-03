import './Workers.css';
import { useEffect, useState } from 'react';
import WorkerForm from '../components/WorkerForm';

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/workers')
      .then(res => res.json())
      .then(data => setWorkers(data));
  }, []);

  const handleWorkerSaved = (worker) => {
    setWorkers((prev) => {
      const exists = prev.find((w) => w.id === worker.id);
      if (exists) {
        return prev.map((w) => (w.id === worker.id ? worker : w));
      } else {
        return [...prev, worker];
      }
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to suspend this worker?')) return;

    fetch(`http://127.0.0.1:5000/api/workers/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) {
          setWorkers((prev) => prev.filter((w) => w.id !== id));
        } else {
          console.error('Failed to delete worker');
        }
      })
      .catch((err) => {
        console.error('Error deleting worker:', err);
      });
  };

  return (
    <div className="workers">
      <div className="workers-header">
        <h2>Worker Management</h2>
        <button className="btn-primary" onClick={() => setFormData({})}>+ Add Worker</button>
      </div>

      {formData && (
        <WorkerForm
          initialData={formData}
          onClose={() => setFormData(null)}
          onSave={handleWorkerSaved}
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
                  <button className="link" onClick={() => setFormData(w)}>Edit</button>
                  <button className="link danger" onClick={() => handleDelete(w.id)}>Suspend</button>
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
