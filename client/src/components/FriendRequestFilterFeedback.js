
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';

const PROFILES = [
  { id: 'p1', username: 'GamerAlex_07', isSafe: true },
  { id: 'p2', username: 'FreeRobux_King', isSafe: false },
  { id: 'p3', username: 'Unknown_Entity', isSafe: false },
  { id: 'p4', username: 'TaylorSwift_Real1', isSafe: false },
  { id: 'p5', username: 'SchoolSports_Jake', isSafe: true }
];

export const FriendRequestFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { decisions, score } = location.state || { decisions: [], score: 0 };
  
  const xpEarned = score * 20;

  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 md:p-8 font-sans text-white">
      <div className="w-full max-w-4xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
        
        <h1 className="text-2xl md:text-3xl text-orange-500 font-bold mb-6">
          Activity 1: <span className="text-white font-normal">Friend Request Results</span>
        </h1>
        
        <div className="h-px bg-slate-500/20 w-full mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex items-start gap-4">
              <Avatar />
              <div className="relative bg-[#7D86AD] bg-opacity-50 p-4 rounded-xl leading-relaxed border border-slate-600 shadow-inner mt-2 text-slate-100">
                <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] transform rotate-45 border-l border-b border-slate-600 opacity-50"></div>
                {score === 5 
                  ? "Perfect! You're a natural social media detective. You know exactly who to trust."
                  : "Good effort! Remember to always check mutual friends and suspicious bios before accepting."}
              </div>
            </div>

            <div className="bg-[#7D86AD] bg-opacity-50 p-8 rounded-3xl border border-slate-600 shadow-inner text-center">
                <div className="mb-6 flex flex-col items-center">
                  <div className={`w-20 h-20 ${score >= 4 ? 'bg-green-500/10 border-green-500' : 'bg-yellow-500/10 border-yellow-500'} rounded-full flex items-center justify-center mb-4 border-2 shadow-md`}>
                    <span className="text-3xl font-black">{score}/5</span>
                  </div>
                  <span className="text-white text-3xl font-bold">Accuracy Rating</span>
                </div>

                <div className="flex items-center justify-center gap-6 mb-8">
                  <span className="text-slate-300 text-lg">Earned you:</span>
                  <div className="bg-[#9f1239] px-10 py-3 rounded-2xl text-orange-400 font-black text-4xl shadow-lg border border-white/5">
                    {xpEarned} XP
                  </div>
                </div>

                <div className="text-left">
                  <h4 className="text-orange-500 font-bold mb-4 flex items-center gap-2">
                     Decisions Breakdown:
                  </h4>
                  <div className="space-y-2">
                    {decisions.map(d => {
                      const profile = PROFILES.find(p => p.id === d.profileId);
                      const isCorrect = (profile.isSafe && d.decision === 'accept') || (!profile.isSafe && d.decision === 'decline');
                      return (
                        <div key={d.profileId} className="flex items-center justify-between bg-[#1e2330] p-3 rounded-xl border border-slate-700 shadow-inner">
                          <span className="text-sm font-bold">@{profile.username}</span>
                          <div className="flex gap-2">
                            <span className={`text-[10px] uppercase font-black px-2 py-1 rounded ${d.decision === 'accept' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {d.decision}ed
                            </span>
                            <span className={`text-[10px] uppercase font-black px-2 py-1 rounded ${isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-[#1a2e25] p-5 rounded-xl border border-green-500/30">
              <h3 className="text-orange-500 font-bold mb-3">Your Goal</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${score >= 3 ? 'bg-orange-500' : 'bg-slate-700'}`}>✓</div>
                  <span className="text-sm">Filter out dangerous bot and scam accounts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${score === 5 ? 'bg-orange-500' : 'bg-slate-700'}`}>✓</div>
                  <span className="text-sm">Identify all safe friend requests</span>
                </div>
              </div>
            </div>

            <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-3xl border border-slate-600 flex-grow shadow-lg">
              <h3 className="text-orange-500 text-xl font-bold mb-6 flex items-center gap-3">
                <span className="text-2xl">📱</span> Social Media Safety Tips
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Mutual Friends Matter</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Check if your real-life friends also know them. No mutuals is often a red flag.</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Watch for Links</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Bios with "FREE" anything or suspicious shortened links are usually scams.</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Private is Safer</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Keep your own profile private so strangers can't see your info before you accept them.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button 
              onClick={() => navigate('/meeting-advisor')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-20 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all transform active:scale-95 border-b-4 border-orange-700"
          >
              Next Activity!
          </button>
        </div>
      </div>
    </div>
  );
};
