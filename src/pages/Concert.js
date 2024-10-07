import React from 'react';
import './Concert.css'; 

const Concert = () => {
  return (
    <div className="concert-container">
      <h1>Концерт МС Пети</h1>
      <p className="concert-description">
        Приєднуйтеся до нас на незабутній концерт МС Пети! Цей захід обіцяє бути 
        епічним, з найпопулярнішими треками та незабутніми моментами.
      </p>

      <div className="video-section">
        <h2>Дивіться наш демо виступ:</h2>
        <iframe
          width="491"
          height="873"
          src="https://www.youtube.com/embed/OSR-MyWIL_Y?autoplay=1&mute=0"
          title="Мс Петя - Двері відкривайте, зйомка на патіхаус"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div className="highlight-section">
        <h2>Основні моменти:</h2>
        <ul>
          <li>🔥 Неймовірні виступи живого репу</li>
          <li>🔥 Зустріч з фанатами та автографи</li>
          <li>🔥 Спеціальні гості та сюрпризи</li>
          <li>🔥 Конкурси та розіграші призів</li>
        </ul>
      </div>

      <div className="final-message">
        <h2>Не пропустіть це!</h2>
        <p>МС Петя чекає на вас, щоб разом зробити цю ніч незабутньою! <span className="final-meme">"Я ЖИВИИИИЙ!"</span></p>
      </div>
    </div>
  );
};

export default Concert;
