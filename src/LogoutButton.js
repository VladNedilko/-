import React from 'react';

function LogoutButton({ onLogout }) {
  return (
    <button onClick={onLogout} style={buttonStyle}>
      Вихід
    </button>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  margin: '0 5px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default LogoutButton;
