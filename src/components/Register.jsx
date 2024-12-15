import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = register(formData.name, formData.email, formData.password);
    if (success) {
      navigate('/login');
    } else {
      setError('Registration failed. Email might already be in use.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
