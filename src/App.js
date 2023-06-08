import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import HomePage from './pages/HomePage';
import Buy from './pages/Buy';
import DailyPrices from './pages/DailyPrices';
import Sell from './pages/Sell';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Home />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buy_crop" element={<Buy />} />
        <Route path="/price" element={<DailyPrices />} />
        <Route path="/sell_crop" element={<Sell />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
