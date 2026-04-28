import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, ZoomIn, Info } from 'lucide-react';

const categories = ['All', 'Polynesian', 'Conceptual', 'Minimalist'];
const artistsList = ['All Artists', 'John Harry Alfaro', 'Bellamy Villanueva'];

const artistSpecialties: Record<string, string> = {
  'John Harry Alfaro': 'Polynesian & Conceptual Tattoos',
  'Bellamy Villanueva': 'Minimalist Lines & Symbolic Dotwork'
};

const galleryItemsData = [
  { 
    id: 1, 
    category: 'Polynesian', 
    src: 'https://i.pinimg.com/736x/50/cf/5f/50cf5f487fb05aaf1e75250fdc9f47a2.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Ancestral Flow'
  },
  { 
    id: 3, 
    category: 'Conceptual', 
    src: 'https://i.pinimg.com/1200x/e4/1a/14/e41a14475941ae62d4273ff4621e0e55.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Surreal Vision'
  },
  { 
    id: 4, 
    category: 'Polynesian', 
    src: 'https://i.pinimg.com/736x/89/d2/10/89d210a7873fd3a21e8a2db27416351c.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Tribal Spirit'
  },
  { 
    id: 5, 
    category: 'Minimalist', 
    src: 'https://i.pinimg.com/736x/80/29/b3/8029b34632f0014816cda79d43cd2c94.jpg', 
    artist: 'Bellamy Villanueva',
    title: 'Symbolic Dot'
  },
  { 
    id: 6, 
    category: 'Conceptual', 
    src: 'https://i.pinimg.com/736x/1e/9d/fc/1e9dfcea8122c544f1a2040f8c868553.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Dream Narrative'
  },
  { 
    id: 7, 
    category: 'Polynesian', 
    src: 'https://i.pinimg.com/736x/fe/63/9a/fe639a543e3a2e009e77949f7258dfe0.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Warrior Mark'
  },
  { 
    id: 8, 
    category: 'Minimalist', 
    src: 'https://i.pinimg.com/736x/fe/cb/52/fecb522b01727b98e1f743a7b450c6b6.jpg', 
    artist: 'Bellamy Villanueva',
    title: 'Essence'
  },
  {
    id: 9,
    category: 'Polynesian',
    src: 'https://i.pinimg.com/736x/d3/df/35/d3df353837d7453459eadce09884ae9b.jpg',
    artist: 'John Harry Alfaro',
    title: 'Modern Tribal'
  },
  {
    id: 10,
    category: 'Minimalist',
    src: 'https://i.pinimg.com/736x/ae/1b/a4/ae1ba47edad52915262c04b145f6f842.jpg',
    artist: 'Bellamy Villanueva',
    title: 'Botanical Geometry'
  },
  {
    id: 11,
    category: 'Conceptual',
    src: 'https://i.pinimg.com/736x/cf/c5/c2/cfc5c224f43e143b0ed0069a1d0c7d03.jpg',
    artist: 'John Harry Alfaro',
    title: 'Oceanic Dream'
  },
  {
    id: 12,
    category: 'Polynesian',
    src: 'https://i.pinimg.com/736x/46/03/04/460304ee60872f8df38d0ff341a75ac6.jpg',
    artist: 'John Harry Alfaro',
    title: 'Mana Link'
  },
  {
    id: 13,
    category: 'Minimalist',
    src: 'https://i.pinimg.com/1200x/56/61/e0/5661e0f713b1d6781d7f9c07cfda1a25.jpg',
    artist: 'Bellamy Villanueva',
    title: 'Celestial Point'
  },
  {
    id: 14,
    category: 'Conceptual',
    src: 'https://i.pinimg.com/1200x/18/47/60/18476064463e896479083e348c961c0c.jpg',
    artist: 'John Harry Alfaro',
    title: 'Eclipse of Heart'
  }
];

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeArtist, setActiveArtist] = useState('All Artists');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof galleryItemsData[0] | null>(null);
  const [likes, setLikes] = useState<Record<number, number>>({
    1: 42, 3: 56, 4: 89, 5: 34, 6: 72, 7: 45, 8: 63, 9: 12, 10: 95, 11: 34, 12: 78, 13: 156, 14: 88
  });

  useEffect(() => {
    const artistParam = searchParams.get('artist');
    if (artistParam && artistsList.includes(artistParam)) {
      setActiveArtist(artistParam);
    }
    const styleParam = searchParams.get('style');
    if (styleParam && categories.includes(styleParam)) {
      setActiveCategory(styleParam);
    }
  }, [searchParams]);

  // Simulate loading on filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeCategory, activeArtist]);

  const handleLike = (id: number) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const filteredItems = galleryItemsData.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesArtist = activeArtist === 'All Artists' || item.artist === activeArtist;
    return matchesCategory && matchesArtist;
  });

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-16 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500"
        >
          Visual Journal
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-serif text-white"
        >
          Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 max-w-2xl mx-auto font-light"
        >
          Explore our collection of masterworks. Each piece is a unique collaboration between artist and soul.
        </motion.p>
      </header>

      <div className="space-y-8 mb-20">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <div key={category} className="relative group/filter">
              <button
                onClick={() => {
                  setActiveCategory(category);
                  setSearchParams(prev => {
                    const newParams = new URLSearchParams(prev);
                    if (category === 'All') newParams.delete('style');
                    else newParams.set('style', category);
                    return newParams;
                  });
                }}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === category 
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' 
                    : 'bg-zinc-900 text-zinc-500 hover:text-white border border-zinc-800'
                }`}
              >
                {category}
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-zinc-800 text-[10px] text-white rounded-lg opacity-0 group-hover/filter:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Filter by {category} style
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {artistsList.map((artist) => (
            <div key={artist} className="relative group/filter">
              <button
                onClick={() => {
                  setActiveArtist(artist);
                  setSearchParams(prev => {
                    const newParams = new URLSearchParams(prev);
                    if (artist === 'All Artists') newParams.delete('artist');
                    else newParams.set('artist', artist);
                    return newParams;
                  });
                }}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeArtist === artist 
                    ? 'bg-white text-black shadow-lg shadow-white/10' 
                    : 'bg-zinc-900 text-zinc-500 hover:text-white border border-zinc-800'
                }`}
              >
                {artist}
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-zinc-800 text-[10px] text-white rounded-lg opacity-0 group-hover/filter:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                View works by {artist}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-[3rem]"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-2 border-orange-500/20 border-t-orange-600 rounded-full animate-spin" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500">Curating...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          layout
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-opacity duration-300 ${isLoading ? 'opacity-30' : 'opacity-100'}`}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  y: -15,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(234, 88, 12, 0.25)"
                }}
                className="group relative aspect-[3/4] bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 cursor-zoom-in"
                onClick={() => setSelectedImage(item)}
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/10">
                    <ZoomIn size={18} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">{item.category}</span>
                      <h3 className="text-white text-xl font-serif leading-tight">{item.title}</h3>
                      
                      <div className="relative group/tooltip inline-block pt-1">
                        <Link 
                          to={`/artists?artist=${encodeURIComponent(item.artist)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center space-x-1.5 pointer-events-auto"
                        >
                          <span className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/20 hover:border-orange-500 transition-all">
                            {item.artist}
                          </span>
                          <Info size={10} className="text-zinc-500" />
                        </Link>
                        
                        <div className="absolute bottom-full left-0 mb-3 w-48 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl scale-0 group-hover/tooltip:scale-100 transition-transform origin-bottom-left z-50 pointer-events-none">
                          <p className="text-[10px] text-orange-500 font-bold uppercase tracking-[0.2em] mb-2">Resident Artist</p>
                          <p className="text-[11px] text-white font-light leading-relaxed">
                            Specializing in {artistSpecialties[item.artist]}.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(item.id);
                      }}
                      className="flex flex-col items-center space-y-1 group/heart relative"
                    >
                      <motion.div
                        whileTap={{ scale: 1.8, rotate: [0, -15, 15, 0] }}
                        animate={likes[item.id] > 50 ? {
                          scale: [1, 1.1, 1],
                          filter: ["drop-shadow(0 0 0px rgba(239, 68, 68, 0))", "drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))", "drop-shadow(0 0 0px rgba(239, 68, 68, 0))"],
                        } : {}}
                        transition={likes[item.id] > 50 ? {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                        className={`p-3 backdrop-blur-md rounded-full transition-all duration-300 relative overflow-hidden ${
                          likes[item.id] > 50 
                            ? 'bg-red-500/20 text-red-500 border border-red-500/30' 
                            : 'bg-white/10 hover:bg-white hover:text-red-500 border border-white/10'
                        }`}
                      >
                        <motion.div 
                          initial={{ x: '-100%' }}
                          whileTap={{ x: '100%' }}
                          transition={{ duration: 0.5, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                        />
                        
                        <Heart 
                          size={18} 
                          fill={likes[item.id] > 0 ? "currentColor" : "none"} 
                          className={likes[item.id] > 50 ? "animate-pulse" : ""}
                        />
                      </motion.div>
                      <motion.span 
                        key={likes[item.id]}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`text-[10px] font-bold transition-colors ${likes[item.id] > 50 ? 'text-red-500' : 'text-white'}`}
                      >
                        {likes[item.id]}
                      </motion.span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-10 right-10 p-4 bg-zinc-900/50 hover:bg-zinc-800 text-white rounded-full transition-all z-[110] border border-white/10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center pointer-events-none"
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)] pointer-events-auto border border-zinc-800"
                referrerPolicy="no-referrer"
              />
              <div className="mt-10 text-center pointer-events-auto bg-black/40 backdrop-blur-lg p-8 rounded-3xl border border-white/5 max-w-xl">
                <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
                  {selectedImage.category}
                </span>
                <h2 className="text-4xl font-serif text-white mb-3 leading-tight">{selectedImage.title}</h2>
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-bold">Artist:</span>
                  <span className="text-white uppercase tracking-widest text-[11px] font-bold border-b border-orange-500/50">
                    {selectedImage.artist}
                  </span>
                </div>
                <p className="mt-4 text-zinc-400 text-xs italic font-light">
                   "{artistSpecialties[selectedImage.artist]}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
