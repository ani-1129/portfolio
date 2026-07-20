import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Code, Zap } from 'lucide-react';

const CYAN = '#00E5FF';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative pt-16 pb-10 overflow-hidden" style={{ background: '#03040A', borderTop: '1px solid rgba(0,229,255,0.08)' }}>
      {/* Glowing Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)', opacity: 0.4 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10" style={{ borderBottom: '1px solid rgba(0,229,255,0.06)' }}>
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 text-2xl font-bold font-display text-white group">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm transition-all group-hover:scale-105"
              style={{ background: 'linear-gradient(90deg, #00E5FF, #009DFF)', color: '#000000', boxShadow: '0 0 20px rgba(0,229,255,0.35)' }}
            >
              AS
            </span>
            <span>
              Aniket<span style={{ color: CYAN }}>.</span>Singh
            </span>
          </a>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-500">
            {['About', 'Skills', 'Projects', 'Timeline', 'Services', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="transition-colors duration-200"
                onMouseEnter={e => { e.target.style.color = CYAN; }}
                onMouseLeave={e => { e.target.style.color = '#6b7280'; }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: 'https://github.com/ani-1129', title: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/aniket-singh-185770291', title: 'LinkedIn' },
              { icon: Code, href: 'https://leetcode.com/u/ani-1129/', title: 'LeetCode' },
              { icon: Mail, href: 'mailto:singh.ani2911@gmail.com', title: 'Email' },
            ].map(({ icon: Icon, href, title }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={title}
                className="p-2.5 rounded-xl transition-all duration-200"
                style={{ background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.1)', color: '#6b7280' }}
                onMouseEnter={e => { e.currentTarget.style.color = CYAN; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; e.currentTarget.style.background = 'rgba(0,229,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.1)'; e.currentTarget.style.background = 'rgba(0,229,255,0.04)'; e.currentTarget.style.transform = ''; }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-mono">
          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <Zap className="w-3.5 h-3.5 inline" style={{ color: CYAN, fill: CYAN }} />
            <span>by Aniket Singh · 2026</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
            style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)', color: '#9ca3af' }}
            onMouseEnter={e => { e.currentTarget.style.color = CYAN; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(0,229,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.15)'; e.currentTarget.style.boxShadow = ''; }}
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
