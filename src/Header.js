import React from 'react';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Мій React Проєкт</h1>
      <p>Навчання, філософія, мотивація</p>
    </header>
  );
}

const headerStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 0',
  textAlign: 'center',
  marginBottom: '20px'
};

export default Header;
