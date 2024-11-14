import React, { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import CommentForm from './components/CommentForm';
import ProductForm from './components/ProductForm';


const App = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setUsers(storedUsers);
    setComments(storedComments);
    setProducts(storedProducts);
  }, []);

  const addUser = (user) => {
    const newUsers = [...users, user];
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  const addComment = (comment) => {
    const newComments = [...comments, comment];
    setComments(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments));
  };

  const addProduct = (product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  const clearUsers = () => {
    setUsers([]);
    localStorage.removeItem('users');
  };

  const clearComments = () => {
    setComments([]);
    localStorage.removeItem('comments');
  };

  const clearProducts = () => {
    setProducts([]);
    localStorage.removeItem('products');
  };

  return (
    <div className="container mt-4">
      <h1>Flexability Flexa</h1>
      
      <RegistrationForm onSubmit={addUser} />
      <CommentForm onSubmit={addComment} />
      <ProductForm onSubmit={addProduct} />

      <div className="mt-4">
        <h2>Зареєструвані користувачі:</h2>
        <button className="btn btn-danger mb-2" onClick={clearUsers}>Видалити користувача</button>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{`${user.firstName} ${user.lastName} (${user.email})`}</li>
          ))}
        </ul>

        <h2>Коментарі:</h2>
        <button className="btn btn-danger mb-2" onClick={clearComments}>Видалити коментарі</button>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.comment}</li>
          ))}
        </ul>

        <h2>Товари:</h2>
        <button className="btn btn-danger mb-2" onClick={clearProducts}>Видалити товари</button>
        <ul>
          {products.map((product, index) => (
            <li key={index}>{`${product.productName} - Цена: ${product.price}, Количество: ${product.quantity}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
