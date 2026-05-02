import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, ZoomIn, Info, Database, Sparkles, Loader2, Search, Tag } from 'lucide-react';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  increment, 
  addDoc, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { getTattooInspiration } from '../services/geminiService';

const categories = ['All'];
const artistsList = ['All Artists', 'John Harry Alfaro', 'Bellamy Villanueva'];

const artistSpecialties: Record<string, string> = {
  'John Harry Alfaro': 'Polynesian & Conceptual Tattoos',
  'Bellamy Villanueva': 'Minimalist Lines & Symbolic Dotwork'
};

interface GalleryItem {
  id: string;
  category: string;
  src: string;
  artist: string;
  title: string;
  likesCount: number;
  hideWatermark?: boolean;
  tags?: string[];
}

const fallbackItems = [
  { 
    category: 'Featured', 
    src: 'https://i.pinimg.com/1200x/8f/c0/4f/8fc04f9d284aaa8e7b31acfa7d909727.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Divine Symmetry',
    likesCount: 124,
    tags: ['geometric', 'symmetry', 'sacred']
  },
  { 
    category: 'Polynesian', 
    src: 'https://i.pinimg.com/736x/50/cf/5f/50cf5f487fb05aaf1e75250fdc9f47a2.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Ancestral Flow',
    likesCount: 42,
    tags: ['polynesian', 'tribal', 'waves']
  },
  { 
    category: 'Conceptual', 
    src: 'https://i.pinimg.com/1200x/e4/1a/14/e41a14475941ae62d4273ff4621e0e55.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Surreal Vision',
    likesCount: 56,
    tags: ['conceptual', 'surreal', 'eye']
  },
  { 
    category: 'Polynesian', 
    src: 'https://i.pinimg.com/736x/89/d2/10/89d210a7873fd3a21e8a2db27416351c.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Tribal Spirit',
    likesCount: 89,
    tags: ['polynesian', 'armband', 'culture']
  },
  { 
    category: 'Minimalist', 
    src: 'https://i.pinimg.com/736x/80/29/b3/8029b34632f0014816cda79d43cd2c94.jpg', 
    artist: 'Bellamy Villanueva',
    title: 'Symbolic Dot',
    likesCount: 34,
    tags: ['minimalist', 'dotwork', 'fine-line']
  },
  { 
    category: 'Conceptual', 
    src: 'https://i.pinimg.com/736x/1e/9d/fc/1e9dfcea8122c544f1a2040f8c868553.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Dream Narrative',
    likesCount: 72,
    tags: ['narrative', 'skull', 'flower']
  },
  { 
    category: 'Featured', 
    src: 'https://i.pinimg.com/736x/28/ef/91/28ef91dfba14800eee72a9682a913ab5.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Midnight Elegance',
    likesCount: 88,
    tags: ['blackwork', 'night', 'ornamental']
  },
  { 
    category: 'Polynesian', 
    src: 'https://i.pinimg.com/1200x/e1/ed/19/e1ed19979c8d1ffdf117e7e9a90caf39.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Celestial Flow',
    likesCount: 156,
    tags: ['celestial', 'stars', 'polynesian']
  },
  { 
    category: 'Conceptual', 
    src: 'https://i.pinimg.com/1200x/61/4e/4e/614e4ee096373524eb07a87a5af6212f.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Shadow Realm',
    likesCount: 94,
    tags: ['shadow', 'dark', 'portrait']
  },
  { 
    category: 'Minimalist', 
    src: 'https://i.pinimg.com/736x/d0/75/1b/d0751be9e2442d53e64138296ba4519f.jpg', 
    artist: 'Bellamy Villanueva',
    title: 'Inner Peace',
    likesCount: 112,
    tags: ['peace', 'symbol', 'minimalist']
  },
  { 
    category: 'Featured', 
    src: 'https://i.pinimg.com/736x/75/6d/d0/756dd0f7f019b711dd1124841cddfc8d.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Divine Oracle',
    likesCount: 204,
    tags: ['divine', 'oracle', 'spirituality']
  },
  { 
    category: 'Minimalist', 
    src: 'https://i.pinimg.com/736x/05/1a/78/051a780e6a1bb2ee14641e92547fafb8.jpg', 
    artist: 'Bellamy Villanueva',
    title: 'Ethereal Lines',
    likesCount: 85,
    tags: ['lines', 'ethereal', 'delicate']
  },
  { 
    category: 'Conceptual', 
    src: 'https://i.pinimg.com/1200x/89/9a/7b/899a7b96f80e9f1ed723ab8d55fa6060.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Obsidian Dream',
    likesCount: 134,
    tags: ['obsidian', 'black', 'dream']
  },
  { 
    category: 'Featured', 
    src: 'https://scontent.fcrk1-2.fna.fbcdn.net/v/t39.30808-6/472815714_122122735376610387_5727645778687684071_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=spIW-dfJTt8Q7kNvwF8q89t&_nc_oc=AdqjQe246eOhJdsSQOFvoqBAYap_ki5U7y4SPe7j1lsS4IBjMJaPjWEhV0k9DkXMANI&_nc_zt=23&_nc_ht=scontent.fcrk1-2.fna&_nc_gid=IUkM58KpI7paVCh4Sg4Ppg&_nc_ss=7b2a8&oh=00_Af4moWqdTKP4HNxAO0px9cOEM_DvTvlJGR9OJ8DpqF57wA&oe=69FB9742', 
    artist: 'John Harry Alfaro',
    title: 'Sacred Mark I',
    likesCount: 189,
    hideWatermark: true,
    tags: ['sacred', 'mark', 'ink']
  },
  { 
    category: 'Polynesian', 
    src: 'https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/472756725_122122735760610387_553627506437421880_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=iWRs_YCDGroQ7kNvwGeZB1f&_nc_oc=AdpFw6EMn2ATkW8f0XaVHPyR3yPWrKUu0CIxQroNZCWmvPyvAUbW6VR1blSXoSHU22k&_nc_zt=23&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=4hqMWzAsHzdoIP9EliOSLg&_nc_ss=7b2a8&oh=00_Af6nO2Kg_ii0LHwrggZ2MWooLjSR8wY6EjdPz60J5fcALw&oe=69FB7656', 
    artist: 'John Harry Alfaro',
    title: 'Flow of Life',
    likesCount: 231,
    hideWatermark: true,
    tags: ['flow', 'life', 'polynesian']
  },
  { 
    category: 'Featured', 
    src: 'https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/472714353_122122735736610387_8414884550725892404_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=XUWzHx_1OB4Q7kNvwERr3VW&_nc_oc=AdpfrdPhxGX3oDRGzgCdcPUEQfIOVgJtqDebXtEdm1AaR1Z284PNct1_yiUwQBWLlXk&_nc_zt=23&_nc_ht=scontent.fcrk1-4.fna&_nc_gid=iZDkw-YOlcXMP6i4Fp1_tQ&_nc_ss=7b2a8&oh=00_Af6cBQTm3IqArpg1TY82N9kZgcnpgXUQM1oD3K3_Vw_kRA&oe=69FB8FDF', 
    artist: 'John Harry Alfaro',
    title: 'Ethereal Soul',
    likesCount: 167,
    hideWatermark: true,
    tags: ['soul', 'ethereal', 'portrait']
  },
  { 
    category: 'Minimalist', 
    src: 'https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/472696051_122122735424610387_5483764940073228930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=vffReFsjOJoQ7kNvwE836Gp&_nc_oc=AdrnGTLVCt1iDloLWM4_BPHnsDJQj7mQ_hhX-sBJP8VEsZAUj1Ck8reALaaozKTPF1M&_nc_zt=23&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=PMw0uHRgebpRRVbg_sKroA&_nc_ss=7b2a8&oh=00_Af7DBR7nMHToq-JlYi7xhbd5EUTN_UL9QcfBhab97fLyLA&oe=69FB633F', 
    artist: 'Bellamy Villanueva',
    title: 'Line of Truth',
    likesCount: 142,
    hideWatermark: true,
    tags: ['line', 'truth', 'minimalist']
  },
  { 
    category: 'Featured', 
    src: 'https://scontent.fcrk1-2.fna.fbcdn.net/v/t39.30808-6/472713341_122122735868610387_5056462905182875381_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=j2ahh7eHbV8Q7kNvwHpYaJd&_nc_oc=AdorcTR6u27DkP6OPa8FVAjDfeqWuJTxHBZ7vAeTjETXuJOLQU7l4aPiBBMnYo93n1E&_nc_zt=23&_nc_ht=scontent.fcrk1-2.fna&_nc_gid=TfkuIekO0GRF4GXB5ha7lQ&_nc_ss=7b2a8&oh=00_Af6JSfmhzuxl0rQDijlLnL_IfDco8_1ncqKgtkW3gLPh5Q&oe=69FB61B8', 
    artist: 'John Harry Alfaro',
    title: 'Shadow Work',
    likesCount: 198,
    hideWatermark: true,
    tags: ['shadow', 'work', 'blackwork']
  },
  { 
    category: 'Conceptual', 
    src: 'https://scontent.fcrk1-2.fna.fbcdn.net/v/t39.30808-6/472761052_122122735694610387_2788952220747292480_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=-FIU8hdkVogQ7kNvwHA3oKL&_nc_oc=AdovnNDp7jTT33wm1Ed0C53qLwaXhhnJCa_g2HXwduHE6kW1L6jXBtbrmAHSHpvlTX4&_nc_zt=23&_nc_ht=scontent.fcrk1-2.fna&_nc_gid=uJ0IDvtftaUWokDHnvkXEQ&_nc_ss=7b2a8&oh=00_Af6sjRO-vVJW_d78e16H5Tk4GzhZzPU7lFgiBZcIMMrNKQ&oe=69FB9717', 
    artist: 'John Harry Alfaro',
    title: 'Deep Roots',
    likesCount: 225,
    hideWatermark: true,
    tags: ['roots', 'deep', 'nature']
  },
  { 
    category: 'Featured', 
    src: 'https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/472761786_122122735784610387_7339601769517799079_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=5TLYBQGj-H0Q7kNvwEUlDN1&_nc_oc=AdrUQmuqL0JmqC3Bo8nNLfgJt3_7Ko8gUKUOqmvvE6sG2E-JZydTm3E99b13ergTQ_o&_nc_zt=23&_nc_ht=scontent.fcrk1-1.fna&_nc_gid=t5R90rgV1HwYs0bo2GMlBw&_nc_ss=7b2a8&oh=00_Af4758RnauOxNQw9QVNP9LlxK_bm0CyLHNs8euaswHB01w&oe=69FB67DD', 
    artist: 'John Harry Alfaro',
    title: 'Eternal Ink',
    likesCount: 312,
    hideWatermark: true,
    tags: ['eternal', 'ink', 'legacy']
  }
];

