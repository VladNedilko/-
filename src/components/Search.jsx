import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './Search.css';

const Search = () => {
  const { userTracks } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTracks, setFilteredTracks] = useState([]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const results = userTracks.filter(track =>
        track.name.toLowerCase().includes(term.toLowerCase()) ||
        track.artist.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredTracks(results);
    } else {
      setFilteredTracks([]);
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        className="search-input"
        placeholder="Search music..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <ul className="search-results">
          {filteredTracks.length > 0 ? (
            filteredTracks.map(track => (
              <li key={track.id} className="search-result-item">
                <div className="result-info">
                  <p className="result-title">{track.name}</p>
                  <p className="result-artist">by {track.artist}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="search-no-results">No matches found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;