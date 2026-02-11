
import React, { useState } from 'react';
import { Avatar } from './Avatar';
import { Route, useNavigate } from 'react-router-dom';

const APPS_DATA = [
  {
    id: 1,
    name: "PhotoMagic Pro",
    developer: "AppDevStudio",
    stars: 3.5,
    reviews: "12 reviews",
    permissions: ["Contacts", "Location", "Microphone", "Storage"],
    description: "The best photo editor with many filters and efects. You can edit your photos and make them look amazing. Easy to use with simple interface. Dowload now for free!",
    isSafe: false,
    redFlags: ["Excessive permissions", "Low review count", "Spelling errors in description"]
  },
  {
    id: 2,
    name: "PhotoEdit Plus",
    developer: "KnownPhotoCompany Inc.",
    stars: 4.8,
    reviews: "250,000 reviews",
    permissions: ["Storage (for saving photos)"],
    description: "PhotoEdit Plus is a professional photo editing application with advanced tools and filters. Our app provides high-quality editing features while respecting your privacy. Save and edit your photos with confidence.",
    isSafe: true,
    redFlags: []
  }
];

const RED_FLAG_OPTIONS = [
  { id: 'rf1', text: "Asking for unnecessary permissions for the app type", isCorrect: true },
  { id: 'rf2', text: "Small number of reviews", isCorrect: true },
  { id: 'rf3', text: "Interesting Logo", isCorrect: false },
  { id: 'rf4', text: "Unprofessional description", isCorrect: true },
  { id: 'rf5', text: "High rating", isCorrect: false },
  { id: 'rf6', text: "Unverified app developer", isCorrect: true },
];

