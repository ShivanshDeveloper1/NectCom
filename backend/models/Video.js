const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instagramUrl: { type: String, required: true }, // e.g., https://www.instagram.com/reel/C_xxxxxx/
  description: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);