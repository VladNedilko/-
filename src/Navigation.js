import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function Navigation({ isLoggedIn, onLogin, onLogout }) {
  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}><a href="#home">Головна</a></li>
        <li style={liStyle}><a href="#tasks">Завдання</a></li>
        <li style={liStyle}><a href="#quote">Цитата</a></li>
        <li style={liStyle}><a href="#contacts">Контакти</a></li>
      </ul>
      {isLoggedIn ? (
        <LogoutButton onLogout={onLogout} />
      ) : (
        <LoginButton onLogin={onLogin} />
      )}
    </nav>
  );
}

const navStyle = {
  backgroundColor: '#0052',
  padding: '10px',
  textAlign: 'center',
};

const ulStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'center'
};

const liStyle = {
  margin: '0 15px',
};

export default Navigation;
