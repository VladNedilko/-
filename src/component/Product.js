import React, { useState } from 'react';

const Product = ({ name, description, price, onCommentSubmit }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onCommentSubmit(name, comment);
      alert(`Ваш відгук: «${comment}» додано успішно!`);
      console.log(comment);
      setComment("");
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Ціна: {price} грн</p>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Залиште свій коментар"
          rows="4"
          style={{ width: '100%' }}
        />
        <button type="submit">Коментар</button>
      </form>
    </div>
  );
};

export default Product;
