import './Payments.css';

const Payments = () => {
  const transactions = [
    {
      id: '#TXN001',
      date: '2025-08-01',
      customer: 'Alice Wambui',
      worker: 'Grace Mwende',
      amount: 'KES 2,000',
      method: 'M-Pesa',
      status: 'Completed'
    },
    {
      id: '#TXN002',
      date: '2025-08-02',
      customer: 'John Kipkoech',
      worker: 'Samuel Otieno',
      amount: 'KES 1,500',
      method: 'Card',
      status: 'Pending'
    }
  ];

  return (
    <div className="payments">
      <div className="payments-header">
        <h2>Payments & Transactions</h2>
        <button className="btn-primary">Export CSV</button>
      </div>

      <div className="table-wrapper">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Worker</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, i) => (
              <tr key={i}>
                <td>{txn.id}</td>
                <td>{txn.date}</td>
                <td>{txn.customer}</td>
                <td>{txn.worker}</td>
                <td>{txn.amount}</td>
                <td>{txn.method}</td>
                <td>
                  <span className={`badge ${txn.status.toLowerCase()}`}>{txn.status}</span>
                </td>
                <td>
                  <button className="link">View</button>
                  <button className="link danger">Refund</button>
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