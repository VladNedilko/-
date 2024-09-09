import React from 'react';
import './App.css';
import InteractiveForm from './InteractiveForm';
import TaskList from './TaskList';
import Quote from './Quote';
import Clock from './Clock';
import RandomImage from './RandomImage';

function App() {
  return (
    <div className="App">
      <h1>Проєкт Індуса</h1>
      <InteractiveForm />
      <TaskList />
      <Quote />
      <Clock />
      <RandomImage />
    </div>
  );
}

export default App;
