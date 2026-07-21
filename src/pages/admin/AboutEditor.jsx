import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiFetch } from '../../api/client';
import { User, Save, CheckCircle2, Plus, Trash2, Upload } from 'lucide-react';

export default function AboutEditor() {
  const { content, refetch } = usePortfolio();
  const [heading, setHeading] = useState(content.about?.heading || 'Driven by Data, Powered by Code');
  const [checklist, setChecklist] = useState(
    content.about?.checklist || ["Responsive Websites", "AI Applications & RAG", "Dashboard Development", "API Systems & Auth", "Database Architecture"]
  );
  const [biography, setBiography] = useState(
    content.about?.biography || ["I'm Aniket Singh, an MCA student building at the intersection of data analytics, web development, and AI engineering."]
  );
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(content.about?.profileImage || '');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('https://portfolio-bcwq.onrender.com/api/media/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data
      });
      if (!res.ok) throw new Error('Upload failed');
      const uploadedMedia = await res.json();
      setProfileImage(`https://portfolio-bcwq.onrender.com${uploadedMedia.url}`);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // Biography Helpers
  const addBioParagraph = () => setBiography([...biography, 'New biography paragraph content...']);
  const deleteBioParagraph = (index) => setBiography(biography.filter((_, i) => i !== index));

  // Checklist Helpers
  const addChecklistItem = () => setChecklist([...checklist, 'New Feature Capability']);
  const deleteChecklistItem = (index) => setChecklist(checklist.filter((_, i) => i !== index));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch('/about', {
        method: 'PUT',
        body: JSON.stringify({
          heading,
          checklist,
          biography,
          profileImage
        })
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
          <h1 className="text-xl font-bold font-display text-white">About Me Editor</h1>
          <p className="text-xs text-gray-400">Add, edit, or delete biography paragraphs & feature checklist items</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save About Section'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-primary text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>About section updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6">
        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            Section Main Heading
          </label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:border-cyan-primary focus:outline-none"
          />
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2">
            About Section Profile Photo (Optional override)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white focus:border-cyan-primary focus:outline-none"
              placeholder="Leave blank to use Hero image..."
            />
            <label className="flex-shrink-0 cursor-pointer px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-primary/50 transition-all flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {uploadingImage ? (
                <span className="text-xs font-bold text-cyan-primary animate-pulse">Uploading...</span>
              ) : (
                <Upload className="w-5 h-5 text-gray-400 hover:text-cyan-primary transition-colors" />
              )}
            </label>
          </div>
        </div>

        {/* Biography Paragraphs List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-gray-300 uppercase tracking-wider">
              Biography Paragraphs ({biography.length})
            </label>
            <button
              type="button"
              onClick={addBioParagraph}
              className="text-cyan-primary text-xs font-semibold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Paragraph</span>
            </button>
          </div>

          {biography.map((p, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <textarea
                rows={2}
                value={p}
                onChange={(e) => {
                  const newBio = [...biography];
                  newBio[idx] = e.target.value;
                  setBiography(newBio);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-cyan-primary resize-none"
              />
              <button
                type="button"
                onClick={() => deleteBioParagraph(idx)}
                className="p-2 text-gray-400 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Checklist Items */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-gray-300 uppercase tracking-wider">
              Feature Checklist Items ({checklist.length})
            </label>
            <button
              type="button"
              onClick={addChecklistItem}
              className="text-cyan-primary text-xs font-semibold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Feature Check</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newCheck = [...checklist];
                    newCheck[idx] = e.target.value;
                    setChecklist(newCheck);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => deleteChecklistItem(idx)}
                  className="p-2 text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </form>

    </div>
  );
}
