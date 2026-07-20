import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { apiFetch } from '../../api/client';
import { Layers, Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/common/ConfirmModal';

export default function ServicesEditor() {
  const { content, refetch } = usePortfolio();
  const [services, setServices] = useState(content.services || []);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, index: null });

  const addService = () => {
    setServices([
      ...services,
      {
        id: 'service_' + Date.now(),
        title: 'New Service Capability',
        icon: 'Layout',
        description: 'Describe the outcome and tech stack used for this service.',
        deliverables: ['Deliverable item 1', 'Deliverable item 2']
      }
    ]);
  };

  const handleDeleteService = (index) => {
    setDeleteConfirm({ isOpen: true, index });
  };

  const executeDelete = async () => {
    const index = deleteConfirm.index;
    if (index === null) return;

    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);

    try {
      await apiFetch('/services', {
        method: 'PUT',
        body: JSON.stringify(newServices)
      });
      await refetch();
      toast.success('Service capability deleted');
    } catch (err) {
      toast.error('Failed to delete on server: ' + err.message);
    } finally {
      setDeleteConfirm({ isOpen: false, index: null });
    }
  };

  const addDeliverable = (serviceIndex) => {
    const newS = [...services];
    newS[serviceIndex].deliverables = [...(newS[serviceIndex].deliverables || []), 'New Deliverable'];
    setServices(newS);
  };

  const deleteDeliverable = (serviceIndex, delIndex) => {
    const newS = [...services];
    newS[serviceIndex].deliverables = newS[serviceIndex].deliverables.filter((_, i) => i !== delIndex);
    setServices(newS);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch('/services', {
        method: 'PUT',
        body: JSON.stringify(services)
      });
      await refetch();
      toast.success('Services saved successfully');
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
          <h1 className="text-xl font-bold font-display text-white">Services & Capabilities Editor</h1>
          <p className="text-xs text-gray-400">Add, edit, or delete offerings & deliverables list</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addService}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-primary text-xs font-semibold hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold text-xs shadow-cyan-glow hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Services'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((service, idx) => (
          <div key={idx} className="p-6 rounded-3xl glass-panel space-y-4 text-xs relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono text-cyan-primary">//#0{idx + 1} SERVICE DOMAIN</span>
              <button
                type="button"
                onClick={() => handleDeleteService(idx)}
                className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              value={service.title}
              onChange={(e) => {
                const newS = [...services];
                newS[idx].title = e.target.value;
                setServices(newS);
              }}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
              placeholder="Service Title"
            />

            <textarea
              rows={3}
              value={service.description}
              onChange={(e) => {
                const newS = [...services];
                newS[idx].description = e.target.value;
                setServices(newS);
              }}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 resize-none"
              placeholder="Description"
            />

            {/* Deliverables Checklist */}
            <div className="pt-3 border-t border-white/5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 uppercase">
                <span>Deliverables ({service.deliverables?.length || 0})</span>
                <button
                  type="button"
                  onClick={() => addDeliverable(idx)}
                  className="text-cyan-primary hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Deliverable</span>
                </button>
              </div>

              {service.deliverables?.map((del, dIdx) => (
                <div key={dIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={del}
                    onChange={(e) => {
                      const newS = [...services];
                      newS[idx].deliverables[dIdx] = e.target.value;
                      setServices(newS);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-200 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => deleteDeliverable(idx, dIdx)}
                    className="p-1 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
      
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Service"
        message="Are you sure you want to delete this service capability? This action cannot be undone."
        confirmText="Delete Service"
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, index: null })}
        requirePassword={true}
      />
    </div>
  );
}
