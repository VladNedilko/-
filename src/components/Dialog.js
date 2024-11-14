import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Dialog.css'; 

function Dialog({ onClose }) {
  return (
    <CSSTransition in={true} timeout={300} classNames="dialog" unmountOnExit>
      <div className="dialog-backdrop" onClick={onClose}>
        <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
          <h2>Привіт з діалогу!</h2>
          <button onClick={onClose}>Закрити</button>
        </div>
      </div>
    </CSSTransition>
  );
}

export default Dialog;
