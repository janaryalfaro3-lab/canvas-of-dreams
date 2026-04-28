import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone, ShieldCheck, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05070a] border-t border-zinc-900 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        
        {/* Column 1: Branding */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
             <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-800">
                <img 
                  src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/472457306_122121870752610387_8965074152194860895_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=NU7dA5a41-UQ7kNvwGjqcLi&_nc_oc=AdrdPK2YxeYoUQ87_varUb-Ap6rhyzGDKRrvk6xuFAST5GZiH-34Clccuz2IWCuNBE8&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=kY1Y9yV-LJyNaeGCDm5rNg&_nc_ss=7b2a8&oh=00_Af3avINw-4p1hErGNznFL5tWIeJT8dCNDC7FEvAMqCAqDg&oe=69F65804" 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-widest text-white uppercase leading-none">Canvas of Dreams</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mt-1">Tattoo Atelier</span>
              </div>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs font-light">
            Premium custom tattoo artistry delivered with absolute precision. We transform skin into a canvas of eternal narratives and masterwork designs.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-orange-600 hover:text-white transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-orange-600 hover:text-white transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-orange-600 hover:text-white transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.83.11V9.42a6.33 6.33 0 0 0-1.83-.26 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V6.27a8.27 8.27 0 0 0 4.43 1.28V4.1a5.35 5.35 0 0 1-3.66-1.41l-.01.01z"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Get in Touch */}
        <div className="space-y-8">
          <h3 className="text-white text-xs font-bold uppercase tracking-[0.3em]">Get in Touch</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4 group">
              <div className="p-2 bg-zinc-900/50 rounded-lg text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Phone size={18} />
              </div>
              <span className="text-zinc-400 text-sm mt-1 uppercase font-bold tracking-tighter">0976 442 1242</span>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="p-2 bg-zinc-900/50 rounded-lg text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Mail size={18} />
              </div>
              <span className="text-zinc-400 text-sm mt-1 font-bold lowercase tracking-tighter">jaesthetic.info@gmail.com</span>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="p-2 bg-zinc-900/50 rounded-lg text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-zinc-400 text-sm font-bold uppercase tracking-tight">Shop: Xevera Ethel St, Mabalacat</p>
                <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest mt-1">Mobile: Pampanga & Tarlac</p>
              </div>
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
