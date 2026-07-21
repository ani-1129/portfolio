import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiFetch } from '../../api/client';
import { FileText, Upload, Save, CheckCircle2, Download, ExternalLink } from 'lucide-react';

export default function ResumeEditor() {
  const { content, refetch } = usePortfolio();
  const [fileUrl, setFileUrl] = useState(content.resume?.fileUrl || 'resume.pdf');
  const [fileName, setFileName] = useState(content.resume?.fileName || 'Aniket_Singh_Resume.pdf');
  const [version, setVersion] = useState(content.resume?.version || '2.0');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('https://portfolio-bcwq.onrender.com/api/media/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setFileUrl(data.url);
      setFileName(data.fileName);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch('/resume', {
        method: 'PUT',
        body: JSON.stringify({ fileUrl, fileName, version })
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
          <h1 className="text-xl font-bold font-display text-white">Resume PDF Manager</h1>
          <p className="text-xs text-gray-400">Upload, replace, and configure official resume PDF file</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Resume Settings'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-primary text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Resume configuration updated!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6">
        
        {/* Upload Box */}
        <div className="p-6 rounded-2xl border-2 border-dashed border-white/10 hover:border-cyan-primary/50 bg-white/[0.02] text-center space-y-3">
          <FileText className="w-10 h-10 text-cyan-primary mx-auto" />
          <div>
            <div className="text-sm font-bold text-white">Upload New PDF Resume</div>
            <div className="text-xs text-gray-400">Supports PDF files up to 10MB</div>
          </div>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow cursor-pointer hover:opacity-95 transition-all">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading PDF...' : 'Choose PDF File'}</span>
            <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-300 uppercase mb-1">Resume File Path / URL</label>
            <input
              type="text"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-gray-300 uppercase mb-1">File Display Name</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-gray-300 uppercase mb-1">Version Label</label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-sm text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">Current file: {fileUrl}</span>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-cyan-primary hover:underline flex items-center gap-1"
          >
            <span>Preview Current Resume</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </form>

    </div>
  );
}
