import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone, ShieldCheck, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-32 pb-12 px-6 relative overflow-hidden">
       {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
        
        {/* Column 1: Branding */}
        <div className="space-y-10">
          <div className="flex items-center space-x-4">
             <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 p-1">
                <img 
                  src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/472457306_122121870752610387_8965074152194860895_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=NU7dA5a41-UQ7kNvwGjqcLi&_nc_oc=AdrdPK2YxeYoUQ87_varUb-Ap6rhyzGDKRrvk6xuFAST5GZiH-34Clccuz2IWCuNBE8&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=kY1Y9yV-LJyNaeGCDm5rNg&_nc_ss=7b2a8&oh=00_Af3avINw-4p1hErGNznFL5tWIeJT8dCNDC7FEvAMqCAqDg&oe=69F65804" 
                  alt="Logo" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-[0.1em] text-white uppercase leading-none">Canvas of Dreams</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] mt-2 opacity-60">High Artistry</span>
              </div>
          </div>
          <p className="text-zinc-500 text-base leading-relaxed max-w-xs font-light">
            Crafting permanent narratives through precision and artistry. A premium sanctuary for self-expression in Central Luzon.
          </p>
          <div className="flex space-x-6">
            {[Instagram, Facebook, Mail].map((Icon, i) => (
              <a key={i} href="#" className="text-zinc-600 hover:text-orange-500 transition-colors duration-500">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Get in Touch */}
        <div className="space-y-10">
          <h3 className="text-white text-xs font-bold uppercase tracking-[0.4em] opacity-50">Atelier</h3>
          <div className="space-y-8">
            <div className="group cursor-pointer">
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] mb-2 group-hover:text-orange-500 transition-colors">Direct Contact</p>
              <p className="text-zinc-300 text-lg font-light tracking-wide italic">0976 442 1242</p>
            </div>
            <div className="group cursor-pointer">
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] mb-2 group-hover:text-orange-500 transition-colors">Inquiries</p>
              <p className="text-zinc-300 text-lg font-light tracking-wide">jaesthetic.info@gmail.com</p>
            </div>
            <div className="group cursor-pointer">
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] mb-2 group-hover:text-orange-500 transition-colors">Location</p>
              <p className="text-zinc-300 text-lg font-light tracking-wide">Xevera Ethel St, Mabalacat</p>
            </div>
          </div>
        </div>

        {/* Column 3: Payments */}
        <div className="space-y-8">
          <h3 className="text-white text-xs font-bold uppercase tracking-[0.3em]">Accepted Payments</h3>
          <p className="text-zinc-500 text-xs leading-relaxed font-light">
            For your convenience and absolute security, we accept multiple payment methods upon service completion.
          </p>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#2a62ff] px-4 py-3 rounded-xl flex items-center space-x-2 text-white font-black italic">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[#2a62ff] text-[10px] not-italic">O</div>
                <span className="tracking-tighter">GCash</span>
              </div>
              <div className="bg-[#00d05c] px-4 py-3 rounded-xl flex items-center space-x-2 text-white font-black italic">
                <div className="w-5 h-5 bg-white rounded-full"></div>
                <span className="tracking-tighter lowercase">maya</span>
              </div>
            </div>
            <div className="bg-[#1e2530] px-4 py-4 rounded-xl flex items-center justify-center space-x-3 text-white">
              <ShieldCheck size={18} className="text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Bank Transfer</span>
            </div>
          </div>
        </div>

        {/* Column 4: Policies */}
        <div className="space-y-8">
          <h3 className="text-white text-xs font-bold uppercase tracking-[0.3em]">Policies</h3>
          <div className="space-y-4">
            <Link to="/aftercare" className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              <span className="text-sm font-light">Cancellation Policy</span>
            </Link>
            <Link to="/booking" className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              <span className="text-sm font-light">Rescheduling</span>
            </Link>
            <Link to="/booking" className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              <span className="text-sm font-light">Deposit Requirements</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        <p>© 2026 Canvas of Dreams Tattoo Studio. Crafted for excellence.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <Link to="/artists" className="hover:text-zinc-400 transition-colors">Artists</Link>
          <Link to="/gallery" className="hover:text-zinc-400 transition-colors">Gallery</Link>
          <Link to="/aftercare" className="hover:text-zinc-400 transition-colors">Aftercare</Link>
        </div>
      </div>
    </footer>
  );
}
