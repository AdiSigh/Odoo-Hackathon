const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  type: String,
  size: String,
  condition: String,
  tags: [String],
  image: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    default: 'available',
  },
}, { timestamps: true });

module.exports = mongoose.model('ClothingItem', clothingItemSchema);