import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://imgs.search.brave.com/nFOK8eja_io2nJUnbK9mP0MFgQSSLkMVHiZWnYsoRkk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/dmludGFnZS10YXR0/b29zLWNvbG9yZnVs/LXNlYW1sZXNzLXBh/dHRlcm5fMjI1MDA0/LTE0MDQuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MA" 
            alt="Seamless Tattoo Pattern" 
            className="w-full h-full object-cover opacity-15 grayscale scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.4em] block mb-4">Established 2018</span>
            <h1 className="text-6xl md:text-9xl font-serif tracking-tighter leading-none">
              Canvas of <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Dreams</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Premium custom tattooing in the heart of the arts district. We don't just ink; we translate dreams into permanent masterpieces.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 pt-8"
          >
            <Link to="/booking" className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105">
              Begin Your Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <Palette className="text-orange-500" size={32} />
              <h3 className="text-2xl font-serif">Artistic Vision</h3>
              <p className="text-zinc-500 leading-relaxed font-light">
                Every tattoo is a collaboration. Our artists spend time understanding your vision before a single needle touches the skin.
              </p>
            </div>
            <div className="space-y-6">
              <ShieldCheck className="text-orange-500" size={32} />
              <h3 className="text-2xl font-serif">Unmatched Hygiene</h3>
              <p className="text-zinc-500 leading-relaxed font-light">
                Medical-grade sterilization and the highest quality single-use equipment. Your health is as important as the art.
              </p>
            </div>
            <div className="space-y-6">
              <Star className="text-orange-500" size={32} />
              <h3 className="text-2xl font-serif">Premier Experience</h3>
              <p className="text-zinc-500 leading-relaxed font-light">
                From the consultation to the final reveal, we provide a comfortable, professional, and inspiring environment.
              </p>
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
      <section className="h-64 relative overflow-hidden border-t border-zinc-900">
        <img 
          src="https://imgs.search.brave.com/nFOK8eja_io2nJUnbK9mP0MFgQSSLkMVHiZWnYsoRkk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/dmludGFnZS10YXR0/b29zLWNvbG9yZnVs/LXNlYW1sZXNzLXBh/dHRlcm5fMjI1MDA0/LTE0MDQuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MA" 
          alt="Bottom pattern" 
          className="w-full h-full object-cover opacity-10 grayscale"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-12 opacity-40 grayscale brightness-200">
             <div className="text-4xl font-serif tracking-widest uppercase">Canvas Artistry</div>
          </div>
        </div>
      </section>
    </div>
  );
}
