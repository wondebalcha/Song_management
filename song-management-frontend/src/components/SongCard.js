import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import "../assets/SongCard.css"
const SongCard = ({ song, onDelete, onEdit, onView }) => {
  // Delete button handler
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/songs/${song._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Song deleted successfully');
        if (onDelete) {
          onDelete(song._id); // Notify parent component
        }
      } else {
        console.error('Failed to delete the song');
      }
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  return (
    <div className="song-card">
      <h2>{song.title}</h2>
      <p>
        <strong>Artist:</strong> {song.artist}
      </p>
      <p>
        <strong>Album:</strong> {song.album}
      </p>
      <p>
        <strong>Genre:</strong> {song.genre}
      </p>

      <div className="action-buttons">
        {/* View Button */}
        <button onClick={() => onView(song._id)} title="View Details">
          <FaEye /> View
        </button>

        {/* Edit Button */}
        <button onClick={() => onEdit(song._id)} title="Edit Song">
          <FaEdit /> Edit
        </button>

        {/* Delete Button */}
        <button onClick={handleDelete} title="Delete Song">
          <FaTrashAlt /> Delete
        </button>
      </div>
    </div>
  );
};

SongCard.propTypes = {
  song: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func, // Optional if not used
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default SongCard;
