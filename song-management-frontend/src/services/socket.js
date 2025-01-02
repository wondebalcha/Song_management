// src/services/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Assuming the backend server is at localhost:5000

// Emit events for song creation, editing, and deletion
const emitSongChange = (action, song) => {
  socket.emit(action, song);
};

// Listen for song updates from the server
const listenToSongUpdates = (callback) => {
  socket.on('songCreated', (song) => callback('create', song));
  socket.on('songUpdated', (song) => callback('update', song));
  socket.on('songDeleted', (songId) => callback('delete', songId));
};

export { emitSongChange, listenToSongUpdates };
