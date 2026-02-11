
import React, { useState } from 'react';
import { Avatar } from './Avatar';
import { useNavigate } from 'react-router-dom';

const PROFILES = [
  {
    id: 'p1',
    username: 'GamerAlex_07',
    bio: 'Love playing Minecraft and Roblox! Mutual friend with Sarah from school.',
    mutualFriends: 12,
    avatarColor: 'bg-blue-400',
    isSafe: true,
    flags: ['Known mutual friends', 'Normal bio', 'Appropriate interests'],
    type: 'Safe'
  },
  {
    id: 'p2',
    username: 'FreeRobux_King',
    bio: 'GET FREE ROBUX NOW! JUST CLICK THE LINK IN MY BIO -> bit.ly/scam-link',
    mutualFriends: 0,
    avatarColor: 'bg-slate-600',
    isSafe: false,
    flags: ['Suspicious link in bio', '0 mutual friends', 'Promising free currency'],
    type: 'Scam'
  },
  {
    id: 'p3',
    username: 'Unknown_Entity',
    bio: 'No bio provided.',
    mutualFriends: 0,
    avatarColor: 'bg-slate-800',
    isSafe: false,
    flags: ['No profile info', 'No mutual friends', 'Anonymous username'],
    type: 'Suspicious'
  },
  {
    id: 'p4',
    username: 'TaylorSwift_Real1',
    bio: 'Official backup account of Taylor Swift. DM me for a surprise gift!',
    mutualFriends: 1,
    avatarColor: 'bg-pink-400',
    isSafe: false,
    flags: ['Celebrity impersonator', 'Unusual request (DM for gift)', 'Suspiciously low mutual friends'],
    type: 'Impersonator'
  },
  {
    id: 'p5',
    username: 'SchoolSports_Jake',
    bio: 'Captain of the basketball team. See you at practice!',
    mutualFriends: 45,
    avatarColor: 'bg-green-500',
    isSafe: true,
    flags: ['High number of mutual friends', 'Context-aware bio (School team)', 'Known identity'],
    type: 'Safe'
  }
];

