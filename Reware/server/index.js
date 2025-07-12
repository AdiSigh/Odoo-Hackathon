const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// ✅ Serve uploaded images from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ✅ Routes
const clothingRoutes = require('./routes/clothing');
const authRoutes = require('./routes/auth');
const swapRequestRoutes = require('./routes/swapRequests'); // ✅ Add this line
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
app.use('/api/clothing', clothingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/swap', swapRequestRoutes); // ✅ Mount the swap request routes

// Default route
app.get('/', (req, res) => {
  res.send("ReWear API is working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});