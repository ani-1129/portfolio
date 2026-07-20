import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { testimonialsData as defaultTestimonials } from '../data/testimonialsData';
import { Sparkles, Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const { content } = usePortfolio();
  const testimonialsData = Array.isArray(content.testimonials) && content.testimonials.length > 0
    ? content.testimonials : defaultTestimonials;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!testimonialsData.length) return;
    const timer = setInterval(() => setCurrentIndex(prev => (prev + 1) % testimonialsData.length), 6000);
    return () => clearInterval(timer);
  }, [testimonialsData.length]);

  if (!testimonialsData.length) return null;

  const item = testimonialsData[currentIndex] || testimonialsData[0];

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: 'var(--dark-bg, #05070D)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.04) 0%, transparent 60%)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="section-label mb-4 mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Peer &amp; Mentor Feedback</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            Recommendations &amp; <span className="mint-gradient-text">Testimonials</span>
          </h2>
        </div>

        <div
          className="relative p-8 sm:p-12 rounded-[28px] overflow-hidden min-h-[280px] flex flex-col justify-between"
          style={{ background: 'rgba(17,24,39,0.7)', border: '1px solid rgba(0,229,255,0.12)', backdropFilter: 'blur(20px)', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}
        >
          {/* Big quote icon */}
          <Quote className="w-14 h-14 absolute top-6 right-6 pointer-events-none" style={{ color: 'rgba(0,229,255,0.12)' }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id || item._id || currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col h-full relative z-10"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ color: '#00E5FF', fill: '#00E5FF' }} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base sm:text-xl text-gray-200 font-display leading-relaxed italic mb-8">
                "{item.review}"
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                  style={{ border: '2px solid rgba(0,229,255,0.5)', boxShadow: '0 0 16px rgba(0,229,255,0.2)' }}
                  onError={e => { e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"; }}
                />
                <div>
                  <h4 className="text-base font-bold text-white">{item.name}</h4>
                  <p className="text-xs font-mono" style={{ color: '#00E5FF' }}>{item.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid rgba(0,229,255,0.06)' }}>
            <div className="flex gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: currentIndex === idx ? '2rem' : '0.5rem',
                    background: currentIndex === idx ? '#00E5FF' : 'rgba(255,255,255,0.15)'
                  }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentIndex(prev => (prev - 1 + testimonialsData.length) % testimonialsData.length)}
                className="p-2.5 rounded-full transition-all duration-200"
                style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)', color: '#9ca3af' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#00E5FF'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.15)'; }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentIndex(prev => (prev + 1) % testimonialsData.length)}
                className="p-2.5 rounded-full transition-all duration-200"
                style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)', color: '#9ca3af' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#00E5FF'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.15)'; }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
