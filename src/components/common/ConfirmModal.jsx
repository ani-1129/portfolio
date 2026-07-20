import React, { useState } from 'react';
import { AlertTriangle, X, Lock } from 'lucide-react';
import { apiFetch } from '../../api/client';
import toast from 'react-hot-toast';

/**
 * Global confirmation modal for destructive actions.
 * Usage:
 *   <ConfirmModal
 *     isOpen={showModal}
 *     title="Delete Project"
 *     message="Are you sure you want to delete this project? This action cannot be undone."
 *     confirmText="Delete"
 *     onConfirm={() => handleDelete()}
 *     onCancel={() => setShowModal(false)}
 *     loading={deleting}
 *     variant="danger"
 *   />
 */
export default function ConfirmModal({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure? This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  variant = 'danger', // 'danger' | 'warning' | 'info'
  requirePassword = false
}) {
  const [password, setPassword] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: 'rgba(239,68,68,0.15)',
      iconColor: '#ef4444',
      btn: 'bg-red-500 hover:bg-red-600',
      border: 'border-red-500/20'
    },
    warning: {
      icon: 'rgba(251,191,36,0.15)',
      iconColor: '#fbbf24',
      btn: 'bg-amber-500 hover:bg-amber-600',
      border: 'border-amber-500/20'
    },
    info: {
      icon: 'rgba(0,229,255,0.15)',
      iconColor: '#00E5FF',
      btn: 'bg-[#00E5FF] hover:bg-[#00c8e0] text-black',
      border: 'border-[#00E5FF]/20'
    }
  };

  const v = variantStyles[variant] || variantStyles.danger;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={!loading ? onCancel : undefined}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md p-6 rounded-2xl bg-[#0E1217] border ${v.border} shadow-2xl`}
        style={{ animation: 'fadeInUp 0.2s ease-out' }}
      >
        {/* Close */}
        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: v.icon }}
        >
          <AlertTriangle className="w-6 h-6" style={{ color: v.iconColor }} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

        {/* Message */}
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">{message}</p>

        {requirePassword && (
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="password"
              placeholder="Enter admin password to confirm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1A1F2E] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ef4444] transition-colors"
              autoFocus
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={() => {
              setPassword('');
              onCancel();
            }}
            disabled={loading || localLoading}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={async () => {
              if (requirePassword) {
                if (!password) return toast.error('Password is required');
                setLocalLoading(true);
                try {
                  await apiFetch('/auth/delete-verify', {
                    method: 'POST',
                    body: JSON.stringify({ password })
                  });
                  setPassword('');
                  onConfirm();
                } catch (err) {
                  toast.error('Incorrect password');
                } finally {
                  setLocalLoading(false);
                }
              } else {
                onConfirm();
              }
            }}
            disabled={loading || localLoading}
            className={`px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2 ${v.btn}`}
          >
            {(loading || localLoading) && (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
              </svg>
            )}
            {(loading || localLoading) ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
