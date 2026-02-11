
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';

export const MeetingAdvisorFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, max, selections } = location.state || { score: 0, max: 12, selections: {} };
  
  const percentage = (score / max) * 100;
  const xpEarned = Math.round((score / max) * 100);

  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 font-sans text-slate-200">
      <div className="w-full max-w-5xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700/50">
        
        <h1 className="text-2xl md:text-3xl text-orange-500 font-bold mb-6">
          Activity 4: <span className="text-white font-normal">Meeting Plan Review</span>
        </h1>
        
        <div className="h-px bg-orange-500/50 w-full mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-start gap-4">
                <Avatar />
                <div className="relative bg-[#7D86AD] bg-opacity-50 p-4 rounded-xl text-sm leading-relaxed border border-slate-600 shadow-lg mt-2">
                    <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] bg-opacity-50 transform rotate-45 border-l border-b border-slate-600"></div>
                    {percentage >= 90 
                      ? "A flawless plan! You prioritized safety at every step. This is how you protect yourself."
                      : "Your plan has some risks. Remember: public places, daylight hours, and adult supervision are non-negotiable."}
                </div>
            </div>

            <div className="bg-[#7D86AD] bg-opacity-50 p-8 rounded-3xl border border-slate-600/50 text-center shadow-inner">
                <div className="mb-6 flex flex-col items-center">
                  <div className={`w-28 h-28 ${percentage >= 80 ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-orange-500/20 border-orange-500 text-orange-500'} rounded-full flex flex-col items-center justify-center mb-4 border-2 shadow-lg`}>
                    <span className="text-4xl font-black">{Math.round(percentage)}%</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Safe Plan</span>
                  </div>
                  <span className="text-white text-3xl font-bold">Plan Approval</span>
                </div>

                <div className="flex items-center justify-center gap-6 mb-8">
                  <span className="text-slate-300 text-lg">Earned you:</span>
                  <div className="bg-[#9f1239] px-10 py-3 rounded-2xl text-orange-400 font-black text-4xl shadow-lg border border-white/5">
                    {xpEarned} XP
                  </div>
                </div>

                <div className="text-left space-y-3">
                  <h4 className="text-orange-500 font-bold mb-2">Plan Summary:</h4>
                  {Object.entries(selections).map(([key, opt]) => (
                      <div key={key} className="flex items-center gap-3 bg-[#7D86AD] bg-opacity-80 p-3 rounded-xl border border-slate-700">
                          <div className={`w-2 h-2 rounded-full ${opt.safety === 3 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-xs text-slate-300">{opt.text}</span>
                      </div>
                  ))}
                </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className={`p-5 rounded-xl border ${percentage >= 70 ? 'bg-[#1a2e25] border-green-500/30' : 'bg-[#2e2520] border-red-500/30'}`}>
              <h3 className="text-orange-500 font-bold mb-3">Goal Progress</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${percentage >= 70 ? 'bg-green-500' : 'bg-red-500'}`}>{percentage >= 70 ? '✓' : '✗'}</div>
                  <span className={`text-sm ${percentage >= 70 ? 'text-slate-200' : 'text-slate-400'}`}>Build a plan with over 70% safety</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${percentage === 100 ? 'bg-green-500' : 'bg-red-500'}`}>{percentage === 100 ? '✓' : '✗'}</div>
                  <span className={`text-sm ${percentage === 100 ? 'text-slate-200' : 'text-slate-400'}`}>Achieve a perfect 100% safety rating</span>
                </div>
              </div>
            </div>

            <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-3xl border border-slate-600 flex-grow shadow-lg">
              <h3 className="text-orange-500 text-xl font-bold mb-6 flex items-center gap-3">
                <span className="text-2xl">🚧</span> The Golden Rules of Meeting
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Always Bring an Adult</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">No matter how long you've talked, they are still a stranger. A parent provides critical protection.</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Stay in Public</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Malls, libraries, or cafes are best. Never go to private homes or isolated parks.</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Daylight Only</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Visibility is your friend. Stick to afternoon hours where people are around.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          {percentage >= 70 ? (
            <button 
                onClick={() => navigate('/level-2-transition')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-20 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all transform active:scale-95 border-b-4 border-orange-700"
            >
                Finish Mission
            </button>
          ) : (
            <>
              <button 
                  onClick={() => navigate('/meeting-advisor')}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-20 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all transform active:scale-95 border-b-4 border-orange-700"
              >
                Restart Level
              </button>
              <button 
                  onClick={() => navigate('/dashboard')}
                  className="border-2 border-slate-500 hover:border-white text-slate-200 hover:text-white font-black py-4 px-20 rounded-2xl text-xl transition-colors"
              >
                Exit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
