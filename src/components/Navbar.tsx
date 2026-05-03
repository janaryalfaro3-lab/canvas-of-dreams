import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'Artists', path: '/artists' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Aftercare', path: '/aftercare' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Consult', path: '/consultation' },
    { name: 'Booking', path: '/booking' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 py-6",
        scrolled ? "bg-black/60 backdrop-blur-2xl border-b border-white/5 py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-4 group">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-orange-500/50 transition-all duration-500 shadow-2xl">
            <img 
              src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/472457306_122121870752610387_8965074152194860895_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=NU7dA5a41-UQ7kNvwGjqcLi&_nc_oc=AdrdPK2YxeYoUQ87_varUb-Ap6rhyzGDKRrvk6xuFAST5GZiH-34Clccuz2IWCuNBE8&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=kY1Y9yV-LJyNaeGCDm5rNg&_nc_ss=7b2a8&oh=00_Af3avINw-4p1hErGNznFL5tWIeJT8dCNDC7FEvAMqCAqDg&oe=69F65804" 
              alt="Logo" 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-[0.2em] group-hover:text-orange-500 transition-colors uppercase leading-none">Canvas of Dreams</span>
            <span className="text-[9px] text-zinc-500 uppercase tracking-[0.4em] mt-1.5 opacity-60">Tattoo Atelier</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:text-white relative group",
                location.pathname === link.path ? "text-white" : "text-zinc-500"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-px bg-orange-500 transition-all duration-500 group-hover:w-full",
                location.pathname === link.path ? "w-full" : "w-0"
              )} />
            </Link>
          ))}
          
          <div className="flex items-center pl-10 border-l border-white/5">
            <Link 
              to="/booking"
              className="px-8 py-3.5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-orange-600 hover:text-white transition-all duration-500 rounded-full shadow-2xl"
            >
              Book Now
            </Link>
          </div>
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
