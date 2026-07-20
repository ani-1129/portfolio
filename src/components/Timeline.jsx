import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { educationData as defaultEdu, certificationsData as defaultCerts } from '../data/timelineData';
import { Award, ExternalLink, Sparkles, Database, Code2, Cloud, Bot } from 'lucide-react';

const certIconMap = { Database, Code2, Cloud, Bot };

export default function Timeline() {
  const { content } = usePortfolio();
  const timelineData = content.timeline || {};

  const educationData = Array.isArray(timelineData.education) && timelineData.education.length > 0
    ? timelineData.education : defaultEdu;
  const certificationsData = Array.isArray(timelineData.certifications) && timelineData.certifications.length > 0
    ? timelineData.certifications : defaultCerts;

  return (
    <section id="timeline" className="py-28 relative overflow-hidden" style={{ background: 'var(--dark-secondary, #0A101A)' }}>
      <div className="absolute left-0 top-1/3 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="mb-16">
          <div className="section-label mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Journey</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white">
            Education &amp; <span className="mint-gradient-text">Certifications</span>
          </h2>
        </div>

        {/* Glowing Vertical Timeline */}
        <div className="relative ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-10 mb-20">
          {/* Timeline glowing line */}
          <div className="absolute left-0 top-0 bottom-0 w-px timeline-line" />

          {educationData.map((item, idx) => (
            <motion.div
              key={item.title || idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Animated Timeline Dot */}
              <div
                className="absolute -left-[37px] sm:-left-[53px] top-2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ background: '#05070D', border: '2px solid #00E5FF', boxShadow: '0 0 12px rgba(0,229,255,0.4)' }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: '#00E5FF' }} />
                {/* Ping ring */}
                <div className="absolute inset-0 rounded-full animate-ping-slow" style={{ border: '1px solid rgba(0,229,255,0.3)' }} />
              </div>

              {/* Card */}
              <div
                className="p-6 sm:p-8 rounded-[24px] transition-all duration-300"
                style={{ background: 'rgba(17,24,39,0.65)', border: '1px solid rgba(0,229,255,0.08)', backdropFilter: 'blur(16px)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,229,255,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.08)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.25)', color: '#00E5FF' }}>
                      {item.period}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-[11px] text-gray-500">
                      {item.badge || 'Degree'}
                    </span>
                  </div>
                  <div className="text-sm font-bold font-mono" style={{ color: '#00E5FF' }}>{item.grade}</div>
                </div>

                <h3 className="text-xl font-extrabold text-white font-display mb-1">{item.title}</h3>
                <div className="text-xs font-semibold text-gray-500 mb-4">{item.institution}</div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">{item.details}</p>

                {item.courses?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.courses.map(course => (
                      <span key={course} className="skill-chip text-[11px]">✓ {course}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-10 pt-8" style={{ borderTop: '1px solid rgba(0,229,255,0.08)' }}>
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest mb-2" style={{ color: '#00E5FF' }}>
            <Award className="w-4 h-4" />
            <span>Verified Industry Credentials</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-display">Certifications &amp; Accreditations</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certificationsData.map((cert, idx) => {
            const CertIcon = certIconMap[cert.icon] || Award;
            return (
              <motion.div
                key={cert.title || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-[20px] flex flex-col justify-between group cursor-default transition-all duration-300"
                style={{ background: 'rgba(17,24,39,0.65)', border: '1px solid rgba(0,229,255,0.08)', backdropFilter: 'blur(12px)' }}
                whileHover={{ borderColor: 'rgba(0,229,255,0.35)', y: -4, boxShadow: '0 16px 32px rgba(0,229,255,0.12)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)', color: '#00E5FF' }}>
                      <CertIcon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold" style={{ background: 'rgba(0,229,255,0.08)', color: '#00E5FF', border: '1px solid rgba(0,229,255,0.2)' }}>
                      {cert.status || 'Verified'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1 font-display transition-colors group-hover:text-[#00E5FF]">{cert.title}</h4>
                  <div className="text-xs text-gray-500 mb-2">{cert.issuer}</div>
                </div>

                <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(0,229,255,0.06)' }}>
                  <span className="text-[11px] font-mono text-gray-600">{cert.date || 'Verified'}</span>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" style={{ color: '#00E5FF' }} title="Verify">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
