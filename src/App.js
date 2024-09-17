import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Navigation from './Navigation';
import Body from './Body';
import Footer from './Footer';
import TaskList from './TaskList'; 
import LoginButton from './LoginButton'; 
import LogoutButton from './LogoutButton';

//lol china azaza
function App() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleTaskSelectionChange = (count) => {
    setSelectedCount(count);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header style={headerStyle}>
        <Header />
        <div style={counterStyle}>
          Обрані товари: {selectedCount}
        </div>
        {isLoggedIn ? (
          <LogoutButton onLogout={handleLogout} />
        ) : (
          <LoginButton onLogin={handleLogin} />
        )}
      </header>

      <Navigation 
        isLoggedIn={isLoggedIn} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      <Body>
        <TaskList onTaskSelectionChange={handleTaskSelectionChange} />
      </Body>

      <Footer />
    </div>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
};

const counterStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
};

export default App;
