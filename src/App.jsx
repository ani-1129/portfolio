import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';

import PublicPortfolio from './pages/PublicPortfolio';
import Login from './pages/admin/Login';
import AdminLayout from './layouts/AdminLayout';

import DashboardOverview from './pages/admin/DashboardOverview';
import HeroEditor from './pages/admin/HeroEditor';
import NavbarEditor from './pages/admin/NavbarEditor';
import AboutEditor from './pages/admin/AboutEditor';
import StatsEditor from './pages/admin/StatsEditor';
import SkillsEditor from './pages/admin/SkillsEditor';
import ProjectsEditor from './pages/admin/ProjectsEditor';
import TimelineEditor from './pages/admin/TimelineEditor';
import ServicesEditor from './pages/admin/ServicesEditor';
import TestimonialsEditor from './pages/admin/TestimonialsEditor';
import ContactMessages from './pages/admin/ContactMessages';
import ResumeEditor from './pages/admin/ResumeEditor';
import SeoEditor from './pages/admin/SeoEditor';
import ThemeEditor from './pages/admin/ThemeEditor';
import MediaLibrary from './pages/admin/MediaLibrary';
import BackupRestore from './pages/admin/BackupRestore';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-mint-400 font-mono">Loading Admin CMS...</div>;
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#111827',
                color: '#e5e7eb',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: 500,
                padding: '12px 16px',
                boxShadow: '0 16px 48px rgba(0,0,0,0.5)'
              },
              success: {
                iconTheme: { primary: '#00E5FF', secondary: '#111827' }
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#111827' }
              }
            }}
          />
          <Routes>
            {/* Public Portfolio Route */}
            <Route path="/" element={<PublicPortfolio />} />

            {/* Admin Auth Route */}
            <Route path="/admin/login" element={<Login />} />

            {/* Protected Admin Dashboard Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardOverview />} />
              <Route path="hero" element={<HeroEditor />} />
              <Route path="navbar" element={<NavbarEditor />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="stats" element={<StatsEditor />} />
              <Route path="skills" element={<SkillsEditor />} />
              <Route path="projects" element={<ProjectsEditor />} />
              <Route path="timeline" element={<TimelineEditor />} />
              <Route path="services" element={<ServicesEditor />} />
              <Route path="testimonials" element={<TestimonialsEditor />} />
              <Route path="messages" element={<ContactMessages />} />
              <Route path="resume" element={<ResumeEditor />} />
              <Route path="seo" element={<SeoEditor />} />
              <Route path="theme" element={<ThemeEditor />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="backup" element={<BackupRestore />} />
            </Route>

            {/* Catch All Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  );
}
