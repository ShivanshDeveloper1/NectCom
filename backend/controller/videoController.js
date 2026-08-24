const Video = require('../models/Video');

// Get active videos for frontend
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new Instagram video (Admin)
exports.createVideo = async (req, res) => {
  try {
    const { title, instagramUrl, description } = req.body;
    const newVideo = await Video.create({ title, instagramUrl, description });
    res.status(201).json({ success: true, data: newVideo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete video (Admin)
exports.deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};