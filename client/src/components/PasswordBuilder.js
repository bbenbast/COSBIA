import React, { useState, useEffect } from 'react';
import { Avatar } from './Avatar';
import { PasswordFeedback } from './PasswordFeedback';

const ALL_CHUNKS = [
  { id: 'c1', text: '123' },
  { id: 'c2', text: 'apple' },
  { id: 'c3', text: '!' },
  { id: 'c4', text: 'John' },
  { id: 'c5', text: '#' },
  { id: 'c6', text: 'Milo' },
  { id: 'c7', text: 'mom' },
  { id: 'c8', text: '2005' },
  { id: 'c9', text: 'Secure' },
  { id: 'c10', text: 'Blue' },
  { id: 'c11', text: '7' },
  { id: 'c12', text: 'Sky' },
  { id: 'c13', text: 'Sun!' },
  { id: 'c14', text: 'Rocket' },
  { id: 'c15', text: 'Delta' },
  { id: 'c16', text: '@2021' },
  { id: 'c17', text: 'Alpha' },
  { id: 'c18', text: 'Pa$$' },
  { id: 'c19', text: '88' },
  { id: 'c20', text: 'qwerty' },
  { id: 'c21', text: 'Lion' },
  { id: 'c22', text: '7Up' },
  { id: 'c23', text: '%$' },
  { id: 'c24', text: 'Tree' },
  { id: 'c25', text: 'Glass' },
  { id: 'c26', text: '42' },
  { id: 'c27', text: 'Gold!' },
  { id: 'c28', text: 'Moon' },
  { id: 'c29', text: 'Star' },
  { id: 'c30', text: '9lives' },
  { id: 'c31', text: 'Cherry' },
  { id: 'c32', text: 'P@ss' },
  { id: 'c33', text: 'Zebra' },
  { id: 'c34', text: 'Nimbus' },
  { id: 'c35', text: 'Tiger' },
  { id: 'c36', text: '^&*' },
  { id: 'c37', text: 'Matrix' },
  { id: 'c38', text: '7ocean' },
  { id: 'c39', text: 'Brick' },
  { id: 'c40', text: 'Vault' }
];

// Fisher-Yates shuffle
const shuffled = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const DISPLAY_COUNT = 8; // show a couple more than necessary by default

