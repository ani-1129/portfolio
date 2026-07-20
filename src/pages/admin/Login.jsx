import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Access denied.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-grid-pattern"
      style={{ background: '#05070D' }}
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Outer glow ring */}
        <div className="absolute -inset-px rounded-[32px] pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.3) 0%, transparent 50%, rgba(0,157,255,0.15) 100%)', filter: 'blur(1px)' }} />

        {/* Card */}
        <div className="relative p-8 rounded-[30px]" style={{ background: '#080C14', border: '1px solid rgba(0,229,255,0.2)', boxShadow: '0 40px 80px rgba(0,0,0,0.9)' }}>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative mx-auto w-16 h-16 mb-5">
              <div className="absolute -inset-2 rounded-full animate-glow-pulse pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)' }} />
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00E5FF, #009DFF)', boxShadow: '0 0 30px rgba(0,229,255,0.5)' }}>
                <ShieldCheck className="w-8 h-8 text-black" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold font-display text-white tracking-tight">Admin CMS Portal</h1>
            <p className="text-xs text-gray-500 mt-1 font-mono">Aniket Singh · Portfolio Management</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl text-xs font-semibold text-center"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest mb-1.5" style={{ color: '#6b7280' }}>
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                  style={{ background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.12)' }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,229,255,0.5)'; e.target.style.background = 'rgba(0,229,255,0.06)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(0,229,255,0.12)'; e.target.style.background = 'rgba(0,229,255,0.03)'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest mb-1.5" style={{ color: '#6b7280' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                  style={{ background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.12)' }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(0,229,255,0.5)'; e.target.style.background = 'rgba(0,229,255,0.06)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(0,229,255,0.12)'; e.target.style.background = 'rgba(0,229,255,0.03)'; }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
              style={{ background: 'linear-gradient(90deg, #00E5FF, #009DFF)', color: '#000', boxShadow: '0 0 30px rgba(0,229,255,0.4)' }}
              onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.boxShadow = '0 0 50px rgba(0,229,255,0.6)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.4)'; }}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Hint Removed for Security */}
        </div>
      </div>
    </div>
  );
}
