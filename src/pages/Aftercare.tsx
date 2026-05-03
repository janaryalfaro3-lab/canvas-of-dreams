import { motion } from 'motion/react';
import { ShieldCheck, Droplets, Sun, Wind, CheckCircle2 } from 'lucide-react';

const guidelines = [
  {
    title: "The First 24 Hours",
    icon: <ShieldCheck className="text-orange-500" />,
    tips: [
      "Keep the bandage on for 2-4 hours as instructed by your artist.",
      "Wash your hands thoroughly before touching your new tattoo.",
      "Wash the tattoo gently with warm water and fragrance-free antibacterial soap.",
      "Pat dry with a clean paper towel—do not rub."
    ]
  },
  {
    title: "Cleaning & Moisturizing",
    icon: <Droplets className="text-orange-500" />,
    tips: [
      "Apply a very thin layer of recommended ointment (e.g., Aquaphor) for the first 3 days.",
      "After day 3, switch to a fragrance-free, dye-free lotion.",
      "Cleanse 2-3 times daily, but don't over-moisturize.",
      "Avoid using petroleum jelly (Vaseline) or heavy creams."
    ]
  },
  {
    title: "Things to Avoid",
    icon: <Sun className="text-orange-500" />,
    tips: [
      "NO swimming, hot tubs, or long baths for at least 2-3 weeks.",
      "NO direct sunlight or tanning beds. Sun exposure kills fresh ink.",
      "NO picking or scratching the scabs. Let them fall off naturally.",
      "NO tight clothing that might rub against the tattoo."
    ]
  }
];

const products = [
  { name: "Dial Gold", category: "Cleanser", detail: "Fragrance-free antibacterial soap." },
  { name: "Aquaphor", category: "Ointment", detail: "Apply sparingly for the first few days." },
  { name: "Lubriderm Daily Moisture", category: "Lotion", detail: "Best for the peeling stage." },
  { name: "Sunscreen (SPF 50+)", category: "Protection", detail: "ONLY after the tattoo is fully healed." }
];

export default function Aftercare() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-20 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500"
        >
          Healing Guide
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-serif text-white"
        >
          Aftercare
        </motion.h1>
        <p className="text-zinc-500 max-w-2xl mx-auto font-light">
          Your tattoo is a permanent investment. The first two weeks are critical for color retention and detail.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {guidelines.map((guide, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-950 border border-zinc-900 p-10 rounded-[2.5rem] relative group"
          >
            <div className="mb-6 p-4 bg-zinc-900 rounded-2xl inline-block group-hover:bg-orange-600/20 transition-colors">
              {guide.icon}
            </div>
            <h3 className="text-2xl font-serif text-white mb-6">{guide.title}</h3>
            <ul className="space-y-4">
              {guide.tips.map((tip, j) => (
                <li key={j} className="flex items-start space-x-3">
                  <CheckCircle2 size={16} className="text-orange-500 mt-1 shrink-0" />
                  <span className="text-zinc-400 text-sm font-light leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <section className="bg-orange-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">Recommended Products</h2>
            <p className="text-black/70 mb-8 max-w-md">We trust these supplies for Central Luzon's climate. Using the wrong product can cause irritation or fading.</p>
            <button className="bg-black text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all rounded-xl">
              Shop Studio Essentials
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <div key={i} className="bg-white/90 backdrop-blur p-6 rounded-2xl space-y-2 border border-black/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">{p.category}</span>
                <h4 className="font-bold text-black">{p.name}</h4>
                <p className="text-xs text-zinc-500 uppercase tracking-tighter">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 p-10 md:p-16 bg-red-950/20 border border-red-500/10 rounded-[3rem] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <ShieldCheck size={200} className="text-red-500" />
        </div>
        <div className="max-w-4xl space-y-10 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif text-red-500">Signs of Infection</h2>
            <p className="text-zinc-500 font-light text-lg">
              While minor redness and swelling are normal for the first 48 hours, be vigilant for the following symptoms:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" /> Normal Healing
              </h4>
              <ul className="space-y-2 text-sm text-zinc-500 font-light">
                <li>• Mild redness & slight warmth</li>
                <li>• Clear or slightly ink-colored weeping</li>
                <li>• Itching and peeling (like a sunburn)</li>
                <li>• Localized tenderness</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-red-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" /> Seek Medical Help If:
              </h4>
              <ul className="space-y-2 text-sm text-zinc-400 font-light">
                <li>• Increasing intense pain or throbbing</li>
                <li>• Foul-smelling greenish or yellowish discharge</li>
                <li>• Spreading red streaks from the tattoo area</li>
                <li>• High fever, chills, or generally feeling unwell</li>
                <li>• Excessive swelling or hard, painful lumps</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-red-500/10">
            <p className="text-xs text-zinc-600 uppercase tracking-[0.2em] italic">
              *If you experience any of these symptoms, contact your artist immediately and consult a physician. Do not attempt to treat a suspected infection yourself.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
