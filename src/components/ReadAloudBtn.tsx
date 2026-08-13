import { Volume2, VolumeX } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ReadAloudBtn({ text }: { text: string }) {
  const { isReading, startReading, stopReading, t } = useApp();
  return (
    <button
      onClick={() => isReading ? stopReading() : startReading(text)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium hover:bg-green-100 transition-all"
    >
      {isReading ? <VolumeX size={15} /> : <Volume2 size={15} />}
      {isReading ? t('stopReading') : t('listen')}
    </button>
  );
}