export const AppInvestigator = () => {
  const [step, setStep] = useState(1); // 1: Selection, 2: Red Flag Quiz
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [appSelectionSubmitted, setAppSelectionSubmitted] = useState(false);
  
  const [selectedFlags, setSelectedFlags] = useState({}); // { id: true }
  const [flagsSubmitted, setFlagsSubmitted] = useState(false);
  const [flagResults, setFlagResults] = useState({}); // { id: { checked: boolean, isCorrect: boolean } }
  
  const navigate = useNavigate();

  const handleAppSelect = (id) => {
    if (appSelectionSubmitted) return;
    setSelectedAppId(id);
  };

  const handleAppSubmit = () => {
    if (!selectedAppId) return;
    setAppSelectionSubmitted(true);
  };

  const handleFlagSelect = (flag) => {
    if (flagsSubmitted) return; // don't allow changes after submission

    setSelectedFlags(prev => {
      const exists = !!prev[flag.id];
      // toggle selection
      if (exists) {
        const copy = { ...prev };
        delete copy[flag.id];
        return copy;
      }
      return { ...prev, [flag.id]: true };
    });
  };

  const handleCheckFlags = () => {
    // compute results for selected flags but do not change selection state
    const results = {};
    Object.keys(selectedFlags).forEach(id => {
      const opt = RED_FLAG_OPTIONS.find(o => o.id === id);
      results[id] = { checked: true, isCorrect: !!opt?.isCorrect };
    });
    setFlagResults(results);
    setFlagsSubmitted(true);
  };



  const correctSelectedCount = Object.keys(flagResults).filter(id => flagResults[id].isCorrect).length;
  const isPart2Complete = flagsSubmitted;

  const currentApp = APPS_DATA.find(a => a.id === selectedAppId);

  // --- Step 1: App Selection UI ---
  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 md:p-8 font-sans text-white">
        <div className="w-full max-w-4xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-2xl md:text-4xl text-orange-500 font-bold">
                  Activity 2: <span className="text-white font-normal">The App Investigator</span>
              </h1>
              <div className="bg-[#9f1239] px-6 py-2 rounded-xl text-white font-bold text-xl shadow-lg border border-white/10">
                  50 XP
              </div>
          </div>
          <div className="h-px bg-slate-500/20 w-full mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              <div className="lg:col-span-7">
                  <div className="flex items-start gap-4">
                      <Avatar />
                        <div className="relative bg-[#7D86AD] bg-opacity-50 p-5 rounded-xl text-sm md:text-base leading-relaxed border border-slate-600 shadow-inner mt-2 text-slate-100">
                          <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] transform rotate-45 border-l border-b border-slate-600 opacity-50"></div>
                          Welcome to the App Investigator, your goal for this mission is to investigate and identify which of the apps below is safe to download.
                      </div>
                  </div>
              </div>
              <div className="lg:col-span-5">
                  <div className="bg-[#2d2a3e] p-5 rounded-2xl border-l-4 border-orange-500 shadow-lg h-full">
                      <h3 className="text-orange-500 font-bold mb-3">Your Goal</h3>
                      <div className="space-y-3">
                          <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${appSelectionSubmitted && currentApp?.isSafe ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-500 text-transparent'}`}>✓</div>
                              <span className="text-sm">Select the safer app to download</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {APPS_DATA.map((app) => (
                  <div key={app.id} className="relative">
                      <h3 className="text-2xl font-bold text-white mb-4 ml-2">App {app.id}</h3>
                        <div 
                          onClick={() => handleAppSelect(app.id)}
                          className={`bg-[#7D86AD] bg-opacity-50 rounded-2xl p-6 transition-all duration-300 cursor-pointer border-2 h-full ${selectedAppId === app.id ? 'border-orange-500 shadow-lg scale-[1.02] bg-opacity-50' : 'border-transparent hover:bg-opacity-50'}`}
                        >
                          <div className="flex gap-4 mb-6">
                              <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg text-white">
                                 {app.id === 1 ? <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg> : <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>}
                              </div>
                              <div>
                                  <h4 className="text-xl font-bold text-white">{app.name}</h4>
                                  <p className="text-slate-400 text-sm">Developer: {app.developer}</p>
                                  <div className="text-yellow-500 text-xs mt-1">{app.reviews}</div>
                              </div>
                          </div>
                          <div className="bg-[#7D86AD] bg-opacity-50 p-6 md:p-8 rounded-2xl border border-slate-600 shadow-inner mb-4">
                              <h5 className="text-orange-400 text-sm font-bold uppercase mb-2">Permissions:</h5>
                              <ul className="text-sm text-slate-100 space-y-1">
                                {app.permissions.map(p => <li key={p}>• {p}</li>)}
                              </ul>
                          </div>
                          <div className="bg-[#7D86AD] bg-opacity-50 p-6 md:p-8 rounded-2xl border border-slate-600 shadow-inner">
                              <h5 className="text-orange-400 text-sm font-bold uppercase mb-1">Description:</h5>
                              <p className="text-slate-100 text-sm italic">"{app.description}"</p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
            <div className="flex justify-center">
              {!appSelectionSubmitted ? (
                <button 
                onClick={handleAppSubmit}
                disabled={!selectedAppId}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${!selectedAppId ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1'}`}
                >
                  Submit Choice
                </button>
              ) : null}
            </div>
          {/* Show result after submission */}
          {appSelectionSubmitted && currentApp && (
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className={`bg-[#7D86AD] bg-opacity-50 p-6 rounded-2xl border shadow-inner text-center text-slate-100 max-w-xl ${currentApp.isSafe ? 'border-green-500' : 'border-red-500'}`}>
                {currentApp.isSafe ? (
                  <>
                    <div className="font-bold text-2xl text-green-300 mb-2">Correct choice!</div>
                    <div className="text-green-200">This app appears safe to download.</div>
                  </>
                ) : (
                  <>
                    <div className="font-bold text-2xl text-red-300 mb-2">Incorrect choice</div>
                    <div className="text-red-200">This app contains red flags. You'll get to identify them next.</div>
                  </>
                )}
              </div>
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Step 2: Red Flag Quiz UI ---
  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 md:p-8 font-sans text-white">
      <div className="w-full max-w-4xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl md:text-4xl text-orange-500 font-bold">
                Activity 2: <span className="text-white font-normal">The App Investigator</span>
            </h1>
            <div className="bg-[#9f1239] px-10 py-2 rounded-xl text-white font-bold text-3xl shadow-lg border border-white/10">
                75 XP
            </div>
        </div>

        <div className="h-px bg-slate-500/20 w-full mb-8"></div>

        {/* Bot & Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
            <div className="lg:col-span-7">
                <div className="flex items-start gap-4">
                    <Avatar />
                        <div className="relative bg-[#7D86AD] bg-opacity-50 p-5 rounded-xl leading-relaxed border border-slate-600 shadow-inner mt-2 text-slate-100">
                        <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] transform rotate-45 border-l border-b border-slate-600 opacity-50"></div>
                        The second part of the App Investigator is where you tell us how you got to identify the fake app
                      </div>
                </div>
            </div>
            <div className="lg:col-span-5">
                <div className="bg-[#2d2a3e] p-5 rounded-2xl border-l-4 border-orange-500 shadow-lg h-full flex flex-col justify-center">
                    <h3 className="text-orange-500 font-bold mb-3">Your Goal</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] bg-orange-500 border border-orange-500 text-white">✓</div>
                            <span className="text-sm">Select the safer app to download</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${isPart2Complete ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-500 text-transparent'}`}>✓</div>
                            <span className="text-sm">Identify the red flags in the sketchy app</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Central Question */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#7D86AD] bg-opacity-50 px-8 py-4 rounded-xl border border-slate-600 text-orange-500 font-bold text-lg text-center shadow-inner">
            What are the red flags that would help you identify a fake app from an app store?
          </div>
        </div>

        {/* Flag Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-6 px-6">
          {RED_FLAG_OPTIONS.map((flag) => {
            const isSelected = !!selectedFlags[flag.id];
            const result = flagResults[flag.id];
            return (
              <button
                key={flag.id}
                onClick={() => handleFlagSelect(flag)}
                className={`relative w-full p-6 rounded-2xl text-slate-100 font-medium transition-all text-center border-2 shadow-lg ${
                  !isSelected ? 'bg-[#7D86AD] bg-opacity-50 border-transparent hover:bg-[#7D86AD] bg-opacity-60' : 'bg-[#7D86AD] bg-opacity-30 border-orange-500 scale-[1.02]'
                }`}
              >
                {flag.text}
                {flagsSubmitted && result && (
                  <div className={`absolute bottom-2 right-4 text-xs font-bold ${result.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {result.isCorrect ? 'Correct' : 'Incorrect'}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-4 mb-8">
          {!flagsSubmitted ? (
            <button
              onClick={handleCheckFlags}
              disabled={Object.keys(selectedFlags).length === 0}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${Object.keys(selectedFlags).length === 0 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1'}`}
            >
              Check Answers
            </button>
          ) : (
            <div className="text-center">
              <div className="mb-4 text-slate-200">You got <span className="font-bold text-white">{correctSelectedCount}</span> correct.</div>
              <button
                onClick={() => navigate('/app-investigator-feedback', { state: { correctCount: correctSelectedCount, appCorrect: currentApp?.isSafe } })}
                disabled={!isPart2Complete}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${!isPart2Complete ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
