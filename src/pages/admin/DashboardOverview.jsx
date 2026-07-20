import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiFetch } from '../../api/client';
import {
  FolderGit2, Cpu, Mail, FileText, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Database, Layers
} from 'lucide-react';

export default function DashboardOverview() {
  const { content } = usePortfolio();
  const [messages, setMessages] = useState([]);
  const [loadingMsg, setLoadingMsg] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await apiFetch('/messages');
        setMessages(data || []);
      } catch (err) {
        console.log('Using mock messages');
      } finally {
        setLoadingMsg(false);
      }
    }
    fetchMessages();
  }, []);

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-primary/10 text-cyan-primary text-xs font-mono mb-3 border border-cyan-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CMS System Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Welcome Back, <span className="mint-gradient-text">Aniket</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
              All portfolio content is dynamically connected to your MongoDB database. Manage projects, skills, education, resume, and messages seamlessly.
            </p>
          </div>

          <Link
            to="/admin/projects"
            className="px-5 py-3 rounded-2xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Manage Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl glass-panel flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-cyan-primary/10 text-cyan-primary">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-gray-500">Live</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-display">
              {content.projects ? content.projects.length : 0}
            </div>
            <div className="text-xs text-gray-400 font-medium">Total Projects</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-cyan-primary/10 text-cyan-primary">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-gray-500">Matrix</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-display">
              {content.skills ? content.skills.reduce((acc, cat) => acc + (cat.skills ? cat.skills.length : 0), 0) : 0}
            </div>
            <div className="text-xs text-gray-400 font-medium">Skills Inventory</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-cyan-primary/10 text-cyan-primary">
              <Mail className="w-5 h-5" />
            </div>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#00E5FF] text-black text-[10px] font-bold font-mono">
                {unreadCount} New
              </span>
            )}
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-display">
              {messages.length}
            </div>
            <div className="text-xs text-gray-400 font-medium">Contact Messages</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-cyan-primary/10 text-cyan-primary">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-cyan-primary">Active PDF</span>
          </div>
          <div>
            <div className="text-sm font-bold text-white font-mono truncate">
              {content.resume?.fileName || 'resume.pdf'}
            </div>
            <div className="text-xs text-gray-400 font-medium">Official Resume</div>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Messages Inbox */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-primary" />
              <h3 className="text-base font-bold text-white font-display">Recruiter Inbox Messages</h3>
            </div>
            <Link to="/admin/messages" className="text-xs font-semibold text-cyan-primary hover:underline">
              View All →
            </Link>
          </div>

          {messages.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500 font-mono">
              No contact messages received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 4).map((msg) => (
                <div key={msg._id || msg.email} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{msg.name}</span>
                    <span className="font-mono text-[10px] text-cyan-primary">{msg.email}</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-300">{msg.subject || 'Portfolio Inquiry'}</div>
                  <p className="text-xs text-gray-400 line-clamp-1">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel space-y-4">
          <h3 className="text-base font-bold text-white font-display pb-4 border-b border-white/10">
            Quick Actions
          </h3>

          <div className="space-y-3">
            <Link
              to="/admin/projects"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-primary/40 text-xs font-semibold text-gray-200 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <FolderGit2 className="w-4 h-4 text-cyan-primary" />
                <span>Add / Edit Projects</span>
              </div>
              <span>→</span>
            </Link>

            <Link
              to="/admin/skills"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-primary/40 text-xs font-semibold text-gray-200 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-cyan-primary" />
                <span>Update Skills & Proficiency</span>
              </div>
              <span>→</span>
            </Link>

            <Link
              to="/admin/resume"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-primary/40 text-xs font-semibold text-gray-200 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-cyan-primary" />
                <span>Replace Resume PDF</span>
              </div>
              <span>→</span>
            </Link>

            <Link
              to="/admin/backup"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-primary/40 text-xs font-semibold text-gray-200 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4 text-cyan-primary" />
                <span>One-Click JSON Backup</span>
              </div>
              <span>→</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
