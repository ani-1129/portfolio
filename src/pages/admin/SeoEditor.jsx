import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiFetch } from '../../api/client';
import { Search, Save, CheckCircle2 } from 'lucide-react';

export default function SeoEditor() {
  const { content, refetch } = usePortfolio();
  const [metaTitle, setMetaTitle] = useState(content.seo?.metaTitle || 'Aniket Singh — Full Stack Developer & Data Analyst');
  const [metaDescription, setMetaDescription] = useState(content.seo?.metaDescription || 'MCA Student, Full Stack Developer, Data Analyst & AI Enthusiast.');
  const [keywords, setKeywords] = useState(content.seo?.keywords || 'Aniket Singh, Portfolio, Web Developer, Data Analyst, React, FastAPI');
  const [ogImage, setOgImage] = useState(content.seo?.ogImage || 'photo.jpg');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch('/seo', {
        method: 'PUT',
        body: JSON.stringify({ metaTitle, metaDescription, keywords, ogImage })
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
    <div className="max-w-3xl space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold font-display text-white">SEO & Metadata Editor</h1>
          <p className="text-xs text-gray-400">Configure page title, meta description, keywords & Open Graph preview image</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save SEO Settings'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-primary text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>SEO Metadata updated!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6">
        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Page HTML Title Tag
          </label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Meta Description (Search Snippet)
          </label>
          <textarea
            rows={3}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Keywords (Comma separated)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Open Graph Social Share Image URL
          </label>
          <input
            type="text"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white font-mono"
          />
        </div>
      </form>

    </div>
  );
}
