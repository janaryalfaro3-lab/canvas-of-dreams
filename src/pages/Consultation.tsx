import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, MessageSquare, Upload, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

const ARTISTS = [
  { id: 'janary', name: 'Janary Alfaro', specialty: 'Polynesian & Tribal' },
  { id: 'elias', name: 'Elias Thorne', specialty: 'Blackwork & Conceptual' },
  { id: 'maya', name: 'Maya Sterling', specialty: 'Fine Line & Minimalist' }
];

export default function Consultation() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    artistId: '',
    preferredDate: '',
    preferredTime: '',
    visionDescription: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'consultations'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new',
        referenceUrls: [] // In a real app, you'd upload files to Firebase Storage first
      });
      setIsSuccess(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'consultations');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <PageTransition className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-8 p-12 rounded-[2.5rem] bg-zinc-950 border border-orange-500/20 shadow-2xl shadow-orange-500/5">
          <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto border border-orange-500/20">
            <ShieldCheck className="text-orange-500" size={40} />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-serif">Submission Received</h2>
            <p className="text-zinc-500 font-light">
              Your vision has been shared with our studio. One of our artists will review your concept and reach out via email within 24-48 hours.
            </p>
          </div>
          <button 
            onClick={() => setIsSuccess(false)}
            className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors uppercase tracking-widest text-xs"
          >
            Submit Another Vision
          </button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        {/* Left Side: Context */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
              <Sparkles size={12} className="text-orange-500" />
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em]">Craft Your Legacy</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-white leading-none">
              Artist <br />
              <span className="italic text-orange-500">Consultation</span>
            </h1>
            <p className="text-zinc-500 text-xl font-light leading-relaxed max-w-lg">
              This is the first step toward a permanent masterpiece. Share your vision, choose your artist, and let's begin the collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <User size={18} className="text-orange-500" />
              </div>
              <h3 className="font-bold text-white uppercase tracking-wider text-sm">Expert Pairing</h3>
              <p className="text-zinc-500 text-sm font-light">Select the artist whose style resonates most with your desired aesthetic.</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-950 border border-orange-500/20 space-y-4 shadow-xl shadow-orange-500/5">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <ShieldCheck size={18} className="text-orange-500" />
              </div>
              <h3 className="font-bold text-white uppercase tracking-wider text-sm">No Obligations</h3>
              <p className="text-zinc-500 text-sm font-light">Consultations are free. We want to ensure we're the right fit for your art.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-[#0a0a0a] border border-white/5 p-10 md:p-14 rounded-[3rem] shadow-2xl relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 blur-[100px]" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {/* Identity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" />
                  <input 
                    required
                    type="text"
                    placeholder="E.g. Gabriel Santos"
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-orange-500/50 transition-all font-light"
                    value={formData.clientName}
                    onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors text-lg italic font-serif">@</span>
                  <input 
                    required
                    type="email"
                    placeholder="name@email.com"
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-orange-500/50 transition-all font-light"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Artist Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 text-orange-500">Choose Your Master Artist</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ARTISTS.map((artist) => (
                  <button
                    key={artist.id}
                    type="button"
                    onClick={() => setFormData({...formData, artistId: artist.id})}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      formData.artistId === artist.id 
                      ? 'bg-orange-500/10 border-orange-500' 
                      : 'bg-zinc-900/30 border-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <p className={`text-sm font-bold uppercase tracking-wider ${formData.artistId === artist.id ? 'text-orange-500' : 'text-white'}`}>
                      {artist.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest">{artist.specialty}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Preferred Date</label>
                <div className="relative group">
                  <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" />
                  <input 
                    required
                    type="date"
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-orange-500/50 transition-all font-light"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Preferred Time</label>
                <div className="relative group">
                  <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" />
                  <input 
                    required
                    type="time"
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-orange-500/50 transition-all font-light"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Describe Your Vision</label>
              <div className="relative group">
                <MessageSquare size={16} className="absolute left-4 top-5 text-zinc-600 group-focus-within:text-orange-500 transition-colors" />
                <textarea 
                  required
                  placeholder="Tell us about the meaning, placement, and size of your piece..."
                  rows={4}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-orange-500/50 transition-all font-light resize-none"
                  value={formData.visionDescription}
                  onChange={(e) => setFormData({...formData, visionDescription: e.target.value})}
                />
              </div>
            </div>

            {/* Reference Upload */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group border border-dashed border-zinc-800 rounded-2xl p-8 text-center cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/[0.02] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center mx-auto mb-4 border border-zinc-800 group-hover:border-orange-500/20 group-hover:bg-orange-500/10 transition-colors">
                <Upload size={20} className="text-zinc-600 group-hover:text-orange-500 transition-colors" />
              </div>
              <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Share References</h4>
              <p className="text-[10px] text-zinc-600 mt-1 uppercase tracking-widest">Select up to 3 images for inspiration</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple 
                accept="image/*"
              />
            </div>

            {/* Submit */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-5 bg-orange-500 text-white font-bold rounded-[1.5rem] hover:bg-orange-600 active:scale-95 transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:active:scale-100"
            >
              {isSubmitting ? 'Submitting Your Vision...' : (
                <>
                  <span className="uppercase tracking-[0.2em] text-xs">Begin the Collaboration</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            {error && <p className="text-red-500 text-xs text-center font-medium animate-pulse">{error}</p>}
            
            <p className="text-[10px] text-zinc-600 text-center uppercase tracking-widest">
              By submitting, you agree to our <span className="text-zinc-400 underline cursor-pointer">consultation terms</span>
            </p>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
