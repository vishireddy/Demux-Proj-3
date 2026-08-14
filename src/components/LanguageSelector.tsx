import { useApp } from '@/context/AppContext';
import type { Lang } from '@/types';

const langs: { code: Lang; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'hi', label: 'हिन्दी' },
];

export default function LanguageSelector() {
  const { lang, setLang } = useApp();

  return (
    <div className="flex items-center justify-center gap-2 rounded-full border border-green-200 bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur-sm">
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          aria-label={`Switch language to ${l.label}`}
          className={`min-w-[76px] rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
            lang === l.code
              ? 'bg-green-600 text-white shadow-md ring-2 ring-green-200'
              : 'bg-white text-green-700 hover:bg-green-50 border border-green-200'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
