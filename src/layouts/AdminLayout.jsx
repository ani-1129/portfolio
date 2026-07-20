import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import {
  LayoutDashboard, Sparkles, Navigation, User, BarChart2, Cpu, FolderGit2,
  Briefcase, GraduationCap, Layers, MessageSquareQuote, Mail, FileText,
  Search, Palette, Image as ImageIcon, Database, LogOut, ExternalLink, EyeOff, Menu, X, ShieldCheck
} from 'lucide-react';

const sidebarItems = [
  { label: 'Overview', path: '/admin', icon: LayoutDashboard },
  { label: 'Hero Section', path: '/admin/hero', icon: Sparkles },
  { label: 'Navbar', path: '/admin/navbar', icon: Navigation },
  { label: 'About Me', path: '/admin/about', icon: User },
  { label: 'Stats Counter', path: '/admin/stats', icon: BarChart2 },
  { label: 'Skills Matrix', path: '/admin/skills', icon: Cpu },
  { label: 'Projects CMS', path: '/admin/projects', icon: FolderGit2 },
  { label: 'Timeline & Certs', path: '/admin/timeline', icon: GraduationCap },
  { label: 'Services', path: '/admin/services', icon: Layers },
  { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Contact & Messages', path: '/admin/messages', icon: Mail },
  { label: 'Resume PDF', path: '/admin/resume', icon: FileText },
  { label: 'SEO & Meta', path: '/admin/seo', icon: Search },
  { label: 'Theme Customizer', path: '/admin/theme', icon: Palette },
  { label: 'Media Library', path: '/admin/media', icon: ImageIcon },
  { label: 'Backup & Export', path: '/admin/backup', icon: Database },
];

export default function AdminLayout() {
  const { logout, user } = useAuth();
  const { isLivePreview, clearPreview } = usePortfolio();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen text-white flex admin-panel" style={{ background: '#05070D' }}>

      {/* ─── Desktop Sidebar ─── */}
      <aside
        className="hidden lg:flex flex-col w-64 p-4 justify-between fixed inset-y-0 z-30"
        style={{
          background: '#080C14',
          borderRight: '1px solid rgba(0,229,255,0.1)',
          boxShadow: '4px 0 30px rgba(0,0,0,0.5)'
        }}
      >
        <div>
          {/* Logo Header */}
          <div className="flex items-center justify-between pb-5 mb-5 px-2" style={{ borderBottom: '1px solid rgba(0,229,255,0.1)' }}>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs font-mono"
                style={{ background: 'linear-gradient(135deg, #00E5FF, #009DFF)', color: '#000', boxShadow: '0 0 20px rgba(0,229,255,0.4)' }}
              >
                AS
              </div>
              <div>
                <div className="font-bold text-sm text-white font-display">Aniket CMS</div>
                <div className="text-[10px] font-mono" style={{ color: '#00E5FF' }}>Admin Dashboard</div>
              </div>
            </div>
            {isLivePreview && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono animate-pulse"
                style={{ background: 'rgba(0,229,255,0.15)', color: '#00E5FF', border: '1px solid rgba(0,229,255,0.3)' }}>
                Live
              </span>
            )}
          </div>

          {/* Section Label */}
          <div className="px-3 mb-3">
            <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Navigation</p>
          </div>

          {/* Nav Links */}
          <nav className="space-y-0.5 max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar pr-1">
            {sidebarItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background: isActive ? 'rgba(0,229,255,0.1)' : 'transparent',
                    color: isActive ? '#00E5FF' : '#6b7280',
                    borderLeft: isActive ? '2px solid #00E5FF' : '2px solid transparent',
                    boxShadow: isActive ? 'inset 0 0 20px rgba(0,229,255,0.05)' : 'none',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = 'transparent'; } }}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 space-y-2" style={{ borderTop: '1px solid rgba(0,229,255,0.08)' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium transition-all"
            style={{ background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.12)', color: '#9ca3af' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#00E5FF'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.12)'; }}
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => { logout(); navigate('/admin/login'); }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Top Admin Header */}
        <header
          className="h-16 px-6 flex items-center justify-between sticky top-0 z-20"
          style={{ background: 'rgba(8,12,20,0.9)', borderBottom: '1px solid rgba(0,229,255,0.1)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl transition-all"
              style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)', color: '#9ca3af' }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #00E5FF, #009DFF)' }} />
              <span className="text-sm font-bold font-display text-white">
                {sidebarItems.find(i => i.path === location.pathname)?.label || 'Admin Portal'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLivePreview && (
              <button
                onClick={clearPreview}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all"
                style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Exit Preview</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.12)' }}>
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#00E5FF' }} />
              <span className="text-xs text-gray-400 font-mono">
                <strong style={{ color: '#00E5FF' }}>{user?.username || 'admin'}</strong>
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <div className="lg:hidden p-4 space-y-1" style={{ background: '#080C14', borderBottom: '1px solid rgba(0,229,255,0.1)' }}>
            {sidebarItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background: location.pathname === item.path ? 'rgba(0,229,255,0.1)' : 'transparent',
                  color: location.pathname === item.path ? '#00E5FF' : '#9ca3af',
                  borderLeft: location.pathname === item.path ? '2px solid #00E5FF' : '2px solid transparent'
                }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Dashboard Content */}
        <main className="flex-1 p-6 sm:p-8" style={{ background: '#05070D' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
