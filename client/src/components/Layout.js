import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Layout = ({ children, isPublic = false }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const go = (to) => navigate(to);
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#37487A]">
      {/* Header */}
      <header className="bg-[#1D2758] border-b border-slate-700 shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">C</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-white hidden sm:inline">
              COSBIA
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
            {isPublic ? (
              <>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Home</a>
                <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
                <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/dashboard')} className="text-slate-300 hover:text-white transition-colors">Dashboard</button>
                <button onClick={() => navigate('/friend-request-filter')} className="text-slate-300 hover:text-white transition-colors">Gameplay</button>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Resources</a>
              </>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {isPublic ? (
              <>
                <button onClick={() => go('/login')} className="hidden md:block text-slate-300 border border-slate-500 hover:border-white hover:text-white font-bold py-2 px-6 rounded-lg transition-colors">
                  Log in
                </button>
                <button onClick={() => go('/register')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md">
                  Sign up
                </button>
              </>
            ) : (
              <button onClick={logout} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md">
                Log out
              </button>
            )}
           </div>
         </div>
       </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center relative w-full p-0 m-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1D2758] py-6 text-center text-xs text-slate-500 border-t border-slate-700 relative z-10">
        <p>© 2025 COSBIA. All rights reserved.</p>
      </footer>
    </div>
  );
};