import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, ZoomIn, Info, Database, Sparkles, Loader2, Search, Tag } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { LOGO_URL, FALLBACK_LOGO_URL } from '../constants';
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
    src: 'https://i.pinimg.com/1200x/db/b6/6d/dbb66d51fae48aae261fb577f79cf36b.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Gothic Radiance',
    likesCount: 567,
    tags: ['featured', 'gothic', 'ornamental']
  },
  { 
    category: 'Featured', 
    src: 'https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/472714353_122122735736610387_8414884550725892404_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeErODcp63L71BkAkbfYL6FYHCJbXZUPT7scIltdlQ9Pu_hZmlVm1Y6Gr0gwh8lCAEmEN-ymwt2SW2cTOr0tLzHn&_nc_ohc=dpm0ZYy6AQsQ7kNvwHMD7z5&_nc_oc=AdpZ-tglbMFD4ZJCElDjfb8moOhqAPPed7e_NFaPecpwmgS7HuX-8OJ5vHf2tVzGLvk&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=qgv88yz0ljjCtj8KGSTx0A&_nc_ss=7b2a8&oh=00_Af4_jZbeLpEGlq_IVsTUBJSveRwTFJIQgFSKJNN1XA4BYA&oe=69FB8FDF', 
    artist: 'John Harry Alfaro',
    title: 'Soul Portrait',
    likesCount: 412,
    tags: ['portrait', 'realism', 'soul']
  },
  { 
    category: 'Featured', 
    src: 'https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/472761786_122122735784610387_7339601769517799079_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeG5Me9J5Tm7wPb8SoCKHUwMoN2sq1tHjyCg3ayrW0ePINVcEfdOTb-KUL_Sl78GiLRA5rWrh8Vjj9VEuDE81Klv&_nc_ohc=chHIVF9sAIoQ7kNvwH9OyvM&_nc_oc=Adq8twIfAV-l1VocBS_70rgv4n3v_um3sdAtogdMBSb2H2k-XZmON4jW5NRbaByAxbs&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=-pOcKTRkbdjCtY50Wil76A&_nc_ss=7b2a8&oh=00_Af6AYsgyZs_JdqYNri1aHQdqWM3p8WTuW5YUJ0jPN5-NSw&oe=69FBC7DD', 
    artist: 'John Harry Alfaro',
    title: 'Midnight Bloom',
    likesCount: 523,
    tags: ['bloom', 'dark', 'floral']
  },
  { 
    category: 'Featured', 
    src: 'https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/472753841_122122735796610387_1443509039080581486_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEpR-mxq2JlqDwC7N2eQs9TSHj4bAkT6sNIePhsCRPqw4zoYR7_Z8b1JbLURRENZ7xjc4yiKUzFUM4GKcr6Z58H&_nc_ohc=zxnSz_jdTLQQ7kNvwElaPuv&_nc_oc=AdpcnBOI36h5Ujo1tvKWEjxFnQ7bEHxSwD4nfxvi3Iggx_1tGvyUIgSMGDlrtoga1yQ&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=LTLH3yFIFHVlXzRED5S9aw&_nc_ss=7b2a8&oh=00_Af5LOMuT_CYvil6App0601eMfpdqwhKuHk9Ly0A9ASojoQ&oe=69FCB74C', 
    artist: 'John Harry Alfaro',
    title: 'Divine Symmetry II',
    likesCount: 389,
    tags: ['divine', 'symmetry', 'sacred']
  },
  { 
    category: 'Polynesian', 
    src: 'https://scontent.fmnl17-1.fna.fbcdn.net/v/t39.30808-6/472756725_122122735760610387_553627506437421880_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGZ4lhwdAcENoiRkVyyhLanTBHkWx1t0BVMEeRbHW3QFcludnmtI0e62PP9dmRf9-Ym_yKAYmn3OreNFGhEFDKP&_nc_ohc=NvV1LHHohxMQ7kNvwHEkjAo&_nc_oc=AdqesNSRAWVAduyveZngjOTT8LYjrUC3DYqXrYbCT4tt-fvrGDc6k5YK3wekN87D5TM&_nc_zt=23&_nc_ht=scontent.fmnl17-1.fna&_nc_gid=Gr2-_ljKa9x-UuEGz2dMFA&_nc_ss=7b2a8&oh=00_Af5jl6IKE7YgzqhgMtG5iT6QMhvrmb6JTVpfl0a5h0JQfQ&oe=69FB7656', 
    artist: 'John Harry Alfaro',
    title: 'Oceanic Flow',
    likesCount: 278,
    tags: ['polynesian', 'wave', 'blue']
  },
  { 
    category: 'Conceptual', 
    src: 'https://scontent.fmnl17-7.fna.fbcdn.net/v/t39.30808-6/472752436_122122735904610387_2482383672124914614_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeE429OobjFBoTuymsZBPyskr3-pkz_D5Wavf6mTP8PlZh1-_l5v6i4fuWnOXq_UGLBm0KrJzc6cNnjHuPX0pU1q&_nc_ohc=9neB2EhPn6MQ7kNvwGUIbdE&_nc_oc=AdpOBv0bAIt9nffk5PsYblCcVal1exfzld6pos5ADF7Pgcpp9AyHchdD-HX5BGPrs8U&_nc_zt=23&_nc_ht=scontent.fmnl17-7.fna&_nc_gid=ZZCksp78LJqwfKXDLV4f_g&_nc_ss=7b2a8&oh=00_Af7mldxIlqduV2RSOCqLygzw-o7UfD6eKFpvT3_gomCkOg&oe=69FBC6AD', 
    artist: 'John Harry Alfaro',
    title: 'Ethereal Forest',
    likesCount: 195,
    tags: ['forest', 'nature', 'conceptual']
  },
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
    category: 'Featured', 
    src: 'https://i.pinimg.com/736x/75/6d/d0/756dd0f7f019b711dd1124841cddfc8d.jpg', 
    artist: 'John Harry Alfaro',
    title: 'Divine Oracle',
    likesCount: 204,
    tags: ['divine', 'oracle', 'spirituality']
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
    category: 'Minimalist', 
    src: 'https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/472696051_122122735424610387_5483764940073228930_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFQrvf2YZnuFRG6ZvguGoWM8hzevPTnq4TyHN689OerhNZhQQz8vNrL6oEEvwq4XvODSvxQWxQpNOk4Uw_iBNVp&_nc_ohc=8XBwIy8OQtUQ7kNvwFgHi0b&_nc_oc=Adr1Jyllr1L80r6_YISTzcM5T__8_MLS45blkxTe2w_Wk0tMSFtZBfv0oG00dO7hJcI&_nc_zt=23&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=oXKtttUvk8aUr0-XBDdPIA&_nc_ss=7b2a8&oh=00_Af77w8_P6m-4NvsWdVQfQv5FlHMVeNizpNFby7rN5s4RBQ&oe=69FBC33F', 
    artist: 'Bellamy Villanueva',
    title: 'Silent Whisper',
    likesCount: 156,
    tags: ['minimalist', 'whisper', 'fine-line']
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
    category: 'Minimalist', 
    src: 'https://i.pinimg.com/736x/d0/75/1b/d0751be9e2442d53e64138296ba4519f.jpg', 
    artist: 'Bellamy Villanueva',
    title: 'Inner Peace',
    likesCount: 112,
    tags: ['peace', 'symbol', 'minimalist']
  },
  { 
    category: 'Minimalist', 
    src: 'https://i.pinimg.com/736x/05/1a/78/051a780e6a1bb2ee14641e92547fafb8.jpg', 
    artist: 'Bellamy Villanueva',
    title: 'Ethereal Lines',
    likesCount: 85,
    tags: ['lines', 'ethereal', 'delicate']
  }
];

