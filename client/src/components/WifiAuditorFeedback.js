
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';

export const WifiAuditorFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selected } = location.state || { selected: { isSafe: false, ssid: 'Unknown' } };
  
  const xpEarned = selected.isSafe ? 100 : 25;

  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-5xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
        
        <h1 className="text-2xl md:text-3xl text-orange-500 font-bold mb-6">
          Activity 2: <span className="text-white font-normal">Audit Review</span>
        </h1>
        
        <div className="h-px bg-orange-500/30 w-full mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-start gap-4">
                <Avatar />
                <div className="relative bg-[#7D86AD] bg-opacity-50 p-4 rounded-xl text-sm leading-relaxed border border-slate-600 shadow-lg mt-2">
                    <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] bg-opacity-50 transform rotate-45 border-l border-b border-slate-600"></div>
                    {selected.isSafe 
                      ? "Masterful choice! You identified the WPA2 personal encryption. It's the safest way to browse in a public area."
                      : "A risky connection! You chose a network that leaves your data exposed. Let's learn how to spot the safer options."}
                </div>
            </div>

            <div className="bg-[#2d3748] p-8 rounded-3xl border border-slate-600/50 text-center shadow-inner">
                <div className="mb-6 flex flex-col items-center">
                  <div className={`w-24 h-24 ${selected.isSafe ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-red-500/20 border-red-500 text-red-500'} rounded-full flex items-center justify-center mb-4 border-2 shadow-lg`}>
                    {selected.isSafe 
                      ? <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                      : <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    }
                  </div>
                  <span className="text-white text-3xl font-bold">{selected.isSafe ? "Secure Link" : "Unsafe Link"}</span>
                  <span className="text-slate-400 text-xs font-bold uppercase mt-1 tracking-widest">{selected.ssid}</span>
                </div>

                <div className="flex items-center justify-center gap-6 mb-4">
                  <span className="text-slate-300 text-lg font-medium">Audit XP:</span>
                  <div className="bg-[#9f1239] px-10 py-3 rounded-2xl text-orange-400 font-black text-4xl shadow-lg border border-white/10">
                    +{xpEarned}
                  </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-[#9f1239]/10 p-5 rounded-xl border border-orange-500/30">
              <h3 className="text-orange-500 font-bold mb-3">Auditor Checkmarks</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${selected.isSafe ? 'bg-orange-500' : 'bg-slate-700'}`}>✓</div>
                  <span className="text-sm">Verify network encryption standard</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${selected.isSafe ? 'bg-orange-500' : 'bg-slate-700'}`}>✓</div>
                  <span className="text-sm">Identify 'Honey Pot' deceptive SSIDs</span>
                </div>
              </div>
            </div>

            <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-3xl border border-slate-600 flex-grow shadow-lg">
              <h3 className="text-orange-500 text-xl font-bold mb-6 flex items-center gap-3">
                <span className="text-2xl">📡</span> WiFi Safety Protocol
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5 text-sm uppercase tracking-tight">Encryption is Key</h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed">Always look for 'WPA2' or 'WPA3' in the connection details. Avoid 'Open' or 'Unsecured' networks whenever possible.</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5 text-sm uppercase tracking-tight">Use a VPN</h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed">If you MUST use public WiFi, use a Virtual Private Network (VPN) to create a secure 'tunnel' for your data.</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5 text-sm uppercase tracking-tight">Forget the Network</h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed">Turn off 'Auto-Join' on your phone so you don't accidentally connect to dangerous networks you've used before.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button 
              onClick={() => navigate('/dashboard')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-20 rounded-2xl text-xl shadow-[0_20px_60px_rgba(249,115,22,0.3)] hover:scale-105 transition-all transform active:scale-95 border-b-4 border-orange-700"
          >
              Complete Level 3
          </button>
        </div>
      </div>
    </div>
  );
};
export default WifiAuditorFeedback;