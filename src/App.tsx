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
import FAQ from './pages/FAQ';
import Consultation from './pages/Consultation';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500/30">
        {/* Global Grain Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <Navbar />
        <InkRain />
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/aftercare" element={<Aftercare />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/consultation" element={<Consultation />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
