import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(formData.email, formData.password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
