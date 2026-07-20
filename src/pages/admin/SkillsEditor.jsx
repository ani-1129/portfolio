import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api/client';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Edit, Trash2, Code, Cpu, Save, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/common/ConfirmModal';

export default function SkillsEditor() {
  const { refetch } = usePortfolio();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, skill: null });

  const fetchSkills = async () => {
    try {
      const data = await apiFetch('/skills');
      setSkills(data || []);
    } catch (err) {
      console.log('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleCreateNew = () => {
    setEditingSkill({
      name: '',
      category: 'frontend',
      level: 80,
      icon: 'Code',
      tag: 'Core'
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingSkill._id) {
        await apiFetch(`/skills/${editingSkill._id}`, {
          method: 'PUT',
          body: JSON.stringify(editingSkill)
        });
      } else {
        await apiFetch('/skills', {
          method: 'POST',
          body: JSON.stringify(editingSkill)
        });
      }
      setEditingSkill(null);
      await fetchSkills();
      await refetch();
      toast.success(editingSkill._id ? 'Skill updated' : 'Skill created');
    } catch (err) {
      toast.error('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (skill) => {
    setDeleteConfirm({ isOpen: true, skill });
  };

  const executeDelete = async () => {
    const skill = deleteConfirm.skill;
    if (!skill) return;
    
    const targetId = skill._id || skill.name;
    try {
      await apiFetch(`/skills/${targetId}`, { method: 'DELETE' });
      setSkills(prev => prev.filter(s => (s._id || s.name) !== targetId));
      await refetch();
      toast.success('Skill deleted successfully');
    } catch (err) {
      toast.error('Delete failed: ' + err.message);
    } finally {
      setDeleteConfirm({ isOpen: false, skill: null });
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Skills Matrix Editor</h1>
          <p className="text-xs text-gray-400">Manage technical stack categories, icons, tags & proficiency levels</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {editingSkill && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl glass-panel space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white font-display">
            {editingSkill._id ? 'Edit Skill' : 'Create New Skill'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 font-mono uppercase mb-1">Skill Name</label>
              <input
                type="text"
                required
                value={editingSkill.name}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-mono uppercase mb-1">Category</label>
              <select
                value={editingSkill.category}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#0B0F14] border border-white/10 text-white"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend & API</option>
                <option value="data">Data Analytics</option>
                <option value="ai">AI & ML</option>
                <option value="database">Database</option>
                <option value="devops">DevOps & CRM</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-mono uppercase mb-1">Proficiency Level ({editingSkill.level}%)</label>
              <input
                type="range"
                min="10"
                max="100"
                value={editingSkill.level}
                onChange={(e) => setEditingSkill({ ...editingSkill, level: Number(e.target.value) })}
                className="w-full accent-cyan-primary mt-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingSkill(null)}
              className="px-4 py-2 rounded-xl bg-white/5 text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-[#00E5FF] text-black font-bold shadow-cyan-glow"
            >
              {saving ? 'Saving...' : 'Save Skill'}
            </button>
          </div>
        </form>
      )}

      {/* Skills Table List */}
      <div className="p-6 rounded-3xl glass-panel overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="text-[10px] font-mono text-gray-500 uppercase border-b border-white/10">
            <tr>
              <th className="pb-3">Skill Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Tag</th>
              <th className="pb-3">Level</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {skills.map((s) => (
              <tr key={s._id || s.name} className="hover:bg-white/[0.02]">
                <td className="py-3 font-semibold text-white">{s.name}</td>
                <td className="py-3 font-mono text-cyan-primary">{s.category}</td>
                <td className="py-3 font-mono text-gray-400">{s.tag}</td>
                <td className="py-3 font-mono font-bold">{s.level}%</td>
                <td className="py-3 text-right space-x-2">
                  <button onClick={() => setEditingSkill(s)} className="p-1.5 rounded-lg bg-white/5 hover:text-cyan-primary">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s)}
                    className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
