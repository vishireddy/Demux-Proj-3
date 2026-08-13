import { useState } from 'react';
import { Send } from 'lucide-react';
import { useApp } from '@/context/AppContext';

type SubTab = 'ask' | 'blogs' | 'videos';

export default function ExpertTab() {
  const { t, blogs, videos, queries, setQueries, farmer } = useApp();
  const [sub, setSub] = useState<SubTab>('ask');
  const [question, setQuestion] = useState('');
  const [crop, setCrop] = useState('');
  const [sent, setSent] = useState(false);
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null);

  const publishedBlogs = blogs.filter(b => !b.draft);
  const publishedVideos = videos.filter(v => !v.draft);

  const handleAsk = () => {
    if (!question.trim()) return;
    const newQ = {
      id: `q_${Date.now()}`,
      farmerName: farmer?.name || 'Unknown',
      mobile: farmer?.mobile || '',
      crop: crop || 'General',
      question,
      date: new Date().toISOString().split('T')[0],
      answered: false,
    };
    setQueries([...queries, newQ]);
    setSent(true);
    setQuestion('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-4 pt-10 pb-12 text-white">
        <h1 className="text-2xl font-extrabold mb-1">👨‍🌾 {t('expertGuidance')}</h1>
        <p className="text-blue-100 text-sm">Get advice from agricultural experts</p>
      </div>

      <div className="px-4 -mt-6 pb-4">
        {/* Sub-tabs */}
        <div className="bg-white rounded-2xl shadow-md p-1 flex mb-4 gap-1">
          {(['ask', 'blogs', 'videos'] as SubTab[]).map(s => (
            <button
              key={s}
              onClick={() => setSub(s)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                sub === s ? 'bg-green-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {s === 'ask' ? '💬 Ask' : s === 'blogs' ? '📝 Blogs' : '🎥 Videos'}
            </button>
          ))}
        </div>

        {sub === 'ask' && (
          <div className="bg-white rounded-3xl shadow-md p-5 space-y-4">
            <h3 className="font-bold text-gray-800">{t('askQuestion')}</h3>
            <select
              value={crop}
              onChange={e => setCrop(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Crop (optional)</option>
              {farmer?.crops.map(c => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}
            </select>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder={t('enterQuestion')}
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            />
            {sent && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-700 text-sm font-medium">
                ✅ {t('questionSent')}
              </div>
            )}
            <button
              onClick={handleAsk}
              disabled={!question.trim()}
              className="w-full bg-green-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Send size={16} /> {t('submit')}
            </button>

            {/* Previous queries */}
            {queries.filter(q => q.mobile === farmer?.mobile).length > 0 && (
              <div className="mt-2 space-y-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Your Questions</p>
                {queries.filter(q => q.mobile === farmer?.mobile).map(q => (
                  <div key={q.id} className="bg-gray-50 rounded-xl p-3 border">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-semibold text-green-600">{q.crop}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${q.answered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {q.answered ? t('answered') : t('pending')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{q.question}</p>
                    {q.answer && <p className="text-sm text-green-700 mt-2 bg-green-50 rounded-lg p-2">{q.answer}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {sub === 'blogs' && (
          <div className="space-y-4">
            {publishedBlogs.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-md p-8 text-center text-gray-400">{t('noBlogs')}</div>
            ) : publishedBlogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-3xl shadow-md overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{blog.category}</span>
                  <h3 className="font-bold text-gray-800 mt-2 mb-1">{blog.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{t('by')} {blog.author} • {blog.date}</p>
                  {expandedBlog === blog.id ? (
                    <p className="text-sm text-gray-600 leading-relaxed">{blog.content}</p>
                  ) : (
                    <p className="text-sm text-gray-600 line-clamp-2">{blog.content}</p>
                  )}
                  <button
                    onClick={() => setExpandedBlog(expandedBlog === blog.id ? null : blog.id)}
                    className="text-green-600 text-sm font-semibold mt-2"
                  >
                    {expandedBlog === blog.id ? 'Show less' : t('readMore')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {sub === 'videos' && (
          <div className="space-y-4">
            {publishedVideos.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-md p-8 text-center text-gray-400">{t('noVideos')}</div>
            ) : publishedVideos.map(v => (
              <div key={v.id} className="bg-white rounded-3xl shadow-md overflow-hidden">
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <span className="text-5xl">▶️</span>
                </div>
                <div className="p-4">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{v.category}</span>
                  <h3 className="font-bold text-gray-800 mt-2 mb-1">{v.title}</h3>
                  <p className="text-sm text-gray-500">{v.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{t('by')} {v.author} • {v.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
