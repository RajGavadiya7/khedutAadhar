import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Header from './pages/Header';
import LoadingImg from './pages/css/tractor.gif'
import { Helmet } from 'react-helmet-async';
import HomePage from './pages/HomePage';
// Lazy-loaded page components

const Buy = loadable(() => import('./pages/Buy'));
const DailyPrices = loadable(() => import('./pages/DailyPrices'));
const Sell = loadable(() => import('./pages/Sell'));
const Profile = loadable(() => import('./pages/Profile'));
const TractorHire = loadable(() => import('./pages/TractorHire'));
const CropPage = loadable(() => import('./pages/CropPage'));
const AllReviews = loadable(() => import('./pages/AllReviews'));



// const LoadingComponent = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: 'calc(100vh - 60px)',
        
//       }}
//     >
//       <img  style={{maxHeight:'10rem'}} src={LoadingImg} alt="Loading" />
//     </div>
//   );
// };

const App = () => {

  return (
    <Router>

      <Helmet>
        <title>Krushi Aadhar </title>
        <meta name="description" content="Krushi Aadhar is a platform that enables farmers to sell their crops directly to buyers and provides a platform for hiring tractors." />
        <meta name="keywords" content="Krushi Aadhar, Farmers, Sell Crops, Buy Organic Crops, Hire Tractor, Farming Equipment, Agricultural Platform, Home Page, Crop Details, Reviews, Daily Prices, User Profile, Tractor Hire" />
        <meta name="author" content="Krushi Aadhar" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://krushiaadhar.me/" />
        <meta property="og:title" content="Krushi Aadhar - Platform for Farmers to Sell Crops and Hire Tractors" />
        <meta property="og:description" content="Krushi Aadhar is a platform that enables farmers to sell their crops directly to buyers and provides a platform for hiring tractors." />
        <meta property="og:url" content="https://krushiaadhar.me/" />
        <meta property="og:site_name" content="Krushi Aadhar" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://krushiaadhar.me/image/logo.svg" />
        <meta property="og:image:alt" content="Krushi Aadhar Logo" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        
        
      </Helmet>

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
