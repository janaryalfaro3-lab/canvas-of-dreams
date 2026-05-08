import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { VIDEO_HERO, LOGO_URL, FALLBACK_LOGO_URL } from '../constants';

const artists = [
  {
    name: "John Harry Alfaro",
    role: "Studio Founder & Master Artist",
    specialty: "Polynesian & Conceptual Tattoo",
    bio: "A master of symbolic narratives and traditional island motifs. John Harry Alfaro blends the ancestral power of Polynesian patterns with modern conceptual storytelling, creating permanent masterpieces that serve as personal talismans of identity and strength.",
    image: "https://scontent.fmnl17-7.fna.fbcdn.net/v/t39.30808-6/470700164_3213328448806992_4745657577688027158_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=dWt55pc66VgQ7kNvwFDpypb&_nc_oc=AdqaUMb3AqFeY1rbfQrPXjDETZJI6rVQZ4m02G9mAeSSsXLANPA48H5jghybwbry8IE&_nc_zt=23&_nc_ht=scontent.fmnl17-7.fna&_nc_gid=MIBwAMeJJmbj4m0E70SSdw&_nc_ss=7b2a8&oh=00_Af3IzL4x06ySfjK3WGOogQob8VT5TVx5KWO4Dg2kAsDsaQ&oe=69F65AEF",
    instagram: "@johnharry_ink",
    facebook: "https://www.facebook.com/johnharry.alfaro/",
    examples: [
      "https://i.pinimg.com/1200x/cd/7d/90/cd7d90f7916ab819cd3ada38971039a0.jpg",
      "https://i.pinimg.com/1200x/c2/a8/66/c2a8667c372c0ef351cc5e1446ae1db0.jpg"
    ]
  },
  {
    name: "Bellamy Villanueva",
    role: "Resident Artist",
    specialty: "Minimalist Tattoo",
    bio: "Specializing in the elegance of simplicity. Bellamy believes that the most powerful stories are often told through the smallest details, focusing on precise linework and meaningful minimalism.",
    image: "https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/608154095_122158315316804719_1448763432396392077_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=CSKxhOStX7MQ7kNvwHUSgh3&_nc_oc=AdoQkdcL9ZYq9p1J9mblK1WLt75StTxtRoGyYZ7rP63fYpItIP9S87HHg6B9JX76moY&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=4tUmjP6dcIiSKDNZQM8qqw&_nc_ss=7b2a8&oh=00_Af31tZrVkMWXYAO-bcqEqvT5i95AEXBui0HSTspzWlY9iw&oe=69F6416E",
    instagram: "@bellamy_minimalist",
    examples: [
      "https://i.pinimg.com/736x/30/bd/83/30bd83c469dee8210854aeab11904743.jpg",
      "https://i.pinimg.com/736x/d9/6b/4f/d96b4f07a58e700d87a2c14141614ac0.jpg"
    ]
  }
];

export default function Artists() {
  const [logoSrc, setLogoSrc] = useState(LOGO_URL);

  return (
    <PageTransition>
      <div className="relative">
      {/* Background Video for Artists Page */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src={VIDEO_HERO.local} type="video/mp4" />
          <source src={VIDEO_HERO.remote} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-zinc-950/70" />
      </div>

      <div className="relative z-10 pt-48 pb-24 px-6 max-w-7xl mx-auto">
        <header className="mb-32 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-px h-24 bg-gradient-to-b from-transparent via-orange-500 to-transparent mx-auto mb-8"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-[10rem] font-serif tracking-tighter leading-none"
          >
            The <span className="italic font-light opacity-50">Visionaries</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 max-w-xl mx-auto font-light leading-relaxed tracking-wide text-lg"
          >
            A collective of master artisans dedicated to the craft of permanent storytelling at Canvas of Dreams.
          </motion.p>
        </header>

        <div className="space-y-64">
          {artists.map((artist, idx) => (
            <motion.section 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}
            >
              <div className="w-full md:w-[45%] aspect-[4/5] overflow-hidden bg-zinc-900 group relative rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover transition-all duration-[2s] ease-out scale-100 group-hover:scale-110 brightness-75 group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute top-10 right-10 flex flex-col space-y-4 z-20">
                  {artist.instagram && (
                    <a href="#" className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl">
                      <Instagram size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="w-full md:w-[55%] space-y-12">
                <div className="space-y-6 text-left">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-px bg-orange-500" />
                    <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.4em]">{artist.role}</span>
                  </div>
                  <Link 
                    to={`/gallery?artist=${encodeURIComponent(artist.name)}`}
                    className="hover:text-orange-500 transition-colors block group/title"
                  >
                    <h2 className="text-6xl md:text-8xl font-serif tracking-tighter leading-none group-hover/title:translate-x-2 transition-transform duration-500">{artist.name}</h2>
                  </Link>
                  <h3 className="text-xl text-zinc-400 font-light italic tracking-wide">{artist.specialty}</h3>
                </div>
                
                <p className="text-zinc-500 text-xl leading-relaxed font-light text-left max-w-lg">
                  {artist.bio}
                </p>

                {artist.examples && (
                  <div className="grid grid-cols-2 gap-6 pt-4 max-w-md">
                    {artist.examples.map((ex, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="aspect-[3/4] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl relative group/ex border border-white/5"
                      >
                        <img 
                          src={ex} 
                          alt="Style example" 
                          className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover/ex:grayscale-0 group-hover/ex:opacity-100 group-hover/ex:scale-110" 
                          referrerPolicy="no-referrer" 
                          loading="lazy"
                        />
                        
                        {/* Logo Watermark */}
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full overflow-hidden border border-white/10 opacity-20 group-hover/ex:opacity-60 transition-opacity duration-500 pointer-events-none">
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
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="pt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
                  <Link 
                    to={`/gallery?artist=${encodeURIComponent(artist.name)}`}
                    className="px-12 py-6 bg-zinc-900 border border-white/10 hover:border-white transition-all text-[10px] font-bold uppercase tracking-[0.3em] text-center rounded-full"
                  >
                    View Portfolio
                  </Link>
                  <Link 
                    to="/booking" 
                    className="px-12 py-6 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all text-center rounded-full shadow-[0_20px_50px_-10px_rgba(234,88,12,0.3)]"
                  >
                    Book Artist
                  </Link>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
