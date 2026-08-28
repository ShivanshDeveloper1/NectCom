const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const videoRoutes = require('./routes/videoRoutes')
const paymentRoutes =  require('./routes/paymentRoutes');

const app = express();

const allowedOrigins = [
'http://localhost:5173',
  'https://frontend-qeyo.onrender.com',
  'https://uhealthpharma.in',        // Add your live domain
  'https://www.uhealthpharma.in'     // Add the www version just in case
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/videos', videoRoutes);

app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

app.use('/api/payment', paymentRoutes)

const PORT = process.env.PORT || 5000;

// Connect DB first, then start listening
const startServer = async () => {
  try {
    await connectDB(); // Ensure connectDB returns mongoose.connect()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to Database:', err);
  }
};

startServer();