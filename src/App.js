import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';

import Library from './components/Library';
import Search from './components/SearchUser';
import Upload from './components/Upload';
import UploadDetails from './components/UploadDetails';
import Profile from './pages/Profile';
import Login from './components/Login';
import Register from './components/Register';
import { UserProvider } from './context/UserContext'; 

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload/details" element={<UploadDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