export const PasswordBuilder = ({ selectedApp = "TikTok", onComplete }) => {
  const [showAll, setShowAll] = useState(false);
  const [availableChunks, setAvailableChunks] = useState(() => shuffled(ALL_CHUNKS).slice(0, DISPLAY_COUNT));
  const [passwordChunks, setPasswordChunks] = useState([]);
  const [validation, setValidation] = useState({ length: false, complexity: false });
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setAvailableChunks(shuffled(ALL_CHUNKS).slice(0, showAll ? ALL_CHUNKS.length : DISPLAY_COUNT));
  }, [showAll]);

  // Real-time validation
  useEffect(() => {
    const password = passwordChunks.map(c => c.text).join('');
    
    setValidation({
      length: password.length >= 12,
      complexity: /[A-Z]/.test(password) && // Uppercase
                  /[a-z]/.test(password) && // Lowercase
                  /[0-9]/.test(password) && // Number
                  /[^A-Za-z0-9]/.test(password) // Symbol
    });
  }, [passwordChunks]);

  const handleDragStart = (e, chunkId) => {
    e.dataTransfer.setData("chunkId", chunkId);
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    const chunkId = e.dataTransfer.getData("chunkId");
    
    if (target === 'builder') {
      const chunk = availableChunks.find(c => c.id === chunkId);
      if (chunk) {
        setAvailableChunks(prev => prev.filter(c => c.id !== chunkId));
        setPasswordChunks(prev => [...prev, chunk]);
      }
    } else if (target === 'source') {
      const chunk = passwordChunks.find(c => c.id === chunkId);
      if (chunk) {
        setPasswordChunks(prev => prev.filter(c => c.id !== chunk.id));
        setAvailableChunks(prev => [...prev, chunk]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const toggleChunk = (chunk, fromSource) => {
    if (fromSource) {
        setAvailableChunks(prev => prev.filter(c => c.id !== chunk.id));
        setPasswordChunks(prev => [...prev, chunk]);
    } else {
        setPasswordChunks(prev => prev.filter(c => c.id !== chunk.id));
        setAvailableChunks(prev => [...prev, chunk]);
    }
  };

  const handleReset = () => {
    setAvailableChunks(shuffled(ALL_CHUNKS).slice(0, showAll ? ALL_CHUNKS.length : DISPLAY_COUNT));
    setPasswordChunks([]);
    setShowFeedback(false);
  };

  const handleSubmit = () => {
    if (validation.length && validation.complexity) {
        setShowFeedback(true);
    } else {
        alert("Password does not meet all requirements yet.");
    }
  };

  const currentPassword = passwordChunks.map(c => c.text).join('');

  if (showFeedback) {
    return (
      <PasswordFeedback 
        password={currentPassword} 
        onNextLevel={onComplete} 
      />
    );
  }

    return (
        <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 md:p-8 font-sans text-white">
            <div className="w-full max-w-4xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl text-orange-500 font-bold mb-1">
                    Activity 1: <span className="text-white font-normal">The Password Builder</span>
                </h1>
                <p className="text-white text-lg">Level 1</p>
                <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-slate-400">Activity 1 of 4</span>
                    <div className="w-48 h-2 bg-slate-700 rounded-full">
                        <div className="w-1/4 h-full bg-slate-500 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div className="bg-[#9f1239] px-6 py-2 rounded-xl text-white font-bold text-xl shadow-lg border border-white/10">
                50 XP
            </div>
        </div>

        <div className="h-px bg-slate-500/20 w-full mb-8"></div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Bot & Elements */}
            <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Bot Message */}
                <div className="flex items-start gap-4">
                    <div className="shrink-0">
                       <Avatar />
                    </div>
                        <div className="relative bg-[#7D86AD] bg-opacity-50 p-4 rounded-xl leading-relaxed border border-slate-600 shadow-inner mt-2 text-slate-100">
                            <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] transform rotate-45 border-l border-b border-slate-600 opacity-50"></div>
                            Welcome to the Password Builder, your goal for this mission is to create and secure password for your new <span className="text-orange-400 font-bold">{selectedApp}</span> account
                        </div>
                </div>

                {/* Password Elements Source */}
                <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-2xl border-2 border-slate-600 shadow-inner h-full">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-orange-500 text-lg font-semibold">Password Elements</h3>
                        <p className="text-slate-400 text-sm">Drag and drop (or click) the elements below to create your password:</p>
                      </div>
                      <button
                        onClick={() => setShowAll(s => !s)}
                        className="text-sm text-slate-200 bg-slate-700/30 px-3 py-1 rounded hover:bg-slate-700 transition"
                      >
                        {showAll ? 'Show fewer' : 'Show more'}
                      </button>
                    </div>
                    
                    <div 
                        className="grid grid-cols-3 gap-3 min-h-[200px]"
                        onDrop={(e) => handleDrop(e, 'source')}
                        onDragOver={handleDragOver}
                    >
                        {availableChunks.map(chunk => (
                            <div
                                key={chunk.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, chunk.id)}
                                onClick={() => toggleChunk(chunk, true)}
                                className="bg-[#7D86AD] bg-opacity-50 border-2 border-orange-400/60 border-dashed rounded-lg p-3 text-center text-white font-mono text-lg cursor-grab active:cursor-grabbing hover:bg-[#4a5568] transition-colors flex items-center justify-center shadow-sm select-none"
                            >
                                {chunk.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Goals & Builder */}
            <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Your Goal */}
                <div className="bg-[#2d2a3e] p-5 rounded-2xl border-l-4 border-orange-500 shadow-lg">
                    <h3 className="text-orange-500 font-bold mb-3">Your Goal</h3>
                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs border ${validation.length ? 'bg-orange-500 border-orange-500 text-white' : 'bg-transparent border-slate-500 text-transparent'}`}>✓</div>
                            <span className={validation.length ? 'text-white' : 'text-slate-400'}>Create a password that is at least 12 characters long</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs border ${validation.complexity ? 'bg-orange-500 border-orange-500 text-white' : 'bg-transparent border-slate-500 text-transparent'}`}>✓</div>
                            <span className={validation.complexity ? 'text-white' : 'text-slate-400'}>Include uppercase letters, lowercase letters, numbers, and symbols</span>
                        </div>
                    </div>
                </div>

                {/* Builder Area */}
                <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-2xl border border-slate-600 flex-grow flex flex-col">
                    <h3 className="text-orange-500 text-lg font-semibold mb-2">Password Builder</h3>
                    <p className="text-slate-400 text-sm mb-6">Build your password by dragging the elements here:</p>

                    <div 
                        className="bg-[#7D86AD] bg-opacity-50 border-4 border-orange-500/60 border-dashed rounded-xl p-4 min-h-[160px] flex flex-wrap content-start gap-2 mb-6 transition-colors shadow-inner"
                        onDrop={(e) => handleDrop(e, 'builder')}
                        onDragOver={handleDragOver}
                    >
                        {passwordChunks.length === 0 && (
                            <div className="w-full h-full flex items-center justify-center text-slate-500 italic pointer-events-none">
                                ...
                            </div>
                        )}
                        {passwordChunks.map(chunk => (
                            <div
                                key={chunk.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, chunk.id)}
                                onClick={() => toggleChunk(chunk, false)}
                                className="bg-[#EE7C2F] border-dashed border-2 border-slate-300 rounded px-3 py-1.5 text-white font-mono text-lg cursor-grab active:cursor-grabbing hover:bg-red-500/20 hover:border-red-400 group relative"
                            >
                                {chunk.text}
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#7D86AD] bg-opacity-50 rounded-lg p-3 shadow-inner">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Current Password:</span>
                            <span>Length: {currentPassword.length} characters</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                             <div 
                                className={`h-full transition-all duration-300 ${
                                    validation.length && validation.complexity ? 'bg-green-500' :
                                    validation.length || validation.complexity ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(currentPassword.length * 5, 100)}%` }}
                             ></div>
                        </div>
                        <div className="mt-2 font-mono text-slate-300 text-sm tracking-wider break-all min-h-[20px]">
                            {currentPassword}
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center md:justify-end gap-4 mt-8">
            <button 
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full border border-slate-500 text-slate-200 hover:text-white hover:border-white transition-colors"
            >
                ↻ Reset Password
            </button>
            <button 
                onClick={handleSubmit}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                    validation.length && validation.complexity 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1' 
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
                disabled={!validation.length || !validation.complexity}
            >
                Submit Password
            </button>
        </div>

      </div>
    </div>
  );
};
