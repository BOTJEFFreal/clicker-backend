// routes/clicks.js
const express = require('express');
const router = express.Router();
const Click = require('../models/Click');

// POST /api/clicks/:target → currentUser clicks for targetUser
router.post('/:target', async (req, res) => {
  const { currentUser } = req.body;
  const targetUser = req.params.target;

  if (!currentUser || !targetUser || currentUser === targetUser) {
    return res.status(400).json({ message: 'Invalid request.' });
  }

  try {
    let doc = await Click.findOne({ username: targetUser });

    if (!doc) {
      doc = await Click.create({ username: targetUser, clickCount: 0, clickedBy: [] });
    }

    if (doc.clickedBy.includes(currentUser)) {
      return res.status(403).json({ message: 'Already clicked for this user.' });
    }

    doc.clickCount += 1;
    doc.clickedBy.push(currentUser);
    await doc.save();

    res.json({ message: `Click registered for ${targetUser}`, total: doc.clickCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/clicks/:user → fetch click count for a specific user

router.get('/:user', async (req, res) => {
  try {
    const doc = await Click.findOne({ username: req.params.user });
    if (!doc) {
      return res.json({
        username: req.params.user,
        clickCount: 0,
        clickedBy: []
      });
    }
    res.json({
      username:   doc.username,
      clickCount: doc.clickCount,
      clickedBy:  doc.clickedBy
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;

