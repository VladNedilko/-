import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Navbar.css';
import logoImage from '../assets/your-logo.png';
import Search from './Search';


const Navbar = () => {
  const { user, logout } = useContext(UserContext); 

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </div>
        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink
            to="/library"
            className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
          >
            Library
          </NavLink>
          <NavLink
            to="/upload"
            className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
          >
            Upload
          </NavLink>

        </div>
        <Search />

        <div className="auth-buttons">
          {user ? (
            <>
              <NavLink to="/profile" className="auth-button">
                Profile
              </NavLink>
              <button className="auth-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="auth-button">
                Sign in
              </NavLink>
              <NavLink to="/register" className="auth-button">
                Create account
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
