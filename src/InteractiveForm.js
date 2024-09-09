import React, { useState } from 'react';
import './InteractiveForm.css';  

function InteractiveForm() {
  const [inputValue, setInputValue] = useState('');  

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Введено: ${inputValue}`);
  };

  return (
    <div className="interactive-form">
      <h2>Інтерактивна форма</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Введи щось:
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Введи текст"
          />
        </label>
        <button type="submit">Надіслати</button>
      </form>
      <p>Введений текст: {inputValue}</p>
    </div>
  );
}

export default InteractiveForm;