function ImageWithPlaceholder({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-zinc-800">
      {!isLoaded && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-shimmer" 
               style={{ backgroundSize: '1000px 100%', animation: 'shimmer 2s infinite linear' }} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
        onLoad={() => setIsLoaded(true)}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    </div>
  );
}

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeArtist, setActiveArtist] = useState('All Artists');
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isInsightLoading, setIsInsightLoading] = useState(false);
  const [sessionLikes, setSessionLikes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (selectedImage) {
      setAiInsight(null);
    }
  }, [selectedImage]);

  const handleGetInsight = async () => {
    if (!selectedImage) return;
    setIsInsightLoading(true);
    try {
      const insight = await getTattooInspiration(
        selectedImage.title,
        selectedImage.category,
        selectedImage.artist
      );
      setAiInsight(insight || "No specific details found for this piece.");
    } catch (error) {
      setAiInsight("Unable to connect with the oracle. Please try again later.");
    } finally {
      setIsInsightLoading(false);
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'gallery_items'), orderBy('createdAt', 'desc'));
    
    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const galleryItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GalleryItem[];
        setItems(galleryItems);
      }
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'gallery_items');
      setIsLoading(false);
    });

    return () => {
      unsubscribeSnapshot();
    };
  }, []);

  const archiveItems = items.length > 0 ? items : fallbackItems.map((item, idx) => ({ ...item, id: `fallback-${idx}` })) as GalleryItem[];

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

  // Filters
  const filteredItems = archiveItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesArtist = activeArtist === 'All Artists' || item.artist === activeArtist;
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchLower) ||
      item.artist.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower)));

    return matchesCategory && matchesArtist && matchesSearch;
  });

  const handleLike = async (itemId: string) => {
    if (sessionLikes.has(itemId)) return;
    
    setSessionLikes(prev => new Set(prev).add(itemId));

    try {
      const itemRef = doc(db, 'gallery_items', itemId);
      await updateDoc(itemRef, {
        likesCount: increment(1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `gallery_items/${itemId}`);
      // Revert local like if it failed
      setSessionLikes(prev => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-24 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-px h-24 bg-gradient-to-b from-transparent via-orange-500 to-transparent mx-auto mb-8"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 bg-zinc-950/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500"
        >
          Visual Journal
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl md:text-[10rem] font-serif text-white tracking-tighter leading-none"
        >
          Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 max-w-xl mx-auto font-light leading-relaxed tracking-wide text-lg pt-4"
        >
          A curated exhibition of our masterworks. Each captured frame represents a soul translated into permanent art.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto mt-12 relative group"
        >
          <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full transition-all group-focus-within:bg-orange-500/10" />
          <div className="relative flex items-center bg-zinc-950/50 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 focus-within:border-orange-500/50 transition-all">
            <Search className="text-zinc-500 mr-4" size={20} />
            <input 
              type="text"
              placeholder="Search by element (e.g. skull, geometric, floral)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-white w-full text-sm font-light tracking-wide placeholder:text-zinc-600"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>
      </header>

      <div className="space-y-8 mb-32 flex justify-center">
        <div className="flex flex-wrap justify-center gap-4">
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
                className={`px-10 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                  activeArtist === artist 
                    ? 'bg-white text-black shadow-[0_20px_50px_rgba(255,255,255,0.1)]' 
                    : 'bg-zinc-950/50 text-zinc-500 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {artist}
              </button>
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
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    delay: index * 0.05,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1] 
                  }
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.01,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)"
                }}
                className="group relative aspect-[3/4] bg-zinc-900 rounded-[2rem] overflow-hidden shadow-xl transition-all duration-700 cursor-zoom-in border border-zinc-800 hover:border-zinc-700"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <ImageWithPlaceholder
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                </div>
                
                {/* Logo Watermark */}
                {!item.hideWatermark && (
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-full overflow-hidden border border-white/20 opacity-40 group-hover:opacity-80 transition-opacity duration-700 mixture-blend-overlay">
                    <img 
                      src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/472457306_122121870752610387_8965074152194860895_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=NU7dA5a41-UQ7kNvwGjqcLi&_nc_oc=AdrdPK2YxeYoUQ87_varUb-Ap6rhyzGDKRrvk6xuFAST5GZiH-34Clccuz2IWCuNBE8&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=kY1Y9yV-LJyNaeGCDm5rNg&_nc_ss=7b2a8&oh=00_Af3avINw-4p1hErGNznFL5tWIeJT8dCNDC7FEvAMqCAqDg&oe=69F65804" 
                      alt="Logo Watermark" 
                      className="w-full h-full object-cover grayscale brightness-200"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/10">
                    <ZoomIn size={18} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8 translate-y-2 group-hover:translate-y-0 text-left">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">{item.category}</span>
                      <h3 className="text-white text-xl font-serif leading-tight">{item.title}</h3>
                      
                      {item.tags && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[8px] text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full tracking-[0.1em] uppercase">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="relative group/tooltip inline-block pt-3">
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
                      <AnimatePresence>
                        {sessionLikes.has(item.id) && (
                          <motion.div
                            initial={{ opacity: 1, y: 0, scale: 1 }}
                            animate={{ opacity: 0, y: -40, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-4 text-red-500 pointer-events-none z-10"
                          >
                            <Heart size={20} fill="currentColor" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div
                        whileTap={{ scale: 0.8 }}
                        animate={sessionLikes.has(item.id) ? {
                          scale: [1, 1.3, 1],
                          transition: { duration: 0.3 }
                        } : item.likesCount > 50 ? {
                          scale: [1, 1.1, 1],
                          filter: ["drop-shadow(0 0 0px rgba(239, 68, 68, 0))", "drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))", "drop-shadow(0 0 0px rgba(239, 68, 68, 0))"],
                        } : {}}
                        transition={item.likesCount > 50 && !sessionLikes.has(item.id) ? {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                        className={`p-3 backdrop-blur-md rounded-full transition-all duration-300 relative overflow-hidden ${
                          sessionLikes.has(item.id)
                            ? 'bg-red-500 text-white border border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                            : item.likesCount > 50 
                              ? 'bg-red-500/20 text-red-500 border border-red-500/30' 
                              : 'bg-white/10 hover:bg-white hover:text-red-500 border border-white/10'
                        }`}
                      >
                        <Heart 
                          size={18} 
                          fill={sessionLikes.has(item.id) || item.likesCount > 0 ? "currentColor" : "none"} 
                        />
                      </motion.div>
                      <motion.span 
                        key={item.likesCount}
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`text-[10px] font-bold transition-colors ${item.likesCount > 50 || sessionLikes.has(item.id) ? 'text-red-500' : 'text-white'}`}
                      >
                        {item.likesCount}
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
              
              {/* Lightbox Watermark */}
              {!selectedImage.hideWatermark && (
                <div className="absolute top-8 left-8 w-16 h-16 rounded-full overflow-hidden border border-white/10 opacity-30 pointer-events-none">
                  <img 
                    src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/472457306_122121870752610387_8965074152194860895_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=NU7dA5a41-UQ7kNvwGjqcLi&_nc_oc=AdrdPK2YxeYoUQ87_varUb-Ap6rhyzGDKRrvk6xuFAST5GZiH-34Clccuz2IWCuNBE8&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=kY1Y9yV-LJyNaeGCDm5rNg&_nc_ss=7b2a8&oh=00_Af3avINw-4p1hErGNznFL5tWIeJT8dCNDC7FEvAMqCAqDg&oe=69F65804" 
                    alt="Watermark" 
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

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

                {selectedImage.tags && (
                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {selectedImage.tags.map(tag => (
                      <span key={tag} className="flex items-center space-x-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-zinc-400 font-bold uppercase tracking-widest hover:text-orange-500 hover:border-orange-500/30 transition-colors cursor-pointer" onClick={() => {
                        setSearchTerm(tag);
                        setSelectedImage(null);
                      }}>
                        <Tag size={10} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-zinc-400 text-xs italic font-light">
                   "{artistSpecialties[selectedImage.artist]}"
                </p>

                <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                  {!aiInsight ? (
                    <button
                      onClick={handleGetInsight}
                      disabled={isInsightLoading}
                      className="group/ai flex items-center space-x-3 px-8 py-3 bg-zinc-900 hover:bg-orange-600 border border-zinc-800 hover:border-orange-500 text-zinc-400 hover:text-white rounded-2xl transition-all duration-300 disabled:opacity-50 mx-auto"
                    >
                      {isInsightLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Sparkles size={16} className="group-hover/ai:animate-pulse" />
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {isInsightLoading ? 'Consulting Gemini...' : 'Tattoo Inspiration'}
                      </span>
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-left bg-orange-500/5 p-6 rounded-2xl border border-orange-500/10"
                    >
                      <div className="flex items-center space-x-2 mb-3 text-orange-500">
                        <Sparkles size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Oracle Insights</span>
                      </div>
                      <p className="text-zinc-300 text-xs font-light leading-relaxed font-serif italic">
                        {aiInsight}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
