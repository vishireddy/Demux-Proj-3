import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { ArrowLeft, Users, Bell, MessageSquare, BarChart3, Send, Bot, Clock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { demoAlerts } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import type { AlertRecord, SentMessage } from '@/types';

type Section = 'overview' | 'farmers' | 'communication' | 'monitoring';

export default function GovDashboard() {
  const { setView, setGovUser, govUser, farmers, t } = useApp();
  const [section, setSection] = useState<Section>('overview');
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);
  const [alerts, setAlerts] = useState<AlertRecord[]>(demoAlerts);

  if (!govUser) return null;

  // Filter farmers by jurisdiction
  const myFarmers = farmers.filter(f => {
    if (govUser.level === 'state') return f.state === govUser.state;
    if (govUser.level === 'district') return f.district === govUser.district;
    if (govUser.level === 'mandal') return f.mandal === govUser.mandal;
    return f.village === govUser.village;
  });

  // Build region options based on level
  const getRegionOptions = () => {
    if (govUser.level === 'state') {
      const districts = [...new Set(farmers.map(f => f.district))];
      return districts;
    }
    if (govUser.level === 'district') {
      const mandals = [...new Set(myFarmers.map(f => f.mandal))];
      return mandals;
    }
    if (govUser.level === 'mandal') {
      const villages = [...new Set(myFarmers.map(f => f.village))];
      return villages;
    }
    return [govUser.village!];
  };

  const navItems: { id: Section; icon: typeof BarChart3; label: string }[] = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'farmers', icon: Users, label: 'Farmers' },
    { id: 'communication', icon: MessageSquare, label: 'Communication' },
    { id: 'monitoring', icon: Bot, label: 'Alert Monitor' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-800 text-white min-h-screen">
        <div className="p-5 border-b border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🏛️</span>
            <div>
              <div className="font-bold text-sm leading-tight">{govUser.name}</div>
              <div className="text-xs text-slate-400 capitalize">{govUser.level} Level</div>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {[govUser.state, govUser.district, govUser.mandal, govUser.village].filter(Boolean).join(' › ')}
          </div>
          <button onClick={() => { setGovUser(null); setView('landing'); }} className="mt-3 flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors">
            <ArrowLeft size={12} /> Logout
          </button>
        </div>
        <nav className="p-3 flex-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold mb-1 transition-colors ${
                section === item.id ? 'bg-green-600 text-white' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <item.icon size={17} /> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile top nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-800 text-white z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => { setGovUser(null); setView('landing'); }} className="text-slate-300"><ArrowLeft size={20} /></button>
          <div className="text-center">
            <div className="font-bold text-sm">{govUser.name}</div>
            <div className="text-xs text-slate-400 capitalize">{govUser.level}</div>
          </div>
          <span className="text-slate-400">🏛️</span>
        </div>
        <div className="flex overflow-x-auto gap-1 px-3 pb-2">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setSection(item.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${section === item.id ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 p-6 mt-24 md:mt-0 overflow-y-auto">
        <div className="max-w-5xl mx-auto">

          {section === 'overview' && (
            <OverviewSection myFarmers={myFarmers} alerts={alerts} sentMessages={sentMessages} govUser={govUser} />
          )}
          {section === 'farmers' && (
            <FarmersSection myFarmers={myFarmers} t={t} />
          )}
          {section === 'communication' && (
            <CommunicationSection
              allFarmers={farmers}
              myFarmers={myFarmers}
              govUser={govUser}
              regionOptions={getRegionOptions()}
              sentMessages={sentMessages}
              setSentMessages={setSentMessages}
              setAlerts={setAlerts}
              alerts={alerts}
            />
          )}
          {section === 'monitoring' && (
            <MonitoringSection alerts={alerts} setAlerts={setAlerts} govUser={govUser} myFarmers={myFarmers} />
          )}
        </div>
      </main>
    </div>
  );
}

