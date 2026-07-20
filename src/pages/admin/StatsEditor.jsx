import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiFetch } from '../../api/client';
import { BarChart2, Save, CheckCircle2, Plus, Trash2, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/common/ConfirmModal';

export default function StatsEditor() {
  const { content, refetch } = usePortfolio();
  const [stats, setStats] = useState(content.stats || []);
  const [saving, setSaving] = useState(false);
  
  // Confirm Delete State
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, index: null });
  const [unlockAuto, setUnlockAuto] = useState(false);
  
  useEffect(() => {
    // Keep local state in sync with context when context updates from backend
    setStats(content.stats || []);
  }, [content.stats]);

  const addStat = () => {
    setStats([
      ...stats,
      {
        num: '100%',
        label: 'Satisfaction Rate',
        desc: 'Client & Industry Feedback',
        icon: 'BarChart2'
      }
    ]);
  };

  const handleDelete = async (index) => {
    setDeleteConfirm({ isOpen: true, index });
  };

  const executeDelete = async () => {
    const index = deleteConfirm.index;
    if (index === null) return;
    
    const newStats = stats.filter((_, i) => i !== index);
    setStats(newStats);
    
    try {
      await apiFetch('/stats', {
        method: 'PUT',
        body: JSON.stringify(newStats)
      });
      await refetch();
      toast.success('Stat deleted');
    } catch (err) {
      toast.error('Failed to delete on server: ' + err.message);
    } finally {
      setDeleteConfirm({ isOpen: false, index: null });
    }
  };

  const handleChange = (index, field, value) => {
    const newStats = [...stats];
    newStats[index][field] = value;
    setStats(newStats);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch('/stats', {
        method: 'PUT',
        body: JSON.stringify(stats)
      });
      await refetch();
      toast.success('Stat counters updated successfully!');
    } catch (err) {
      toast.error('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Stats Counter Editor</h1>
          <p className="text-xs text-gray-400">Add, edit, or delete key numerical achievements & metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-mono text-gray-400 cursor-pointer hover:text-white transition-colors mr-2">
            <input 
              type="checkbox" 
              checked={unlockAuto}
              onChange={(e) => setUnlockAuto(e.target.checked)}
              className="accent-cyan-primary"
            />
            Unlock Auto-computed
          </label>
          <button
            onClick={addStat}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-primary text-xs font-semibold hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Stat Card</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Stat Counters'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          // Check if this stat is automatically computed by the backend
          const isAutoComputed = 
            (stat.label && stat.label.toLowerCase().includes('projects completed')) ||
            (stat.label && stat.label.toLowerCase().includes('technologies'));

          return (
            <div key={i} className={`p-5 rounded-2xl border ${isAutoComputed ? 'bg-cyan-primary/5 border-cyan-primary/20' : 'bg-white/5 border-white/10'} relative flex flex-col gap-3 group`}>
              
              <button
                type="button"
                onClick={() => handleDelete(i)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {isAutoComputed && (
                <div className="absolute top-4 left-4 p-1 rounded bg-cyan-primary/10 text-cyan-primary tooltip" title="Auto-generated from database">
                  <Lock className="w-3 h-3" />
                </div>
              )}

              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-primary mt-4">
                <BarChart2 className="w-5 h-5" />
              </div>

              <div>
                <label className="block text-gray-400 text-xs uppercase mb-1">Value/Number</label>
                <input
                  type="text"
                  value={stat.num || ''}
                  onChange={(e) => handleChange(i, 'num', e.target.value)}
                  disabled={isAutoComputed && !unlockAuto}
                  className={`w-full bg-transparent text-3xl font-display font-bold text-white outline-none border-b border-dashed ${(isAutoComputed && !unlockAuto) ? 'border-transparent cursor-not-allowed' : 'border-white/20 focus:border-cyan-primary'} transition-colors`}
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs uppercase mb-1">Label</label>
                <input
                  type="text"
                  value={stat.label || ''}
                  onChange={(e) => handleChange(i, 'label', e.target.value)}
                  disabled={isAutoComputed && !unlockAuto}
                  className={`w-full bg-transparent text-sm font-bold text-white outline-none border-b border-dashed ${(isAutoComputed && !unlockAuto) ? 'border-transparent cursor-not-allowed' : 'border-white/20 focus:border-cyan-primary'} transition-colors`}
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs uppercase mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={stat.desc || ''}
                  onChange={(e) => handleChange(i, 'desc', e.target.value)}
                  className="w-full bg-transparent text-xs text-gray-400 outline-none border-b border-dashed border-white/20 focus:border-cyan-primary transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>
          );
        })}
      </form>

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Stat"
        message="Are you sure you want to delete this stat? This action cannot be undone."
        confirmText="Delete Stat"
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, index: null })}
        requirePassword={true}
      />

    </div>
  );
}
