import React from 'react';

function LoginButton({ onLogin }) {
  return (
    <button onClick={onLogin} style={buttonStyle}>
      Вхід
    </button>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  margin: '0 5px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default LoginButton;
