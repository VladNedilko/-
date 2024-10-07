import React from 'react';
import { useHistory } from '../hooks/useHistory'; 
import '../styles/History.css'; 

const History = () => {
  const { history, goBack } = useHistory(); 
  return (
    <div className="history-container">
      <h1>Історія навігації</h1>
      <ul className="history-list">
        {history.map((path, index) => (
          <li key={index}>{path}</li>
        ))}
      </ul>
      <button className="back-button" onClick={goBack}>Назад</button> {}
    </div>
  );
};

export default History;
