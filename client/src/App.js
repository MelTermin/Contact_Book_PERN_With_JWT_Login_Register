import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Update from './Components/Update';
import './App.css';


function App() {
  
  return (
    <div>
  
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact/:id/update" element={<Update />} />
      </Routes>

    </div>
  );
}

export default App;
