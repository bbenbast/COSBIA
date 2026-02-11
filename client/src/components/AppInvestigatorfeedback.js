
import React from 'react';
import { Avatar } from './Avatar';
import { useNavigate, useLocation } from 'react-router-dom';

export const AppInvestigatorFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get correctness data from navigation state
  const correctCount = location.state?.correctCount || 0;
  const appCorrect = location.state?.appCorrect || false;
  
  // Calculate XP based on performance
  // App selection: 25 XP if correct
  // Red flags: 50 XP if all 4 correct, otherwise 10 XP per correct
  // Total available: 75 XP
  const calculateXP = (appIsCorrect, correctFlags) => {
    let xp = 0;
    
    // App selection bonus
    if (appIsCorrect) {
      xp += 25;
    }
    
    // Red flags scoring
    if (correctFlags === 4) {
      xp += 50; // Full bonus for all correct
    } else {
      xp += correctFlags * 10; // 10 XP per correct flag
    }
    
    return xp;
  };
  
  const earnedXP = calculateXP(appCorrect, correctCount);
  const totalAvailableXP = 75;

  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 md:p-8 font-sans text-white">
      <div className="w-full max-w-4xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl text-orange-500 font-bold">
              Activity 2: <span className="text-white font-normal">The App Investigator</span>
            </h1>
            <div className="bg-[#9f1239] px-6 py-2 rounded-xl text-white font-bold text-xl shadow-lg border border-white/10">
                {totalAvailableXP} XP
            </div>
        </div>
        
        <div className="h-px bg-slate-500/20 w-full mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Bot Congratulations */}
            <div className="flex items-start gap-4">
                <div className="shrink-0">
                   <Avatar />
                </div>
                <div className="relative bg-[#7D86AD] bg-opacity-50 p-4 rounded-xl text-sm leading-relaxed border border-slate-600 shadow-inner mt-2 text-slate-100">
                  <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] transform rotate-45 border-l border-b border-slate-600 opacity-50"></div>
                  {earnedXP === totalAvailableXP ? (
                    <>Excellent detective work! You've successfully identified the safer app and spotted all the red flags.</>
                  ) : (
                    <>Good effort! Let's see what you missed in your investigation. Review the feedback below to improve your detective skills.</>
                  )}
                </div>
            </div>

            {/* Investigator Result Card */}
            <div className="bg-[#7D86AD] bg-opacity-50 p-8 rounded-3xl border border-slate-600 shadow-inner text-center">
                <div className="mb-6 flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2 shadow-[0_0_20px_rgba(34,197,94,0.15)] ${earnedXP === totalAvailableXP ? 'bg-green-500/10 border-green-500' : 'bg-yellow-500/10 border-yellow-500'}`}>
                    <svg className={`w-10 h-10 ${earnedXP === totalAvailableXP ? 'text-green-500' : 'text-yellow-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="text-white text-3xl font-bold">{earnedXP === totalAvailableXP ? 'Perfect Score!' : 'Investigation Complete'}</span>
                </div>

                <div className="flex items-center justify-center gap-6 mb-8">
                  <span className="text-slate-300 text-lg">Earned you:</span>
                  <div className="bg-[#fff9e6] px-8 py-3 rounded-2xl text-orange-500 font-black text-3xl shadow-md border-2 border-orange-200">
                    {earnedXP} / {totalAvailableXP} XP
                  </div>
                </div>

                {earnedXP < totalAvailableXP && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
                    <p className="font-bold mb-2">What you missed:</p>
                    <ul className="space-y-1 text-left">
                      {!appCorrect && <li>• You selected the wrong app. Remember to check for excessive permissions and suspicious developer information.</li>}
                      {appCorrect && correctCount < 4 && <li>• You missed {4 - correctCount} red flag{4 - correctCount > 1 ? 's' : ''}. Review the warning signs of sketchy apps.</li>}
                    </ul>
                  </div>
                )}

                <div className="text-left">
                  <h4 className="text-orange-500 font-bold mb-4 flex items-center gap-2">
                     <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
                     Red Flags Identified:
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#315a45] text-[#78f5a3] px-4 py-2 rounded-lg text-sm border border-[#3e6b52] font-medium">Excessive Permissions</div>
                    <div className="bg-[#315a45] text-[#78f5a3] px-4 py-2 rounded-lg text-sm border border-[#3e6b52] font-medium">Spelling Errors</div>
                    <div className="bg-[#315a45] text-[#78f5a3] px-4 py-2 rounded-lg text-sm border border-[#3e6b52] font-medium">Unverified Developer</div>
                    <div className="bg-[#315a45] text-[#78f5a3] px-4 py-2 rounded-lg text-sm border border-[#3e6b52] font-medium">Low Review Count</div>
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
                  <span className="text-sm">Select the safer app to download</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                  <span className="text-sm">Identify the red flags in the sketchy app</span>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-3xl border border-slate-600 flex-grow shadow-inner text-slate-100">
              <h3 className="text-orange-500 text-xl font-bold mb-6 flex items-center gap-3">
                <span className="text-2xl">🔍</span> Tips for Safe App Browsing
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600 group-hover:bg-slate-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Check Permissions</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Does a calculator really need access to your contacts or location?</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600 group-hover:bg-slate-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Read User Reviews</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Look for consistent complaints about ads, crashes, or weird behavior.</p>
                  </div>
                </div>

                <div className="h-px bg-slate-600/50 w-full"></div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 bg-[#2d3748] rounded-xl flex items-center justify-center text-orange-500 border border-slate-600 group-hover:bg-slate-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-0.5">Verify the Developer</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Search for the developer online to see if they are reputable.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>      

        </div>

        <div className="flex justify-center gap-4 mt-8">
          {earnedXP < totalAvailableXP && (
            <button 
                onClick={() => navigate('/app-investigator')}
                className="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-base bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-200"
            >
                Repeat Level
            </button>
          )}
          <button 
              onClick={() => navigate('/level-transition')}
              className="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-base bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-orange-500/30 transform hover:-translate-y-1 transition-all duration-200"
          >
              {earnedXP === totalAvailableXP ? 'Complete Level 1' : 'Continue Anyway'}
          </button>
        </div>
      </div>
    </div>
  );
};
