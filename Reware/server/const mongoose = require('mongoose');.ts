const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  type: String,
  size: String,
  condition: String,
  tags: [String],
  images: [String], // URLs or base64 strings
  uploader: String,
  points: {
    type: Number,
    default: 10
  },
  status: {
    type: String,
    enum: ['available', 'swapped'],
    default: 'available'
  },
}, { timestamps: true });

module.exports = mongoose.model('ClothingItem', clothingItemSchema);