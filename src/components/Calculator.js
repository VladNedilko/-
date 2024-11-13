import React, { useState, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import './Calculator.css';

const Calculator = () => {
  const [isVisible, setIsVisible] = useState(true); // Состояние видимости калькулятора
  const [input, setInput] = useState('');
  const [history, setHistory] = useState('');
  const calculatorRef = useRef(null);

  const handleMouseDown = (event) => {
    event.preventDefault();
    const calculator = calculatorRef.current;
    let shiftX = event.clientX - calculator.getBoundingClientRect().left;
    let shiftY = event.clientY - calculator.getBoundingClientRect().top;

    const onMouseMove = (e) => {
      calculator.style.left = e.pageX - shiftX + 'px';
      calculator.style.top = e.pageY - shiftY + 'px';
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleClick = (value) => setInput(input + value);
  const handleClear = () => { setInput(''); setHistory(''); };
  const handleClearEntry = () => setInput('');
  const handleBackspace = () => setInput(input.slice(0, -1));
  const handleCalculate = () => {
    try {
      const result = eval(input);
      if (result === Infinity || result === -Infinity || isNaN(result)) {
        setInput(''); // Очищаем поле, если результат бесконечность или ошибка
        setHistory(''); // Очищаем историю
      } else {
        setHistory(`${input} = ${result}`);
        setInput(result.toString());
      }
    } catch {
      setInput(''); // Очищаем поле в случае ошибки
      setHistory(''); // Очищаем историю
    }
  };
  const handleSquare = () => setHistory(`${input}² = ${Math.pow(parseFloat(input), 2).toString()}`);
  const handleSquareRoot = () => setHistory(`√${input} = ${Math.sqrt(parseFloat(input)).toString()}`);
  const handlePercentage = () => setHistory(`${input}% = ${(parseFloat(input) / 100).toString()}`);
  const handleReciprocal = () => setHistory(`1/${input} = ${(1 / parseFloat(input)).toString()}`);
  const handleToggleSign = () => setInput((parseFloat(input) * -1).toString());

  // Функция для скрытия калькулятора
  const handleMinimize = () => setIsVisible(false);

  // Функция для отображения калькулятора
  const handleShowCalculator = () => setIsVisible(true);

  return (
    <>
      {isVisible ? (
        <Container ref={calculatorRef} className="calculator-container" style={{ position: 'absolute' }}>
          <div className="calculator-header" onMouseDown={handleMouseDown}>
            <span>Calculator</span>
            <button className="minimize-button" onClick={handleMinimize}>_</button>
          </div>
          
          {/* История расположена сверху */}
          <div className="calculator-history">
            {history && <p>{history}</p>}
          </div>

          <div className="calculator-display">
            <input type="text" className="form-control" value={input} readOnly />
          </div>
          
          <div className="button-grid">
          <Button variant="secondary" onClick={handlePercentage}>%</Button>
        <Button variant="secondary" onClick={handleClearEntry}>CE</Button>
        <Button variant="danger" onClick={handleClear}>C</Button>
        <Button variant="warning" className="col-12" onClick={handleBackspace}>←</Button>
        
        <Button variant="secondary" onClick={handleReciprocal}>1/x</Button>
        <Button variant="secondary" onClick={handleSquare}>x²</Button>
        <Button variant="secondary" onClick={handleSquareRoot}>√</Button>
        <Button variant="warning" onClick={() => handleClick('/')}>/</Button>

        <Button variant="light" onClick={() => handleClick('7')}>7</Button>
        <Button variant="light" onClick={() => handleClick('8')}>8</Button>
        <Button variant="light" onClick={() => handleClick('9')}>9</Button>
        <Button variant="warning" onClick={() => handleClick('*')}>*</Button>

        <Button variant="light" onClick={() => handleClick('4')}>4</Button>
        <Button variant="light" onClick={() => handleClick('5')}>5</Button>
        <Button variant="light" onClick={() => handleClick('6')}>6</Button>
        <Button variant="warning" onClick={() => handleClick('-')}>-</Button>

        <Button variant="light" onClick={() => handleClick('1')}>1</Button>
        <Button variant="light" onClick={() => handleClick('2')}>2</Button>
        <Button variant="light" onClick={() => handleClick('3')}>3</Button>
        <Button variant="warning" onClick={() => handleClick('+')}>+</Button>

        <Button variant="secondary" onClick={handleToggleSign}>+/-</Button>
        <Button variant="light" onClick={() => handleClick('0')}>0</Button>
        <Button variant="secondary" onClick={() => handleClick('.')}>.</Button>
        <Button variant="success" className="col-12" onClick={handleCalculate}>=</Button>
          </div>
        </Container>
      ) : (
        <button className="show-calculator-button" onClick={handleShowCalculator}>Show Calculator</button>
      )}
    </>
  );
};

export default Calculator;
