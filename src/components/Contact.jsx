import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Sparkles, Download, CheckCircle, Code } from 'lucide-react';

const CYAN = '#00E5FF';
const CYAN_BORDER = 'rgba(0,229,255,0.15)';
const CYAN_BG = 'rgba(0,229,255,0.06)';

function FormInput({ label, id, type = 'text', value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-[10px] font-mono uppercase tracking-widest mb-1.5 transition-colors"
        style={{ color: focused ? CYAN : '#6b7280' }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-300"
        style={{
          background: focused ? 'rgba(0,229,255,0.06)' : 'rgba(17,24,39,0.6)',
          border: `1px solid ${focused ? 'rgba(0,229,255,0.5)' : CYAN_BORDER}`,
          boxShadow: focused ? `0 0 0 2px rgba(0,229,255,0.08)` : 'none',
        }}
      />
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedTextarea, setFocusedTextarea] = useState(false);

  const handleChange = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 }, colors: [CYAN, '#009DFF', '#ffffff'] });
      setTimeout(() => { setIsSuccess(false); setFormData({ name: '', email: '', subject: '', message: '' }); }, 4000);
    }, 1200);
  };

  const contactItems = [
    { icon: Mail, label: 'Email', value: 'singh.ani2911@gmail.com', href: 'mailto:singh.ani2911@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 83819 51053', href: 'tel:+918381951053' },
    { icon: MapPin, label: 'Location', value: 'India', href: null },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ani-1129', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/aniket-singh-185770291', label: 'LinkedIn' },
    { icon: Code, href: 'https://leetcode.com/u/ani-1129/', label: 'LeetCode' },
  ];

  return (
    <section id="contact" className="py-28 relative overflow-hidden" style={{ background: 'var(--dark-secondary, #0A101A)' }}>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <div className="section-label mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white">
            Let's Connect &amp; <span className="mint-gradient-text">Build Together</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <p className="text-base text-gray-400 leading-relaxed">
              I am actively seeking internship and entry-level opportunities in data analytics, web development, and AI engineering. Reach out if you're building something innovative!
            </p>

            <div className="space-y-3">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group cursor-default"
                  style={{ background: CYAN_BG, border: `1px solid ${CYAN_BORDER}` }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = CYAN_BORDER; e.currentTarget.style.transform = ''; }}
                >
                  <div className="p-3 rounded-xl flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)', color: CYAN }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{label}</div>
                    {href
                      ? <a href={href} className="text-sm font-semibold text-white hover:text-[#00E5FF] transition-colors">{value}</a>
                      : <div className="text-sm font-semibold text-white">{value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  className="p-3 rounded-xl transition-all duration-200"
                  style={{ background: CYAN_BG, border: `1px solid ${CYAN_BORDER}`, color: '#6b7280' }}
                  onMouseEnter={e => { e.currentTarget.style.color = CYAN; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.5)'; e.currentTarget.style.background = 'rgba(0,229,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = CYAN_BORDER; e.currentTarget.style.background = CYAN_BG; e.currentTarget.style.transform = ''; }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-9 rounded-[28px]" style={{ background: 'rgba(17,24,39,0.7)', border: `1px solid ${CYAN_BORDER}`, backdropFilter: 'blur(20px)' }}>
              {isSuccess ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,229,255,0.1)', border: '2px solid rgba(0,229,255,0.4)', boxShadow: '0 0 30px rgba(0,229,255,0.3)' }}>
                    <CheckCircle className="w-8 h-8" style={{ color: CYAN }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent! 🎉</h3>
                  <p className="text-sm text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormInput id="name" label="Your Name" value={formData.name} onChange={handleChange('name')} placeholder="Aniket Singh" required />
                    <FormInput id="email" label="Email Address" type="email" value={formData.email} onChange={handleChange('email')} placeholder="you@example.com" required />
                  </div>
                  <FormInput id="subject" label="Subject" value={formData.subject} onChange={handleChange('subject')} placeholder="Let's build something..." required />

                  {/* Textarea */}
                  <div>
                    <label htmlFor="message" className="block text-[10px] font-mono uppercase tracking-widest mb-1.5 transition-colors" style={{ color: focusedTextarea ? CYAN : '#6b7280' }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange('message')}
                      placeholder="Tell me about your project..."
                      onFocus={() => setFocusedTextarea(true)}
                      onBlur={() => setFocusedTextarea(false)}
                      className="w-full px-4 py-3 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none resize-none transition-all duration-300"
                      style={{
                        background: focusedTextarea ? 'rgba(0,229,255,0.06)' : 'rgba(17,24,39,0.6)',
                        border: `1px solid ${focusedTextarea ? 'rgba(0,229,255,0.5)' : CYAN_BORDER}`,
                        boxShadow: focusedTextarea ? `0 0 0 2px rgba(0,229,255,0.08)` : 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-cyan disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
