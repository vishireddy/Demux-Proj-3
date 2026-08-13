import { useState } from 'react';
import { ArrowLeft, Lock, ChevronDown } from 'lucide-react';
import { useApp, demoGovUsers } from '@/context/AppContext';

export default function GovLogin() {
  const { setView, setGovUser, t } = useApp();
  const [selectedId, setSelectedId] = useState('g_state');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = demoGovUsers.find(u => u.id === selectedId);
    if (!user) return;
    if (password !== user.password) { setError('Wrong password. Use admin123'); return; }
    setGovUser(user);
    setView('gov-dashboard');
  };

  const selected = demoGovUsers.find(u => u.id === selectedId)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setView('farmer-login')} className="flex items-center gap-1 text-gray-600 font-medium">
          <ArrowLeft size={18} /> Back
        </button>
        <span className="font-bold text-gray-700">{t('govLogin')}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-slate-700 rounded-3xl flex items-center justify-center shadow-lg mb-4">
              <span className="text-4xl">🏛️</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800">Government / Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Official Agriculture Portal</p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Select Account</label>
              <div className="relative">
                <select
                  value={selectedId}
                  onChange={e => setSelectedId(e.target.value)}
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 appearance-none focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white pr-10"
                >
                  {demoGovUsers.map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.level})</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Show jurisdiction */}
            <div className="bg-slate-50 rounded-xl p-3 text-sm space-y-1">
              <div className="flex gap-2"><span className="text-gray-500 w-20">Level:</span><span className="font-semibold capitalize">{selected.level}</span></div>
              <div className="flex gap-2"><span className="text-gray-500 w-20">State:</span><span className="font-semibold">{selected.state}</span></div>
              {selected.district && <div className="flex gap-2"><span className="text-gray-500 w-20">District:</span><span className="font-semibold">{selected.district}</span></div>}
              {selected.mandal && <div className="flex gap-2"><span className="text-gray-500 w-20">Mandal:</span><span className="font-semibold">{selected.mandal}</span></div>}
              {selected.village && <div className="flex gap-2"><span className="text-gray-500 w-20">Village:</span><span className="font-semibold">{selected.village}</span></div>}
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder={t('enterPassword')}
                className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
              <strong>Demo password:</strong> <span className="font-mono">admin123</span>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-slate-700 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
