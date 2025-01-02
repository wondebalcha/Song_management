const express = require('express');
const { getAllSongs, createSong, updateSong, deleteSong, getStats, getSongById } = require('../controllers/songController');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Statistics route
router.get('/stats', getStats); // Get statistics

// CRUD routes
// Get all songs
router.get('/', getAllSongs);

// Get a single song by ID
router.get('/:id', getSongById);

// Create a song route with validation middleware
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('artist').notEmpty().withMessage('Artist is required'),
    body('album').notEmpty().withMessage('Album is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createSong // Controller function to create a song
);

// Update a song
router.put('/:id', updateSong);

// Delete a song
router.delete('/:id', deleteSong);

module.exports = router;
