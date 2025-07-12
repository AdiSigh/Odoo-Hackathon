import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/clothing')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Items</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        items.map(item => (
          <div key={item._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>Size:</strong> {item.size} | <strong>Condition:</strong> {item.condition}</p>
            {item.images[0] && (<img src={item.images[0]} alt={item.title} width="150" />)}
          </div>
        ))
      )}
    </div>
  );
};

export default ItemList;