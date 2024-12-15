import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Library.css';

const Library = () => {
  const { userTracks } = useContext(UserContext);
  const navigate = useNavigate();

  const handleTrackClick = (trackId) => {
    navigate(`/profile?trackId=${trackId}`);
  };

  return (
    <div className="library">
      <h1>Your Library</h1>
      {userTracks.length > 0 ? (
        <ul>
          {userTracks.map((track) => (
            <li 
              key={track.id} 
              className="library-track" 
              onClick={() => handleTrackClick(track.id)}
            >
              <div className="track-info">
                <p className="track-title">{track.name}</p>
                <p className="track-artist">by {track.artist}</p>
              </div>
              {track.coverLink && (
                <img
                  src={track.coverLink}
                  alt="Track cover"
                  className="track-cover"
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tracks in your library yet.</p>
      )}
    </div>
  );
};

export default Library;