import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSongs, deleteSong } from '../redux/songSlice';
import SongCard from '../components/SongCard';
import SongFilter from '../components/songFilter';
import '../assets/SongPage.css';

const SongPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const songs = useSelector((state) => state.songs.songs);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSongs(songs);
  }, [songs]);

  const handleView = (id) => {
    navigate(`/songs/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/songs/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSong(id)); // Dispatch the deleteSong action
      setFilteredSongs((prevSongs) => prevSongs.filter((song) => song._id !== id)); // Update local state
    }
  };

  const handleFilter = (filterText) => {
    const filtered = songs.filter((song) =>
      song.title.toLowerCase().includes(filterText.toLowerCase()) ||
      song.artist.toLowerCase().includes(filterText.toLowerCase()) ||
      song.album.toLowerCase().includes(filterText.toLowerCase()) ||
      song.genre.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  return (
    <div className="song-page-container">
      <h1>Song List</h1>
      <div className="song-page-description">
        <p>Welcome to the Song List page! Here, you can view, edit, and delete songs in the system. Use the search filter to quickly find songs by title, artist, album, or genre. Add your favorite songs to keep them organized and easily accessible!</p>
      </div>
      <SongFilter onFilter={handleFilter} />
      <div className="song-list">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <SongCard
              key={song._id}
              song={song}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onView={handleView}
            />
          ))
        ) : (
          <p className="no-songs">No songs available. Please add one!</p>
        )}
      </div>
    </div>
  );
};

export default SongPage;
