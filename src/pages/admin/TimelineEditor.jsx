import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiFetch } from '../../api/client';
import { GraduationCap, Award, Save, CheckCircle2, Plus, Trash2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/common/ConfirmModal';

export default function TimelineEditor() {
  const { content, refetch } = usePortfolio();
  const [timeline, setTimeline] = useState(content.timeline || { education: [], certifications: [] });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, type: null, index: null });

  // Education Helpers
  const addEducation = () => {
    setTimeline({
      ...timeline,
      education: [
        ...timeline.education,
        {
          period: '2026 – Present',
          title: 'New Degree / Course',
          institution: 'University / Institute Name',
          grade: 'CGPA: 8.0 / 10',
          badge: 'Pursuing',
          details: 'Focus area and description...',
          courses: ['Course 1', 'Course 2']
        }
      ]
    });
  };

  const handleDeleteEdu = (index) => {
    setDeleteConfirm({ isOpen: true, type: 'education', index });
  };

  // Certifications Helpers
  const addCertification = () => {
    setTimeline({
      ...timeline,
      certifications: [
        ...(timeline.certifications || []),
        {
          title: 'New Certification',
          issuer: 'Issuer Name (e.g. HackerRank / AWS)',
          date: 'Verified',
          status: 'Verified',
          icon: 'Award',
          link: 'https://'
        }
      ]
    });
  };

  const handleDeleteCert = (index) => {
    setDeleteConfirm({ isOpen: true, type: 'certification', index });
  };

  const executeDelete = async () => {
    const { type, index } = deleteConfirm;
    if (type === null || index === null) return;

    let newTimeline;
    if (type === 'education') {
      const newEdu = timeline.education.filter((_, i) => i !== index);
      newTimeline = { ...timeline, education: newEdu };
    } else {
      const newCerts = timeline.certifications.filter((_, i) => i !== index);
      newTimeline = { ...timeline, certifications: newCerts };
    }
    
    setTimeline(newTimeline);

    try {
      await apiFetch('/timeline', {
        method: 'PUT',
        body: JSON.stringify(newTimeline)
      });
      await refetch();
      toast.success(`${type === 'education' ? 'Degree' : 'Certification'} deleted`);
    } catch (err) {
      toast.error('Failed to delete on server: ' + err.message);
    } finally {
      setDeleteConfirm({ isOpen: false, type: null, index: null });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch('/timeline', {
        method: 'PUT',
        body: JSON.stringify(timeline)
      });
      await refetch();
      toast.success('Timeline saved successfully');
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
          <h1 className="text-xl font-bold font-display text-white">Timeline & Certifications Editor</h1>
          <p className="text-xs text-gray-400">Add, edit, or delete academic degrees & verified certifications</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Timeline'}</span>
        </button>
      </div>

      {/* Education Section */}
      <div className="p-6 rounded-3xl glass-panel space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-primary" />
            <span>Academic Degrees ({timeline.education?.length || 0})</span>
          </h3>
          <button
            onClick={addEducation}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-cyan-primary text-xs font-semibold hover:bg-white/10 transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Degree Entry</span>
          </button>
        </div>

        <div className="space-y-4">
          {timeline.education?.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 text-xs relative group">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-mono text-cyan-primary">//#0{idx + 1} DEGREE</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteEdu(idx)}
                    className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  value={item.period}
                  onChange={(e) => {
                    const newTimeline = { ...timeline };
                    newTimeline.education[idx].period = e.target.value;
                    setTimeline(newTimeline);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-cyan-primary font-mono font-bold w-1/3"
                  placeholder="Period (e.g. 2025–2027)"
                />
                <input
                  type="text"
                  value={item.grade}
                  onChange={(e) => {
                    const newTimeline = { ...timeline };
                    newTimeline.education[idx].grade = e.target.value;
                    setTimeline(newTimeline);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono font-bold w-1/3 text-right"
                  placeholder="Grade / CGPA"
                />
              </div>

              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const newTimeline = { ...timeline };
                  newTimeline.education[idx].title = e.target.value;
                  setTimeline(newTimeline);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
                placeholder="Degree Title"
              />

              <input
                type="text"
                value={item.institution}
                onChange={(e) => {
                  const newTimeline = { ...timeline };
                  newTimeline.education[idx].institution = e.target.value;
                  setTimeline(newTimeline);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300"
                placeholder="Institution / University"
              />

              <textarea
                rows={2}
                value={item.details}
                onChange={(e) => {
                  const newTimeline = { ...timeline };
                  newTimeline.education[idx].details = e.target.value;
                  setTimeline(newTimeline);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 resize-none"
                placeholder="Details / Description"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="p-6 rounded-3xl glass-panel space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-primary" />
            <span>Verified Certifications ({timeline.certifications?.length || 0})</span>
          </h3>
          <button
            onClick={addCertification}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-cyan-primary text-xs font-semibold hover:bg-white/10 transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {timeline.certifications?.map((cert, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 text-xs relative">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={cert.title}
                  onChange={(e) => {
                    const newTimeline = { ...timeline };
                    newTimeline.certifications[idx].title = e.target.value;
                    setTimeline(newTimeline);
                  }}
                  className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold mr-2"
                  placeholder="Cert Title"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteCert(idx)}
                  className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-red-400"
                  title="Delete Certification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => {
                  const newTimeline = { ...timeline };
                  newTimeline.certifications[idx].issuer = e.target.value;
                  setTimeline(newTimeline);
                }}
                className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300"
                placeholder="Issuer (e.g. HackerRank)"
              />

              <input
                type="text"
                value={cert.link || ''}
                onChange={(e) => {
                  const newTimeline = { ...timeline };
                  newTimeline.certifications[idx].link = e.target.value;
                  setTimeline(newTimeline);
                }}
                className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-cyan-primary font-mono text-[11px]"
                placeholder="Verification Link URL"
              />
            </div>
          ))}
        </div>
      </div>
      
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Item"
        message={`Are you sure you want to delete this ${deleteConfirm.type}? This action cannot be undone.`}
        confirmText="Delete Entry"
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, index: null })}
        requirePassword={true}
      />
    </div>
  );
}
