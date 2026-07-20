import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiFetch } from '../../api/client';
import { MessageSquareQuote, Save, CheckCircle2, Plus, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/common/ConfirmModal';

export default function TestimonialsEditor() {
  const { content, refetch } = usePortfolio();
  const [testimonials, setTestimonials] = useState(content.testimonials || []);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, index: null });

  const addTestimonial = () => {
    setTestimonials([
      ...testimonials,
      {
        id: 'test_' + Date.now(),
        name: 'Client / Mentor Name',
        role: 'Position & Organization',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        review: 'Add recommendation feedback here...'
      }
    ]);
  };

  const handleDelete = (index) => {
    setDeleteConfirm({ isOpen: true, index });
  };

  const executeDelete = async () => {
    const index = deleteConfirm.index;
    if (index === null) return;
    
    const newTestimonials = testimonials.filter((_, i) => i !== index);
    setTestimonials(newTestimonials);
    
    try {
      await apiFetch('/testimonials', {
        method: 'PUT',
        body: JSON.stringify(newTestimonials)
      });
      await refetch();
      toast.success('Testimonial deleted successfully');
    } catch (err) {
      toast.error('Failed to delete on server: ' + err.message);
    } finally {
      setDeleteConfirm({ isOpen: false, index: null });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch('/testimonials', {
        method: 'PUT',
        body: JSON.stringify(testimonials)
      });
      await refetch();
      toast.success('Testimonials saved successfully');
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
          <h1 className="text-xl font-bold font-display text-white">Testimonials & Recommendations Editor</h1>
          <p className="text-xs text-gray-400">Add, edit, or delete mentor & peer recommendations</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addTestimonial}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-primary text-xs font-semibold hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Testimonials'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {testimonials.map((t, idx) => (
          <div key={idx} className="p-6 rounded-3xl glass-panel space-y-3 text-xs relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-cyan-primary">//#0{idx + 1} TESTIMONIAL</span>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  title="Delete Testimonial"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 font-mono text-[10px] uppercase mb-1">Author Name</label>
                <input
                  type="text"
                  value={t.name}
                  onChange={(e) => {
                    const newT = [...testimonials];
                    newT[idx].name = e.target.value;
                    setTestimonials(newT);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
                  placeholder="Author Name"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-mono text-[10px] uppercase mb-1">Role & Company</label>
                <input
                  type="text"
                  value={t.role}
                  onChange={(e) => {
                    const newT = [...testimonials];
                    newT[idx].role = e.target.value;
                    setTestimonials(newT);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-primary"
                  placeholder="Role & Organization"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 font-mono text-[10px] uppercase mb-1">Avatar Image URL</label>
              <input
                type="text"
                value={t.avatar || ''}
                onChange={(e) => {
                  const newT = [...testimonials];
                  newT[idx].avatar = e.target.value;
                  setTestimonials(newT);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-mono"
                placeholder="Avatar Image URL"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-mono text-[10px] uppercase mb-1">Review Quote</label>
              <textarea
                rows={3}
                value={t.review}
                onChange={(e) => {
                  const newT = [...testimonials];
                  newT[idx].review = e.target.value;
                  setTestimonials(newT);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 resize-none"
                placeholder="Recommendation Quote Text"
              />
            </div>
          </div>
        ))}
      </div>
      
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmText="Delete Testimonial"
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, index: null })}
        requirePassword={true}
      />
    </div>
  );
}
