import { useState } from 'react';
import { ArrowLeft, User, Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const DEMO_EXPERTS = [
  { username: 'expert1', password: 'expert123', name: 'Dr. Anil Reddy', specialization: 'Pest Management' },
  { username: 'expert2', password: 'expert123', name: 'Dr. Priya Sharma', specialization: 'Water Management' },
];

export default function ExpertLogin() {
  const { setView, t } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const found = DEMO_EXPERTS.find(e => e.username === username && e.password === password);
    if (!found) { setError('Invalid credentials. Try expert1 / expert123'); return; }
    setView('expert-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="bg-white border-b border-blue-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setView('farmer-login')} className="flex items-center gap-1 text-blue-700 font-medium">
          <ArrowLeft size={18} /> Back
        </button>
        <span className="font-bold text-blue-700">{t('expertLogin')}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg mb-4">
              <span className="text-4xl">👨‍🔬</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800">Expert Login</h1>
            <p className="text-gray-500 text-sm mt-1">Agricultural Expert Portal</p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 space-y-4">
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700 space-y-1">
              <p><strong>Demo:</strong> expert1 / expert123</p>
              <p>or: expert2 / expert123</p>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
