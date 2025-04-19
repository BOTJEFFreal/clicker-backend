const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // the user being clicked for
  clickCount: { type: Number, default: 0 },
  clickedBy: [{ type: String }] // store usernames who clicked for this user
});

module.exports = mongoose.model('Click', clickSchema);
