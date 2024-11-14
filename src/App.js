import React, { useState } from 'react';
import Dialog from './components/Dialog';
import AnimatedList from './components/AnimatedList';
import StyledButton from './components/StyledButton';
import './styles/App.module.css';

function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  return (
    <div className="App">
      <h1>Flex</h1>
      <StyledButton onClick={toggleDialog}>Показати діалог</StyledButton>
      {isDialogOpen && <Dialog onClose={toggleDialog} />}
      <AnimatedList />
    </div>
  );
}

export default App;
