import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './pages/Header';
import LoadingImg from './pages/css/tractor.gif'
// Lazy-loaded page components
const HomePage = lazy(() => import('./pages/HomePage'));
const Buy = lazy(() => import('./pages/Buy'));
const DailyPrices = lazy(() => import('./pages/DailyPrices'));
const Sell = lazy(() => import('./pages/Sell'));
const Profile = lazy(() => import('./pages/Profile'));


const LoadingComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 60px)',
        
      }}
    >
      <img  style={{maxHeight:'10rem'}} src={LoadingImg} alt="Loading" />
    </div>
  );
};

const App = () => {

  return (
    <Router>
      <Header  style={{zIndex:'1000'}}/>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy_crop" element={<Buy />} />
          <Route path="/price" element={<DailyPrices />} />
          <Route path="/sell_crop" element={<Sell />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
