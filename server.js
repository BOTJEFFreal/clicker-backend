const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const clickRoutes = require('./routes/clicks');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const DBURL = process.env.DATABASE_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api/clicks', clickRoutes);
console.log("Attempting to load auth routes...");
// const authRoutes = require('./routes/auth'); // Keep existing line
console.log("authRoutes type:", typeof authRoutes); // Check if it loaded
app.use('/api/auth', authRoutes);
console.log("Mounted /api/auth");
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
