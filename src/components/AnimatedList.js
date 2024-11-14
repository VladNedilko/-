import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import './AnimatedList.css'; 
function AnimatedList() {
  const [items, setItems] = useState([]); 
  const [count, setCount] = useState(0); 

  const addItem = () => {
    setItems([...items, `Елемент ${count + 1}`]); 
    setCount(count + 1);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <button onClick={addItem}>Додати елемент</button>
      <TransitionGroup component="ul" className="animated-list">
        {items.map((item, index) => (
          <CSSTransition key={item} timeout={300} classNames="item">
            <li>
              {item} <button onClick={() => removeItem(index)}>Видалити</button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default AnimatedList;
