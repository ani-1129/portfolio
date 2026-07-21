import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin, Code, Phone, Download, Star, Zap } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { content } = usePortfolio();
  const heroData = content.hero || {};
  const canvasRef = useRef(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = heroData.typingTexts?.length > 0
    ? heroData.typingTexts
    : ['RAG AI Applications', 'Interactive Data Dashboards', 'Full-Stack Web Platforms', 'Machine Learning Pipelines'];

  /* ── Typing Effect ── */
  useEffect(() => {
    const currentFullText = roles[currentRoleIndex] || roles[0];
    const typingSpeed = isDeleting ? 35 : 75;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        if (displayedText === currentFullText) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex(prev => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  /* ── Canvas Particles ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId;
    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.6 + 0.15
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.1 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.alpha})`;
        ctx.fill();
      });
      rafId = requestAnimationFrame(render);
    };
    render();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafId); };
  }, []);

  const nameParts = (heroData.name || 'ANIKET SINGH').split(' ');
  const firstName = nameParts[0] || 'ANIKET';
  const lastName = nameParts.slice(1).join(' ') || 'SINGH';
  const profileImgSrc = heroData.profileImage || 'photo.jpg';
  const resumeUrl = content.resume?.fileUrl || 'resume.pdf';

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20" style={{ background: 'var(--dark-bg, #05070D)' }}>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Full background dual-portrait image */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <img
          src={profileImgSrc}
          alt="Background Portrait"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle right fade to ensure left text readability if needed */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #05070D 0%, rgba(5,7,13,0.85) 15%, rgba(5,7,13,0.3) 40%, transparent 100%)' }} />
        {/* Bottom fade */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #05070D 0%, transparent 20%)' }} />
      </div>

      {/* Ambient left glow */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none z-[2]" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* ── LEFT: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 section-label">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#00E5FF' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#00E5FF' }} />
              </span>
              <span>{heroData.statusBadge || 'Available for Roles & Internships'}</span>
            </div>

            {/* Subtitle line */}
            <div className="text-xs sm:text-sm font-bold tracking-[0.2em] text-gray-500 uppercase font-mono mb-4">
              {heroData.subtitle || 'FULL STACK DEVELOPER · DATA ANALYST · AI ENGINEER'}
            </div>

            {/* Name */}
            <h1 className="text-6xl sm:text-8xl lg:text-[96px] font-extrabold font-display tracking-tight text-white leading-[0.95] mb-6">
              {firstName}<br />
              <span className="mint-gradient-text">{lastName}</span>
            </h1>

            {/* Typing */}
            <div className="text-lg sm:text-2xl font-medium text-gray-400 mb-6 flex items-center gap-2 min-h-[36px]">
              <span>Building</span>
              <span className="font-mono font-bold" style={{ color: '#00E5FF' }}>{displayedText}</span>
              <span className="animate-pulse font-mono font-bold" style={{ color: '#00E5FF' }}>|</span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mb-8">
              {heroData.description || 'MCA student engineering production-grade AI systems, data platforms, and full-stack applications.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a href="#projects" className="btn-cyan group">
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-cyan group">
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {['Python', 'React', 'FastAPI', 'RAG · AI', 'SQL', 'Docker'].map(tag => (
                <span key={tag} className="skill-chip text-[11px]">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Right side is now empty because the image handles the composition */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none"></div>
        </div>
      </div>

      {/* Social Sidebar */}
      <div className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
        {[
          { icon: Github, href: content.contact?.github || 'https://github.com/ani-1129', label: 'GitHub' },
          { icon: Linkedin, href: content.contact?.linkedin || 'https://linkedin.com/in/aniket-singh-185770291', label: 'LinkedIn' },
          { icon: Code, href: content.contact?.leetcode || 'https://leetcode.com/u/ani-1129/', label: 'LeetCode' },
          { icon: Mail, href: `mailto:${content.contact?.email || 'singh.ani2911@gmail.com'}`, label: 'Email' },
          { icon: Phone, href: `tel:${content.contact?.phone || '+918381951053'}`, label: 'Phone' }
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            className="p-2.5 rounded-xl transition-all duration-200"
            style={{ background: 'rgba(5,7,13,0.8)', border: '1px solid rgba(255,255,255,0.07)', color: '#6b7280', backdropFilter: 'blur(12px)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#00E5FF'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; e.currentTarget.style.background = 'rgba(0,229,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(5,7,13,0.8)'; }}
            title={s.label}
          >
            <s.icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </section>
  );
}
