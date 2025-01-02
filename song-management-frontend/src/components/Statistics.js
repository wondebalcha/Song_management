import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../redux/songSlice';
import '../assets/Statistics.css'; 

const Statistics = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="statistics">
      <h2>Statistics</h2>
      {stats ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Statistic</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Songs</td>
                <td>{stats.totalSongs}</td>
              </tr>
              <tr>
                <td>Total Genres</td>
                <td>{stats.totalGenres}</td>
              </tr>
              <tr>
                <td>Total Artists</td>
                <td>{stats.totalArtists}</td>
              </tr>
            </tbody>
          </table>

          <h3>Genres List</h3>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Genre</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {stats.genres.map((genre) => (
                <tr key={genre.genre}>
                  <td>{genre.rank}</td>
                  <td>{genre.genre}</td>
                  <td>{genre.count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Artists List</h3>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Artist</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {stats.artists.map((artist) => (
                <tr key={artist.artist}>
                  <td>{artist.rank}</td>
                  <td>{artist.artist}</td>
                  <td>{artist.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No statistics available</div>
      )}
    </div>
  );
};

export default Statistics;
