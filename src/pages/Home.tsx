import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Palette, Zap, Eraser, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { VIDEO_HERO, VIDEO_PROCESS } from '../constants';

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const testimonials = [
    { name: "Roberto G. de Leon", role: "Business Owner", text: "Sobra akong bilib sa detail ng tattoo ko. I wanted something that represents my business journey, and they delivered perfectly. Professional ang environment at napakalinis. Satisfied talaga ako." },
    { name: "Arch. Clariss B. Mendoza", role: "Architect", text: "As an architect, I'm very particular with lines and symmetry. Canvas of Dreams surpassed my expectations. Very minimal yet very powerful yung execution. Hands down to the artist." },
    { name: "Atty. Ferdinand P. Santos", role: "Legal Consultant", text: "I was hesitant at first because of my profession, but the artists here are very respectful of my preference for discreet pieces. Subtle details but with great meaning. Sulit ang travel." },
    { name: "Dr. Elizabeth L. Reyes", role: "Medical Professional", text: "I had a laser removal for an old mistake. Smooth ang process at hindi kasing sakit ng inaakala ko. Nakita ko yung progress after just two sessions. High-end equipment talaga." },
    { name: "Engr. Antonio V. Cruz", role: "Project Manager", text: "The consultation was top-notch. Hindi lang sila basta tattoo shop, they really care about the story behind the ink. Nag-suggest sila ng improvements sa design ko na lalong nagpaganda." },
    { name: "Prof. Remedios M. Tolentino", role: "Academic Specialist", text: "Beautiful experience for a first-timer like me. They explained everything clearly—from the stencil until the aftercare. Very comforting and the studio vibes are just right." }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <PageTransition>
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
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-5xl md:text-7xl font-serif">Our Philosophy</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto font-light">The pillars that define the Canvas of Dreams experience.</p>
          </div>
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

      {/* Testimonials Section */}
      <section className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2"
            >
              Testimonials
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-serif">Voices of the <span className="italic italic-text-gradient">Dreamers</span></h2>
            <p className="text-zinc-500 max-w-2xl mx-auto font-light italic">"Tunay na kwento mula sa mga taong nagtiwala sa aming sining."</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons */}
            <div className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 z-20">
              <button 
                onClick={prevSlide}
                className="p-4 rounded-full bg-zinc-900/50 border border-white/5 text-zinc-500 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-md"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 z-20">
              <button 
                onClick={nextSlide}
                className="p-4 rounded-full bg-zinc-900/50 border border-white/5 text-zinc-500 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-md"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Testimonial Card */}
            <div className="relative h-[450px] md:h-[400px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={{
                    enter: (direction: number) => ({
                      x: direction > 0 ? 100 : -100,
                      opacity: 0,
                      scale: 0.95
                    }),
                    center: {
                      zIndex: 1,
                      x: 0,
                      opacity: 1,
                      scale: 1
                    },
                    exit: (direction: number) => ({
                      zIndex: 0,
                      x: direction < 0 ? 100 : -100,
                      opacity: 0,
                      scale: 0.95
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 }
                  }}
                  className="absolute inset-0 p-8 md:p-16 rounded-[3rem] bg-zinc-950 border border-zinc-900 flex flex-col justify-between group"
                >
                  <div className="absolute top-10 right-10 text-orange-500/10 group-hover:text-orange-500/20 transition-colors pointer-events-none">
                    <Star size={120} />
                  </div>

                  <div className="space-y-8 relative z-10">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} size={16} className="fill-orange-500 text-orange-500" />
                      ))}
                    </div>
                    <p className="text-zinc-300 font-light leading-relaxed text-2xl md:text-3xl italic font-serif">
                      "{testimonials[activeIndex].text}"
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/5 flex items-center space-x-6 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-500 font-serif text-2xl">
                      {testimonials[activeIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg uppercase tracking-[0.2em]">{testimonials[activeIndex].name}</h4>
                      <p className="text-zinc-600 text-[10px] uppercase tracking-widest">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-12 space-x-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i === activeIndex 
                      ? 'bg-orange-500 w-8' 
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialization Section - Tattoo Removal & Packages */}
      <section className="py-32 px-6 bg-[#080808] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            <div className="lg:w-1/3 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                <Sparkles size={12} className="text-orange-500" />
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em]">Pico-Laser Center</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif text-white leading-tight">
                Clear Your <br/>
                <span className="italic text-orange-500">Canvas</span>
              </h2>
              <p className="text-zinc-500 font-light text-lg pb-4">
                Regret is temporary; our laser technology is permanent. We offer the most advanced Pico-Laser removal in Central Luzon, designed specifically for diverse skin types.
              </p>
              <Link to="/consultation" className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest text-xs group">
                Free Consultation <ArrowRight size={14} className="text-orange-500 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Package 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 rounded-[2rem] bg-zinc-950 border border-zinc-900 space-y-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap size={80} className="text-orange-500" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <Zap size={20} className="text-orange-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">Flash Session</h3>
                  <p className="text-3xl font-serif italic text-orange-500">starts at ₱1,500</p>
                </div>
                <ul className="space-y-3 text-zinc-500 font-light text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-500" />
                    Ideal for small tattoos (2x2)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-500" />
                    Pico-Laser Technology
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-500" />
                    Minimal downtime
                  </li>
                </ul>
              </motion.div>

              {/* Package 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 rounded-[2rem] bg-zinc-950 border border-orange-500/30 space-y-6 relative overflow-hidden group shadow-[0_0_40px_-15px_rgba(249,115,22,0.2)]"
              >
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase">Best Value</div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <Eraser size={20} className="text-orange-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">Clear Canvas Bundle</h3>
                  <p className="text-3xl font-serif italic text-orange-500">₱7,500 <span className="text-xs text-zinc-600 line-through italic ml-2">₱9,000</span></p>
                </div>
                <ul className="space-y-3 text-zinc-500 font-light text-sm">
                  <li className="flex items-center gap-2 text-zinc-300">
                    <div className="w-1 h-1 rounded-full bg-orange-500" />
                    <strong>5 Sessions + 1 FREE</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-500" />
                    Advanced ink shattering
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-500" />
                    Personalized healing plan
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Inviting Intermission - Replaces Cinema Reel */}
      <section className="py-40 px-6 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full" />
        
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full"
          >
            <ShieldCheck size={14} className="text-orange-500" />
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Where Art Meets Trust</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-8xl font-serif text-white leading-tight">
            Every ink has a <br />
            <span className="italic text-orange-500 font-medium">Soul.</span>
          </h2>
          
          <p className="text-zinc-500 text-xl font-light leading-relaxed max-w-3xl mx-auto">
            At Canvas of Dreams, we believe a tattoo is more than just pigment on skin. It's a dialogue between your history and our artistry. We've created a space that feels like home, where your vision is honored and your safety is paramount.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8">
            {[
              { label: 'Studio Minimum', val: '₱1,200' },
              { label: 'Artists', val: '04 Masters' },
              { label: 'Experience', val: '12+ Years' },
              { label: 'Location', val: 'Tarlac, PH' }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-1">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none">{stat.label}</p>
                <p className="text-lg font-serif text-white">{stat.val}</p>
              </div>
            ))}
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
              <Link to="/consultation" className="inline-block px-12 py-6 bg-orange-600 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
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
    </PageTransition>
  );
}
