import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [swaps, setSwaps] = useState([]);

  useEffect(() => {
    fetchAll();
  }, [tab]);

  const fetchAll = async () => {
    if (tab === 'users') {
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data);
    } else if (tab === 'listings') {
      const res = await axios.get('http://localhost:5000/api/admin/listings');
      setListings(res.data);
    } else if (tab === 'swaps') {
      const res = await axios.get('http://localhost:5000/api/admin/swaps');
      setSwaps(res.data);
    }
  };

  const updateListingStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/admin/listing/${id}/status`, { status });
    fetchAll();
  };

  const updateSwapStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/admin/swap/${id}/status`, { status });
    fetchAll();
  };

  return (
    <div className="admin-panel">
      <h2>🛠️ Admin Panel</h2>
      <div className="admin-tabs">
        <button onClick={() => setTab('users')}>Manage Users</button>
        <button onClick={() => setTab('swaps')}>Manage Orders</button>
        <button onClick={() => setTab('listings')}>Manage Listings</button>
      </div>

      {tab === 'users' && (
        <div className="admin-section">
          {users.map(user => (
            <div key={user._id} className="admin-card">
              <div className="admin-card-info">
                <strong>{user.email}</strong>
              </div>
              <div className="admin-card-actions">
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'listings' && (
        <div className="admin-section">
          {listings.map(item => (
            <div key={item._id} className="admin-card">
              <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title} width="50" />
              <div className="admin-card-info">
                <p><strong>{item.title}</strong> by {item.uploadedBy?.email}</p>
                <p>Status: {item.status}</p>
              </div>
              <div className="admin-card-actions">
                <button onClick={() => updateListingStatus(item._id, 'approved')}>Approve</button>
                <button onClick={() => updateListingStatus(item._id, 'rejected')}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'swaps' && (
        <div className="admin-section">
          {swaps.map(swap => (
            <div key={swap._id} className="admin-card">
              <div className="admin-card-info">
                <p><strong>Item:</strong> {swap.item?.title}</p>
                <p><strong>Requested By:</strong> {swap.requestedBy?.email}</p>
                <p>Status: {swap.status}</p>
              </div>
              <div className="admin-card-actions">
                <button onClick={() => updateSwapStatus(swap._id, 'approved')}>Approve</button>
                <button onClick={() => updateSwapStatus(swap._id, 'rejected')}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;