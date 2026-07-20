import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../api/client';
import { Mail, Trash2, CheckCircle2, Download, Search, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/common/ConfirmModal';

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null });

  const fetchMessages = async () => {
    try {
      const data = await apiFetch('/messages');
      setMessages(data || []);
    } catch (err) {
      console.log('Error fetching messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id) => {
    try {
      await apiFetch(`/messages/${id}/read`, { method: 'PUT' });
      await fetchMessages();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const executeDelete = async () => {
    if (!deleteConfirm.id) return;
    try {
      await apiFetch(`/messages/${deleteConfirm.id}`, { method: 'DELETE' });
      toast.success('Message deleted successfully');
      setDeleteConfirm({ isOpen: false, id: null });
      await fetchMessages();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const exportCSV = () => {
    const headers = 'Name,Email,Subject,Message,Date\n';
    const rows = messages.map(m => `"${m.name}","${m.email}","${m.subject || ''}","${m.message.replace(/"/g, '""')}","${new Date(m.createdAt).toLocaleDateString()}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-contact-messages.csv';
    a.click();
  };

  const filtered = messages.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    (m.subject && m.subject.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Recruiter Contact Inbox</h1>
          <p className="text-xs text-gray-400">View and manage client & recruiter messages</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-cyan-primary hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filtered.map((msg) => (
          <div
            key={msg._id}
            className={`p-6 rounded-3xl glass-panel space-y-3 transition-all ${
              !msg.isRead ? 'border-cyan-primary/30 bg-cyan-primary/[0.02]' : ''
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white text-sm">{msg.name}</span>
                <span className="font-mono text-cyan-primary">{msg.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-gray-500">
                  {new Date(msg.createdAt || Date.now()).toLocaleDateString()}
                </span>
                {!msg.isRead && (
                  <button
                    onClick={() => markRead(msg._id)}
                    className="px-2.5 py-1 rounded-full bg-cyan-primary/20 text-cyan-primary text-[10px] font-mono font-bold"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-xs font-semibold text-gray-200">
              Subject: {msg.subject || 'Portfolio Inquiry'}
            </div>

            <p className="text-xs text-gray-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
              {msg.message}
            </p>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        confirmText="Delete Message"
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, id: null })}
        requirePassword={true}
      />
    </div>
  );
}
