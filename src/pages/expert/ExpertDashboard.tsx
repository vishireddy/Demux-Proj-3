import { useState } from 'react';
import { ArrowLeft, PenLine, Video, FileText, MessageSquare, Send, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Blog, VideoPost } from '@/types';

type Section = 'queries' | 'blog' | 'video' | 'content';

const EXPERT_NAME = 'Dr. Anil Reddy';
const CATEGORIES = ['Pest Management', 'Water Management', 'Soil Health', 'Disease Control', 'Farming Techniques', 'Market & Finance'];

export default function ExpertDashboard() {
  const { setView, t, blogs, setBlogs, videos, setVideos, queries, setQueries } = useApp();
  const [section, setSection] = useState<Section>('queries');

  // Blog form
  const [bTitle, setBTitle] = useState('');
  const [bCat, setBCat] = useState(CATEGORIES[0]);
  const [bContent, setBContent] = useState('');
  const [bImage, setBImage] = useState('');
  const [bSuccess, setBSuccess] = useState('');

  // Video form
  const [vTitle, setVTitle] = useState('');
  const [vCat, setVCat] = useState(CATEGORIES[4]);
  const [vDesc, setVDesc] = useState('');
  const [vUrl, setVUrl] = useState('');
  const [vSuccess, setVSuccess] = useState('');

  // Reply
  const [replyId, setReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handlePublishBlog = (draft: boolean) => {
    if (!bTitle || !bContent) return;
    const newBlog: Blog = {
      id: `b_${Date.now()}`,
      title: bTitle, category: bCat, content: bContent,
      author: EXPERT_NAME,
      image: bImage || 'https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: new Date().toISOString().split('T')[0],
      draft,
    };
    setBlogs([...blogs, newBlog]);
    setBTitle(''); setBContent(''); setBImage('');
    setBSuccess(draft ? 'Saved as draft!' : 'Blog published! Farmers can now see it.');
    setTimeout(() => setBSuccess(''), 3000);
  };

  const handlePublishVideo = (draft: boolean) => {
    if (!vTitle || !vDesc) return;
    const newVideo: VideoPost = {
      id: `v_${Date.now()}`,
      title: vTitle, description: vDesc, category: vCat,
      author: EXPERT_NAME,
      videoUrl: vUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      date: new Date().toISOString().split('T')[0],
      draft,
    };
    setVideos([...videos, newVideo]);
    setVTitle(''); setVDesc(''); setVUrl('');
    setVSuccess(draft ? 'Saved as draft!' : 'Video published! Farmers can now see it.');
    setTimeout(() => setVSuccess(''), 3000);
  };

  const handleReply = (id: string) => {
    if (!replyText.trim()) return;
    setQueries(queries.map(q => q.id === id ? { ...q, answered: true, answer: replyText } : q));
    setReplyId(null);
    setReplyText('');
  };

  const toggleBlogDraft = (id: string) => {
    setBlogs(blogs.map(b => b.id === id ? { ...b, draft: !b.draft } : b));
  };

  const toggleVideoDraft = (id: string) => {
    setVideos(videos.map(v => v.id === id ? { ...v, draft: !v.draft } : v));
  };

  const navItems: { id: Section; icon: typeof MessageSquare; label: string }[] = [
    { id: 'queries', icon: MessageSquare, label: 'Queries' },
    { id: 'blog', icon: PenLine, label: 'Write Blog' },
    { id: 'video', icon: Video, label: 'Upload Video' },
    { id: 'content', icon: FileText, label: 'My Content' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">E</div>
            <div>
              <div className="font-bold text-gray-800 text-sm">{EXPERT_NAME}</div>
              <div className="text-xs text-gray-500">Agricultural Expert</div>
            </div>
          </div>
          <button onClick={() => setView('landing')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
            <ArrowLeft size={14} /> Logout
          </button>
        </div>
        <nav className="p-3 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold mb-1 transition-colors ${
                section === item.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon size={17} /> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile top nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setView('landing')} className="text-gray-500"><ArrowLeft size={20} /></button>
          <span className="font-bold text-gray-800">Expert Dashboard</span>
          <span className="text-sm text-gray-400">{EXPERT_NAME.split(' ')[0]}</span>
        </div>
        <div className="flex overflow-x-auto gap-1 px-3 pb-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                section === item.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 p-6 mt-24 md:mt-0 overflow-y-auto">
        <div className="max-w-3xl mx-auto">

          {section === 'queries' && (
            <div>
              <h2 className="text-xl font-extrabold text-gray-800 mb-4">Farmer Queries ({queries.length})</h2>
              {queries.length === 0 && <p className="text-gray-400">{t('noQueries')}</p>}
              <div className="space-y-4">
                {queries.map(q => (
                  <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-gray-800">{q.farmerName}</span>
                        <span className="text-gray-400 text-sm ml-2 font-mono">{q.mobile}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{q.crop}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${q.answered ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                          {q.answered ? 'Answered' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{q.question}</p>
                    <p className="text-xs text-gray-400 mb-3">{q.date}</p>
                    {q.answer && (
                      <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-800 border border-blue-100 mb-3">
                        <strong>Your Reply:</strong> {q.answer}
                      </div>
                    )}
                    {!q.answered && (
                      replyId === q.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                            placeholder="Write your expert reply..."
                            rows={3}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                          />
                          <div className="flex gap-2">
                            <button onClick={() => handleReply(q.id)} className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
                              <Send size={14} /> Reply
                            </button>
                            <button onClick={() => setReplyId(null)} className="text-gray-500 text-sm px-3 py-2">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => setReplyId(q.id)} className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:underline">
                          <MessageSquare size={14} /> Reply to this query
                        </button>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'blog' && (
            <div>
              <h2 className="text-xl font-extrabold text-gray-800 mb-4">Write Blog</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">{t('title')}</label>
                  <input value={bTitle} onChange={e => setBTitle(e.target.value)} placeholder="Blog title..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">{t('category')}</label>
                  <select value={bCat} onChange={e => setBCat(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">{t('content')}</label>
                  <textarea value={bContent} onChange={e => setBContent(e.target.value)} placeholder="Write your blog content..." rows={8} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">{t('image')} (optional)</label>
                  <input value={bImage} onChange={e => setBImage(e.target.value)} placeholder="https://..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                {bSuccess && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-sm font-semibold">✅ {bSuccess}</div>}
                <div className="flex gap-3">
                  <button onClick={() => handlePublishBlog(false)} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">{t('publish')}</button>
                  <button onClick={() => handlePublishBlog(true)} className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">{t('saveDraft')}</button>
                </div>
              </div>
            </div>
          )}

          {section === 'video' && (
            <div>
              <h2 className="text-xl font-extrabold text-gray-800 mb-4">Upload Video</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">{t('title')}</label>
                  <input value={vTitle} onChange={e => setVTitle(e.target.value)} placeholder="Video title..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">{t('category')}</label>
                  <select value={vCat} onChange={e => setVCat(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">{t('description')}</label>
                  <textarea value={vDesc} onChange={e => setVDesc(e.target.value)} placeholder="Describe this video..." rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">{t('video')} URL (optional)</label>
                  <input value={vUrl} onChange={e => setVUrl(e.target.value)} placeholder="https://youtube.com/embed/..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                {vSuccess && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-sm font-semibold">✅ {vSuccess}</div>}
                <div className="flex gap-3">
                  <button onClick={() => handlePublishVideo(false)} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">{t('publish')}</button>
                  <button onClick={() => handlePublishVideo(true)} className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">{t('saveDraft')}</button>
                </div>
              </div>
            </div>
          )}

          {section === 'content' && (
            <div>
              <h2 className="text-xl font-extrabold text-gray-800 mb-4">My Content</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">Blogs ({blogs.length})</h3>
                  {blogs.length === 0 && <p className="text-gray-400 text-sm">No blogs yet.</p>}
                  <div className="space-y-3">
                    {blogs.map(b => (
                      <div key={b.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{b.title}</p>
                          <p className="text-xs text-gray-500">{b.category} • {b.date}</p>
                        </div>
                        <button onClick={() => toggleBlogDraft(b.id)} className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-semibold border transition-colors ${b.draft ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                          {b.draft ? <EyeOff size={12} /> : <Eye size={12} />}
                          {b.draft ? 'Draft' : 'Published'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">Videos ({videos.length})</h3>
                  {videos.length === 0 && <p className="text-gray-400 text-sm">No videos yet.</p>}
                  <div className="space-y-3">
                    {videos.map(v => (
                      <div key={v.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{v.title}</p>
                          <p className="text-xs text-gray-500">{v.category} • {v.date}</p>
                        </div>
                        <button onClick={() => toggleVideoDraft(v.id)} className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-semibold border transition-colors ${v.draft ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                          {v.draft ? <EyeOff size={12} /> : <Eye size={12} />}
                          {v.draft ? 'Draft' : 'Published'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
