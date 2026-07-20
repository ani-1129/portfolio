import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiFetch } from '../../api/client';
import { Navigation, Save, CheckCircle2, Eye } from 'lucide-react';

export default function NavbarEditor() {
  const { content, refetch, updatePreview } = usePortfolio();
  const [logoText, setLogoText] = useState(content.navbar?.logoText || 'Aniket.Singh');
  const [resumeBtnText, setResumeBtnText] = useState(content.navbar?.resumeBtnText || 'Resume');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch('/navbar', {
        method: 'PUT',
        body: JSON.stringify({ logoText, resumeBtnText })
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
          <h1 className="text-xl font-bold font-display text-white">Navbar & Branding Editor</h1>
          <p className="text-xs text-gray-400">Configure logo text, resume CTA button & header menu items</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Navbar Settings'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-primary text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Navbar settings updated!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6">
        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Personal Brand Logo Text
          </label>
          <input
            type="text"
            value={logoText}
            onChange={(e) => setLogoText(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:border-cyan-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Resume CTA Button Label
          </label>
          <input
            type="text"
            value={resumeBtnText}
            onChange={(e) => setResumeBtnText(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:border-cyan-primary focus:outline-none"
          />
        </div>
      </form>

    </div>
  );
}
