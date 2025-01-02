import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import '../assets/ViewSongpage.css'
const ViewSongPage = () => {
  const { id } = useParams(); // Get the song ID from the URL
  const navigate = useNavigate(); // Navigate for the back button
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/songs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch the song');
        }
        const data = await response.json();
        setSong(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="view-song-container">
      <h1 className="song-title">{song.title}</h1>
      <p><strong>Artist:</strong> {song.artist}</p>
      <p><strong>Album:</strong> {song.album}</p>
      <p><strong>Genre:</strong> {song.genre}</p>
      <p><strong>Created At:</strong> {new Date(song.createdAt).toLocaleString()}</p>

      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigate('/')} // Go back to the previous page
      >
        Back
      </button>
    </div>
  );
};

export default ViewSongPage;
