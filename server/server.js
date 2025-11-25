require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 MERN Server is Running!',
    status: 'active'
  });
});

app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'OK',
    server: 'running',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Protected route example
const { protect } = require('./middleware/auth');
app.get('/api/protected', protect, (req, res) => {
  res.json({ 
    message: 'This is protected data!',
    user: req.user 
  });
});

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/mernapp')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
    console.log('💡 Make sure MongoDB is running: net start MongoDB');
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});