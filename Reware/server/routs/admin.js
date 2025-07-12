const express = require('express');
const router = express.Router();
const ClothingItem = require('../models/ClothingItem');
const User = require('../models/User');
const SwapRequest = require('../models/SwapRequest');

// Middleware to simulate admin access (replace with real check)
const verifyAdmin = (req, res, next) => {
  // You can check user role here using req.user.role === 'admin'
  next();
};

// GET all users
router.get('/users', verifyAdmin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// DELETE a user
router.delete('/user/:id', verifyAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// GET all listings
router.get('/listings', verifyAdmin, async (req, res) => {
  const items = await ClothingItem.find().populate('uploadedBy', 'email');
  res.json(items);
});

// Approve/Reject a listing
router.put('/listing/:id/status', verifyAdmin, async (req, res) => {
  const { status } = req.body;
  const updated = await ClothingItem.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
});

// GET all swap requests
router.get('/swaps', verifyAdmin, async (req, res) => {
  const swaps = await SwapRequest.find().populate('item').populate('requestedBy', 'email');
  res.json(swaps);
});

// Approve/Reject a swap
router.put('/swap/:id/status', verifyAdmin, async (req, res) => {
  const { status } = req.body;
  const updated = await SwapRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
});

module.exports = router;