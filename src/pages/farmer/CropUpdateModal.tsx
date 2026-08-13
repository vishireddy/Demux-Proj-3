import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { allCrops, cropEmojis } from '@/data/mockData';
import type { Crop, CropName } from '@/types';

export default function CropUpdateModal({ onClose }: { onClose: () => void }) {
  const { farmer, setFarmer, farmers, setFarmers, t } = useApp();
  const [crops, setCrops] = useState<Crop[]>(farmer?.crops || []);
  const [saved, setSaved] = useState(false);

  if (!farmer) return null;

  const toggle = (name: CropName) => {
    const existing = crops.find(c => c.name === name);
    if (existing) {
      setCrops(crops.filter(c => c.name !== name));
    } else {
      setCrops([...crops, { name, acres: 1, emoji: cropEmojis[name] }]);
    }
  };

  const updateAcres = (name: CropName, acres: number) => {
    setCrops(crops.map(c => c.name === name ? { ...c, acres } : c));
  };

  const handleSave = () => {
    const updated = { ...farmer, crops };
    setFarmer(updated);
    setFarmers(farmers.map(f => f.id === farmer.id ? updated : f));
    setSaved(true);
    setTimeout(onClose, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-extrabold text-gray-800 text-lg">➕ {t('addChangeCrop')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl"><X size={20} /></button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-3">
          <p className="text-sm text-gray-500 mb-2">Tap to select/remove crops. Set acres for each.</p>
          {allCrops.map(name => {
            const selected = crops.find(c => c.name === name);
            const emoji = cropEmojis[name];
            return (
              <div key={name} className={`border-2 rounded-2xl p-4 transition-all ${selected ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-3">
                  <button onClick={() => toggle(name)} className="flex-1 flex items-center gap-3 text-left">
                    <span className="text-2xl">{emoji}</span>
                    <span className="font-semibold text-gray-800">{name}</span>
                    {selected && <Check size={16} className="text-green-600 ml-auto mr-2" />}
                  </button>
                </div>
                {selected && (
                  <div className="mt-3 flex items-center gap-3">
                    <label className="text-sm text-gray-500">{t('acresLabel')}:</label>
                    <input
                      type="number"
                      min={0.5}
                      max={50}
                      step={0.5}
                      value={selected.acres}
                      onChange={e => updateAcres(name, parseFloat(e.target.value) || 1)}
                      className="border border-gray-300 rounded-xl px-3 py-1.5 w-24 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <span className="text-sm text-gray-500">acres</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-5 border-t border-gray-100">
          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-center text-sm font-semibold mb-3">
              ✅ {t('cropUpdateSuccess')}
            </div>
          )}
          <button
            onClick={handleSave}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-colors"
          >
            {t('save')} Changes
          </button>
        </div>
      </div>
    </div>
  );
}
