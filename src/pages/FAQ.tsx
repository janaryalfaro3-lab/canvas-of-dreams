import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Scissors, ShieldCheck, HeartPulse, CreditCard, Zap } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Booking",
    question: "How do I book a tattoo session?",
    answer: "You can book directly through our online 'Book Now' form. Provide your idea, size, placement, and preferred artist. Once submitted, we will review your request and get back to you with a quote and available dates."
  },
  {
    category: "Booking",
    question: "Do you offer consultations before booking?",
    answer: "Absolutely. We offer dedicated 'Consultation' appointments where you can discuss your vision with an artist, explore placement options, and get a precise quote. You can book a consultation through our website form."
  },
  {
    category: "Booking",
    question: "Is a deposit required?",
    answer: "Yes, a non-refundable deposit is required to secure your appointment. This deposit goes towards the final price of your tattoo. If you need to reschedule, we require at least 48 hours' notice to transfer your deposit to a new date."
  },
  {
    category: "Pricing",
    question: "How much will my tattoo cost?",
    answer: "Pricing depends on size, complexity, and detail. Our shop minimum is ₱1,200. For larger pieces, artists typically charge by the hour. We can provide a ballpark estimate after reviewing your concept."
  },
  {
    category: "Services",
    question: "Do you offer tattoo removal?",
    answer: "Yes! We use advanced Pico-Laser technology for safe and effective tattoo removal. Sessions start at ₱1,500. We also offer multi-session packages (e.g., 5+1 free) for complete removal or fading for cover-ups."
  },
  {
    category: "Preparation",
    question: "How should I prepare for my appointment?",
    answer: "Get a good night's sleep, stay hydrated, and eat a full meal 1-2 hours before your session. Avoid alcohol 24 hours prior. Wear comfortable clothing that allows easy access to the area being tattooed."
  },
  {
    category: "Aftercare",
    question: "How do I take care of my new tattoo?",
    answer: "Keep the initial bandage on for 2-4 hours. Wash gently with fragrance-free soap. Apply a very thin layer of tattoo-specific ointment or unscented lotion 2-3 times a day. Do not pick, scratch, or submerge in water (pools/baths) for 2 weeks."
  },
  {
    category: "Policies",
    question: "What is your age policy?",
    answer: "You must be at least 18 years old with a valid government-issued ID. We do not tattoo minors, even with parental consent, as per our studio's strict professional standards."
  },
  {
    category: "Policies",
    question: "Can I bring a friend?",
    answer: "While we love supporters, our studio space is limited. We allow one guest per client to ensure the artist has enough space to work comfortably and maintain a sterile environment."
  }
];

const categories = [
  { name: "Booking", icon: <CreditCard size={18} /> },
  { name: "Pricing", icon: <Scissors size={18} /> },
  { name: "Services", icon: <Zap size={18} /> },
  { name: "Preparation", icon: <ShieldCheck size={18} /> },
  { name: "Aftercare", icon: <HeartPulse size={18} /> },
  { name: "Policies", icon: <HelpCircle size={18} /> },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <header className="mb-16 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500"
        >
          Knowledge Base
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-serif text-white"
        >
          Common Queries
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 max-w-2xl mx-auto font-light"
        >
          Everything you need to know before stepping into the canvas. Clarity for your skin's next chapter.
        </motion.p>
      </header>

      <div className="space-y-16">
        {categories.map((cat, catIdx) => (
          <motion.section 
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIdx * 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 border-b border-zinc-800 pb-4">
              <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                {cat.icon}
              </div>
              <h2 className="text-2xl font-serif text-white">{cat.name}</h2>
            </div>

            <div className="space-y-4">
              {faqs.filter(f => f.category === cat.name).map((faq, index) => {
                const globalIndex = faqs.indexOf(faq);
                const isOpen = openIndex === globalIndex;

                return (
                  <div 
                    key={index}
                    className={`group transition-all duration-300 rounded-2xl border ${
                      isOpen ? 'bg-zinc-900 border-zinc-700 shadow-2xl' : 'bg-transparent border-zinc-900 hover:border-zinc-800'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className={`font-medium transition-colors ${isOpen ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                        {faq.question}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-500' : ''}`} 
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 text-zinc-500 font-light leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.section>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 p-12 bg-orange-600 rounded-[3rem] text-center space-y-6 shadow-2xl shadow-orange-900/40"
      >
        <h3 className="text-4xl font-serif text-white">Still have questions?</h3>
        <p className="text-orange-100 max-w-md mx-auto">
          Our artists are always available for a brief consultation to clarify any specific technical concerns.
        </p>
        <div className="flex justify-center">
          <a 
            href="/consultation" 
            className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-all transform hover:scale-105"
          >
            Ask an Artist
          </a>
        </div>
      </motion.div>
    </div>
  );
}
