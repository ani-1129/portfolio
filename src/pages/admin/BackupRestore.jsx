import React, { useState } from 'react';
import { apiFetch } from '../../api/client';
import { Database, Download, Upload, CheckCircle2 } from 'lucide-react';

export default function BackupRestore() {
  const [downloading, setDownloading] = useState(false);

  const handleExport = async () => {
    setDownloading(true);
    try {
      const data = await apiFetch('/backup/export');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aniket-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } catch (err) {
      alert('Export failed: ' + err.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-xl font-bold font-display text-white">One-Click Portfolio Backup</h1>
        <p className="text-xs text-gray-400">Export your complete database & portfolio content to JSON</p>
      </div>

      <div className="p-8 rounded-3xl glass-panel space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-cyan-primary/10 text-cyan-primary border border-cyan-primary/20">
            <Database className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-display">Export Portfolio JSON</h3>
            <p className="text-xs text-gray-400">Downloads all projects, skills, timeline, hero & settings</p>
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={downloading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-primary to-emerald-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-cyan-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'Generating Backup...' : 'Download Complete Portfolio JSON'}</span>
        </button>
      </div>

    </div>
  );
}
