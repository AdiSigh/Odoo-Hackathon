// src/components/ItemDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './ItemDetail.css';

const ItemDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/clothing/item/${id}`);
        setItem(res.data);

        // Fetch similar items by category
        const simRes = await axios.get(`http://localhost:5000/api/clothing/similar/${res.data.category}`);
        setSimilarItems(simRes.data.filter(i => i._id !== id));
      } catch (err) {
        console.error('Error fetching item details:', err);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (!item) return <div className="item-detail-loading">Loading item details...</div>;

  return (
    <div className="item-detail-container">
      <div className="item-main-info">
        <img
          src={`http://localhost:5000/uploads/${item.image}`}
          alt={item.title}
          className="item-image"
        />
        <div className="item-text">
          <h2>{item.title}</h2>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Size:</strong> {item.size}</p>
          <p><strong>Condition:</strong> {item.condition}</p>
          <p><strong>Tags:</strong> {item.tags?.join(', ')}</p>
          <p><strong>Status:</strong> {item.status}</p>
        </div>
      </div>

      <hr />

      <div className="similar-items-section">
        <h3>🔁 Similar Items</h3>
        <div className="similar-items-list">
          {similarItems.length === 0 ? (
            <p>No similar items available.</p>
          ) : (
            similarItems.map(sim => (
              <div key={sim._id} className="similar-item-card">
                <img
                  src={`http://localhost:5000/uploads/${sim.image}`}
                  alt={sim.title}
                />
                <p>{sim.title}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;