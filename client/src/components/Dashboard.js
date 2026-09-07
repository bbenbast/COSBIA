import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getLevelSummary, getPlayerProgress } from '../data/progressService';

export const Dashboard = () => {
  const { user } = useAuth();
  const progress = getPlayerProgress();
  const levelSummary = getLevelSummary();

  const totalXp = Number(user?.totalXp ?? 0) || Object.values(progress.xpByLevel || {}).reduce((sum, xp) => sum + Number(xp || 0), 0);
  const levelsCompleted = progress.completedLevels.length;
  const currentLevel = Math.min(3, Math.max(1, progress.currentLevel || levelsCompleted + 1));

  const badges = [
    { id: 1, name: 'First Steps', locked: !progress.completedLevels.includes(1) },
    { id: 2, name: 'Password Pro', locked: !(Number(user?.totalXp || 0) >= 100) },
    { id: 3, name: 'App Detective', locked: !progress.completedLevels.includes(2) },
    { id: 4, name: 'Social Guardian', locked: !progress.completedLevels.includes(2) },
    { id: 5, name: 'News Verifier', locked: !progress.completedLevels.includes(3) },
    { id: 6, name: 'Cyber Sentinel', locked: !progress.completedLevels.includes(3) },
  ];

  const playerStats = {
    currentLevel,
    levelsCompleted,
    badgesEarned: badges.filter((badge) => !badge.locked).length,
    totalBadges: badges.length,
    timePlayed: `${Math.max(1, Math.round(totalXp / 60))} Hrs`,
    currentStreak: Math.min(7, 1 + levelsCompleted),
  };

  const progressOverview = levelSummary.map((level) => ({
    level: level.level,
    title: level.title,
    completed: level.completed,
    xp: level.value,
    width: `${level.progressPercent}%`,
  }));

  const recentActivity = progress.recentActivity.length
    ? progress.recentActivity.map((activity) => ({
        icon: '✓',
        title: activity.title,
        points: activity.xp ? `${activity.xp} XP` : 'Completed',
        time: new Date(activity.timestamp).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        }),
        color: 'green',
      }))
    : [
        { icon: '📋', title: 'Finish your first mission', points: '0 XP yet', time: 'Ready to play', color: 'orange' },
        { icon: '🛡️', title: 'Build your digital safety streak', points: 'Start with Level 1', time: 'Next up', color: 'green' },
      ];

  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-orange-500 mb-2">PLAYER DASHBOARD</h1>
            <p className="text-slate-300 text-lg">Track your progress, achievements, and rewards</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 px-6 py-3 rounded-2xl text-white font-black text-lg flex items-center gap-2 shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              {totalXp} XP
            </div>
            
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left Column: Player Stats */}
          <div className="lg:col-span-4">
            <div className="bg-[#1D2758] rounded-3xl p-8 border border-slate-700 shadow-2xl">
              <h2 className="text-orange-500 font-black text-sm uppercase tracking-widest mb-6">Player Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Current Level</span>
                  <span className="text-white font-black text-2xl">{playerStats.currentLevel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Levels Completed</span>
                  <span className="text-white font-black text-2xl">{playerStats.levelsCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Badges Earned</span>
                  <span className="text-white font-black text-2xl">{playerStats.badgesEarned}/{playerStats.totalBadges}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Time Played</span>
                  <span className="text-white font-black text-2xl">{playerStats.timePlayed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Current Streak</span>
                  <span className="text-white font-black text-2xl">{playerStats.currentStreak} days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Progress Overview */}
          <div className="lg:col-span-8">
            <div className="bg-[#1D2758] rounded-3xl p-8 border border-slate-700 shadow-2xl">
              <h2 className="text-orange-500 font-black text-sm uppercase tracking-widest mb-6">Progress Overview</h2>
              <div className="space-y-6">
                {progressOverview.map((level, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white font-bold">Level {level.level}: {level.title}</h3>
                      <span className="text-orange-400 text-sm font-bold">{level.xp}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${level.completed ? 'bg-green-500' : 'bg-orange-500'}`}
                        style={{ width: level.width }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Badges and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Badges */}
          <div className="lg:col-span-6">
            <div className="bg-[#1D2758] rounded-3xl p-8 border border-slate-700 shadow-2xl">
              <h2 className="text-orange-500 font-black text-sm uppercase tracking-widest mb-6">Badges and Achievements</h2>
              <div className="grid grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className={`p-4 rounded-2xl text-center border-2 transition-all ${badge.locked ? 'bg-slate-700 border-slate-600 opacity-60' : 'bg-[#7D86AD] bg-opacity-30 border-slate-500'}`}>
                    <div className="text-3xl mb-2">{badge.locked ? '?' : '✓'}</div>
                    <div className={`text-xs font-bold ${badge.locked ? 'text-slate-400' : 'text-slate-200'}`}>
                      {badge.name}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1">
                      {badge.locked ? 'Keep playing to unlock' : 'Unlocked'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-6">
            <div className="bg-[#1D2758] rounded-3xl p-8 border border-slate-700 shadow-2xl">
              <h2 className="text-orange-500 font-black text-sm uppercase tracking-widest mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-[#7D86AD] bg-opacity-20 rounded-2xl border border-slate-600">
                    <div className="text-2xl flex-shrink-0">{activity.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-sm">{activity.title}</h4>
                      <p className="text-orange-400 text-xs font-bold mt-1">{activity.points}</p>
                    </div>
                    <div className="text-slate-400 text-xs flex-shrink-0 text-right">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;