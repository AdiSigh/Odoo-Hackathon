const express = require('express');
const router = express.Router();
const ClothingItem = require('../models/ClothingItem');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const path = require('path');

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// POST /api/clothing/add - Upload a new clothing item
router.post('/add', verifyToken, upload.single('image'), async (req, res) => {
  const { title, description, category, type, size, condition, tags } = req.body;

  try {
    const newItem = new ClothingItem({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags?.split(',').map(tag => tag.trim()) || [],
      image: req.file?.filename || null,
      uploadedBy: req.user.id,
      status: 'available'
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error saving item:', err);
    res.status(500).json({ error: 'Failed to upload item' });
  }
});

// GET /api/clothing/my - Get user's own uploaded items
router.get('/my', verifyToken, async (req, res) => {
  try {
    const items = await ClothingItem.find({ uploadedBy: req.user.id });
    res.json(items);
  } catch (err) {
    console.error('Error fetching user items:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// GET /api/clothing - Public route to get all available items
router.get('/', async (req, res) => {
  try {
    const items = await ClothingItem.find({ status: 'available' });
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});


// GET /api/clothing/item/:id - Get details of a single item
router.get('/item/:id', async (req, res) => {
  try {
    const item = await ClothingItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error('Error fetching item details:', err);
    res.status(500).json({ error: 'Failed to fetch item details' });
  }
});

module.exports = router;