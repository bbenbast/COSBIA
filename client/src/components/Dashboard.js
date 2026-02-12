import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import { Avatar } from './Avatar';

export const Dashboard = () => {
  const { user, logout } = useAuth();

  const playerStats = {
    currentLevel: 3,
    levelsCompleted: 2,
    badgesEarned: 8,
    totalBadges: 15,
    timePlayed: '14 Hrs',
    currentStreak: 5
  };

  const progressOverview = [
    { level: 1, title: 'Security Knowledge', completed: true, xp: '100/100' },
    { level: 2, title: 'Secure Behaviour', completed: true, xp: '100/100' },
    { level: 3, title: 'Reducing Exposure', completed: false, xp: '650/800' }
  ];

  const badges = [
    { id: 1, name: 'First Steps', locked: false },
    { id: 2, name: 'Password Pro', locked: false },
    { id: 3, name: 'App Detective', locked: false },
    { id: 4, name: 'Social Guardian', locked: true },
    { id: 5, name: 'News Verifier', locked: true },
    { id: 6, name: 'Network Guardian', locked: true }
  ];

  const recentActivity = [
    { icon: '📋', title: 'Completed Social Media Safety Quiz', points: '9/10 points', time: '1 hours ago', color: 'orange' },
    { icon: '✓', title: 'Reached Level 12', subtitle: 'Advanced to Secure Behaviour mastery', time: '1 day ago', color: 'green' },
    { icon: '🛡️', title: 'Earned "Phishing Defender" Badge', subtitle: 'Successfully identified phishing attempts', time: '2 days ago', color: 'red' },
    { icon: '🔐', title: 'Completed Password Security Challenge', points: '8/10 points', time: '3 days ago', color: 'orange' }
  ];

  const totalXp = 1000;

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
              {totalXp}XP
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
                        style={{ width: level.xp.split('/')[0] + '%' }}
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
                    <div className={`text-2xl flex-shrink-0`}>{activity.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-sm">{activity.title}</h4>
                      {activity.subtitle && <p className="text-slate-300 text-xs mt-1">{activity.subtitle}</p>}
                      {activity.points && <p className="text-orange-400 text-xs font-bold mt-1">Scored {activity.points}</p>}
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