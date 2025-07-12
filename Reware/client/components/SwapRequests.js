// src/components/SwapRequests.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const SwapRequests = () => {
  const { user } = useContext(AuthContext);
  const [sent, setSent] = useState([]);
  const [incoming, setIncoming] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return;

      try {
        const headers = { Authorization: `Bearer ${user.token}` };

        const [sentRes, incomingRes] = await Promise.all([
          axios.get('http://localhost:5000/api/swap/my-requests', { headers }),
          axios.get('http://localhost:5000/api/swap/incoming', { headers })
        ]);

        setSent(sentRes.data);
        setIncoming(incomingRes.data);
      } catch (err) {
        console.error('Error fetching swap requests:', err);
      }
    };

    fetchRequests();
  }, [user]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔁 Swap Requests</h2>

      <h3>📤 Sent Requests</h3>
      {sent.length === 0 ? <p>No sent requests.</p> : sent.map(req => (
        <div key={req._id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
          <p>🔄 Offered: {req.itemOffered?.title}</p>
          <p>📥 Requested: {req.itemRequested?.title}</p>
          <p>Status: {req.status}</p>
        </div>
      ))}

      <h3>📥 Incoming Requests</h3>
      {incoming.length === 0 ? <p>No incoming requests.</p> : incoming.map(req => (
        <div key={req._id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
          <p>👤 From: {req.requester?.email}</p>
          <p>🔄 Their Item: {req.itemOffered?.title}</p>
          <p>📦 Your Item: {req.itemRequested?.title}</p>
          <p>Status: {req.status}</p>
        </div>
      ))}
    </div>
  );
};

export default SwapRequests;