// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing of JSON in request bodies

// Basic test route to check if server is running
app.get('/', (req, res) => {
  res.json({ message: 'MERN server is running!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start the server only after DB connection is established
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.log('MongoDB connection error:', err));