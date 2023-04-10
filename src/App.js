import Home from "./pages/Home";
// import './App.css';
import {  Routes, Route } from "react-router-dom";
import Buy from "./pages/Buy.js";
import Sell from "./pages/Sell";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Daily_prices from "./pages/Daily_prices";

const App = () => {
  return (
    <div>
      <Home />
      <Routes>
        <Route exact path="/buy_crop" element={<Buy />} />
        <Route exact path="/price" element={<Daily_prices />} />
        <Route exact path="/sell_crop" element={<Sell />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
