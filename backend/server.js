const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-qeyo.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin
    // such as Postman or server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.use('/api/products', productRoutes);

// GET all products route
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔴 ADD THIS AT THE BOTTOM 🔴
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});