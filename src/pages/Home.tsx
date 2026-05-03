import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Centralized Video Assets
  const VIDEO_HERO = {
    local: "/202605021041.mp4",
    remote: "https://raw.githubusercontent.com/janaryalfaro3-lab/canvas-of-dreams/main/202605021041.mp4"
  };
  const VIDEO_SAMURAI = {
    local: "/samurai_featured.mp4",
    remote: "https://raw.githubusercontent.com/janaryalfaro3-lab/canvas-of-dreams/main/From%20KlickPin%20CF%20Creative%20Tattoo%20Trends%20_%20Inspiring%20Ideas%20%26%20Designs%20%5BVideo%5D%20_%20Samurai%20tattoo%20Tattoo%20sleeve%20men%20Tattoos%20for%20guys%20-%20Pin-11540542793294778.mp4"
  };
  const VIDEO_PROCESS = {
    local: "/202605021600.mp4",
    remote: "https://raw.githubusercontent.com/janaryalfaro3-lab/canvas-of-dreams/main/202605021600.mp4"
  };

  return (
    <div className="relative overflow-hidden selection:bg-orange-500/30">
      {/* Global Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 px-6 overflow-hidden bg-[#0a0a0a]">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover brightness-125 contrast-110"
          >
            <source src={VIDEO_HERO.local} type="video/mp4" />
            <source src={VIDEO_HERO.remote} type="video/mp4" />
            <source src={VIDEO_HERO.remote.replace('/main/', '/main/public/')} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
          
          {/* Intense Glow Highlights for "Bright" feel */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/20 blur-[160px] rounded-full pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-600/15 blur-[160px] rounded-full pointer-events-none" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex flex-col items-center space-y-4 mb-4">
              <motion.span 
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.4em" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-orange-500 text-[10px] md:text-xs font-bold uppercase block"
              >
                Established 2018
              </motion.span>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="px-4 py-1.5 bg-zinc-950/40 backdrop-blur-md border border-white/10 rounded-full"
              >
                <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest text-center">Shop Min: ₱1,200</span>
              </motion.div>
            </div>
            <h1 className="text-7xl md:text-9xl font-serif tracking-tighter leading-[0.85] text-white">
              Canvas of <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 font-medium">Dreams</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
            >
              Premium custom tattooing in Central Luzon. We don't just ink; we translate dreams into permanent masterpieces.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative flex flex-col md:flex-row items-center justify-center pt-4"
          >
            {/* 3D Background Effect behind the button */}
            <motion.div 
              style={{ x: springX, y: springY }}
              className="absolute inset-0 -z-10 pointer-events-none"
            >
              <motion.div
                animate={{ 
                  rotateZ: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]"
              >
                <div className="w-full h-full border border-orange-500/20 rounded-full opacity-20 blur-sm" />
                <div className="absolute inset-4 border border-orange-500/10 rounded-full opacity-10 blur-[1px]" />
                <div className="absolute inset-12 border border-zinc-500/10 rounded-full opacity-5" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  rotateZ: [360, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
              >
                <div className="w-full h-full border-[0.5px] border-white/5 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-20" />
              </motion.div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 blur-[120px] rounded-full" />
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500/10 blur-[150px] rounded-full opacity-50" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-500/10 blur-[150px] rounded-full opacity-50" />
          </motion.div>

            <Link 
              to="/booking" 
              className="group relative px-12 py-5 overflow-hidden transition-all duration-500 transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-white transition-transform duration-500 group-hover:bg-orange-600" />
              <span className="relative z-10 text-black group-hover:text-white font-bold uppercase tracking-[0.2em] text-sm flex items-center gap-2">
                Begin Your Journey
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { icon: Palette, title: "Artistic Vision", text: "Every tattoo is a collaboration. Our artists spend time understanding your vision before a single needle touches the skin." },
              { icon: ShieldCheck, title: "Unmatched Hygiene", text: "Medical-grade sterilization and the highest quality single-use equipment. Your health is as important as the art." },
              { icon: Star, title: "Premier Experience", text: "From the consultation to the final reveal, we provide a comfortable, professional, and inspiring environment." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="space-y-6 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-orange-500/50 transition-colors duration-500">
                  <item.icon className="text-orange-500" size={28} />
                </div>
                <h3 className="text-2xl font-serif text-white">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-light text-left">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Art in Motion (Cinema Reel) */}
      <section className="py-32 px-6 bg-[#050505] relative overflow-hidden border-y border-white/5">
        {/* Ambient Glows */}
        <div className="absolute -top-64 -left-64 w-[800px] h-[800px] bg-orange-500/5 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-64 -right-64 w-[800px] h-[800px] bg-orange-600/5 blur-[180px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-8">
            <div className="max-w-2xl text-center md:text-left space-y-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                className="h-1 bg-orange-500 mb-6 mx-auto md:mx-0"
              />
              <h2 className="text-6xl md:text-8xl font-serif tracking-tighter text-white leading-tight">
                Cinema <br />
                <span className="text-orange-500 italic">of Ink</span>
              </h2>
              <p className="text-zinc-400 font-light text-xl leading-relaxed">
                Capturing the soul of every masterpiece through high-definition motion.
              </p>
            </div>
            <div className="hidden md:block">
               <div className="w-px h-32 bg-gradient-to-b from-orange-500 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Samurai Masterpiece (Large) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group rounded-[3rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_50px_-12px_rgba(249,115,22,0.3)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105 brightness-125 contrast-105"
                >
                  <source src={VIDEO_SAMURAI.local} type="video/mp4" />
                  <source src={VIDEO_SAMURAI.remote} type="video/mp4" />
                  <source src={VIDEO_SAMURAI.remote.replace('/main/', '/main/public/')} type="video/mp4" />
                </video>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10">
                <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter mb-4 inline-block">Featured</span>
                <h3 className="text-3xl font-serif text-white">The Samurai Legacy</h3>
              </div>
            </motion.div>

            {/* Side Reel - Grid within Grid or Separate Cards */}
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-xl"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover brightness-110 group-hover:scale-105 transition-transform duration-700"
                >
                  <source src={VIDEO_PROCESS.local} type="video/mp4" />
                  <source src={VIDEO_PROCESS.remote} type="video/mp4" />
                  <source src={VIDEO_PROCESS.remote.replace('/main/', '/main/public/')} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-6 left-6">
                   <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                     <span className="text-[10px] text-white font-bold uppercase tracking-widest">Live Studio Session</span>
                   </div>
                </div>
              </motion.div>

              <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm space-y-4">
                <h4 className="text-2xl font-serif text-white">Digital Mastery</h4>
                <p className="text-zinc-500 font-light leading-relaxed">
                  Every video is a testament to our dedication. We document the journey from the first trace to the final heal, ensuring your story is captured in every dimension.
                </p>
                <button className="text-orange-500 font-bold uppercase tracking-widest text-xs py-2 hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                  Explore Full Archive <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Teaser */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif">The Masters</h2>
              <p className="text-zinc-500 max-w-xl font-light">Meet the visionaries behind the ink. Each with a unique style and over a decade of experience.</p>
            </div>
            <Link to="/artists" className="text-orange-500 font-bold uppercase tracking-widest text-sm hover:text-white transition-colors border-b border-orange-500 pb-2">View All Artists</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                name: 'John Harry Alfaro', 
                specialty: 'Polynesian & Conceptual', 
                img: 'https://scontent.fmnl17-7.fna.fbcdn.net/v/t39.30808-6/470700164_3213328448806992_4745657577688027158_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=dWt55pc66VgQ7kNvwFDpypb&_nc_oc=AdqaUMb3AqFeY1rbfQrPXjDETZJI6rVQZ4m02G9mAeSSsXLANPA48H5jghybwbry8IE&_nc_zt=23&_nc_ht=scontent.fmnl17-7.fna&_nc_gid=MIBwAMeJJmbj4m0E70SSdw&_nc_ss=7b2a8&oh=00_Af3IzL4x06ySfjK3WGOogQob8VT5TVx5KWO4Dg2kAsDsaQ&oe=69F65AEF'
              },
              { 
                name: 'Bellamy Villanueva', 
                specialty: 'Minimalist Tattoo', 
                img: 'https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/608154095_122158315316804719_1448763432396392077_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=CSKxhOStX7MQ7kNvwHUSgh3&_nc_oc=AdoQkdcL9ZYq9p1J9mblK1WLt75StTxtRoGyYZ7rP63fYpItIP9S87HHg6B9JX76moY&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=4tUmjP6dcIiSKDNZQM8qqw&_nc_ss=7b2a8&oh=00_Af31tZrVkMWXYAO-bcqEqvT5i95AEXBui0HSTspzWlY9iw&oe=69F6416E'
              }
            ].map((artist, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="relative group cursor-pointer overflow-hidden aspect-[4/5]"
              >
                <img 
                  src={artist.img} 
                  alt={artist.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-10 left-10 space-y-2">
                  <h4 className="text-3xl font-serif text-white">{artist.name}</h4>
                  <p className="text-orange-500 uppercase tracking-widest text-xs font-bold">{artist.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Accreditations */}
      <section className="py-24 px-6 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif">Awards & Recognition</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto font-light">Certified excellence and participation in the world's most prestigious tattoo conventions.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "https://www.worldtattooevents.com/wp-content/uploads/2025/09/Dutdutan-Tattoo-Convention-2025.jpg",
              "https://www.worldtattooevents.com/wp-content/uploads/2026/04/2026-The-Richmond-Tattoo-Arts-Convention.jpg",
              "https://imgs.search.brave.com/aOWLSXXSGiLN-L56lIrYGsUia93_75fyCFzeUQi6TMU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kOTg0/NDQ0OC5kZWxpdmVy/eS5yb2NrZXRjZG4u/bWUvd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMTAvMjAxMi1k/dXQtMTk5eDI2NS5q/cGc",
              "https://imgs.search.brave.com/YShV0CFu8Ty773dtyixl-hztsqx58qRLheZQeE7ORO8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kOTg0/NDQ0OC5kZWxpdmVy/eS5yb2NrZXRjZG4u/bWUvd3AtY29udGVu/dC91cGxvYWRzLzIw/MTkvMDkvZHV0ZHV0/YW4tdGF0dG9vLWNv/bnZlbnRpb24tNy0x/OTl4MjQ5LmpwZw"
            ].map((img, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="aspect-[3/4] bg-zinc-900 overflow-hidden rounded-lg shadow-2xl border border-zinc-800"
              >
                <img 
                  src={img} 
                  alt={`Convention Certificate ${idx + 1}`} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-zinc-950 border border-zinc-900 p-16 md:p-32 rounded-3xl text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <img 
              src="https://imgs.search.brave.com/nFOK8eja_io2nJUnbK9mP0MFgQSSLkMVHiZWnYsoRkk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/dmludGFnZS10YXR0/b29zLWNvbG9yZnVs/LXNlYW1sZXNzLXBh/dHRlcm5fMjI1MDA0/LTE0MDQuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MA" 
              className="w-full h-full object-cover grayscale"
              alt="Background pattern"
            />
          </div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tight">Ready to tell your story?</h2>
            <p className="text-zinc-500 text-lg md:text-xl font-light">Join our waitlist for a custom consultation with one of our artists.</p>
            <div className="pt-8">
              <Link to="/booking" className="inline-block px-12 py-6 bg-orange-600 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Pattern Bottom Banner */}
      <section className="h-[500px] relative overflow-hidden border-t border-zinc-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70 brightness-110 transition-all duration-[2s]"
        >
          <source src={VIDEO_PROCESS.local} type="video/mp4" />
          <source src={VIDEO_PROCESS.remote} type="video/mp4" />
          <source src={VIDEO_PROCESS.remote.replace('/main/', '/main/public/')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="text-4xl md:text-6xl font-serif tracking-widest uppercase opacity-40">Canvas Artistry</div>
            <div className="w-24 h-px bg-orange-500/50" />
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.5em] font-bold">The Journey Continues</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
