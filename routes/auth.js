const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required.' });

  try {
    const existing = await User.findOne({ username });
    if (existing)
      return res.status(409).json({ message: 'Username already taken.' });

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Invalid creds' });
    res.json({ message: 'OK' });
  });


router.get('/users', async (req, res) => {
    const list = await User.find().select('username -_id');
    res.json(list.map(u => u.username));
  });

module.exports = router;
