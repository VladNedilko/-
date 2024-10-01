import React from 'react';
import ProductList from './component/ProductList';
import CurrencyConverter from './component/CurrencyConverter';

const App = () => {
  const products = [
    { id: 1, name: "Ноутбук", description: "Потужний ноутбук для роботи.", price: 30000 },
    { id: 2, name: "Смартфон", description: "Новий смартфон з великим екраном.", price: 15000 },
    { id: 3, name: "Навушники", description: "Бездротові навушники з хорошим звуком.", price: 5000 },
  ];

  const currencyRate = 41.28; // пендосі
  
  const handleCommentSubmit = (productName, comment) => {
    console.log(`Коментар отримано для товару: ${productName} — «${comment}»`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Список товарів</h1>
      <ProductList products={products} onCommentSubmit={handleCommentSubmit} />
      <CurrencyConverter rate={currencyRate} />
    </div>
  );
};

export default App;
