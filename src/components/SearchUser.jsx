import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './SearchUsers.css';

const SearchUsers = () => {
  const { users, followUser, unfollowUser, following } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-users">
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="users-list">
        {filteredUsers.map((user) => (
          <div key={user.email} className="user-item">
            <p>{user.name}</p>
            {following.includes(user.email) ? (
              <button onClick={() => unfollowUser(user.email)}>Unfollow</button>
            ) : (
              <button onClick={() => followUser(user.email)}>Follow</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
