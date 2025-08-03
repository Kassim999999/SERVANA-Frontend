import './Services.css';

const Services = () => {
  const services = [
    {
      id: '#SVC001',
      name: 'House Cleaning',
      category: 'Home Care',
      price: 'KES 1,500',
      status: 'Active'
    },
    {
      id: '#SVC002',
      name: 'AC Repair',
      category: 'Appliance Repair',
      price: 'KES 2,000',
      status: 'Inactive'
    }
  ];

  return (
    <div className="services">
      <div className="services-header">
        <h2>Services Management</h2>
        <button className="btn-primary">+ Add New Service</button>
      </div>

      <div className="table-wrapper">
        <table className="services-table">
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, i) => (
              <tr key={i}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>{service.price}</td>
                <td>
                  <span className={`badge ${service.status.toLowerCase()}`}>{service.status}</span>
                </td>
                <td>
                  <button className="link">Edit</button>
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

export default Services;
