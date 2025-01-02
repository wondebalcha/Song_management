import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongPage from './pages/SongPage';
import AddSongPage from './pages/AddSongPage'
import ViewSongPage from './pages/ViewSongPage';
import EditSongPage from './pages/EditSongPage';
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Statistics from './components/Statistics';
import './App.css'
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<SongPage />} />
        <Route path="/songs/:id" element={<ViewSongPage />} />
        <Route path="/songs/edit/:id" element={<EditSongPage />} />
        <Route path="/add-song" element={<AddSongPage />} />
        <Route path="/song-stats" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;
