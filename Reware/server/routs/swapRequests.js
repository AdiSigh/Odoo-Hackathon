// routes/swapRequests.js
const express = require('express');
const router = express.Router();
const SwapRequest = require('../models/SwapRequest');
const ClothingItem = require('../models/ClothingItem');
const verifyToken = require('../middleware/verifyToken');

// Create a new swap request
router.post('/', verifyToken, async (req, res) => {
  const { itemOffered, itemRequested } = req.body;

  try {
    const requestedItem = await ClothingItem.findById(itemRequested);
    if (!requestedItem) return res.status(404).json({ error: 'Requested item not found' });

    const newRequest = new SwapRequest({
      itemOffered,
      itemRequested,
      requester: req.user.id,
      owner: requestedItem.uploadedBy,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    console.error('Error creating swap request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get swap requests for the logged-in user
router.get('/my-requests', verifyToken, async (req, res) => {
  try {
    const requests = await SwapRequest.find({ requester: req.user.id })
      .populate('itemOffered itemRequested');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching your requests' });
  }
});

// Get swap requests sent to the user
router.get('/incoming', verifyToken, async (req, res) => {
  try {
    const incoming = await SwapRequest.find({ owner: req.user.id })
      .populate('itemOffered itemRequested requester');
    res.json(incoming);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching incoming requests' });
  }
});

module.exports = router;