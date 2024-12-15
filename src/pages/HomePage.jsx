import React, { useContext, useState, useEffect } from 'react';
import './HomePage.css';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const HomePage = () => {
  const { user, isLoading, fetchRecentlyPlayed } = useContext(UserContext);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    const updateRecentlyPlayed = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`http://localhost:5000/users/${user.email}/recently-played`);
        setRecentlyPlayed(response.data);
      } catch (error) {
        console.error('Error fetching recently played tracks:', error.message);
      }
    };

    updateRecentlyPlayed();
    const interval = setInterval(updateRecentlyPlayed, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to see your personalized content.</div>;

  return (
    <div className="home-page">
      <h1>Welcome, {user.name}!</h1>
      <div>
        <h2>Recently Played</h2>
        <div className="card-container">
          {recentlyPlayed.length > 0 ? (
            recentlyPlayed.map((track) => (
              <div key={track.id} className="music-card">
                <img src={track.coverLink} alt={track.name} className="music-cover" />
                <div>
                  <h3>{track.name}</h3>
                  <p>{track.artist}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No recently played tracks.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
