import React, { useState } from 'react';
import '../assets/songFilter.css'
const SongFilter = ({ onFilter }) => {
  const [filterText, setFilterText] = useState('');

  const handleChange = (e) => {
    setFilterText(e.target.value);
    onFilter(e.target.value); // Call the parent handler
  };

  return (
    <div className="song-filter">
      <input
        type="text"
        placeholder="Filter songs by title, artist, album, or genre"
        value={filterText}
        onChange={handleChange}
      />
    </div>
  );
};

export default SongFilter;
