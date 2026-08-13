import { useState } from 'react';
import { Leaf, ArrowLeft, Phone, KeyRound, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import LanguageSelector from '@/components/LanguageSelector';
import { supabase } from '@/lib/supabase';

export default function FarmerLogin() {
  const { t, setView, setFarmer, farmers } = useApp();
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    // Accept international format (+<country><number>) or 10-digit local number
    const normalized = mobile.startsWith('+') ? mobile : mobile.replace(/^0+/, '');
    if (!normalized.startsWith('+') && normalized.length !== 10) { setError('Enter a valid 10-digit mobile number or include country code (e.g. +919876543210)'); return; }
    const searchMobile = normalized.startsWith('+') ? normalized.replace(/^\+91/, '') : normalized;
    const found = farmers.find(f => f.mobile === searchMobile);
    if (!found) { setError(t('farmerNotFound')); return; }
    setError('');
    setLoading(true);
    // Send OTP via Supabase (Supabase must be configured with a Twilio SMS provider)
    const phone = mobile.startsWith('+') ? mobile : `+91${mobile}`;
    supabase.auth.signInWithOtp({ phone })
      .then(({ error }: any) => {
        setLoading(false);
        if (error) setError(error.message || 'Failed to send OTP');
        else setStep('otp');
      })
      .catch((err: any) => { setLoading(false); setError(String(err)); });
  };

  const handleVerifyOtp = async () => {
    if (otp.length === 0) { setError('Enter the OTP'); return; }
    setLoading(true);
    setError('');
    const phone = mobile.startsWith('+') ? mobile : `+91${mobile}`;

    try {
      // Verify OTP via Supabase
      const verifyRes: any = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' } as any);
      setLoading(false);
      if (verifyRes?.error) {
        setError(verifyRes.error.message || t('invalidOtp'));
        return;
      }

      // Get authenticated user (optional)
      const userRes: any = await supabase.auth.getUser();
      const supaUser = userRes?.data?.user;
      const phoneUsed = supaUser?.phone || phone;

      // Try to fetch existing farmer record from `farmers` table
      const { data: farmersData, error: farmersErr }: any = await supabase.from('farmers').select('*').eq('phone', phoneUsed).limit(1);
      if (farmersErr) console.warn('Supabase fetch farmers error', farmersErr);

      let farmerRecord: any = null;
      if (!farmersData || farmersData.length === 0) {
        // Insert a minimal farmer record for this phone
        const toInsert = {
          phone: phoneUsed,
          mobile: phoneUsed.replace(/^\+91/, ''),
          name: 'Farmer',
          state: '', district: '', mandal: '', village: '', crops: [],
        };
        const { data: inserted, error: insertErr }: any = await supabase.from('farmers').insert([toInsert]).select().single();
        if (insertErr) {
          console.warn('Insert farmer failed', insertErr);
          farmerRecord = toInsert;
        } else {
          farmerRecord = inserted;
        }
      } else {
        farmerRecord = farmersData[0];
      }

      // Map Supabase farmer record to local `Farmer` type and continue
      setFarmer(farmerRecord as any);
      setView('farmer-dashboard');
    } catch (err: any) {
      setLoading(false);
      setError(String(err));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-green-100 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setView('landing')} className="flex items-center gap-1 text-green-700 font-medium">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
            <Leaf size={14} className="text-white" />
          </div>
          <span className="font-bold text-green-700">KrishiGuard</span>
        </div>
        <LanguageSelector />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          {/* Icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center shadow-lg mb-4">
              <span className="text-4xl">🌾</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              {lang_title(step)}
            </h1>
            <p className="text-gray-500 text-sm mt-1 text-center">
              {step === 'mobile'
                ? t('enterMobile')
                : `OTP sent to ${mobile}. ${t('demoOtp')}`}
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-md p-6 space-y-4">
            {step === 'mobile' ? (
              <>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    maxLength={15}
                    value={mobile}
                    onChange={e => setMobile(e.target.value.replace(/[^\d+]/g, ''))}
                    placeholder={t('enterMobileNumber')}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-2xl text-lg font-mono focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  {t('sendOtp')} <ChevronRight size={20} />
                </button>

                {/* Demo shortcuts */}
                <div className="bg-green-50 rounded-2xl p-3 space-y-2">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Demo Farmers</p>
                  {[
                    { mobile: '9876543210', name: 'Ravi Kumar' },
                    { mobile: '9876543211', name: 'Lakshmi' },
                    { mobile: '9876543212', name: 'Suresh' },
                  ].map(d => (
                    <button
                      key={d.mobile}
                      onClick={() => { setMobile(d.mobile); setError(''); }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-green-100 transition-colors text-sm flex justify-between"
                    >
                      <span className="font-medium text-gray-700">{d.name}</span>
                      <span className="text-gray-400 font-mono">{d.mobile}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-2xl text-2xl font-mono tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
                  Check your SMS for the OTP (in dev mode the OTP is logged to the browser console).
                </div>
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? 'Verifying...' : t('verifyOtp')}
                  {!loading && <ChevronRight size={20} />}
                </button>
                <button onClick={() => { setStep('mobile'); setOtp(''); setError(''); }} className="w-full text-gray-500 text-sm py-2">
                  {t('back')} — change number
                </button>
              </>
            )}
          </div>

          {/* Other logins */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => setView('expert-login')}
              className="w-full py-3 border-2 border-green-200 rounded-2xl font-semibold text-green-700 hover:bg-green-50 transition-colors"
            >
              👨‍🔬 {t('expertLogin')}
            </button>
            <button
              onClick={() => setView('gov-login')}
              className="w-full py-3 border-2 border-gray-200 rounded-2xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              🏛️ {t('govLogin')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function lang_title(step: 'mobile' | 'otp') {
  return step === 'mobile' ? 'Farmer Login' : 'Verify OTP';
}
