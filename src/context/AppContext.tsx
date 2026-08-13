import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Farmer, GovUser, Lang, Blog, VideoPost, FarmerQuery } from '@/types';
import { demoFarmers, demoGovUsers, demoBlogs, demoVideos, demoQueries } from '@/data/mockData';
import { translations } from '@/i18n/translations';
import type { TranslationKey } from '@/i18n/translations';

type AppView = 'landing' | 'farmer-login' | 'expert-login' | 'gov-login' | 'farmer-dashboard' | 'expert-dashboard' | 'gov-dashboard';

interface AppContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
  view: AppView;
  setView: (v: AppView) => void;
  farmer: Farmer | null;
  setFarmer: (f: Farmer | null) => void;
  govUser: GovUser | null;
  setGovUser: (g: GovUser | null) => void;
  farmers: Farmer[];
  setFarmers: (f: Farmer[]) => void;
  blogs: Blog[];
  setBlogs: (b: Blog[]) => void;
  videos: VideoPost[];
  setVideos: (v: VideoPost[]) => void;
  queries: FarmerQuery[];
  setQueries: (q: FarmerQuery[]) => void;
  isReading: boolean;
  startReading: (text: string) => void;
  stopReading: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const [view, setView] = useState<AppView>('landing');
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [govUser, setGovUser] = useState<GovUser | null>(null);
  const [farmers, setFarmers] = useState<Farmer[]>(demoFarmers);
  const [blogs, setBlogs] = useState<Blog[]>(demoBlogs);
  const [videos, setVideos] = useState<VideoPost[]>(demoVideos);
  const [queries, setQueries] = useState<FarmerQuery[]>(demoQueries);
  const [isReading, setIsReading] = useState(false);

  const t = (key: TranslationKey): string => translations[lang][key] ?? key;

  const startReading = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    utter.onend = () => setIsReading(false);
    setIsReading(true);
    window.speechSynthesis.speak(utter);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  return (
    <AppContext.Provider value={{
      lang, setLang, t, view, setView,
      farmer, setFarmer, govUser, setGovUser,
      farmers, setFarmers, blogs, setBlogs,
      videos, setVideos, queries, setQueries,
      isReading, startReading, stopReading,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export { demoGovUsers };
