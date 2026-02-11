
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';

export const NewsDetectorFeedback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 2 };
  
  const percentage = (score / total) * 100;
  const xpEarned = Math.round((score / total) * 150);

  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-5xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
        
        <h1 className="text-2xl md:text-3xl text-orange-500 font-bold mb-6">
          Activity 1: <span className="text-white font-normal">News Detector Results</span>
        </h1>
        
        <div className="h-px bg-orange-500/30 w-full mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-start gap-4">
                <Avatar />
                <div className="relative bg-[#7D86AD] bg-opacity-50 p-4 rounded-xl text-sm leading-relaxed border border-slate-600 shadow-lg mt-2">
                    <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] bg-opacity-50 transform rotate-45 border-l border-b border-slate-600"></div>
                    {percentage >= 100 
                      ? "Flawless investigation! You have a critical eye for detail and know how to spot misinformation from a mile away."
                      : percentage >= 50 
                      ? "Good detective work! You spotted some of the fakes, but some tricks still got through. Practice makes perfect."
                      : "Investigation is a skill that takes time. Remember: always check the source and read laterally before sharing!"}
                </div>
            </div>

            <div className="bg-[#7D86AD] bg-opacity-50 p-8 rounded-3xl border border-slate-600/50 text-center shadow-inner">
                <div className="mb-6 flex flex-col items-center">
                  <div className={`w-28 h-28 ${percentage >= 80 ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-orange-500/20 border-orange-500 text-orange-500'} rounded-full flex flex-col items-center justify-center mb-4 border-2 shadow-lg`}>
                    <span className="text-4xl font-black">{score}/{total}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Correct</span>
                  </div>
                  <span className="text-white text-3xl font-bold">Investigation Rating</span>
                </div>

                <div className="flex items-center justify-center gap-6 mb-8">
                  <span className="text-slate-300 text-lg">Earned:</span>
                  <div className="bg-[#9f1239] px-10 py-3 rounded-2xl text-orange-400 font-black text-4xl shadow-lg border border-white/10">
                    {xpEarned} XP
                  </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-[#9f1239]/10 p-5 rounded-xl border border-orange-500/30">
              <h3 className="text-orange-500 font-bold mb-3">Goal Progress</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${percentage >= 50 ? 'bg-orange-500' : 'bg-slate-700'}`}>✓</div>
                  <span className="text-sm">Filter through multiple news sources</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${percentage === 100 ? 'bg-orange-500' : 'bg-slate-700'}`}>✓</div>
                  <span className="text-sm">Achieve a perfect investigation score</span>
                </div>
              </div>
            </div>

            <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-3xl border border-slate-600 flex-grow shadow-lg">
              <h3 className="text-orange-500 text-xl font-bold mb-6 flex items-center gap-3">
                <span className="text-2xl">🛡️</span> Media Literacy Pro-Tips
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5 text-sm uppercase tracking-tight">Check the Domain</h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed">Fake sites often use names that sound like real ones but end in .co or .com.co. Always verify the address bar.</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5 text-sm uppercase tracking-tight">Reverse Image Search</h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed">Fake news often repurposes old photos or stock images to mislead. Search the image to find its true origin.</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5 text-sm uppercase tracking-tight">Read Laterally</h5>
                    <p className="text-slate-400 text-[11px] leading-relaxed">Don't just read the page you're on. Open new tabs and see what other trusted sites are saying about the same topic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button 
              onClick={() => navigate('/wifi-auditor')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-20 rounded-2xl text-xl shadow-[0_20px_60px_rgba(249,115,22,0.3)] hover:scale-105 transition-all transform active:scale-95 border-b-4 border-orange-700"
          >
              Next Activity
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewsDetectorFeedback;