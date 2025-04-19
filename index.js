// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// app.use(express.json());

// // 1. Connect to MongoDB
// mongoose
//   .connect('mongodb://localhost:27017/clicks', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// // 2. Define schema & model
// const clickSchema = new mongoose.Schema({
//   clicked1: { type: Number, default: 0 },
//   clicked2: { type: Number, default: 0 },
// });
// const Click = mongoose.model('Click', clickSchema);

// // Helper to always have one document
// async function getSingleton() {
//   let doc = await Click.findOne();
//   if (!doc) {
//     doc = await Click.create({});
//   }
//   return doc;
// }

// // 3. GET /clicks → return current counts
// app.get('/clicks', async (req, res) => {
//   try {
//     const doc = await getSingleton();
//     res.json({ clicked1: doc.clicked1, clicked2: doc.clicked2 });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // 4. POST /clicks/:user → increment clicked1 or clicked2
// app.post('/clicks/:user', async (req, res) => {
//   const user = req.params.user;
//   try {
//     const doc = await getSingleton();

//     if (user === '1') {
//       doc.clicked1 += 1;
//     } else if (user === '2') {
//       doc.clicked2 += 1;
//     } else {
//       return res.status(400).json({ error: 'Invalid user; must be 1 or 2' });
//     }

//     await doc.save();
//     res.json({ clicked1: doc.clicked1, clicked2: doc.clicked2 });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // 5. Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
