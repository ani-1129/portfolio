import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiFetch } from '../../api/client';
import { Sparkles, Save, Eye, CheckCircle2 } from 'lucide-react';

export default function HeroEditor() {
  const { content, updatePreview, refetch } = usePortfolio();
  const [formData, setFormData] = useState({
    name: content.hero?.name || 'ANIKET SINGH',
    subtitle: content.hero?.subtitle || 'FULL STACK WEB DEVELOPER & DATA ANALYST',
    typingTexts: content.hero?.typingTexts ? content.hero.typingTexts.join('\n') : 'RAG AI Applications\nInteractive Data Dashboards\nFull-Stack Web Platforms\nMachine Learning Pipelines',
    description: content.hero?.description || 'MCA student with a passion for shipping real products.',
    statusBadge: content.hero?.statusBadge || 'Available for Roles & Internships',
    profileImage: content.hero?.profileImage || 'photo.jpg'
  });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePreview = () => {
    updatePreview({
      hero: {
        ...formData,
        typingTexts: formData.typingTexts.split('\n').filter(Boolean)
      }
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        typingTexts: formData.typingTexts.split('\n').filter(Boolean)
      };
      await apiFetch('/hero', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      await refetch();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Hero Section Editor</h1>
          <p className="text-xs text-gray-400">Edit headline, typing roles, photo URL & status badge</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePreview}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-200 hover:text-cyan-primary transition-all flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>Test Live Preview</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Publish Hero Changes'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-primary text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Hero section updated successfully in database!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6">
        
        {/* Name */}
        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Full Name Heading
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:border-cyan-primary focus:outline-none"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Subtitle Tag (Mono font)
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:border-cyan-primary focus:outline-none"
          />
        </div>

        {/* Typing Texts */}
        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Typing Roles (One per line)
          </label>
          <textarea
            rows={4}
            value={formData.typingTexts}
            onChange={(e) => setFormData({ ...formData, typingTexts: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white font-mono focus:border-cyan-primary focus:outline-none resize-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Short Bio Paragraph
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:border-cyan-primary focus:outline-none resize-none"
          />
        </div>

        {/* Status Badge & Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
              Status Badge Text
            </label>
            <input
              type="text"
              value={formData.statusBadge}
              onChange={(e) => setFormData({ ...formData, statusBadge: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:border-cyan-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
              Profile Photo URL / Path
            </label>
            <input
              type="text"
              value={formData.profileImage}
              onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:border-cyan-primary focus:outline-none"
            />
          </div>
        </div>

      </form>
    </div>
  );
}
