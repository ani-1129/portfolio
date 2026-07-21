import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { projectsData as defaultProjectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import { Sparkles, ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const CYAN = '#00E5FF';

export default function Projects() {
  const { content } = usePortfolio();
  const projectsData = content.projects && content.projects.length > 0 ? content.projects : defaultProjectsData;
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML Platforms' },
    { id: 'dashboards', label: 'Data Dashboards' },
    { id: 'fullstack', label: 'Full-Stack Web' },
    { id: 'cloud', label: 'Cloud & CRM' }
  ];

  const filteredProjects = projectsData.filter(p => activeTab === 'all' ? true : p.category === activeTab);
  const featuredProject = activeTab === 'all' ? projectsData.find(p => p.featured) : null;

  return (
    <section id="projects" className="py-28 relative overflow-hidden" style={{ background: 'var(--dark-secondary, #0A101A)' }}>
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(0,229,255,0.05)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="section-label mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Work</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white">
              Things I've <span className="mint-gradient-text">Built</span>
            </h2>
          </div>

          {/* Filter Tabs — cyan active */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200"
                style={{
                  background: activeTab === tab.id ? 'linear-gradient(90deg, #00E5FF, #009DFF)' : 'rgba(0,229,255,0.04)',
                  color: activeTab === tab.id ? '#000' : '#9ca3af',
                  border: activeTab === tab.id ? 'none' : '1px solid rgba(0,229,255,0.1)',
                  boxShadow: activeTab === tab.id ? '0 0 20px rgba(0,229,255,0.35)' : 'none',
                  fontWeight: activeTab === tab.id ? '700' : '600',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 p-6 sm:p-8 rounded-[28px] overflow-hidden group"
            style={{ background: 'rgba(17,24,39,0.7)', border: '1px solid rgba(0,229,255,0.12)', backdropFilter: 'blur(20px)', transition: 'all 0.35s ease' }}
            whileHover={{ borderColor: 'rgba(0,229,255,0.35)', boxShadow: '0 20px 60px rgba(0,229,255,0.1)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Image */}
              <div
                className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-video group-hover:scale-[1.01] transition-transform"
                style={{ border: '1px solid rgba(0,229,255,0.12)' }}
              >
                <img src={featuredProject.image} alt={featuredProject.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,7,13,0.8) 0%, transparent 60%)' }} />
                <div
                  className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold font-mono"
                  style={{ background: 'linear-gradient(90deg, #00E5FF, #009DFF)', color: '#000', boxShadow: '0 0 16px rgba(0,229,255,0.5)' }}
                >
                  ★ FEATURED PROJECT
                </div>
              </div>

              {/* Info */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono mb-1" style={{ color: CYAN }}>
                    // {featuredProject.num || '01'} · FEATURED
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-3">{featuredProject.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">{featuredProject.description}</p>

                  {/* Metrics */}
                  {featuredProject.metrics?.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-6 p-3 rounded-2xl" style={{ background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.08)' }}>
                      {featuredProject.metrics.map(m => (
                        <div key={m.label} className="text-center">
                          <div className="text-sm sm:text-base font-extrabold font-mono" style={{ color: CYAN }}>{m.value}</div>
                          <div className="text-[10px] text-gray-500">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.tags?.slice(0, 6).map(t => (
                      <span key={t} className="skill-chip text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(0,229,255,0.08)' }}>
                  <button
                    onClick={() => setSelectedProject(featuredProject)}
                    className="btn-cyan text-[11px] py-2.5 px-5"
                  >
                    View Architecture & Metrics
                  </button>
                  {featuredProject.demo && (
                    <a href={featuredProject.demo} target="_blank" rel="noopener noreferrer"
                      className="p-2.5 rounded-full transition-all"
                      style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)', color: '#6b7280' }}
                      onMouseEnter={e => { e.currentTarget.style.color = CYAN; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.5)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.15)'; }}
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {featuredProject.github && (
                    <a href={featuredProject.github} target="_blank" rel="noopener noreferrer"
                      className="p-2.5 rounded-full transition-all"
                      style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)', color: '#6b7280' }}
                      onMouseEnter={e => { e.currentTarget.style.color = CYAN; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.5)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.15)'; }}
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id || project._id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-[24px] overflow-hidden flex flex-col justify-between group cursor-default"
              style={{ background: 'rgba(17,24,39,0.65)', border: '1px solid rgba(0,229,255,0.08)', backdropFilter: 'blur(12px)', transition: 'all 0.35s ease' }}
              whileHover={{ borderColor: 'rgba(0,229,255,0.35)', y: -4, boxShadow: '0 20px 40px rgba(0,229,255,0.1)' }}
            >
              <div>
                {/* Thumbnail */}
                <div className="relative w-full h-48 overflow-hidden" style={{ background: '#05070D' }}>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.9) 0%, transparent 60%)' }} />

                  {/* Number Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,229,255,0.2)', color: CYAN }}>
                    {String(idx + 1).padStart(2, '0')} // {project.category ? project.category.toUpperCase() : 'AI'}
                  </div>

                  {/* Hover open button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute top-3 right-3 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,229,255,0.3)', color: CYAN }}
                    title="View Details"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="text-[11px] font-mono mb-1" style={{ color: CYAN }}>{project.subtitle || project.category?.toUpperCase()}</div>
                  <h3 className="text-xl font-bold text-white font-display mb-2 line-clamp-1 transition-colors group-hover:text-[#00E5FF]">{project.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags?.slice(0, 4).map(tag => (
                      <span key={tag} className="skill-chip text-[10px] py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(0,229,255,0.06)' }}>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                  style={{ color: CYAN }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  <span>View Details</span>
                  <span>→</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-xl transition-colors"
                      style={{ background: 'rgba(255,255,255,0.04)', color: '#6b7280' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-xl transition-all"
                      style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', color: CYAN }}
                      onMouseEnter={e => { e.currentTarget.style.background = CYAN; e.currentTarget.style.color = '#000'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.08)'; e.currentTarget.style.color = CYAN; }}
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
