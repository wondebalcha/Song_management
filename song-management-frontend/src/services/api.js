//scr/services/api.js
export const fetchSongs = async () => {
  const response = await fetch('http://localhost:5000/api/songs');
    const data = await response.json();
    return data;
  };
  