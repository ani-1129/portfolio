import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiFetch } from '../../api/client';
import { Palette, Save, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export default function ThemeEditor() {
  const { content, refetch, updatePreview, clearPreview } = usePortfolio();
  const [accentColor, setAccentColor] = useState(content.theme?.accentColor || '#6366F1');
  const [darkBgColor, setDarkBgColor] = useState(content.theme?.darkBgColor || '#07090E');
  const [cardBgColor, setCardBgColor] = useState(content.theme?.cardBgColor || '#0F141C');
  const [fontFamily, setFontFamily] = useState(content.theme?.fontFamily || 'Sora');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const aestheticPresets = [
    {
      name: '⚡ Electric Indigo & Cyan (Awwwards)',
      accent: '#6366F1',
      dark: '#07090E',
      card: '#0F141C'
    },
    {
      name: '⚡ Sapphire Blue & Pitch Black (Modern)',
      accent: '#3B82F6',
      dark: '#030712',
      card: '#0B132B'
    },
    {
      name: '🔥 Cyber Violet & Sunset Rose (Stripe)',
      accent: '#EC4899',
      dark: '#0A0510',
      card: '#150A21'
    },
    {
      name: '🌙 Midnight Gold & Amber (Luxury Dark)',
      accent: '#F59E0B',
      dark: '#0A0A0B',
      card: '#161619'
    },
    {
      name: '🌌 Deep Space Teal & Titanium (Apple)',
      accent: '#14B8A6',
      dark: '#03080A',
      card: '#0B1519'
    },
    {
      name: '✨ Neon Cobalt & Sky Blue (Vercel)',
      accent: '#38BDF8',
      dark: '#030712',
      card: '#0B1329'
    }
  ];

  useEffect(() => {
    if (content.theme) {
      setAccentColor(content.theme.accentColor || '#6366F1');
      setDarkBgColor(content.theme.darkBgColor || '#07090E');
      setCardBgColor(content.theme.cardBgColor || '#0F141C');
      setFontFamily(content.theme.fontFamily || 'Sora');
    }
  }, [content.theme]);

  const applyPreset = (preset) => {
    setAccentColor(preset.accent);
    setDarkBgColor(preset.dark);
    setCardBgColor(preset.card);
    updatePreview({ theme: { accentColor: preset.accent, darkBgColor: preset.dark, cardBgColor: preset.card, fontFamily } });
  };

  const handleAccentChange = (val) => {
    setAccentColor(val);
    updatePreview({ theme: { accentColor: val, darkBgColor, cardBgColor, fontFamily } });
  };

  const handleDarkBgChange = (val) => {
    setDarkBgColor(val);
    updatePreview({ theme: { accentColor, darkBgColor: val, cardBgColor, fontFamily } });
  };

  const handleCardBgChange = (val) => {
    setCardBgColor(val);
    updatePreview({ theme: { accentColor, darkBgColor, cardBgColor: val, fontFamily } });
  };

  const handleFontChange = (val) => {
    setFontFamily(val);
    updatePreview({ theme: { accentColor, darkBgColor, cardBgColor, fontFamily: val } });
  };

  const handleReset = () => {
    applyPreset(aestheticPresets[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch('/theme', {
        method: 'PUT',
        body: JSON.stringify({ accentColor, darkBgColor, cardBgColor, fontFamily })
      });
      clearPreview();
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
          <h1 className="text-xl font-bold font-display text-white">Aesthetic Theme & Color Customizer</h1>
          <p className="text-xs text-gray-400">Select award-winning color combinations or customize your own in real time</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-semibold hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
            title="Reset to Default Theme"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Aesthetic Theme'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-primary text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Aesthetic theme updated and saved permanently!</span>
        </div>
      )}

      {/* Hand-Curated Aesthetic Presets */}
      <div className="p-6 rounded-3xl glass-panel space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-primary uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Hand-Curated Aesthetic Presets</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {aestheticPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-primary/60 text-left transition-all group relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: preset.accent }} />
                <span className="w-5 h-5 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: preset.dark }} />
                <span className="w-5 h-5 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: preset.card }} />
              </div>
              <div className="text-xs font-bold text-white group-hover:text-cyan-primary transition-colors">
                {preset.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Customization */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
              Primary Accent Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => handleAccentChange(e.target.value)}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => handleAccentChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono uppercase text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
              Matte Background
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={darkBgColor}
                onChange={(e) => handleDarkBgChange(e.target.value)}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={darkBgColor}
                onChange={(e) => handleDarkBgChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono uppercase text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
              Glass Card Surface
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={cardBgColor}
                onChange={(e) => handleCardBgChange(e.target.value)}
                className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={cardBgColor}
                onChange={(e) => handleCardBgChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono uppercase text-xs"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Typography Font Family
          </label>
          <select
            value={fontFamily}
            onChange={(e) => handleFontChange(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-[#0B0F14] border border-white/10 text-sm text-white focus:border-cyan-primary focus:outline-none"
          >
            <option value="Sora">Sora (Modern Display)</option>
            <option value="Inter">Inter (Clean UI)</option>
            <option value="Poppins">Poppins (Geometric)</option>
            <option value="JetBrains Mono">JetBrains Mono (Technical Code)</option>
          </select>
        </div>

      </form>

    </div>
  );
}
