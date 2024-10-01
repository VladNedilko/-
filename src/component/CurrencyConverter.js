import React, { useState } from 'react';

const CurrencyConverter = ({ rate }) => {
  const [uah, setUah] = useState("");
  const [usd, setUsd] = useState("");

  const handleUahChange = (e) => {
    const uahValue = e.target.value;
    setUah(uahValue);
    setUsd((uahValue / rate).toFixed(2));
  };

  const handleUsdChange = (e) => {
    const usdValue = e.target.value;
    setUsd(usdValue);
    setUah((usdValue * rate).toFixed(2));
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
      <h3>Конвертор валют</h3>
      <p>Курс валюти (UAH/USD): {rate}</p>
      <div style={{ marginBottom: '10px' }}>
        <label>Гривня (UAH): </label>
        <input
          type="number"
          value={uah}
          onChange={handleUahChange}
          placeholder="Введіть суму в UAH"
        />
      </div>
      <div>
        <label>Долар (USD): </label>
        <input
          type="number"
          value={usd}
          onChange={handleUsdChange}
          placeholder="Введіть суму в USD"
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
