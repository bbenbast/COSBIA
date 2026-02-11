
import React, { useState } from 'react';
import { Avatar } from './Avatar';
import { useNavigate } from 'react-router-dom';

const NETWORKS = [
  {
    id: 'net1',
    ssid: 'CoffeeShop_Public',
    security: 'Open',
    strength: 4,
    isSafe: false,
    details: "No password required. This network is unencrypted, meaning anyone nearby can intercept the data you send and receive."
  },
  {
    id: 'net2',
    ssid: 'CoffeeShop_Guest',
    security: 'WPA (Password Protected)',
    strength: 3,
    isSafe: false,
    details: "Uses a shared password ('freewifi'). While better than open, common passwords make it easy for attackers on the same network to target you."
  },
  {
    id: 'net3',
    ssid: 'FREE_WIFI',
    security: 'Open',
    strength: 5,
    isSafe: false,
    details: "A common 'Honey Pot' name used by hackers to trick people into connecting. Completely unencrypted and highly suspicious."
  },
  {
    id: 'net4',
    ssid: 'NETGEAR_235F',
    security: 'WPA2 Personal',
    strength: 2,
    isSafe: true,
    details: "Encrypted with WPA2. This is the gold standard for personal/small business security. It requires a unique, strong password to decrypt traffic."
  }
];

export const WifiAuditor = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (id) => {
    if (submitted) return;
    setSelectedId(id);
  };

  const selectedNetwork = NETWORKS.find(n => n.id === selectedId);

  const handleSubmit = () => {
    if (!selectedId) return;
    setSubmitted(true);
  };

  const SignalIcon = ({ strength }) => (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 2, 3, 4, 5].map(i => (
        <div 
          key={i} 
          className={`w-1 rounded-full transition-all ${i <= strength ? 'bg-orange-500' : 'bg-slate-700'}`}
          style={{ height: `${i * 20}%` }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-6xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
        
        {/* Header - Cosbia Orange Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl text-orange-500 font-bold mb-1">
                    Activity 2: <span className="text-white font-normal">The WiFi Network Auditor</span>
                </h1>
                <p className="text-white text-lg font-bold">Level 3</p>
                <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-slate-400">Security Audit</span>
                    <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-orange-500 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div className="bg-[#9f1239] px-6 py-2 rounded-xl text-white font-bold text-xl shadow-lg border border-white/10">
                100 XP
            </div>
        </div>

        <div className="h-px bg-orange-500/30 w-full mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Bot and Scenario */}
            <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                    <Avatar />
                    <div className="relative bg-[#7D86AD] bg-opacity-50 p-5 rounded-2xl text-sm leading-relaxed border border-slate-600 shadow-xl mt-2">
                        <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] bg-opacity-50 transform rotate-45 border-l border-b border-slate-600"></div>
                        "You're at a local coffee shop and need to finish your homework. Which of these networks should you trust with your data? Look for the <span className="text-orange-400 font-bold">WPA2</span> encryption!"
                    </div>
                </div>

                <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-2xl border border-slate-600 shadow-inner">
                    <h3 className="text-orange-500 font-bold mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        Auditor's Mission
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Public WiFi can be a playground for packet sniffers and man-in-the-middle attacks. Analyze the available SSIDs and their security protocols to choose the safest path online.
                    </p>
                </div>

                {selectedId && (
                  <div className="bg-[#1D2758] p-6 rounded-2xl border border-slate-600 animate-in fade-in slide-in-from-left-2">
                    <h4 className="text-orange-400 font-bold text-xs uppercase mb-2 tracking-widest flex items-center gap-2">
                        Network Analysis: {selectedNetwork.ssid}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                        {selectedNetwork.details}
                    </p>
                  </div>
                )}
            </div>

            {/* Right Column: WiFi List Selection */}
            <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-[#7D86AD] bg-opacity-50 rounded-[2.5rem] p-8 border border-slate-600 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1D2758] rounded-b-3xl z-10"></div>
                    
                    <div className="mb-8 pt-4">
                        <h3 className="text-white text-xl font-black mb-1">Wi-Fi Settings</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Available Networks</p>
                    </div>

                    <div className="space-y-4">
                        {NETWORKS.map((net) => (
                            <button
                                key={net.id}
                                onClick={() => handleSelect(net.id)}
                                disabled={submitted}
                                className={`
                                    w-full flex items-center justify-between p-5 rounded-3xl transition-all border-2
                                    ${selectedId === net.id 
                                        ? 'bg-[#7D86AD] bg-opacity-50 border-orange-500 shadow-lg scale-[1.02]' 
                                        : 'bg-[#1D2758] border-transparent text-slate-300 hover:bg-[#7D86AD] hover:bg-opacity-30'}
                                    ${submitted && net.isSafe ? 'ring-4 ring-orange-500/50' : ''}
                                    ${submitted && selectedId === net.id && !net.isSafe ? 'ring-4 ring-red-500/50' : ''}
                                `}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`p-3 rounded-2xl ${selectedId === net.id ? 'bg-orange-500 text-slate-900' : 'bg-slate-700 text-slate-400'}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-bold">{net.ssid}</div>
                                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{net.security}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {net.security !== 'Open' && (
                                        <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                    )}
                                    <SignalIcon strength={net.strength} />
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        {!submitted ? (
                            <button 
                                onClick={handleSubmit}
                                disabled={!selectedId}
                                className={`
                                    bg-orange-600 hover:bg-orange-500 text-white font-black py-4 px-16 rounded-2xl text-lg shadow-lg transition-all border-b-4 border-orange-800
                                    ${!selectedId ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                                `}
                            >
                                Connect to Network
                            </button>
                        ) : (
                            <button 
                                onClick={() => navigate('/wifi-auditor-feedback', { state: { selected: selectedNetwork } })}
                                className="bg-orange-600 hover:bg-orange-500 text-white font-black py-4 px-16 rounded-2xl text-lg shadow-lg transition-all border-b-4 border-orange-800 hover:scale-105"
                            >
                                View Audit Results
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default WifiAuditor;