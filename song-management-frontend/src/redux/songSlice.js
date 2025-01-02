import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  loading: false,
  error: null,
  stats: null, // If stats are managed in this slice
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
    updateSong: (state, action) => {
      const index = state.songs.findIndex((song) => song._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    removeSong: (state, action) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    fetchSongsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action) => {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchStatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action) => {
      state.stats = action.payload;
      state.loading = false;
    },
    fetchStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setSongs,
  addSong,
  updateSong,
  removeSong,
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchStatsStart,
  fetchStatsSuccess,
  fetchStatsFailure,
} = songSlice.actions;

// Fetch all songs
export const fetchSongs = () => async (dispatch) => {
  dispatch(fetchSongsStart());
  try {
    const response = await fetch('http://localhost:5000/api/songs');
    if (!response.ok) throw new Error('Failed to fetch songs');
    const data = await response.json();
    dispatch(fetchSongsSuccess(data));
  } catch (error) {
    dispatch(fetchSongsFailure(error.message));
  }
};

// Fetch statistics
export const fetchStats = () => async (dispatch) => {
  dispatch(fetchStatsStart());
  try {
    const response = await fetch('http://localhost:5000/api/songs/stats');
    if (!response.ok) throw new Error('Failed to fetch stats');
    const data = await response.json();
    dispatch(fetchStatsSuccess(data));
  } catch (error) {
    dispatch(fetchStatsFailure(error.message));
  }
};

// Delete a song
export const deleteSong = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5000/api/songs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete the song');
    dispatch(removeSong(id)); // Remove song from Redux store
  } catch (error) {
    console.error('Error deleting song:', error);
  }
};

export default songSlice.reducer;
