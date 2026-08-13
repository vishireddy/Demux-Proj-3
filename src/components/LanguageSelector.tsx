import { useApp } from '@/context/AppContext';
import type { Lang } from '@/types';

const langs: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'te', label: 'TE' },
  { code: 'hi', label: 'HI' },
];

export default function LanguageSelector() {
  const { lang, setLang } = useApp();
  return (
    <div className="flex gap-1">
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-all ${
            lang === l.code
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-green-700 border-green-300 hover:border-green-500'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