export const FriendRequestFilter = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions] = useState([]); // { profileId, decision: 'accept' | 'decline' }
  const [draggedOver, setDraggedOver] = useState(null); // 'accept' | 'decline' | null
  const navigate = useNavigate();

  const currentProfile = PROFILES[currentIndex];
  const isComplete = currentIndex >= PROFILES.length;

  const handleDecision = (decision) => {
    setDecisions(prev => [...prev, { profileId: currentProfile.id, decision }]);
    setCurrentIndex(prev => prev + 1);
    setDraggedOver(null);
  };

  const onDragStart = (e) => {
    e.dataTransfer.setData("profileId", currentProfile.id);
  };

  const onDrop = (e, target) => {
    e.preventDefault();
    handleDecision(target);
  };

  const onDragOver = (e, target) => {
    e.preventDefault();
    setDraggedOver(target);
  };

  const onDragLeave = () => {
    setDraggedOver(null);
  };

  if (isComplete) {
    // We calculate results here or pass to feedback
    const score = decisions.reduce((acc, curr) => {
      const profile = PROFILES.find(p => p.id === curr.profileId);
      const isCorrect = (profile.isSafe && curr.decision === 'accept') || (!profile.isSafe && curr.decision === 'decline');
      return isCorrect ? acc + 1 : acc;
    }, 0);

    return (
      <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 md:p-8 font-sans text-white">
        <div className="w-full max-w-4xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-2xl md:text-4xl text-orange-500 font-bold">
                  Level 2: <span className="text-white font-normal">Activity 1</span>
              </h1>
              <div className="bg-[#9f1239] px-6 py-2 rounded-xl text-white font-bold text-xl shadow-lg border border-white/10">
                  100 XP Potential
              </div>
          </div>

          <div className="h-px bg-slate-500/20 w-full mb-8"></div>

          {/* Completion Message */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              <div className="lg:col-span-8">
                  <div className="flex items-start gap-4">
                      <Avatar />
                        <div className="relative bg-[#7D86AD] bg-opacity-50 p-5 rounded-xl leading-relaxed border border-slate-600 shadow-inner mt-2 text-slate-100">
                        <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] transform rotate-45 border-l border-b border-slate-600 opacity-50"></div>
                        Great job reviewing all the friend requests! Let's see how you did.
                      </div>
                  </div>
              </div>
          </div>

          {/* Results Summary */}
          <div className="bg-[#7D86AD] bg-opacity-50 rounded-[2rem] p-8 border border-slate-600 shadow-inner mb-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Your Results</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#1e293b] rounded-xl p-6 border border-green-500/30">
                      <div className="text-4xl font-black text-green-400 mb-2">{decisions.filter(d => d.decision === 'accept').length}</div>
                      <div className="text-sm text-slate-400">Accepted</div>
                  </div>
                  <div className="bg-[#1e293b] rounded-xl p-6 border border-red-500/30">
                      <div className="text-4xl font-black text-red-400 mb-2">{decisions.filter(d => d.decision === 'decline').length}</div>
                      <div className="text-sm text-slate-400">Declined</div>
                  </div>
              </div>
              <button 
                onClick={() => navigate('/friend-request-feedback', { state: { decisions, score } })}
                className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-20 rounded-2xl text-xl shadow-lg transition-all transform active:scale-95 border-b-4 border-orange-700"
              >
                View Detailed Results
              </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 md:p-8 font-sans text-white">
      <div className="w-full max-w-4xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl md:text-4xl text-orange-500 font-bold">
                    Level 2: <span className="text-white font-normal">Activity 1</span>
                </h1>
                <p className="text-white text-lg mt-1">The Friend Request Filter</p>
            </div>
            <div className="bg-[#9f1239] px-6 py-2 rounded-xl text-white font-bold text-xl shadow-lg border border-white/10">
                100 XP Potential
            </div>
        </div>

        <div className="h-px bg-slate-500/20 w-full mb-8"></div>

        {/* Bot Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
            <div className="lg:col-span-8">
                <div className="flex items-start gap-4">
                    <Avatar />
                        <div className="relative bg-[#7D86AD] bg-opacity-50 p-5 rounded-xl leading-relaxed border border-slate-600 shadow-inner mt-2 text-slate-100">
                        <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] transform rotate-45 border-l border-b border-slate-600 opacity-50"></div>
                        Not everyone online is who they say they are! Drag these requests into <span className="text-green-400 font-bold">ACCEPT</span> or <span className="text-red-400 font-bold">DECLINE</span>. Look for mutual friends and suspicious bios!
                      </div>
                </div>
            </div>
            <div className="lg:col-span-4 flex items-center justify-center">
                 <div className="text-center">
                    <div className="text-slate-500 text-xs font-bold uppercase mb-2">Progress</div>
                    <div className="flex gap-2">
                        {PROFILES.map((_, i) => (
                            <div key={i} className={`w-8 h-2 rounded-full ${i < currentIndex ? 'bg-orange-500' : 'bg-slate-700'}`}></div>
                        ))}
                    </div>
                 </div>
            </div>
        </div>

        {/* Play Area */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-10">
            
            {/* Decline Zone */}
            <div 
                onDrop={(e) => onDrop(e, 'decline')}
                onDragOver={(e) => onDragOver(e, 'decline')}
                onDragLeave={onDragLeave}
                className={`
                    flex-1 w-full md:w-auto h-64 md:h-80 border-4 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all
                    ${draggedOver === 'decline' ? 'bg-red-500/20 border-red-500 scale-105' : 'bg-[#2d3748]/30 border-slate-700 text-slate-500'}
                `}
            >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${draggedOver === 'decline' ? 'border-red-500 text-red-500' : 'border-slate-700 text-slate-700'}`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                </div>
                <span className={`font-black text-2xl uppercase tracking-widest ${draggedOver === 'decline' ? 'text-red-500' : ''}`}>Decline</span>
            </div>

            {/* Profile Card (The Draggable) */}
            <div className="relative z-10 perspective-1000">
                <div 
                  draggable
                  onDragStart={onDragStart}
                  className="w-72 md:w-80 bg-[#7D86AD] bg-opacity-50 rounded-[2rem] p-6 shadow-2xl border border-slate-600 cursor-grab active:cursor-grabbing transform hover:scale-105 transition-transform shadow-inner"
                >
                    <div className="flex flex-col items-center text-center">
                        <div className={`w-24 h-24 rounded-full ${currentProfile.avatarColor} mb-4 flex items-center justify-center shadow-lg border-4 border-[#7D86AD]`}>
                            <svg className="w-12 h-12 text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-1">@{currentProfile.username}</h4>
                      <div className="bg-[#1e293b] px-3 py-1 rounded-full text-[10px] font-bold text-orange-400 mb-4 border border-orange-500/20">
                        {currentProfile.mutualFriends} Mutual Friends
                      </div>
                      <div className="bg-[#7D86AD] bg-opacity-50 p-4 rounded-xl w-full border border-slate-600 mb-4 shadow-inner text-slate-100">
                        <p className="text-sm italic leading-relaxed">
                          "{currentProfile.bio}"
                        </p>
                      </div>
                        <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                            Drag to choose
                        </div>
                    </div>
                </div>
            </div>

            {/* Accept Zone */}
            <div 
                onDrop={(e) => onDrop(e, 'accept')}
                onDragOver={(e) => onDragOver(e, 'accept')}
                onDragLeave={onDragLeave}
                className={`
                    flex-1 w-full md:w-auto h-64 md:h-80 border-4 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all
                    ${draggedOver === 'accept' ? 'bg-green-500/20 border-green-500 scale-105' : 'bg-[#2d3748]/30 border-slate-700 text-slate-500'}
                `}
            >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${draggedOver === 'accept' ? 'border-green-500 text-green-500' : 'border-slate-700 text-slate-700'}`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className={`font-black text-2xl uppercase tracking-widest ${draggedOver === 'accept' ? 'text-green-500' : ''}`}>Accept</span>
            </div>

        </div>

        {/* Mobile buttons as fallback */}
        <div className="flex md:hidden justify-center gap-4 mb-4">
            <button onClick={() => handleDecision('decline')} className="bg-red-500/20 text-red-400 px-6 py-3 rounded-xl font-bold border border-red-500/30">Decline</button>
            <button onClick={() => handleDecision('accept')} className="bg-green-500/20 text-green-400 px-6 py-3 rounded-xl font-bold border border-green-500/30">Accept</button>
        </div>

      </div>
    </div>
  );
};
