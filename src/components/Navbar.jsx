import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, X, FileText, Settings, LayoutDashboard, LogOut } from 'lucide-react';
import AdminLoginModal from './AdminLoginModal';

export default function Navbar() {
  const { content } = usePortfolio();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const navData = content.navbar || {};
  const resumeUrl = content.resume?.fileUrl || 'resume.pdf';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminHintVisible, setAdminHintVisible] = useState(false);

  const menuItems = navData.menuItems || [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin');
    } else {
      setAdminModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-dark-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl font-extrabold font-mono text-sm group-hover:scale-105 transition-all duration-300 flex items-center justify-center" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.3)', color: '#00E5FF' }}>
              AS
            </div>
            <span className="text-lg font-bold font-display tracking-tight text-white transition-colors" style={{}}>  
              {navData.logoText || 'Aniket.Singh'}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,229,255,0.1)' }}>
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-400 hover:text-white transition-all duration-200"
                onMouseEnter={e => { e.target.style.background = 'rgba(0,229,255,0.08)'; e.target.style.color = '#00E5FF'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#9ca3af'; }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Resume Button */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs tracking-wide hover:opacity-95 hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(90deg, #00E5FF, #009DFF)', color: '#000', boxShadow: '0 0 20px rgba(0,229,255,0.35)' }}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{navData.resumeBtnText || 'Resume'}</span>
            </a>

            {/* Admin Button (subtle, icon-only with tooltip) */}
            <div className="relative" onMouseEnter={() => setAdminHintVisible(true)} onMouseLeave={() => setAdminHintVisible(false)}>
              {isAuthenticated ? (
                /* Authenticated: show Dashboard + Logout */
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => navigate('/admin')}
                    className="p-2 rounded-xl bg-mint-400/10 border border-mint-400/30 text-mint-400 hover:bg-mint-400/20 hover:scale-105 transition-all"
                    title="Admin Dashboard"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/10 transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Not authenticated: show discreet lock icon */
                <button
                  onClick={handleAdminClick}
                  className="p-2.5 rounded-xl transition-all duration-300 group"
                  style={{ background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.2)', color: 'rgba(0,229,255,0.6)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#00E5FF'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.6)'; e.currentTarget.style.background = 'rgba(0,229,255,0.14)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(0,229,255,0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(0,229,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)'; e.currentTarget.style.background = 'rgba(0,229,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}
                  title="Admin Login"
                >
                  <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </button>
              )}

              {/* Tooltip */}
              <AnimatePresence>
                {adminHintVisible && !isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 px-3 py-1.5 rounded-xl bg-[#0A0F18] border border-white/10 text-[10px] text-gray-400 font-mono whitespace-nowrap shadow-xl pointer-events-none"
                  >
                    🔒 Admin Access
                  </motion.div>
                )}
                {adminHintVisible && isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 px-3 py-1.5 rounded-xl bg-[#0A0F18] border border-mint-400/20 text-[10px] text-mint-400 font-mono whitespace-nowrap shadow-xl pointer-events-none"
                  >
                    ✓ Logged In
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-dark-950 border-b border-white/10 p-6 md:hidden backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 text-sm font-semibold text-gray-200 hover:text-mint-400 hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </a>
              ))}

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-mint-400 text-black font-bold text-sm shadow-mint-glow"
              >
                <FileText className="w-4 h-4" />
                <span>{navData.resumeBtnText || 'Download Resume'}</span>
              </a>

              {/* Mobile Admin Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAdminClick();
                }}
                className={`mt-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isAuthenticated
                    ? 'bg-mint-400/10 border border-mint-400/30 text-mint-400'
                    : 'bg-white/[0.03] border border-white/10 text-gray-500'
                }`}
              >
                {isAuthenticated ? (
                  <>
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Open Dashboard</span>
                  </>
                ) : (
                  <>
                    <Settings className="w-4 h-4" />
                    <span>Admin Login</span>
                  </>
                )}
              </button>

              {isAuthenticated && (
                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs text-red-400 border border-red-400/20 bg-red-400/5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Admin</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AdminLoginModal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </>
  );
}
