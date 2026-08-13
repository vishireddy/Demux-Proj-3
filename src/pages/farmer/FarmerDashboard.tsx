import { useState } from 'react';
import { Home, Bell, Users, ShoppingCart, MoreHorizontal } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import HomeTab from './tabs/HomeTab';
import AlertsTab from './tabs/AlertsTab';
import ExpertTab from './tabs/ExpertTab';
import MarketTab from './tabs/MarketTab';
import MoreTab from './tabs/MoreTab';

type Tab = 'home' | 'alerts' | 'expert' | 'market' | 'more';

const tabs: { id: Tab; icon: typeof Home; labelKey: string; emoji: string }[] = [
  { id: 'home', icon: Home, labelKey: 'home', emoji: '🏠' },
  { id: 'alerts', icon: Bell, labelKey: 'alerts', emoji: '⚠️' },
  { id: 'expert', icon: Users, labelKey: 'expert', emoji: '👨‍🌾' },
  { id: 'market', icon: ShoppingCart, labelKey: 'market', emoji: '💰' },
  { id: 'more', icon: MoreHorizontal, labelKey: 'more', emoji: '☰' },
];

export default function FarmerDashboard() {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Content */}
      <div className="flex-1 pb-20 overflow-y-auto">
        {activeTab === 'home'   && <HomeTab />}
        {activeTab === 'alerts' && <AlertsTab />}
        {activeTab === 'expert' && <ExpertTab />}
        {activeTab === 'market' && <MarketTab />}
        {activeTab === 'more'   && <MoreTab />}
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex">
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
                  active ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className={`text-xl transition-transform ${active ? 'scale-110' : ''}`}>{tab.emoji}</span>
                <span className="text-[10px] font-semibold">{t(tab.labelKey as Parameters<typeof t>[0])}</span>
                {active && <span className="w-5 h-0.5 bg-green-600 rounded-full" />}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
