import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api/client';
import { Upload, Copy, Check, FileText, Image as ImageIcon, Trash2 } from 'lucide-react';

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const fetchMedia = async () => {
    try {
      const data = await apiFetch('/media');
      setMedia(data || []);
    } catch (err) {
      console.log('Error loading media');
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
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
      await fetchMedia();
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Media & Asset Library</h1>
          <p className="text-xs text-gray-400">Upload profile photos, project screenshots, and PDFs</p>
        </div>

        <label className="px-4 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 cursor-pointer inline-flex items-center gap-2">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Asset'}</span>
          <input type="file" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.map((item) => (
          <div key={item._id} className="p-4 rounded-2xl glass-panel space-y-3 flex flex-col justify-between">
            <div className="h-32 rounded-xl overflow-hidden bg-dark-950 flex items-center justify-center border border-white/5">
              {item.mimeType?.startsWith('image/') ? (
                <img src={item.url} alt={item.fileName} className="w-full h-full object-cover" />
              ) : (
                <FileText className="w-10 h-10 text-cyan-primary" />
              )}
            </div>

            <div>
              <div className="text-xs font-bold text-white font-mono truncate">{item.fileName}</div>
              <div className="text-[10px] text-gray-500 font-mono">{(item.size / 1024).toFixed(1)} KB</div>
            </div>

            <button
              onClick={() => copyUrl(item.url, item._id)}
              className="w-full py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-primary text-[11px] text-gray-300 hover:text-cyan-primary flex items-center justify-center gap-1.5 transition-all"
            >
              {copiedId === item._id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-cyan-primary" />
                  <span className="text-cyan-primary font-bold">Copied URL</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy URL</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
