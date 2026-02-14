import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DaySchedule from './pages/DaySchedule';
import EditSchedule from './pages/EditSchedule';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/day/:day" element={<DaySchedule />} />
        <Route path="/edit/:id?/:day?" element={<EditSchedule />} />
      </Routes>
    </Router>
  );
}

export default App;
