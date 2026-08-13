import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockMandiPrices } from '@/data/mockData';

export default function MarketTab() {
  const { farmer, t } = useApp();
  if (!farmer) return null;

  const myCropNames = farmer.crops.map(c => c.name);
  const myPrices = mockMandiPrices.filter(p => myCropNames.includes(p.crop as never));
  const otherPrices = mockMandiPrices.filter(p => !myCropNames.includes(p.crop as never));

  return (
    <div className="flex flex-col">
      <div className="bg-gradient-to-br from-orange-600 to-amber-600 px-4 pt-10 pb-12 text-white">
        <h1 className="text-2xl font-extrabold mb-1">💰 {t('mandiPrices')}</h1>
        <p className="text-orange-100 text-sm">Live market rates • Updated today</p>
      </div>

      <div className="px-4 -mt-6 pb-4 space-y-4">
        {myPrices.length > 0 && (
          <div className="bg-white rounded-3xl shadow-md p-5">
            <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              🌾 Your Crop Prices
            </h2>
            <div className="space-y-3">
              {myPrices.map(p => (
                <PriceCard key={p.crop} p={p} highlight />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-md p-5">
          <h2 className="font-bold text-gray-800 mb-3">All Market Prices</h2>
          <div className="space-y-3">
            {otherPrices.map(p => (
              <PriceCard key={p.crop} p={p} highlight={false} />
            ))}
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
          <p className="text-sm text-amber-700">
            💡 Prices are indicative and sourced from local mandis. Contact your nearest agriculture market for exact rates.
          </p>
        </div>
      </div>
    </div>
  );
}

function PriceCard({ p, highlight }: { p: typeof mockMandiPrices[0]; highlight: boolean }) {
  const TrendIcon = p.trend === 'up' ? TrendingUp : p.trend === 'down' ? TrendingDown : Minus;
  const trendColor = p.trend === 'up' ? 'text-green-600' : p.trend === 'down' ? 'text-red-500' : 'text-gray-400';
  return (
    <div className={`flex items-center justify-between p-3 rounded-2xl ${highlight ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{p.emoji}</span>
        <div>
          <div className="font-semibold text-gray-800">{p.crop}</div>
          <div className="text-xs text-gray-500">{p.market}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-gray-800">₹{p.price.toLocaleString()}</div>
        <div className="text-xs text-gray-500">{p.unit}</div>
        <div className={`flex items-center gap-0.5 justify-end text-xs font-semibold ${trendColor}`}>
          <TrendIcon size={11} />
          {p.trend}
        </div>
      </div>
    </div>
  );
}
