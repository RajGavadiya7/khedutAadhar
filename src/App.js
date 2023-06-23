import React, {  Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Header from './pages/Header';
import LoadingImg from './pages/css/tractor.gif'
// Lazy-loaded page components
const HomePage = loadable(() => import('./pages/HomePage'));
const Buy = loadable(() => import('./pages/Buy'));
const DailyPrices = loadable(() => import('./pages/DailyPrices'));
const Sell = loadable(() => import('./pages/Sell'));
const Profile = loadable(() => import('./pages/Profile'));
const TractorHire = loadable(() => import('./pages/TractorHire'));
const CropPage = loadable(() => import('./pages/CropPage'));

const AllReviews = loadable(() => import('./pages/AllReviews'));



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
      {/* <Suspense fallback={<LoadingComponent />}> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy_crop" element={<Buy />}  />
          <Route path="/buy_crop/:cropId" element={<CropPage />} />
          <Route path="/reviews/:cropId" element={<AllReviews />} />
          <Route path="/price" element={<DailyPrices />} />
          <Route path="/sell_crop" element={<Sell />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/hireTractor" element={<TractorHire />} />

          {/* 404 page path route */}
          <Route path="*" element={<div style={{backgroundColor:"white"}}>404 Page Not Found</div>} />
          
        </Routes>
      {/* </Suspense> */}
    </Router>
  );
};

export default App;
