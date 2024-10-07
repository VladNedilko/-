import React from 'react';
import './styles/debug.css';
import { useHistory } from '../hooks/useHistory';

function Debug() {
  const { history } = useHistory();

  return (
    <div className="debug">
      <h2>Navigation History</h2>
      <ul>
        {history.map((path, index) => (
          <li key={index}>{path}</li>
        ))}
      </ul>
    </div>
  );
}

export default Debug;
