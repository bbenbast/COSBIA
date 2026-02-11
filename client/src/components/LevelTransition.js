
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';

export const LevelTransition = () => {
  const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 md:p-8 font-sans text-white overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]"></div>
      </div>

            <div className="w-full max-w-4xl bg-[#1D2758] rounded-[3rem] p-8 md:p-12 shadow-2xl relative border border-slate-700 flex flex-col items-center text-center z-10">
        
        {/* Celebration Header */}
        <div className="mb-8">
            <div className="inline-block px-6 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-500 font-bold text-sm uppercase tracking-widest mb-4 animate-bounce">
                Mission Success
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">
                Level 1 <span className="text-orange-500">Mastered!</span>
            </h1>
            <p className="text-slate-400 text-lg">You are now an Account Security Specialist</p>
        </div>

        {/* Bot Message */}
        <div className="flex flex-col items-center gap-6 mb-12 max-w-2xl">
            <Avatar />
            <div className="relative bg-[#7D86AD] bg-opacity-50 p-6 rounded-2xl border border-slate-600 shadow-inner text-lg leading-relaxed text-slate-100">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#7D86AD] transform rotate-45 border-l border-t border-slate-600 opacity-50"></div>
                "Fantastic work, trainee! You've built unhackable passwords and sniffed out shady apps like a pro. But the digital world is getting bigger... are you ready for Level 2?"
            </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-[2rem] border border-slate-600 flex flex-col items-center justify-center shadow-inner transform hover:scale-105 transition-transform">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total XP</span>
                <span className="text-4xl font-black text-orange-500">125</span>
            </div>
            <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-[2rem] border border-slate-600 flex flex-col items-center justify-center shadow-inner transform hover:scale-105 transition-transform">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Rank Up</span>
                <span className="text-2xl font-black text-white italic">Guard</span>
            </div>
            <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-[2rem] border border-slate-600 flex flex-col items-center justify-center shadow-inner transform hover:scale-105 transition-transform">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Badge</span>
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
            </div>
        </div>

        {/* Level 2 Preview */}
        <div className="w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-slate-700 p-8 rounded-[2.5rem] mb-12 text-left relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-purple-400 font-bold text-sm uppercase tracking-widest mb-2">Incoming Mission:</h3>
                <h4 className="text-2xl font-bold text-white mb-4">Level 2: The Social Media Frontier</h4>
                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                    It's time to step into the social spotlight. Learn how to manage friend requests, protect your personal photos, and spot influencers who aren't quite who they claim to be.
                </p>
            </div>
            {/* Abstract Icon BG */}
            <svg className="absolute top-1/2 -right-10 -translate-y-1/2 w-48 h-48 text-white/5 opacity-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"/></svg>
        </div>

        {/* Continue Button */}
        <button 
            onClick={() => navigate('/friend-request-filter')}
            className="flex items-center gap-3 px-8 py-3 rounded-full font-bold text-lg bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1 transition-all duration-300"
        >
            <span className="flex items-center gap-3">
                Begin Level 2
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </span>
        </button>
      </div>
    </div>
  );
};
