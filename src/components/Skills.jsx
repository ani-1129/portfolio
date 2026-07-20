import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { skillsCategories as defaultSkillsCategories } from '../data/skillsData';
import { Search, Sparkles, Code2, Globe, FileCode, Palette, Layers, Smartphone, Zap, Terminal, Cpu, Code, FileCode2, KeyRound, Database, Binary, PieChart, Activity, FileSpreadsheet, Network, Bot, Workflow, DatabaseBackup, LineChart, MessageSquareText, Table, Box, Flame, FileBox, Container, GitBranch, CloudCog, Layout, Server, BarChart3, Cloud } from 'lucide-react';

const iconMap = {
  Code2, Globe, FileCode, Palette, Layers, Smartphone, Zap, Terminal, Cpu, Code, FileCode2, KeyRound, Database, Binary, PieChart, Activity, FileSpreadsheet, Network, Bot, Workflow, DatabaseBackup, LineChart, MessageSquareText, Table, Box, Flame, FileBox, Container, GitBranch, CloudCog, Layout, Server, BarChart3, Cloud
};

export default function Skills() {
  const { content } = usePortfolio();
  const rawSkills = content.skills;

  let categoriesData = defaultSkillsCategories;
  if (Array.isArray(rawSkills) && rawSkills.length > 0 && rawSkills[0].category) {
    const categoryIds = ['frontend', 'backend', 'data', 'ai', 'database', 'devops'];
    const categoryTitles = {
      frontend: 'Frontend Development', backend: 'Backend & API Engineering',
      data: 'Data Analytics & Dashboards', ai: 'AI, RAG & Machine Learning',
      database: 'Databases & Vector Storage', devops: 'DevOps, Cloud & Tools'
    };
    categoriesData = categoryIds.map(catId => {
      const skills = rawSkills.filter(s => s.category === catId);
      if (!skills.length) return null;
      return { id: catId, title: categoryTitles[catId] || catId.toUpperCase(), icon: skills[0]?.icon || 'Code', skills };
    }).filter(Boolean);
  }

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Stack' },
    ...categoriesData.map(c => ({ id: c.id, label: c.title.split(' ')[0] }))
  ];

  const filteredCategories = categoriesData.map(cat => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) return null;
    const matchingSkills = cat.skills.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.tag && s.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    if (!matchingSkills.length) return null;
    return { ...cat, skills: matchingSkills };
  }).filter(Boolean);

  return (
    <section id="skills" className="py-28 relative overflow-hidden" style={{ background: 'var(--dark-bg, #05070D)' }}>
      <div className="absolute right-0 top-1/2 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="section-label mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technical Arsenal</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white">
              Skills &amp; <span className="mint-gradient-text">Technologies</span>
            </h2>
          </div>

          {/* Search */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search (e.g. Python, React)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
              style={{ background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.12)' }}
              onFocus={e => { e.target.style.borderColor = 'rgba(0,229,255,0.4)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(0,229,255,0.12)'; }}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200"
              style={{
                background: activeCategory === cat.id ? 'linear-gradient(90deg, #00E5FF, #009DFF)' : 'rgba(0,229,255,0.04)',
                color: activeCategory === cat.id ? '#000000' : '#9ca3af',
                border: activeCategory === cat.id ? 'none' : '1px solid rgba(0,229,255,0.1)',
                boxShadow: activeCategory === cat.id ? '0 0 20px rgba(0,229,255,0.35)' : 'none',
                fontWeight: activeCategory === cat.id ? '700' : '600',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(cat => {
            const CatIcon = iconMap[cat.icon] || Code;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-[24px] flex flex-col"
                style={{ background: 'rgba(17,24,39,0.65)', border: '1px solid rgba(0,229,255,0.08)', backdropFilter: 'blur(16px)', transition: 'all 0.35s ease' }}
                whileHover={{ borderColor: 'rgba(0,229,255,0.3)', y: -4, boxShadow: '0 20px 40px rgba(0,229,255,0.08)' }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 mb-5" style={{ borderBottom: '1px solid rgba(0,229,255,0.08)' }}>
                  <div className="p-2.5 rounded-2xl" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)', color: '#00E5FF' }}>
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white font-display">{cat.title}</h3>
                </div>

                {/* Skill Chips Grid (replacing progress bars) */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => {
                    const SkillIcon = iconMap[skill.icon] || Code;
                    return (
                      <div key={skill.name} className="skill-chip">
                        <SkillIcon className="w-3 h-3 flex-shrink-0" style={{ color: '#00E5FF' }} />
                        <span>{skill.name}</span>
                        {skill.tag && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono ml-0.5" style={{ background: 'rgba(0,229,255,0.08)', color: '#6b7280' }}>
                            {skill.tag}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
