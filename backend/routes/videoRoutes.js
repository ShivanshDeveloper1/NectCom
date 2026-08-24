// routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const { getVideos, createVideo, deleteVideo } = require('../controller/videoController');

router.get('/', getVideos);
router.post('/', createVideo);
router.delete('/:id', deleteVideo);

module.exports = router;