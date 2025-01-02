import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { addSong } from '../redux/songSlice';
import { emitSongChange } from '../services/socket';
import { FaPlus } from 'react-icons/fa'; 
import '../assets/AddSongPage.css'; 

const AddSongPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [song, setSong] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });

  const handleChange = (e) => {
    setSong({
      ...song,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the song data to the backend to create the song
    const response = await fetch('http://localhost:5000/api/songs', {
      method: 'POST',
      body: JSON.stringify(song),
      headers: { 'Content-Type': 'application/json' },
    });

    const newSong = await response.json();

    // Dispatch to Redux store to update the song list
    dispatch(addSong(newSong));

    // Emit real-time event for song creation
    emitSongChange('songCreated', newSong);

    // Navigate to the song list page
    navigate('/');
  };

  return (
    <div className="add-song-container">
      <h1 className="add-song-title">Add Song</h1>
      <p className="add-song-description">
        Fill out the form below to add a new song to your collection.
      </p>
      <form className="add-song-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={song.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="artist">Artist</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={song.artist}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="album">Album</label>
          <input
            type="text"
            id="album"
            name="album"
            value={song.album}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={song.genre}
            onChange={handleChange}
            required
          />
        </div>
        <button className="add-song-button" type="submit">
          <FaPlus /> Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSongPage;
