require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;
const User = require('./models/users');

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

// Results routes (saving activity results)
const resultsRoutes = require('./routes/results');
app.use('/api/results', resultsRoutes);

// Protected route example
const { protect } = require('./middleware/auth');
app.get('/api/protected', protect, (req, res) => {
  res.json({ 
    message: 'This is protected data!',
    user: req.user 
  });
});

// Database connection
const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error('❌ FATAL ERROR: MONGODB_URI environment variable is not set');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Bound to 0.0.0.0:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

const QuestionSchema = new mongoose.Schema({
  text: String,
  options: [{ id: String, text: String, label: String }],
  correctOptionId: String,
  xpReward: Number,
  explanation: String
});
const Question = mongoose.model('Question', QuestionSchema);

// 3. Expose Endpoint
app.get('/api/questions', async (req, res) => {
  const questions = await Question.find().limit(10);
  res.json(questions);
});


  

app.post('/api/users/xp', protect, async (req, res) => {
  try {
    const { xp } = req.body;
    // Assuming the JWT payload has an _id field for the user
    const userId = req.user._id; 

    if (!xp || isNaN(xp)) {
      return res.status(400).json({ error: "Invalid XP amount" });
    }
    console.log("Attempting to update user ID:", userId);
    // Update user: Atomically increment totalXP
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $inc: { totalXp: xp }, 
        // Optional: track history of gains
        // $push: { xpHistory: { amount: xp, reason: 'quiz_completion', date: new Date() } } 
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ 
      message: "XP updated successfully", 
      currentXp: updatedUser.totalXp 
    });

  } catch (error) {
    console.error("Error saving XP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});