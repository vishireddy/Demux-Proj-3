import { useState } from 'react';
import { Leaf, CloudRain, Users, ShoppingCart, Bell, Brain, BookOpen, Phone, Mail, Menu, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import LanguageSelector from '@/components/LanguageSelector';

const services = [
  { icon: CloudRain, label: 'Weather', labelTe: 'వాతావరణం', labelHi: 'मौसम', color: 'bg-sky-50 text-sky-600 border-sky-200' },
  { icon: Users, label: 'Expert Guidance', labelTe: 'నిపుణుల మార్గదర్శకత్వం', labelHi: 'विशेषज्ञ मार्गदर्शन', color: 'bg-green-50 text-green-600 border-green-200' },
  { icon: ShoppingCart, label: 'Mandi Prices', labelTe: 'మండి ధరలు', labelHi: 'मंडी भाव', color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { icon: Bell, label: 'Early Crop Alerts', labelTe: 'పంట హెచ్చరికలు', labelHi: 'फसल चेतावनी', color: 'bg-red-50 text-red-600 border-red-200' },
  { icon: Brain, label: 'AI Recommendations', labelTe: 'AI సిఫార్సులు', labelHi: 'AI सिफारिशें', color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { icon: BookOpen, label: 'Farming Knowledge', labelTe: 'వ్యవసాయ పరిజ్ఞానం', labelHi: 'कृषि ज्ञान', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
];

export default function Landing() {
  const { setView, lang, t } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const serviceLabel = (s: typeof services[0]) =>
    lang === 'te' ? s.labelTe : lang === 'hi' ? s.labelHi : s.label;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-green-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shadow">
              <Leaf size={20} className="text-white" />
            </div>
            <div>
              <span className="font-extrabold text-green-700 text-lg leading-none">KrishiGuard</span>
              <div className="text-[10px] text-green-500 leading-none">Smart Agriculture</div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <LanguageSelector />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600">
            <a href="#services" className="hover:text-green-600 transition-colors">{t('services')}</a>
            <a href="#contact" className="hover:text-green-600 transition-colors">{t('contactUs')}</a>
            <button
              onClick={() => setView('farmer-login')}
              className="bg-green-600 text-white px-5 py-2.5 rounded-full hover:bg-green-700 transition-colors font-bold shadow-md text-base min-w-[140px]"
            >
              {t('login')}
            </button>
          </nav>

          {/* Mobile nav toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-green-700">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-green-100 px-4 py-3 flex flex-col gap-3">
            <a href="#services" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 font-medium border-b border-gray-100">{t('services')}</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="py-2 text-gray-700 font-medium border-b border-gray-100">{t('contactUs')}</a>
            <button
              onClick={() => { setView('farmer-login'); setMenuOpen(false); }}
              className="bg-green-600 text-white py-3 rounded-xl font-bold text-center"
            >
              {t('login')}
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-8 right-8 w-48 h-48 rounded-full bg-yellow-300 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <span>🌱</span> AI-Powered Smart Agriculture
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            KrishiGuard
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('tagline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setView('farmer-login')}
              className="bg-white text-green-700 px-10 py-5 rounded-2xl font-extrabold text-xl hover:bg-green-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 min-w-[230px] border-2 border-white/80"
            >
              🌾 {lang === 'te' ? 'రైతు లాగిన్' : lang === 'hi' ? 'किसान लॉगिन' : 'Farmer Login'}
            </button>
            <button
              onClick={() => setView('expert-login')}
              className="bg-white/20 border border-white/40 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all backdrop-blur-sm min-w-[180px]"
            >
              👨‍🔬 {lang === 'te' ? 'నిపుణుడు' : lang === 'hi' ? 'विशेषज्ञ' : 'Expert'}
            </button>
            <button
              onClick={() => setView('gov-login')}
              className="bg-white/20 border border-white/40 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all backdrop-blur-sm min-w-[180px]"
            >
              🏛️ {lang === 'te' ? 'ప్రభుత్వం' : lang === 'hi' ? 'सरकार' : 'Government'}
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-50 border-y border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '12,000+', label: lang === 'te' ? 'రైతులు' : lang === 'hi' ? 'किसान' : 'Farmers' },
            { value: '3', label: lang === 'te' ? 'జిల్లాలు' : lang === 'hi' ? 'जिले' : 'Districts' },
            { value: '98%', label: lang === 'te' ? 'హెచ్చరిక ఖచ్చితత్వం' : lang === 'hi' ? 'चेतावनी सटीकता' : 'Alert Accuracy' },
            { value: '24/7', label: lang === 'te' ? 'పర్యవేక్షణ' : lang === 'hi' ? 'निगरानी' : 'Monitoring' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold text-green-700">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2">{t('services')}</h2>
        <p className="text-gray-500 text-center mb-10">Everything you need to protect and grow your crops</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map(s => (
            <div key={s.label} className={`border rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer ${s.color}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.color} border`}>
                <s.icon size={28} />
              </div>
              <span className="font-semibold text-sm leading-tight">{serviceLabel(s)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: '📱', title: 'Login with Mobile', desc: 'Enter your mobile number and OTP. Your farm data is already registered.' },
              { step: '2', icon: '🌦️', title: 'Get Smart Alerts', desc: 'AI analyzes weather and sends crop-specific recommendations to your phone.' },
              { step: '3', icon: '🌾', title: 'Protect Your Crops', desc: 'Act on timely advice from experts and government to maximize your yield.' },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 font-extrabold text-xl flex items-center justify-center mx-auto mb-4">{item.step}</div>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-10">{t('contactUs')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-2xl p-6 flex items-center gap-4 border border-green-100">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center"><Phone size={22} className="text-white" /></div>
            <div>
              <div className="font-semibold text-gray-800">Farmer Helpline</div>
              <div className="text-green-700 font-bold text-lg">1800-180-1551</div>
              <div className="text-xs text-gray-500">Mon–Sat, 6 AM – 10 PM</div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 flex items-center gap-4 border border-blue-100">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center"><Mail size={22} className="text-white" /></div>
            <div>
              <div className="font-semibold text-gray-800">Email Support</div>
              <div className="text-blue-700 font-bold">support@krishiguard.in</div>
              <div className="text-xs text-gray-500">Response within 24 hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm mt-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf size={16} className="text-green-400" />
          <span className="text-white font-bold">KrishiGuard</span>
        </div>
        <p>AI-Powered Smart Agriculture & Early Crop Warning Platform</p>
        <p className="mt-1 text-gray-600">© 2026 KrishiGuard. Built for farmers, by innovators.</p>
      </footer>
    </div>
  );
}
