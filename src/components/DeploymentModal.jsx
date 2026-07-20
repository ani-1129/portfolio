import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Terminal, ExternalLink, Globe, Rocket, ShieldCheck } from 'lucide-react';

export default function DeploymentModal({ isOpen, onClose }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitCommands = `# 1. Initialize Git repository
git init
git add .
git commit -m "Deploy Modern Aniket Singh Portfolio"
git branch -M main

# 2. Add remote repository
git remote add origin https://github.com/ani-1129/portfolio.git
git push -u origin main`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl p-6 sm:p-8 rounded-3xl bg-[#0E1217] border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-mint-400/10 text-mint-400 border border-mint-400/20">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Deployment & Git Terminal Guide</h3>
              <p className="text-xs text-mint-400 font-mono">Go Live in under 2 minutes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Vercel */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm">Vercel (Recommended)</span>
                  <Rocket className="w-4 h-4 text-mint-400" />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Automatic zero-config deployment on every git push with global CDN.
                </p>
              </div>
              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-bold text-mint-400 flex items-center gap-1 hover:underline"
              >
                <span>Deploy on Vercel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Netlify */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm">Netlify</span>
                  <Globe className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Drag and drop `dist/` folder or connect your GitHub repository directly.
                </p>
              </div>
              <a
                href="https://app.netlify.com/start"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-bold text-mint-400 flex items-center gap-1 hover:underline"
              >
                <span>Deploy on Netlify</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* GitHub Pages */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm">GitHub Pages</span>
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Free hosting at `ani-1129.github.io/portfolio` via main branch or gh-pages.
                </p>
              </div>
              <a
                href="https://github.com/ani-1129"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-bold text-mint-400 flex items-center gap-1 hover:underline"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Copyable Code Block */}
          <div className="relative rounded-2xl bg-[#05070A] border border-white/10 p-4 font-mono text-xs text-gray-300">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-mint-400 font-bold">Terminal Git Commands</span>
              <button
                onClick={() => copyToClipboard(gitCommands, 1)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              >
                {copiedIndex === 1 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-mint-400" />
                    <span className="text-mint-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Commands</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto text-gray-300 leading-relaxed">{gitCommands}</pre>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
