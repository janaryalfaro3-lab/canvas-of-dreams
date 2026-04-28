import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'Artists', path: '/artists' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Aftercare', path: '/aftercare' },
    { name: 'Booking', path: '/booking' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
        scrolled ? "bg-black/90 backdrop-blur-md border-bottom border-zinc-900 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-800 group-hover:border-orange-500 transition-colors">
            <img 
              src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/472457306_122121870752610387_8965074152194860895_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=NU7dA5a41-UQ7kNvwGjqcLi&_nc_oc=AdrdPK2YxeYoUQ87_varUb-Ap6rhyzGDKRrvk6xuFAST5GZiH-34Clccuz2IWCuNBE8&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=kY1Y9yV-LJyNaeGCDm5rNg&_nc_ss=7b2a8&oh=00_Af3avINw-4p1hErGNznFL5tWIeJT8dCNDC7FEvAMqCAqDg&oe=69F65804" 
              alt="Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-serif text-xl tracking-widest group-hover:text-orange-500 transition-colors uppercase">Canvas of Dreams</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium uppercase tracking-widest transition-all hover:text-orange-500",
                location.pathname === link.path ? "text-orange-500" : "text-zinc-400"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/booking"
            className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-zinc-950 border-t border-zinc-900 py-8 px-6 flex flex-col space-y-6 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={cn(
                  "text-xl font-serif tracking-tight",
                  location.pathname === link.path ? "text-orange-500" : "text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/booking"
              className="w-full py-4 bg-orange-500 text-white text-center font-bold uppercase tracking-widest"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