function ImageWithPlaceholder({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
          <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-16 h-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-orange-500/10 border-t-orange-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 bg-orange-500/20 rounded-full blur-sm"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-1 bg-white/5 rounded-full overflow-hidden"
            >
              <motion.div 
                animate={{ x: [-100, 100] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-full bg-orange-500/50"
              />
            </motion.div>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} transition-all duration-1000 ease-out`}
        onLoad={() => setIsLoaded(true)}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    </div>
  );
}

export default function Gallery() {
  const [logoSrc, setLogoSrc] = useState(LOGO_URL);
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
    <PageTransition>
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
          <div className="relative flex items-center bg-zinc-950/50 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 focus-within:border-orange-500/50 transition-all shadow-[0_0_20px_0_rgba(249,115,22,0.05)]">
            <Search className="text-orange-500/50 group-focus-within:text-orange-500 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search by element (rose, skull, geometric, etc.)..."
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
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.6), 0 18px 36px -18px rgba(0, 0, 0, 0.7)"
                }}
                className="group relative aspect-[3/4] bg-zinc-900 rounded-[2rem] overflow-hidden shadow-xl transition-all duration-700 cursor-zoom-in border border-zinc-800 hover:border-zinc-700 hover:z-10"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <ImageWithPlaceholder
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                </div>
                
                {/* Logo Watermark */}
                {!item.hideWatermark && (
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-full overflow-hidden border border-white/20 opacity-40 group-hover:opacity-80 transition-opacity duration-700 mixture-blend-overlay">
                    <img 
                      src={logoSrc} 
                      alt="Logo Watermark" 
                      className="w-full h-full object-cover grayscale brightness-200"
                      referrerPolicy="no-referrer"
                      onError={() => {
                        if (logoSrc !== FALLBACK_LOGO_URL) {
                          setLogoSrc(FALLBACK_LOGO_URL);
                        }
                      }}
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
                          <>
                            {/* Main Floating Heart */}
                            <motion.div
                              initial={{ opacity: 1, y: 0, scale: 1 }}
                              animate={{ opacity: 0, y: -70, scale: 2.5, rotate: [0, 20, -20, 0] }}
                              exit={{ opacity: 0 }}
                              className="absolute -top-4 text-red-500 pointer-events-none z-10"
                            >
                              <Heart size={20} fill="currentColor" />
                            </motion.div>
                            {/* Complex Burst Flourish */}
                            {[...Array(8)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 1, x: 0, y: 0, scale: 0.2 }}
                                animate={{ 
                                  opacity: [1, 1, 0], 
                                  x: Math.cos(i * (Math.PI / 4)) * (Math.random() * 50 + 30), 
                                  y: Math.sin(i * (Math.PI / 4)) * (Math.random() * 50 + 30) - 20,
                                  scale: [0.2, 1.2, 0],
                                  rotate: Math.random() * 360 
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute top-2 pointer-events-none z-0"
                              >
                                {i % 2 === 0 ? (
                                  <Heart size={Math.random() * 8 + 4} className="text-red-400" fill="currentColor" />
                                ) : (
                                  <Sparkles size={Math.random() * 10 + 6} className="text-orange-400" fill="currentColor" />
                                )}
                              </motion.div>
                            ))}
                            {/* Outer Pulse Wave */}
                            <motion.div
                              initial={{ opacity: 0.5, scale: 0.8 }}
                              animate={{ opacity: 0, scale: 2.5 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0 rounded-full bg-red-500/30 pointer-events-none"
                            />
                          </>
                        )}
                      </AnimatePresence>

                      <motion.div
                        whileTap={{ scale: 0.6 }}
                        animate={sessionLikes.has(item.id) ? {
                          scale: [1, 1.4, 1],
                          rotate: [0, 10, -10, 0],
                          transition: { duration: 0.4, ease: "backOut" }
                        } : item.likesCount > 50 ? {
                          scale: [1, 1.1, 1],
                          filter: ["drop-shadow(0 0 0px rgba(239, 68, 68, 0))", "drop-shadow(0 0 12px rgba(239, 68, 68, 0.4))", "drop-shadow(0 0 0px rgba(239, 68, 68, 0))"],
                        } : {}}
                        transition={item.likesCount > 50 && !sessionLikes.has(item.id) ? {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        } : {}}
                        className={`p-3 backdrop-blur-md rounded-full transition-all duration-300 relative overflow-hidden ${
                          sessionLikes.has(item.id)
                            ? 'bg-red-500 text-white border border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]'
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
                    src={logoSrc} 
                    alt="Watermark" 
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      if (logoSrc !== FALLBACK_LOGO_URL) {
                        setLogoSrc(FALLBACK_LOGO_URL);
                      }
                    }}
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
    </PageTransition>
  );
}
