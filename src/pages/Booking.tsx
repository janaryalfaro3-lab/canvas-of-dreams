import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    artist: 'John Harry Alfaro',
    style: 'Polynesian',
    vision: '',
    referenceImage: '',
    preferredDate: '',
    preferredTime: ''
  });

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'fullName') {
      if (value.length < 2) error = 'Name is too short';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = 'Invalid email address';
    } else if (name === 'vision') {
      if (value.length < 10) error = 'Please share more about your vision (min 10 chars)';
    } else if (name === 'preferredDate') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(value);
      if (selectedDate < today) error = 'Date cannot be in the past';
    } else if (name === 'preferredTime') {
      if (!value) error = 'Please select a time';
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 1.5) { // 1.5MB limit for base64 storage
        alert('File is too large. Please select an image under 1.5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, referenceImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation check
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const value = (formData as any)[key];
      if (typeof value === 'string' && key !== 'referenceImage') {
        const fieldIsValid = validateField(key, value);
        if (!fieldIsValid) isValid = false;
      }
    });

    if (!isValid) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    setLoading(true);
    
    try {
      // 1. Save to Firestore
      const path = 'bookings';
      await addDoc(collection(db, path), {
        fullName: formData.fullName,
        email: formData.email,
        artist: formData.artist,
        style: formData.style,
        vision: formData.vision,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        referenceImage: formData.referenceImage, 
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      // 2. Call our API for Email Confirmation
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      setSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'bookings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-20 text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-serif tracking-tighter">Claim Your <span className="italic italic-text-gradient">Space</span></h1>
        <p className="text-zinc-500 max-w-xl mx-auto font-light leading-relaxed">
          Tattoos are permanent, and so is our commitment to perfection. Fill out the form below to begin your consultation process.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Info */}
        <div className="space-y-12">
          {/* ... existing contact info ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-4">
              <Phone className="text-orange-500" size={24} />
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Call Us</h3>
              <p className="text-zinc-500 font-light">09764421242</p>
            </div>
            <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-4">
              <Mail className="text-orange-500" size={24} />
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Email</h3>
              <p className="text-zinc-500 font-light">johnharry.alfaro@gmail.com</p>
            </div>
          </div>

          <div className="p-10 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-8">
            <h3 className="text-2xl font-serif italic text-white leading-relaxed">"Art is the only way to run away without leaving home."</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-orange-500 mt-1 shrink-0" size={20} />
                <div className="space-y-1">
                  <p className="text-white font-medium uppercase tracking-widest text-xs">Our Studio</p>
                  <p className="text-zinc-500 font-light">Central Luzon, Philippines</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="text-orange-500 mt-1 shrink-0" size={20} />
                <div className="space-y-1">
                  <p className="text-white font-medium uppercase tracking-widest text-xs">Working Hours</p>
                  <p className="text-zinc-500 font-light">Open 24 Hours</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex space-x-4">
              <a href="https://www.instagram.com/johnharry_ink" target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 rounded-full hover:bg-orange-500 transition-colors"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/johnharry.alfaro" target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 rounded-full hover:bg-orange-500 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
        </div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-950 border border-zinc-900 p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-3xl rounded-full translate-x-10 -translate-y-10" />
          
          {submitted ? (
            <div className="relative z-10 flex flex-col items-center justify-center py-20 text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
              >
                <CheckCircle2 size={80} className="text-green-500" />
              </motion.div>
              <h2 className="text-3xl font-serif">Inquiry Received</h2>
              <p className="text-zinc-500 max-w-xs mx-auto">Thank you, {formData.fullName}. Our team will review your vision and contact you within 2-3 business days.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-orange-500 text-sm font-bold uppercase tracking-widest border-b border-orange-500 pb-1"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Full Name</label>
                    {errors.fullName && <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.fullName}</span>}
                  </div>
                  <input 
                    required
                    name="fullName"
                    type="text" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full bg-zinc-900 border ${errors.fullName ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors text-zinc-200`} 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Email Address</label>
                    {errors.email && <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.email}</span>}
                  </div>
                  <input 
                    required
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-zinc-900 border ${errors.email ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors text-zinc-200`} 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Preferred Date</label>
                    {errors.preferredDate && <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.preferredDate}</span>}
                  </div>
                  <input 
                    required
                    name="preferredDate"
                    type="date" 
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className={`w-full bg-zinc-900 border ${errors.preferredDate ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors text-zinc-200`} 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Preferred Time</label>
                    {errors.preferredTime && <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.preferredTime}</span>}
                  </div>
                  <input 
                    required
                    name="preferredTime"
                    type="time" 
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className={`w-full bg-zinc-900 border ${errors.preferredTime ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors text-zinc-200`} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Preferred Artist</label>
                  <select 
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors text-zinc-200 appearance-none"
                  >
                    <option>John Harry Alfaro</option>
                    <option>Bellamy Villanueva</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Proposed Style</label>
                  <select 
                    name="style"
                    value={formData.style}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors text-zinc-200 appearance-none"
                  >
                    <option>Realism</option>
                    <option>Polynesian</option>
                    <option>Conceptual</option>
                    <option>Minimalist</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Describe Your Vision (Shop Min. ₱1,200)</label>
                    {errors.vision && <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.vision}</span>}
                  </div>
                  <textarea 
                    required
                    name="vision"
                    rows={4} 
                    value={formData.vision}
                    onChange={handleInputChange}
                    className={`w-full bg-zinc-900 border ${errors.vision ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors text-zinc-200 resize-none`} 
                    placeholder="Tell us about the size, placement, and story behind your piece..."
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Reference Image (Max 1.5MB)</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden" 
                      id="file-upload"
                    />
                    <label 
                      htmlFor="file-upload"
                      className="w-full flex items-center justify-center p-4 bg-zinc-900 border border-dashed border-zinc-800 rounded-xl cursor-pointer group-hover:border-orange-500 transition-colors"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-zinc-500 text-xs">
                          {formData.referenceImage ? 'Image Selected ✓' : 'Click to upload reference'}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

              <div className="pt-4">
                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full py-6 bg-orange-600 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black disabled:bg-zinc-800 disabled:text-zinc-500 transition-all flex items-center justify-center space-x-3 rounded-2xl shadow-lg shadow-orange-900/20"
                >
                  {loading ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest pt-2">Typical response time: 2-3 business days</p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
    </PageTransition>
  );
}

