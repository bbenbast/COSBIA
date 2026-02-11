const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { protect } = require('../middleware/auth');

// Save level 1 results
router.post('/level1', protect, async (req, res) => {
  try {
    const { length, complexity, xp = 0, masked } = req.body;
    const userId = req.user._id;

    const payload = {
      length: length || 0,
      complexity: Boolean(complexity),
      xp,
      masked: masked || null,
      createdAt: new Date()
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { 'results.level1': payload },
        $inc: { totalXp: xp }
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json({ message: 'Level 1 results saved', results: updatedUser.results.level1, totalXp: updatedUser.totalXp });
  } catch (err) {
    console.error('Error saving level1 results:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
