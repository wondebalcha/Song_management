import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/EditSongPage.css';

const EditSongPage = () => {
  const { id } = useParams(); // Get the song ID from the URL
  const navigate = useNavigate(); // For navigation after editing
  const [song, setSong] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Fetch song data on component mount
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/songs/${id}`);
        const data = await response.json();
        if (data) {
          setSong({
            title: data.title,
            artist: data.artist,
            album: data.album,
            genre: data.genre,
          });
        }
      } catch (error) {
        console.error('Error fetching song:', error);
      }
    };

    fetchSong();
  }, [id]);

  // Handle form submission for updating the song
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/songs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(song),
      });

      if (response.ok) {
        // Display success message
        setSuccessMessage('Song updated successfully!');

        // Redirect to the song list page after a short delay
        setTimeout(() => {
          navigate('/');//redirect to the song list page
        }, 2000); // Delay of 2 seconds before redirecting
      } else {
        alert('Failed to update song');
      }
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  };

  return (
    <div className="edit-song-container">
      <h1>Edit Song</h1>
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br/>
          <input
            type="text"
            name="title"
            value={song.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Artist:</label><br/>
          <input
            type="text"
            name="artist"
            value={song.artist}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Album:</label><br/>
          <input
            type="text"
            name="album"
            value={song.album}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Genre:</label><br/>
          <input
            type="text"
            name="genre"
            value={song.genre}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>                              
  );
};

export default EditSongPage;
