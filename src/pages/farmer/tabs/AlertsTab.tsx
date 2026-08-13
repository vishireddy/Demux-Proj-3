import { useApp } from '@/context/AppContext';
import { mockWeather } from '@/data/mockData';
import { getAlerts } from '@/lib/recommendations';
import ReadAloudBtn from '@/components/ReadAloudBtn';
import { ShieldCheck } from 'lucide-react';

export default function AlertsTab() {
  const { farmer, t } = useApp();
  if (!farmer) return null;

  const weather = mockWeather[farmer.district] || Object.values(mockWeather)[0];
  const alerts = getAlerts(weather, farmer.crops);

  const allAlertsText = alerts.join('. ');

  return (
    <div className="flex flex-col">
      <div className="bg-gradient-to-br from-red-600 to-orange-600 px-4 pt-10 pb-12 text-white">
        <h1 className="text-2xl font-extrabold mb-1">⚠️ {t('alerts')}</h1>
        <p className="text-red-100 text-sm">{farmer.district} • {new Date().toLocaleDateString()}</p>
      </div>

      <div className="px-4 -mt-6 space-y-3 pb-4">
        {alerts.length > 0 && (
          <div className="flex justify-end mb-1">
            <ReadAloudBtn text={allAlertsText} />
          </div>
        )}

        {alerts.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center text-center">
            <ShieldCheck size={52} className="text-green-500 mb-3" />
            <h3 className="font-bold text-gray-800 text-lg mb-1">All Clear!</h3>
            <p className="text-gray-500 text-sm">{t('noAlerts')}</p>
          </div>
        ) : (
          alerts.map((alert, i) => {
            const isDanger = alert.toLowerCase().includes('danger') || alert.toLowerCase().includes('heavy');
            const isWarning = alert.toLowerCase().includes('warn') || alert.toLowerCase().includes('alert') || alert.toLowerCase().includes('risk');
            return (
              <div
                key={i}
                className={`bg-white rounded-3xl shadow-md p-5 border-l-4 ${
                  isDanger ? 'border-red-500' : isWarning ? 'border-yellow-500' : 'border-blue-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{isDanger ? '🔴' : isWarning ? '🟡' : '🔵'}</span>
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm leading-relaxed">{alert}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-400">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <ReadAloudBtn text={alert} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Weather warning */}
        {weather.rainProbability > 50 && (
          <div className="bg-sky-50 rounded-3xl shadow-md p-5 border border-sky-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌧️</span>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Weather Advisory</p>
                <p className="text-gray-600 text-sm">{weather.tomorrow.condition} — Rain probability: {weather.tomorrow.rainProbability}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
