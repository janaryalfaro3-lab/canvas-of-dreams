import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InkRain from './components/InkRain';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Aftercare from './pages/Aftercare';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500 selection:text-black">
        <Navbar />
        <InkRain />
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/aftercare" element={<Aftercare />} />
              <Route path="/booking" element={<Booking />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
