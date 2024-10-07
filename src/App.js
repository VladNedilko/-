import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Concert from './pages/Concert';
import History from './pages/Histrory';
import './styles/App.css'; 

function App() {
  return (
    <Router>
      <header className="site-header">
        <nav className="navbar">
          <h1 className="site-title">Альтушку бы</h1>
          <div className="nav-links">
            <NavLink 
              to="/" 
              className="nav-button" 
              activeClassName="active" 
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className="nav-button" 
              activeClassName="active"
            >
              About
            </NavLink>
            <NavLink 
              to="/concert" 
              className="nav-button" 
              activeClassName="active"
            >
              Concert
            </NavLink>
            <NavLink 
              to="/history" 
              className="nav-button" 
              activeClassName="active"
            >
              History
            </NavLink> {/* Добавили ссылку на History */}
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/concert" element={<Concert />} />
        <Route path="/history" element={<History />} /> {/* Добавили маршрут для History */}
      </Routes>
    </Router>
  );
}

export default App;