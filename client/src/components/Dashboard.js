import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Trophy, Star, Shield } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full max-w-[800px] bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
      <div className="bg-cosbia-cardBlue p-8 text-white flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold">Dashboard</h1>
           <p className="opacity-80">Welcome, {user?.username}!</p>
        </div>
        <button 
          onClick={logout}
          className="bg-red-500/20 hover:bg-red-500/40 text-red-100 p-2 rounded-lg transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                <Trophy size={24} />
            </div>
            <h3 className="font-bold text-gray-800">Rank #1</h3>
            <p className="text-sm text-gray-500">Global Leaderboard</p>
         </div>

         <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Shield size={24} />
            </div>
            <h3 className="font-bold text-gray-800">Level 5</h3>
            <p className="text-sm text-gray-500">Security Clearance</p>
         </div>

         <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                <Star size={24} />
            </div>
            <h3 className="font-bold text-gray-800">1,250 XP</h3>
            <p className="text-sm text-gray-500">Total Experience</p>
         </div>
      </div>
      
      <div className="px-8 pb-8 flex-1">
        <div className="bg-gray-50 rounded-2xl h-full flex items-center justify-center border border-dashed border-gray-300">
             <p className="text-gray-400 font-medium">Adventure content loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;