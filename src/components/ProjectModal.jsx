import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, FileText, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl my-8 p-6 sm:p-8 rounded-3xl bg-[#0E1217] border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-black/50 border border-white/10 text-gray-400 hover:text-white hover:bg-black transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Image */}
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1217] via-transparent to-transparent opacity-90" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-mint-400 text-black text-xs font-bold font-mono">
                {project.num} // {project.category.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                Status: {project.status}
              </span>
            </div>
          </div>

          {/* Header Titles */}
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-1">
              {project.title}
            </h3>
            <p className="text-sm font-mono text-mint-400">{project.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Live Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-3">Key System Metrics</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                    <div className="text-xl font-extrabold text-mint-400 font-mono">{m.value}</div>
                    <div className="text-[11px] text-gray-400">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Highlights */}
          {project.highlights && (
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-3">System Highlights</h4>
              <div className="space-y-2.5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-mint-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-mint-400/40 text-white font-semibold text-xs tracking-wide hover:bg-white/10 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-mint-400 text-black font-bold text-xs tracking-wide shadow-mint-glow hover:opacity-95 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Application Demo</span>
              </a>
            )}

            {project.apiDocs && (
              <a
                href={project.apiDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-mint-400 font-medium text-xs tracking-wide transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Swagger API Docs</span>
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
