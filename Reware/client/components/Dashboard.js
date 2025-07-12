import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    const fetchMyItems = async () => {
      if (!user) return;

      try {
        const res = await axios.get('http://localhost:5000/api/clothing/my', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setMyItems(res.data);
      } catch (err) {
        console.error('Error fetching your items:', err);
      }
    };

    fetchMyItems();
  }, [user]);

  if (!user) return <Navigate to="/" />;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>👤 Welcome to your Dashboard</h2>
        <p>Email: {user?.email || "Logged in"}</p>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="dashboard-actions">
        <button onClick={() => window.location.href = "/add-item"}>
          ➕ Add New Item
        </button>
      </div>

      <div className="dashboard-items">
        <h3>📦 Your Uploaded Items</h3>
        {myItems.length === 0 ? (
          <p>No items uploaded yet.</p>
        ) : (
          <div className="dashboard-items-grid">
            {myItems.map((item) => (
              <Link
                key={item._id}
                to={`/item/${item._id}`}
                className="item-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {item.image && (
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.title}
                  />
                )}
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <p>Status: {item.status}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;