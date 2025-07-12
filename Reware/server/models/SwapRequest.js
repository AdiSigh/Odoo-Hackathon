// models/SwapRequest.js
const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  itemOffered: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem', required: true },
  itemRequested: { type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem', required: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SwapRequest', swapRequestSchema);