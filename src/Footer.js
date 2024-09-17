import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 Мій React Проєкт. Усі права захищено репером МС петею.</p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  marginTop: '20px',
};

export default Footer;
