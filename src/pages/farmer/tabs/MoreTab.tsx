import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { knowledgeArticles } from '@/data/mockData';
import LanguageSelector from '@/components/LanguageSelector';
import ReadAloudBtn from '@/components/ReadAloudBtn';

export default function MoreTab() {
  const { t, farmer, setFarmer, setView } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      <div className="bg-gradient-to-br from-gray-700 to-gray-900 px-4 pt-10 pb-12 text-white">
        <h1 className="text-2xl font-extrabold mb-1">☰ {t('more')}</h1>
        <p className="text-gray-300 text-sm">{farmer?.name} • {farmer?.mobile}</p>
      </div>

      <div className="px-4 -mt-6 pb-4 space-y-4">
        {/* Language */}
        <div className="bg-white rounded-3xl shadow-md p-5">
          <h2 className="font-bold text-gray-800 mb-3">🌐 {t('changeLanguage')}</h2>
          <LanguageSelector />
        </div>

        {/* Farming Knowledge */}
        <div className="bg-white rounded-3xl shadow-md p-5">
          <h2 className="font-bold text-gray-800 mb-4">📚 {t('farmingKnowledge')}</h2>
          <div className="space-y-3">
            {knowledgeArticles.map(article => (
              <div key={article.id} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{article.emoji}</span>
                    <span className="font-semibold text-gray-800 text-sm">{article.title}</span>
                  </div>
                  <ChevronRight size={16} className={`text-gray-400 transition-transform ${expandedId === article.id ? 'rotate-90' : ''}`} />
                </button>
                {expandedId === article.id && (
                  <div className="px-4 pb-4 bg-green-50">
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">{article.content}</p>
                    <ReadAloudBtn text={article.content} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-3xl shadow-md p-5">
          <h2 className="font-bold text-gray-800 mb-3">👤 {t('profile')}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">{t('name')}</span>
              <span className="font-semibold text-gray-800">{farmer?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">{t('mobile')}</span>
              <span className="font-semibold text-gray-800 font-mono">{farmer?.mobile}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">{t('district')}</span>
              <span className="font-semibold text-gray-800">{farmer?.district}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">{t('village')}</span>
              <span className="font-semibold text-gray-800">{farmer?.village}</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => { setFarmer(null); setView('landing'); }}
          className="w-full bg-red-50 border border-red-200 text-red-600 py-4 rounded-2xl font-bold hover:bg-red-100 transition-colors"
        >
          🚪 {t('logout')}
        </button>
      </div>
    </div>
  );
}
