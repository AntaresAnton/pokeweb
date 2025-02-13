import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import Evolution from './components/Evolution';
import Items from './components/Items';
import Berries from './components/Berries';
import Locations from './components/Locations';
import Moves from './components/Moves';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'aos/dist/aos.css';
import './global.css';
import './App.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/evolution" element={<Evolution />} />
          <Route path="/items" element={<Items />} />
          <Route path="/berries" element={<Berries />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/moves" element={<Moves />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
