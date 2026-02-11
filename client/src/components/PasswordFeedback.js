
import React from 'react';
import axios from 'axios';
import { Avatar } from './Avatar';

export const PasswordFeedback = ({ password, onNextLevel }) => {
  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 md:p-8 font-sans text-white">
      <div className="w-full max-w-4xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
        
        <h1 className="text-2xl md:text-3xl text-orange-500 font-bold mb-6">
          Activity 1: <span className="text-white font-normal">The Password Builder</span>
        </h1>
        
        <div className="h-px bg-slate-500/20 w-full mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Bot Congratulations */}
            <div className="flex items-start gap-4">
                <div className="shrink-0">
                   <Avatar />
                </div>
                <div className="relative bg-[#7D86AD] bg-opacity-50 p-4 rounded-xl leading-relaxed border border-slate-600 shadow-inner mt-2 text-slate-100">
                  <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] transform rotate-45 border-l border-b border-slate-600 opacity-50"></div>
                    Congratulations! You have successfully completed the Password builder
                  </div>
            </div>

            {/* Password Result Card */}
            <div className="bg-[#7D86AD] bg-opacity-50 p-8 rounded-3xl border border-slate-600 shadow-inner text-center">
                <div className="mb-6">
                  <span className="text-orange-500 text-2xl font-semibold mr-4">Your password:</span>
                  <div className="mt-3 w-full bg-[#2b2f3f] p-3 rounded-lg">
                    <span className="text-white font-mono text-xl md:text-2xl font-bold tracking-tight break-words break-all whitespace-normal">{password}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 mb-8">
                  <span className="text-slate-300 text-lg">Earned you:</span>
                  <div className="bg-[#fff9e6] px-8 py-3 rounded-2xl text-orange-500 font-black text-3xl shadow-md border-2 border-orange-200">
                    50 XP
                  </div>
                </div>

                <div className="text-left">
                  <h4 className="text-orange-500 font-bold mb-4 flex items-center gap-2">
                     <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
                     Requirements met:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#315a45] text-[#78f5a3] px-4 py-2 rounded-lg text-sm border border-[#3e6b52] font-medium">12 Characters found</div>
                    <div className="bg-[#315a45] text-[#78f5a3] px-4 py-2 rounded-lg text-sm border border-[#3e6b52] font-medium">Symbols found</div>
                    <div className="bg-[#315a45] text-[#78f5a3] px-4 py-2 rounded-lg text-sm border border-[#3e6b52] font-medium">UpperCase letters found</div>
                    <div className="bg-[#315a45] text-[#78f5a3] px-4 py-2 rounded-lg text-sm border border-[#3e6b52] font-medium">Numbers found</div>
                    <div className="bg-[#315a45] text-[#78f5a3] px-4 py-2 rounded-lg text-sm border border-[#3e6b52] font-medium">LowerCase letters found</div>
                  </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Your Goal Summary */}
            <div className="bg-[#2d2a3e] p-5 rounded-xl border border-slate-600/30">
              <h3 className="text-orange-500 font-bold mb-3">Your Goal</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                  <span className="text-sm">Create a password that is at least 12 characters long</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                  <span className="text-sm">Include uppercase letters, lowercase letters, numbers, and symbols</span>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-3xl border border-slate-600 flex-grow shadow-inner text-slate-100">
              <h3 className="text-orange-500 text-xl font-bold mb-6 flex items-center gap-3">
                <span className="text-2xl">💡</span> Tips for even stronger passwords
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600 group-hover:bg-slate-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Use Random Words</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Combine unrelated words rather than common phrases</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600 group-hover:bg-slate-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Longer Is Better</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Aim for 14+ characters when possible</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600 group-hover:bg-slate-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 15.752zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Avoid Personal Info</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Don't use names, birthdays, or other easily guessable information</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600 group-hover:bg-slate-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Use Unique Passwords</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Never reuse passwords across different accounts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button 
              onClick={async () => {
                const mask = (s) => {
                  if (!s) return '';
                  if (s.length <= 6) return '*'.repeat(s.length);
                  return s.slice(0,2) + '*'.repeat(Math.max(0, s.length - 4)) + s.slice(-2);
                };

                const complexity = (
                  /[A-Z]/.test(password) &&
                  /[a-z]/.test(password) &&
                  /[0-9]/.test(password) &&
                  /[^A-Za-z0-9]/.test(password)
                );

                const payload = {
                  length: password ? password.length : 0,
                  complexity,
                  xp: 50,
                  masked: mask(password)
                };

                try {
                  await axios.post('http://localhost:5000/api/results/level1', payload);
                } catch (err) {
                  console.error('Failed to save level1 results', err);
                }

                onNextLevel();
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-20 rounded-2xl text-xl shadow-[0_10px_40px_rgba(249,115,22,0.3)] hover:scale-105 transition-all transform active:scale-95 border-b-4 border-orange-700"
          >
              Next Level!
          </button>
        </div>
      </div>
    </div>
  );
};
