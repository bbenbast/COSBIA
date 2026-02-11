
import React, { useState } from 'react';
import { Avatar } from './Avatar';
import { useNavigate } from 'react-router-dom';

const MEETING_SCENARIO = {
  title: "The 'Should I Meet?' Advisor",
  description: "A friend you've been gaming with for 6 months, 'GalaxyExplorer', wants to meet in person to trade some rare gear. Help build the safest meeting plan!",
  categories: [
    {
      id: 'location',
      title: 'Where should you meet?',
      options: [
        { id: 'loc1', text: 'A busy shopping mall food court', safety: 3, description: 'Highly public and safe.' },
        { id: 'loc2', text: 'A quiet park corner', safety: 1, description: 'Isolated areas are dangerous.' },
        { id: 'loc3', text: 'Their house', safety: 0, description: 'Never go to a stranger\'s home.' },
        { id: 'loc4', text: 'The local library', safety: 3, description: 'Public and supervised.' }
      ]
    },
    {
      id: 'time',
      title: 'What is the best time?',
      options: [
        { id: 'time1', text: 'Saturday at 2:00 PM', safety: 3, description: 'Broad daylight is best.' },
        { id: 'time2', text: 'Friday at 9:00 PM', safety: 1, description: 'Nighttime reduces visibility.' },
        { id: 'time3', text: 'Midnight', safety: 0, description: 'Extremely high risk.' },
        { id: 'time4', text: 'Immediately after school', safety: 3, description: 'Safe, daylight hours.' }
      ]
    },
    {
      id: 'who',
      title: 'Who should you bring?',
      options: [
        { id: 'who1', text: 'A parent or trusted guardian', safety: 3, description: 'The safest possible choice.' },
        { id: 'who2', text: 'Go alone to prove independence', safety: 0, description: 'Never meet an online stranger alone.' },
        { id: 'who3', text: 'A younger sibling', safety: 1, description: 'Does not provide enough protection.' },
        { id: 'who4', text: 'A group of online friends', safety: 1, description: 'Real-world protection is needed.' }
      ]
    },
    {
      id: 'permission',
      title: 'Who needs to know?',
      options: [
        { id: 'p1', text: 'Tell parents everything and get permission', safety: 3, description: 'Essential for safety.' },
        { id: 'p2', text: 'Keep it a secret surprise', safety: 0, description: 'Secrets lead to dangerous situations.' },
        { id: 'p3', text: 'Leave a note on the fridge', safety: 1, description: 'Direct communication is better.' },
        { id: 'p4', text: 'Tell only your best friend', safety: 1, description: 'Adult supervision is required.' }
      ]
    }
  ]
};

export const MeetingAdvisor = () => {
  const [selections, setSelections] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (categoryId, option) => {
    if (submitted) return;
    setSelections(prev => ({
      ...prev,
      [categoryId]: option
    }));
  };

  const calculateSafetyScore = () => {
    return Object.values(selections).reduce((acc, opt) => acc + opt.safety, 0);
  };

  const isPlanComplete = Object.keys(selections).length === MEETING_SCENARIO.categories.length;
  const safetyScore = calculateSafetyScore();
  const maxSafety = MEETING_SCENARIO.categories.length * 3;
  const safetyPercentage = (safetyScore / maxSafety) * 100;

  const handleSubmit = () => {
    if (!isPlanComplete) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 font-sans text-slate-200">
      <div className="w-full max-w-6xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700/50">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl text-orange-500 font-bold mb-1">
                    Activity 4: <span className="text-white font-normal">The 'Should I Meet?' Advisor</span>
                </h1>
                <p className="text-white text-lg">Level 1</p>
                <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-slate-400">Activity 4 of 4</span>
                    <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-orange-500 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div className="bg-[#9f1239] px-6 py-2 rounded-xl text-white font-bold text-xl shadow-lg border border-white/10">
                100 XP
            </div>
        </div>

        <div className="h-px bg-orange-500/50 w-full mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Bot & Scenario */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                    <Avatar />
                    <div className="relative bg-[#7D86AD] bg-opacity-50 p-4 rounded-xl text-sm leading-relaxed border border-slate-600 shadow-lg mt-2">
                        <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] bg-opacity-50 transform rotate-45 border-l border-b border-slate-600"></div>
                        Welcome trainee! Building a safe meeting plan is vital. Choose the safest options for each category to maximize your safety score!
                    </div>
                </div>

                <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-2xl border border-slate-600 shadow-inner">
                    <h3 className="text-orange-500 font-bold mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        The Scenario
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed italic">
                        "{MEETING_SCENARIO.description}"
                    </p>
                </div>

                <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-2xl border border-slate-700 flex flex-col items-center">
                    <h4 className="text-slate-400 text-xs font-bold uppercase mb-4">Safety Meter</h4>
                    <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700 shadow-inner">
                        <div 
                            className={`h-full transition-all duration-500 ${safetyPercentage > 80 ? 'bg-green-500' : safetyPercentage > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${safetyPercentage}%` }}
                        ></div>
                    </div>
                    <span className="mt-2 text-xl font-black text-white">{Math.round(safetyPercentage)}% Safe</span>
                </div>
            </div>

            {/* Right: Advisor Builder */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MEETING_SCENARIO.categories.map((cat) => (
                        <div key={cat.id} className="bg-[#7D86AD] bg-opacity-50 p-5 rounded-2xl border border-slate-600/50 shadow-lg">
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-[10px] border border-orange-500/30">?</span>
                                {cat.title}
                            </h4>
                            <div className="space-y-3">
                                {cat.options.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleSelect(cat.id, opt)}
                                        disabled={submitted}
                                        className={`
                                            w-full text-left p-3 rounded-xl text-xs font-medium transition-all border-2
                                            ${selections[cat.id]?.id === opt.id 
                                                ? 'bg-orange-500 border-orange-500 text-white shadow-lg' 
                                                : 'bg-[#7D86AD] bg-opacity-70 border-transparent text-slate-300 hover:border-slate-500'}
                                            ${submitted && opt.safety === 3 ? 'border-green-500 ring-2 ring-green-500/20' : ''}
                                            ${submitted && selections[cat.id]?.id === opt.id && opt.safety < 3 ? 'border-red-500' : ''}
                                        `}
                                    >
                                        {opt.text}
                                        {submitted && selections[cat.id]?.id === opt.id && (
                                            <div className="mt-2 pt-2 border-t border-white/10 opacity-80 italic">
                                                {opt.description}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-4">
                    {!submitted ? (
                        <button 
                            onClick={handleSubmit}
                            disabled={!isPlanComplete}
                            className={`
                                bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-20 rounded-2xl text-xl shadow-lg transition-all border-b-4 border-orange-700
                                ${!isPlanComplete ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                            `}
                        >
                            Finalize Meeting Plan
                        </button>
                    ) : (
                        <button 
                            onClick={() => navigate('/meeting-advisor-feedback', { state: { score: safetyScore, max: maxSafety, selections } })}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-20 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all border-b-4 border-orange-700"
                        >
                            View Results
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
