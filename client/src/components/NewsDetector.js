
import React, { useState } from 'react';
import { Avatar } from './Avatar';
import { useNavigate } from 'react-router-dom';

const ARTICLES = [
  {
    id: 1,
    title: "SCIENTISTS PROVE VIDEO GAMES CAUSE VIOLENCE!",
    source: "TruthNewsNetwork.co",
    date: "2 hours ago",
    content: "A groundbreaking new study from the Institute of Global Research has finally confirmed what many have suspected: playing video games for more than 2 hours a day permanently alters the brain to prefer violent outbursts. 'The data is undeniable,' says Dr. X, the lead researcher...",
    imageCaption: "A young gamer displaying aggression while playing.",
    isReal: false,
    discoveries: {
      source: "You visit the 'About Us' page of TruthNewsNetwork.co. It's filled with strange articles about UFOs and secret lizard people. No professional journalists are listed.",
      image: "You run a reverse search on the header image. It's a common stock photo titled 'Happy Child Playing Games' first uploaded in 2015. It has nothing to do with any 'new study'.",
      lateral: "You check sites like BBC and Reuters. They have no record of this 'breakthrough'. fact-checking sites like Snopes have already flagged this as 'completely fabricated'."
    }
  },
  {
    id: 2,
    title: "NASA's James Webb Telescope Discovers One of the Most Ancient Galaxies",
    source: "GlobalScienceDaily.org",
    date: "Yesterday",
    content: "NASA researchers using the James Webb Space Telescope have identified a galaxy that formed only 300 million years after the Big Bang. This discovery challenges existing models of galaxy formation and provides a new window into the early universe. 'This is a milestone for astronomy,' says Dr. Jane Smith...",
    imageCaption: "A deep field image showing distant infrared galaxies.",
    isReal: true,
    discoveries: {
      source: "GlobalScienceDaily.org is a verified publication with a long history of science reporting. Their staff consists of PhD science journalists and researchers.",
      image: "The image is a verified high-resolution infrared capture from NASA's official public image gallery, timestamped to the recent Webb mission phase.",
      lateral: "Checking BBC, Nature, and the official NASA.gov website confirms the exact same details, quotes, and data points. The story is verified by multiple independent outlets."
    }
  }
];

const TOOLS = [
  {
    id: 'source',
    name: 'Check Source',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: 'image',
    name: 'Reverse Image Search',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    )
  },
  {
    id: 'lateral',
    name: 'Read Laterally',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  }
];

