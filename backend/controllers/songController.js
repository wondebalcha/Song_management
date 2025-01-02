const Song = require('../models/Song');

// Get all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching songs' });
  }
};

// Create a new song
const createSong = async (req, res) => {
  const { title, artist, album, genre } = req.body;
  try {
    const newSong = new Song({ title, artist, album, genre });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating song', error: error.message });
  }
};

// Get song by ID
const getSongById = async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching song', error: error.message });
  }
};

// Update a song
const updateSong = async (req, res) => {
  const { id } = req.params;
  const { title, artist, album, genre } = req.body;

  try {
    const song = await Song.findByIdAndUpdate(
      id,
      { title, artist, album, genre },
      { new: true } // Return the updated document
    );

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    res.json(song);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating song', error: error.message });
  }
};

// Delete a song
const deleteSong = async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findByIdAndDelete(id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting song', error: error.message });
  }
};

// Get statistics (updated function)
const getStats = async (req, res) => {
  try {
    // Count the total number of songs
    const totalSongs = await Song.countDocuments();

    // Get the count of songs per genre, and list genres by number of songs
    const genreStats = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } }, // Sort genres by the number of songs in descending order
    ]);

    // Get the count of songs per artist, and list artists by number of songs
    const artistStats = await Song.aggregate([
      { $group: { _id: "$artist", count: { $sum: 1 } } },
      { $sort: { count: -1 } }, // Sort artists in descending order
    ]);

    // Generate detailed lists of genres, artists, and their counts
    const genresList = genreStats.map((genre, index) => ({
      rank: index + 1,
      genre: genre._id,
      count: genre.count
    }));

    const artistsList = artistStats.map((artist, index) => ({
      rank: index + 1,
      artist: artist._id,
      count: artist.count
    }));

    // Prepare response data
    const stats = {
      totalSongs,
      totalGenres: genreStats.length,
      totalArtists: artistStats.length,
      genres: genresList,
      artists: artistsList
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};
// Export all functions
module.exports = {
  getAllSongs,
  createSong,
  getSongById,
  updateSong,
  deleteSong,
  getStats,
};
