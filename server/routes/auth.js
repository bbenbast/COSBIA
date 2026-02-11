const express = require('express');
const User = require('../models/users');
const generateToken = require('../utils/generateToken');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, password, ageBracket } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Validate age bracket
    if (!['13-15', '16-17'].includes(ageBracket)) {
      return res.status(400).json({ message: 'Please select a valid age bracket (13-15 or 16-17)' });
    }

    // Create user
    const user = await User.create({
      username,
      password,
      ageBracket
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        ageBracket: user.ageBracket,
        role: user.role,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: 'username and password required' });
  }

  try {
    // Check for user and include password for verification
    const user = await User.findOne({ username }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        ageBracket: user.ageBracket,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    username: req.user.username,
    ageBracket: req.user.ageBracket,
    role: req.user.role,
  });
});

module.exports = router;