import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle2, BarChart2, Cpu, Bot, Rocket, Sparkles, X, Mail, Phone, ShieldCheck } from 'lucide-react';

const defaultStrengths = [
  { icon: BarChart2, title: 'Data-Driven Builder', desc: 'Turn messy data into actionable business intelligence with ML pipelines and analytics dashboards.' },
  { icon: Cpu, title: 'Full-Stack Capable', desc: 'From FastAPI backends with JWT auth to Streamlit & React frontends — I own the entire stack.' },
  { icon: Bot, title: 'AI-First Mindset', desc: 'RAG pipelines, vector search, LLM integrations, sentiment analysis, and churn prediction models.' },
  { icon: Rocket, title: 'Ships to Production', desc: 'Docker Compose, Render, Nginx — every project is deployed, containerized, and production-ready.' }
];

export default function About() {
  const { content } = usePortfolio();
  const about = content.about || {};
  const hero = content.hero || {};
  const profileImgSrc = about.profileImage || 'photo.jpg';
  const [modalOpen, setModalOpen] = useState(false);

  const checklist = about.checklist || [
    'Responsive Websites', 'AI Applications & RAG', 'Dashboard Development',
    'API Systems & Auth', 'Database Architecture', 'Cloud Deployments'
  ];

  const biography = about.biography || [
    "I'm Aniket Singh, an MCA student building at the intersection of data analytics, web development, and AI engineering.",
    "My core spans Python, Java, SQL, and JavaScript, with hands-on experience deploying production backend microservices using FastAPI, Docker, Streamlit, and Qdrant Vector DB."
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden" style={{ background: 'var(--dark-secondary, #0A101A)' }}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,157,255,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Label */}
        <div className="mb-16">
          <div className="section-label mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white">
            {about.heading
              ? <>
                  {about.heading.split(',')[0]},<br />
                  <span className="mint-gradient-text">{about.heading.split(',')[1] || 'Powered by Code'}</span>
                </>
              : <>Driven by Data,<br /><span className="mint-gradient-text">Powered by Code</span></>
            }
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

          {/* Left: Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-72 sm:w-80 lg:w-[340px] aspect-[3/4]">
              {/* Outer glow aura */}
              <div className="absolute -inset-4 rounded-[40px] pointer-events-none animate-glow-pulse" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.2) 0%, transparent 70%)' }} />

              {/* Animated ring */}
              <div className="absolute -inset-1 rounded-[32px] pointer-events-none" style={{ border: '1px solid rgba(0,229,255,0.15)' }} />
              <div className="absolute -inset-3 rounded-[36px] pointer-events-none ring-pulse" style={{ border: '1px solid rgba(0,229,255,0.08)' }} />

              {/* Portrait Frame */}
              <div
                className="relative w-full h-full rounded-[28px] overflow-hidden p-2 group"
                style={{ background: 'rgba(17,24,39,0.8)', border: '1.5px solid rgba(0,229,255,0.2)', backdropFilter: 'blur(20px)', boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0,229,255,0.1)' }}
              >
                <div className="w-full h-full rounded-[20px] overflow-hidden">
                  <img
                    src={profileImgSrc}
                    alt={hero.name || 'Aniket Singh'}
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    onError={e => { e.target.src = 'photo.jpg'; }}
                  />
                  <div className="absolute inset-0 rounded-[20px]" style={{ background: 'linear-gradient(to top, rgba(5,7,13,0.7) 0%, transparent 50%)' }} />
                </div>
              </div>

              {/* Top Float Badge */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-2xl"
                style={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(0,229,255,0.3)', backdropFilter: 'blur(16px)' }}
              >
                <div className="w-2 h-2 rounded-full animate-ping" style={{ background: '#00E5FF' }} />
                <span className="font-mono text-[11px] text-gray-200">MCA Student</span>
              </motion.div>

              {/* Bottom Float Badge */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-4 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl"
                style={{ background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(0,229,255,0.15)', backdropFilter: 'blur(16px)' }}
              >
                <div className="p-1.5 rounded-xl" style={{ background: 'rgba(0,229,255,0.1)', color: '#00E5FF' }}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-gray-500 uppercase font-mono">Deployed</div>
                  <div className="font-bold text-white text-xs">15+ Projects</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Biography + Checklist */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col space-y-7"
          >
            <div className="space-y-4">
              {biography.map((para, idx) => (
                <p key={idx} className="text-sm sm:text-base text-gray-400 leading-relaxed">{para}</p>
              ))}
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {checklist.map(item => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.08)' }}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#00E5FF' }} />
                  <span className="text-xs font-medium text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            {/* Strength Cards (2 of 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {defaultStrengths.slice(0, 2).map(item => (
                <div key={item.title} className="p-5 rounded-2xl group cursor-default transition-all duration-300"
                  style={{ background: 'rgba(17,24,39,0.6)', border: '1px solid rgba(0,229,255,0.08)', backdropFilter: 'blur(12px)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,229,255,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.08)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                >
                  <div className="p-2.5 rounded-2xl w-fit mb-3" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)', color: '#00E5FF' }}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 font-display">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="btn-outline-cyan self-start"
            >
              <span>Read Full Story</span>
              <span>→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bio Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto p-7 rounded-3xl"
              style={{ background: '#0A101A', border: '1px solid rgba(0,229,255,0.2)', boxShadow: '0 40px 80px rgba(0,0,0,0.9)' }}
            >
              <button onClick={() => setModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-xl text-gray-500 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <img src={profileImgSrc} alt="Aniket Singh" className="w-14 h-14 rounded-2xl object-cover grayscale" style={{ border: '1.5px solid rgba(0,229,255,0.4)' }} />
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Aniket Singh</h3>
                  <p className="text-xs font-mono" style={{ color: '#00E5FF' }}>MCA Student (2025–2027) · Software Engineer</p>
                </div>
              </div>
              <div className="space-y-4 text-sm text-gray-400 leading-relaxed mb-7">
                {biography.map((p, idx) => <p key={idx}>{p}</p>)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl text-xs" style={{ background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.08)' }}>
                <div className="flex items-center gap-3"><Mail className="w-4 h-4" style={{ color: '#00E5FF' }} /><span className="text-gray-400">{content.contact?.email || 'singh.ani2911@gmail.com'}</span></div>
                <div className="flex items-center gap-3"><Phone className="w-4 h-4" style={{ color: '#00E5FF' }} /><span className="text-gray-400">{content.contact?.phone || '+91 83819 51053'}</span></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
