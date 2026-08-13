import { useState } from 'react';
import { LogOut, MapPin, Thermometer, Droplets, CloudRain, Plus, ChevronRight, TrendingUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockWeather } from '@/data/mockData';
import { getRecommendations } from '@/lib/recommendations';
import ReadAloudBtn from '@/components/ReadAloudBtn';
import CropUpdateModal from '../CropUpdateModal';

export default function HomeTab() {
  const { farmer, setFarmer, setView, t } = useApp();
  const [showCropModal, setShowCropModal] = useState(false);

  if (!farmer) return null;

  const weather = mockWeather[farmer.district] || Object.values(mockWeather)[0];
  const recs = getRecommendations(weather, farmer.crops);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? t('goodMorning') : hour < 17 ? t('goodAfternoon') : t('goodEvening');

  const totalAcres = farmer.crops.reduce((s, c) => s + c.acres, 0);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 px-4 pt-10 pb-16 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-green-200 text-sm font-medium">{greeting},</p>
            <h1 className="text-2xl font-extrabold">{farmer.name}</h1>
            <div className="flex items-center gap-1 mt-1 text-green-200 text-sm">
              <MapPin size={13} />
              <span>{farmer.village}, {farmer.mandal}, {farmer.district}</span>
            </div>
          </div>
          <button
            onClick={() => { setFarmer(null); setView('landing'); }}
            className="bg-white/20 rounded-xl px-3 py-2 text-sm flex items-center gap-1 hover:bg-white/30 transition-colors"
          >
            <LogOut size={15} /> {t('logout')}
          </button>
        </div>

        {/* Farm stats */}
        <div className="flex gap-3">
          <div className="bg-white/20 rounded-2xl px-4 py-2 text-center flex-1 backdrop-blur-sm">
            <div className="text-xl font-bold">{farmer.crops.length}</div>
            <div className="text-xs text-green-200">{t('crops')}</div>
          </div>
          <div className="bg-white/20 rounded-2xl px-4 py-2 text-center flex-1 backdrop-blur-sm">
            <div className="text-xl font-bold">{totalAcres}</div>
            <div className="text-xs text-green-200">{t('acresText')}</div>
          </div>
          <div className="bg-white/20 rounded-2xl px-4 py-2 text-center flex-1 backdrop-blur-sm">
            <div className="text-xl font-bold">{weather.temp}°C</div>
            <div className="text-xs text-green-200">{weather.location}</div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-8 space-y-4 pb-4">
        {/* Weather card */}
        <div className="bg-white rounded-3xl shadow-md p-5 border border-blue-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-gray-800 text-lg">🌦️ {t('weather')}</h2>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-0.5">
                <MapPin size={12} /> {weather.location}
              </div>
            </div>
            <span className="text-4xl">{weather.emoji}</span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="bg-red-50 rounded-2xl p-3 text-center">
              <Thermometer size={18} className="mx-auto text-red-500 mb-1" />
              <div className="font-bold text-gray-800">{weather.temp}°C</div>
              <div className="text-xs text-gray-500">{t('temperature')}</div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-3 text-center">
              <Droplets size={18} className="mx-auto text-blue-500 mb-1" />
              <div className="font-bold text-gray-800">{weather.humidity}%</div>
              <div className="text-xs text-gray-500">{t('humidity')}</div>
            </div>
            <div className="bg-sky-50 rounded-2xl p-3 text-center">
              <CloudRain size={18} className="mx-auto text-sky-500 mb-1" />
              <div className="font-bold text-gray-800">{weather.rainProbability}%</div>
              <div className="text-xs text-gray-500">{t('rainProbability')}</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-2">
            <span className="text-xl">{weather.tomorrow.emoji}</span>
            <div>
              <span className="text-xs text-gray-500 font-semibold">{t('tomorrow')}: </span>
              <span className="text-sm text-gray-700">{weather.tomorrow.condition}</span>
            </div>
          </div>
        </div>

        {/* My Crops */}
        <div className="bg-white rounded-3xl shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 text-lg">🌾 {t('myCrops')}</h2>
            <button
              onClick={() => setShowCropModal(true)}
              className="flex items-center gap-1 text-green-600 text-sm font-semibold bg-green-50 px-3 py-1.5 rounded-xl hover:bg-green-100 transition-colors"
            >
              <Plus size={15} /> {t('addCrop')}
            </button>
          </div>
          {farmer.crops.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">{t('noCropsSelected')}</p>
          ) : (
            <div className="space-y-2">
              {farmer.crops.map(c => (
                <div key={c.name} className="flex items-center justify-between bg-green-50 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.emoji}</span>
                    <span className="font-semibold text-gray-800">{c.name}</span>
                  </div>
                  <span className="bg-white text-green-700 font-bold text-sm px-3 py-1 rounded-full border border-green-200">
                    {c.acres} {t('acresText')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Recommendations */}
        <div className="bg-white rounded-3xl shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 text-lg">🤖 {t('aiRecommendations')}</h2>
            <ReadAloudBtn text={recs.map(r => `${r.crop}: ${r.advice}`).join('. ')} />
          </div>
          <div className="space-y-3">
            {recs.map(rec => (
              <div
                key={rec.crop}
                className={`rounded-2xl p-4 border-l-4 ${
                  rec.severity === 'danger' ? 'bg-red-50 border-red-500' :
                  rec.severity === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-green-50 border-green-500'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{rec.emoji}</span>
                  <span className="font-bold text-gray-800">{rec.crop}</span>
                  {rec.severity === 'danger' && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">Action Needed</span>}
                  {rec.severity === 'warning' && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">Monitor</span>}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{rec.advice}</p>
              </div>
            ))}
            {recs.length === 0 && <p className="text-gray-400 text-sm text-center py-4">{t('noCropsSelected')}</p>}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-3xl shadow-md p-5">
          <h2 className="font-bold text-gray-800 text-lg mb-4">⚡ {t('quickActions')}</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '📚', label: t('farmingKnowledge'), color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
              { emoji: '💰', label: t('mandiPrices'), color: 'bg-orange-50 border-orange-200 text-orange-700' },
              { emoji: '👨‍🌾', label: t('askExpert'), color: 'bg-blue-50 border-blue-200 text-blue-700' },
              { emoji: '⚠️', label: t('earlyCropAlerts'), color: 'bg-red-50 border-red-200 text-red-700' },
            ].map(a => (
              <div key={a.label} className={`border rounded-2xl p-4 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${a.color}`}>
                <span className="text-xl">{a.emoji}</span>
                <span className="text-sm font-semibold">{a.label}</span>
                <ChevronRight size={14} className="ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCropModal && <CropUpdateModal onClose={() => setShowCropModal(false)} />}
    </div>
  );
}
