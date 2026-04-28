import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook } from 'lucide-react';

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
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-20 text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-serif tracking-tighter">The Visionaries</h1>
        <p className="text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">
          Our diverse team represents the pinnacle of modern tattoo artistry. Every artist brings a unique technical mastery and creative vision to the studio.
        </p>
      </header>

      <div className="space-y-32">
        {artists.map((artist, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
          >
            <div className="w-full md:w-1/2 aspect-[4/5] overflow-hidden bg-zinc-900 group relative">
              <img 
                src={artist.image} 
                alt={artist.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute top-6 right-6 flex flex-col space-y-3">
                {artist.instagram && (
                  <a href="#" className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-orange-500 transition-colors">
                    <Instagram size={20} />
                  </a>
                )}
                {artist.facebook && (
                  <a href={artist.facebook} target="_blank" rel="noreferrer" className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-blue-600 transition-colors">
                    <Facebook size={20} />
                  </a>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-8">
              <div className="space-y-4">
                <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.3em]">{artist.role}</span>
                <Link 
                  to={`/gallery?artist=${encodeURIComponent(artist.name)}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  <h2 className="text-5xl font-serif tracking-tight">{artist.name}</h2>
                </Link>
                <h3 className="text-xl text-zinc-400 font-light italic">{artist.specialty}</h3>
              </div>
              
              <p className="text-zinc-500 text-lg leading-relaxed font-light">
                {artist.bio}
              </p>

              {artist.examples && (
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 pt-4">
                  {artist.examples.map((ex, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.02 }}
                      className="aspect-[3/4] bg-zinc-900 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                    >
                      <img 
                        src={ex} 
                        alt="Style example" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer" 
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="pt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link 
                  to={`/gallery?artist=${encodeURIComponent(artist.name)}`}
                  className="px-10 py-5 border border-zinc-700 hover:border-white transition-colors text-xs font-bold uppercase tracking-[0.2em] text-center"
                >
                  View Gallery
                </Link>
                <Link to="/booking" className="px-10 py-5 bg-orange-600 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all text-center">
                  Book Appointment
                </Link>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