export const NewsDetector = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [usedTools, setUsedTools] = useState([]); 
  const [currentDiscovery, setCurrentDiscovery] = useState(null);
  const [results, setResults] = useState([]); 
  const navigate = useNavigate();

  const currentArticle = ARTICLES[currentIdx];

  const handleUseTool = (tool) => {
    if (!usedTools.includes(tool.id)) {
      setUsedTools([...usedTools, tool.id]);
    }
    setCurrentDiscovery({
      ...tool,
      text: currentArticle.discoveries[tool.id]
    });
  };

  const handleDecision = (playerSaysReal) => {
    const isCorrect = playerSaysReal === currentArticle.isReal;
    const newResults = [...results, { articleId: currentArticle.id, isCorrect }];
    
    if (currentIdx < ARTICLES.length - 1) {
      setResults(newResults);
      setCurrentIdx(currentIdx + 1);
      setUsedTools([]);
      setCurrentDiscovery(null);
    } else {
      const finalScore = newResults.filter(r => r.isCorrect).length;
      navigate('/news-detector-feedback', { state: { score: finalScore, total: ARTICLES.length } });
    }
  };

  const isInvestigated = usedTools.length === TOOLS.length;

  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-6xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
        
        {/* Header - Cosbia Orange Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl text-orange-500 font-bold mb-1">
                    Activity 1: <span className="text-white font-normal">The News Detector</span>
                </h1>
                <p className="text-white text-lg font-bold">Level 3</p>
                <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-slate-400">Article {currentIdx + 1} of {ARTICLES.length}</span>
                    <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full transition-all duration-500"
                          style={{ width: `${((currentIdx + 1) / ARTICLES.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="bg-[#9f1239] px-6 py-2 rounded-xl text-white font-bold text-xl shadow-lg border border-white/10">
                150 XP POTENTIAL
            </div>
        </div>

        <div className="h-px bg-orange-500/30 w-full mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Investigation Toolkit */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                    <Avatar />
                    <div className="relative bg-[#7D86AD] bg-opacity-50 p-4 rounded-xl text-sm leading-relaxed border border-slate-600 shadow-lg mt-2">
                        <div className="absolute top-4 -left-2 w-4 h-4 bg-[#7D86AD] bg-opacity-50 transform rotate-45 border-l border-b border-slate-600"></div>
                        "Don't trust everything you see! Use your <span className="text-orange-400 font-bold">Investigator Toolkit</span> to verify the facts before deciding if this is real or fake news."
                    </div>
                </div>

                <div className="bg-[#7D86AD] bg-opacity-50 p-6 rounded-2xl border border-slate-600 shadow-inner">
                    <h3 className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-4">Investigator Toolkit</h3>
                    <div className="space-y-3">
                        {TOOLS.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => handleUseTool(tool)}
                                className={`
                                    w-full flex items-center gap-4 p-3 rounded-xl transition-all border-2 text-left
                                    ${currentDiscovery?.id === tool.id 
                                        ? 'bg-orange-500 border-orange-500 text-white shadow-lg' 
                                        : 'bg-[#7D86AD] bg-opacity-70 border-transparent text-slate-200 hover:border-slate-500'}
                                    ${usedTools.includes(tool.id) && currentDiscovery?.id !== tool.id ? 'opacity-60' : ''}
                                `}
                            >
                                <div className={`p-2 rounded-lg ${currentDiscovery?.id === tool.id ? 'bg-orange-500 text-slate-900' : 'bg-slate-700 text-slate-400'}`}>
                                    {tool.icon}
                                </div>
                                <span className="font-bold text-xs">{tool.name}</span>
                                {usedTools.includes(tool.id) && (
                                    <svg className="ml-auto w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {currentDiscovery && (
                    <div className="bg-[#1D2758] p-5 rounded-2xl border border-slate-600 animate-in fade-in slide-in-from-bottom-2">
                        <h4 className="text-orange-400 font-black text-[10px] uppercase mb-2 tracking-widest flex items-center gap-2">
                           Discovery: {currentDiscovery.name}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                            "{currentDiscovery.text}"
                        </p>
                    </div>
                )}
            </div>

            {/* Right: The Article */}
            <div className="lg:col-span-8 flex flex-col">
                <div className="bg-[#2d3748] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-full border border-slate-600">
                    <div className="p-4 bg-[#3b485f]/50 border-b border-slate-600 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-slate-900 font-black text-xs">
                                {currentArticle.source.charAt(0)}
                             </div>
                             <div>
                                <h5 className="text-white font-bold text-xs uppercase leading-none tracking-tight">{currentArticle.source}</h5>
                                <p className="text-slate-400 text-[10px] mt-0.5">{currentArticle.date}</p>
                             </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                    </div>

                    <div className="p-6 md:p-10 flex flex-col gap-6 flex-grow bg-slate-100">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                            {currentArticle.title}
                        </h2>

                        <div className="relative w-full aspect-video bg-slate-200 rounded-2xl overflow-hidden group shadow-inner">
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-300">
                                <svg className="w-16 h-16 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 text-center">
                                <p className="text-white text-[10px] font-medium">{currentArticle.imageCaption}</p>
                            </div>
                        </div>

                        <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                            {currentArticle.content}
                        </p>
                    </div>

                    <div className="p-6 md:p-8 bg-[#1D2758] border-t border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                            {isInvestigated ? "Ready for Verdict" : "Investigate to unlock verdict"}
                        </div>
                        
                        <div className="flex gap-4 w-full md:w-auto">
                            <button
                                onClick={() => handleDecision(false)}
                                disabled={!isInvestigated}
                                className={`
                                    flex-1 md:flex-none px-8 py-3 rounded-xl font-black text-sm transition-all border-b-4
                                    ${!isInvestigated ? 'bg-slate-700 text-slate-500 border-slate-800 cursor-not-allowed opacity-50' : 'bg-red-500 hover:bg-red-600 text-white border-red-700 active:translate-y-1 active:border-b-0'}
                                `}
                            >
                                MARK FAKE
                            </button>
                            <button
                                onClick={() => handleDecision(true)}
                                disabled={!isInvestigated}
                                className={`
                                    flex-1 md:flex-none px-8 py-3 rounded-xl font-black text-sm transition-all border-b-4
                                    ${!isInvestigated ? 'bg-slate-700 text-slate-500 border-slate-800 cursor-not-allowed opacity-50' : 'bg-green-500 hover:bg-green-600 text-white border-green-700 active:translate-y-1 active:border-b-0'}
                                `}
                            >
                                MARK REAL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default NewsDetector;