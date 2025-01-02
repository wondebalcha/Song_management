import React from 'react';
import '../assets/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h2>Welcome to the Song Management System</h2>
        <p>Manage, analyze, and explore your music collection effortlessly.</p>
        <button >Get Started</button>
      </section>

      <section id="features" className="features">
        <h3>Key Features</h3>
        <div className="feature-cards">
          <div className="card">
            <h4>📂 Song Management</h4>
            <p>Create, edit, and organize your song.</p>
          </div>
          <div className="card">
            <h4>📊 Real-Time Statistics</h4>
            <p>View insightful analytics about your music collection.</p>
          </div>
          <div className="card">
            <h4>🔍 Song Filtering</h4>
            <p>Search and filter songs by title, artist, album, or genre.</p>
          </div>
        </div>
      </section>

      <section id="stats" className="stats">
        <h3>Statistics</h3>
        <p>Discover trends and patterns in your music library.</p>
      </section>

      <footer id="about" className="footer">
        <p>© 2024 Song Management System. All rights reserved.</p>
        <p>Developed by Wondeson Balcha.</p>
      </footer>
    </div>
  );
};

export default HomePage;