function OverviewSection({ myFarmers, alerts, sentMessages, govUser }: {
  myFarmers: ReturnType<typeof useApp>['farmers'];
  alerts: AlertRecord[];
  sentMessages: SentMessage[];
  govUser: NonNullable<ReturnType<typeof useApp>['govUser']>;
}) {
  const stats = [
    { icon: '👥', label: 'Total Farmers', value: myFarmers.length, color: 'bg-blue-50 text-blue-700 border-blue-100' },
    { icon: '🔔', label: 'Active Alerts', value: alerts.filter(a => a.status !== 'delivered').length, color: 'bg-red-50 text-red-700 border-red-100' },
    { icon: '📨', label: 'Messages Sent', value: sentMessages.length, color: 'bg-green-50 text-green-700 border-green-100' },
    { icon: '🤖', label: 'Automated Alerts', value: alerts.filter(a => a.type === 'automated').length, color: 'bg-purple-50 text-purple-700 border-purple-100' },
    { icon: '✅', label: 'Farmers Notified', value: alerts.reduce((s, a) => s + a.recipients, 0).toLocaleString(), color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm mt-1">Jurisdiction: {[govUser.state, govUser.district, govUser.mandal, govUser.village].filter(Boolean).join(' → ')}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className={`rounded-2xl p-4 border text-center ${s.color}`}>
            <div className="text-3xl mb-1">{s.icon}</div>
            <div className="text-2xl font-extrabold">{s.value}</div>
            <div className="text-xs font-semibold mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-bold text-gray-800 mb-3">Recent Alerts</h3>
        <div className="space-y-3">
          {alerts.slice(0, 3).map(a => (
            <AlertRow key={a.id} alert={a} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FarmersSection({ myFarmers, t }: { myFarmers: ReturnType<typeof useApp>['farmers']; t: ReturnType<typeof useApp>['t'] }) {
  const [cropFilter, setCropFilter] = useState('');

  const filtered = cropFilter
    ? myFarmers.filter(f => f.crops.some(c => c.name === cropFilter))
    : myFarmers;

  const allCrops = [...new Set(myFarmers.flatMap(f => f.crops.map(c => c.name)))];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-extrabold text-gray-800">Farmers ({filtered.length})</h2>
        <select
          value={cropFilter}
          onChange={e => setCropFilter(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">{t('allCrops')}</option>
          {allCrops.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400">{t('noFarmers')}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Name', 'Mobile', 'Location', 'Crops'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(f => (
                  <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-800">{f.name}</td>
                    <td className="px-4 py-3 font-mono text-gray-500">{f.mobile}</td>
                    <td className="px-4 py-3 text-gray-600">{f.village}, {f.mandal}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {f.crops.map(c => (
                          <span key={c.name} className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full border border-green-200 font-semibold">
                            {c.emoji} {c.name} ({c.acres}ac)
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function CommunicationSection({
  allFarmers, myFarmers, govUser, regionOptions, sentMessages, setSentMessages, alerts, setAlerts,
}: {
  allFarmers: ReturnType<typeof useApp>['farmers'];
  myFarmers: ReturnType<typeof useApp>['farmers'];
  govUser: NonNullable<ReturnType<typeof useApp>['govUser']>;
  regionOptions: string[];
  sentMessages: SentMessage[];
  setSentMessages: Dispatch<SetStateAction<SentMessage[]>>;
  alerts: AlertRecord[];
  setAlerts: Dispatch<SetStateAction<AlertRecord[]>>;
}) {
  const [targetRegion, setTargetRegion] = useState(regionOptions[0] || '');
  const [cropFilter, setCropFilter] = useState('');
  const [channel, setChannel] = useState<'SMS' | 'Voice' | 'IVR'>('SMS');
  const [lang, setLang] = useState<'en' | 'te' | 'hi'>('en');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [sendStatus, setSendStatus] = useState<string | null>(null);
  const [tab, setTab] = useState<'send' | 'history'>('send');

  const allCrops = [...new Set(myFarmers.flatMap(f => f.crops.map(c => c.name)))];

  const targetFarmers = myFarmers.filter(f => {
    const matchRegion = !targetRegion || f.district === targetRegion || f.mandal === targetRegion || f.village === targetRegion || targetRegion === f.state;
    const matchCrop = !cropFilter || f.crops.some(c => c.name === cropFilter);
    return matchRegion && matchCrop;
  });

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg: SentMessage = {
      id: `msg_${Date.now()}`,
      region: targetRegion,
      crop: cropFilter || undefined,
      channel,
      language: lang,
      message,
      recipients: targetFarmers.length,
      status: 'pending',
      date: new Date().toLocaleString(),
    };
    setSentMessages([newMsg, ...sentMessages]);
    setSendStatus('pending');
    setTimeout(() => {
      setSentMessages((prev: SentMessage[]) => prev.map((m: SentMessage) => m.id === newMsg.id ? { ...m, status: 'sending' } : m));
      setSendStatus('sending');
    }, 800);
    setTimeout(() => {
      setSentMessages((prev: SentMessage[]) => prev.map((m: SentMessage) => m.id === newMsg.id ? { ...m, status: 'delivered' } : m));
      setSendStatus('delivered');
      const alertRecord: AlertRecord = { ...newMsg, type: 'custom', level: govUser.level };
      setAlerts([alertRecord, ...alerts]);
    }, 2200);
    setMessage('');
    setShowPreview(false);
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold text-gray-800 mb-4">Communication & Alerts</h2>

      <div className="flex gap-2 mb-4">
        {['send', 'history'].map(t => (
          <button key={t} onClick={() => setTab(t as 'send' | 'history')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${tab === t ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {t === 'send' ? '📤 Send Message' : '📋 History'}
          </button>
        ))}
      </div>

      {tab === 'send' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          {/* Step 1: Region */}
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">1. Target Region</label>
            <select value={targetRegion} onChange={e => setTargetRegion(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-400">
              {regionOptions.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          {/* Step 2: Crop */}
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">2. Filter by Crop (optional)</label>
            <select value={cropFilter} onChange={e => setCropFilter(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-400">
              <option value="">All Crops</option>
              {allCrops.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Farmer count */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <span className="text-3xl">👥</span>
            <div>
              <div className="text-2xl font-extrabold text-green-700">{targetFarmers.length}</div>
              <div className="text-sm text-green-600">farmers will receive this message</div>
            </div>
          </div>

          {/* Step 3: Channel */}
          <div>
            <label className="text-sm font-bold text-gray-700 mb-2 block">3. Select Channel</label>
            <div className="flex gap-2">
              {(['SMS', 'Voice', 'IVR'] as const).map(c => (
                <button key={c} onClick={() => setChannel(c)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-colors ${channel === c ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200'}`}>
                  {c === 'SMS' ? '📱 SMS' : c === 'Voice' ? '📞 Voice' : '🤖 IVR'}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Message */}
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1 block">4. Write Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)}
              placeholder="Type your message to farmers..."
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            />
          </div>

          {/* Step 5: Language */}
          <div>
            <label className="text-sm font-bold text-gray-700 mb-2 block">5. Language</label>
            <div className="flex gap-2">
              {[['en', 'English'], ['te', 'తెలుగు'], ['hi', 'हिंदी']] .map(([code, label]) => (
                <button key={code} onClick={() => setLang(code as 'en' | 'te' | 'hi')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-colors ${lang === code ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Preview & Send */}
          {sendStatus && (
            <div className={`rounded-xl p-3 text-sm font-semibold text-center border ${
              sendStatus === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
              sendStatus === 'sending' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              'bg-yellow-50 text-yellow-700 border-yellow-200'
            }`}>
              {sendStatus === 'delivered' ? '✅ Message delivered successfully!' :
               sendStatus === 'sending' ? '📡 Sending to farmers...' : '⏳ Message queued...'}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setShowPreview(!showPreview)}
              className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
              👁️ Preview
            </button>
            <button onClick={handleSend} disabled={!message.trim() || targetFarmers.length === 0}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              <Send size={16} /> Send
            </button>
          </div>

          {showPreview && message && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-500 font-semibold mb-2">MESSAGE PREVIEW</p>
              <div className="bg-white rounded-lg p-3 border text-sm text-gray-700">{message}</div>
              <div className="mt-2 text-xs text-gray-400">
                To: {targetFarmers.length} farmers in {targetRegion} {cropFilter && `(${cropFilter} crop)`} via {channel}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-3">
          {sentMessages.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400">No messages sent yet.</div>
          ) : sentMessages.map(m => (
            <div key={m.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-sm font-semibold text-gray-800">{m.region}</span>
                  {m.crop && <span className="text-xs text-gray-500 ml-2">({m.crop})</span>}
                </div>
                <StatusBadge status={m.status} />
              </div>
              <p className="text-sm text-gray-600 mb-2">{m.message}</p>
              <div className="flex gap-3 text-xs text-gray-400">
                <span>📱 {m.channel}</span>
                <span>👥 {m.recipients} farmers</span>
                <span>🌐 {m.language.toUpperCase()}</span>
                <span>🕐 {m.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MonitoringSection({ alerts, setAlerts, govUser, myFarmers }: {
  alerts: AlertRecord[];
  setAlerts: (a: AlertRecord[]) => void;
  govUser: NonNullable<ReturnType<typeof useApp>['govUser']>;
  myFarmers: ReturnType<typeof useApp>['farmers'];
}) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleSimulate = () => {
    setGenerating(true);
    setTimeout(() => {
      const crops = [...new Set(myFarmers.flatMap(f => f.crops.map(c => c.name)))];
      const newAlert: AlertRecord = {
        id: `auto_${Date.now()}`,
        type: 'automated',
        region: govUser.district || govUser.state,
        crop: crops.join(', '),
        recipients: myFarmers.length * 1000,
        channel: 'SMS + Voice',
        status: 'delivered',
        date: new Date().toLocaleString(),
        message: 'KrishiGuard AI detected heavy rainfall expected. Automated alert sent to affected farmers.',
        level: govUser.level,
      };
      setAlerts([newAlert, ...alerts]);
      setGenerating(false);
      setGenerated(true);
      setTimeout(() => setGenerated(false), 3000);
    }, 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-gray-800">Automated Alert Monitoring</h2>
        <button
          onClick={handleSimulate}
          disabled={generating}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors disabled:opacity-60"
        >
          <Bot size={16} />
          {generating ? 'Generating...' : 'Simulate Alert'}
        </button>
      </div>

      {generated && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-green-700 text-sm font-semibold">
          ✅ Automated alert generated and sent to farmers!
        </div>
      )}

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Alerts', value: alerts.length, icon: '🔔', cls: 'bg-blue-50 text-blue-700' },
          { label: 'Automated', value: alerts.filter(a => a.type === 'automated').length, icon: '🤖', cls: 'bg-purple-50 text-purple-700' },
          { label: 'Delivered', value: alerts.filter(a => a.status === 'delivered').length, icon: '✅', cls: 'bg-green-50 text-green-700' },
          { label: 'Total Notified', value: alerts.reduce((s, a) => s + a.recipients, 0).toLocaleString(), icon: '👥', cls: 'bg-orange-50 text-orange-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl p-4 text-center ${s.cls}`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-extrabold">{s.value}</div>
            <div className="text-xs font-semibold">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Alert history */}
      <h3 className="font-bold text-gray-800 mb-3">Alert History</h3>
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400">No alerts yet. Click "Simulate Alert" to generate one.</div>
        ) : alerts.map(a => (
          <AlertRow key={a.id} alert={a} />
        ))}
      </div>
    </div>
  );
}

function AlertRow({ alert }: { alert: AlertRecord }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${alert.type === 'automated' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
            {alert.type === 'automated' ? '🤖 Auto' : '✍️ Custom'}
          </span>
          <span className="font-semibold text-gray-800 text-sm">{alert.region}</span>
        </div>
        <StatusBadge status={alert.status} />
      </div>
      <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
        {alert.crop && <span>🌾 {alert.crop}</span>}
        <span>👥 {typeof alert.recipients === 'number' ? alert.recipients.toLocaleString() : alert.recipients} farmers</span>
        <span>📡 {alert.channel}</span>
        <span>🕐 {alert.date}</span>
      </div>
    </div>
  );
}
