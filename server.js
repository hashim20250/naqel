// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function init() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed, falling back to mock:', err.message);
  }
}
init();

// Mock data (in-memory fallback)
let shipments = [
  { id: 1, origin: 'Qassim', destination: 'Tathleeth', price: 3400 },
  { id: 2, origin: 'Qassim', destination: 'Folwah', price: 3700 }
];

// Routes
app.get('/', (req, res) => res.send('Freight API is running'));
app.get('/shipments', (req, res) => res.json(shipments));
app.post('/shipments', (req, res) => {
  const newShip = { id: shipments.length + 1, ...req.body };
  shipments.push(newShip);
  res.status(201).json(newShip);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚚 Server running on port ${PORT}`);
});
