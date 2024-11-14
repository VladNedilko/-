import React, { useState, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import './Calculator.css';

const Calculator = () => {
  const [isVisible, setIsVisible] = useState(true); 
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
        setInput(''); 
        setHistory(''); 
      } else {
        setHistory(`${input} = ${result}`);
        setInput(result.toString());
      }
    } catch {
      setInput(''); 
      setHistory(''); 
    }
  };

  const handleSquare = () => {
    const result = Math.pow(parseFloat(input), 2);
    setHistory(`${input}² = ${result}`);
    setInput(result.toString());
  };

  const handleSquareRoot = () => {
    const result = Math.sqrt(parseFloat(input));
    setHistory(`√${input} = ${result}`);
    setInput(result.toString());
  };

  const handlePercentage = () => {
    const result = parseFloat(input) / 100;
    setHistory(`${input}% = ${result}`);
    setInput(result.toString());
  };

  const handleReciprocal = () => {
    const result = 1 / parseFloat(input);
    setHistory(`1/${input} = ${result}`);
    setInput(result.toString());
  };

  const handleToggleSign = () => {
    const result = (parseFloat(input) * -1).toString();
    setInput(result);
  };

  const handleMinimize = () => setIsVisible(false);
  const handleShowCalculator = () => setIsVisible(true);

  return (
    <>
      {isVisible ? (
        <Container ref={calculatorRef} className="calculator-container" style={{ position: 'absolute' }}>
          <div className="calculator-header" onMouseDown={handleMouseDown}>
            <span>Calculator</span>
            <button className="minimize-button" onClick={handleMinimize}>_</button>
          </div>

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
