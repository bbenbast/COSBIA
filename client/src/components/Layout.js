import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Layout = ({ children, isPublic = false }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const go = (to) => navigate(to);
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#1D2758]">
      {/* Header */}
      <header className="bg-[#1D2758] border-b border-gray-800 shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-12 h-10 bg-cosbia-purple relative overflow-hidden flex items-center justify-center shadow-inner rounded-sm">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            </div>
            <span className="text-3xl font-bold tracking-tight text-cosbia-accent">
              COSBIA
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
            {isPublic ? (
              <>
                <a href="#" className="text-white hover:text-cosbia-accent transition-colors">Home</a>
                <a href="#features" className="text-white hover:text-cosbia-accent transition-colors">Features</a>
                <a href="#about" className="text-white hover:text-cosbia-accent transition-colors">About</a>
              </>
            ) : (
              <>
                <a href="#" className="text-white hover:text-cosbia-accent transition-colors">Dashboard</a>
                <a href="#" className="text-cosbia-accent relative after:content-[''] after:absolute after:-bottom-7 after:left-0 after:w-full after:h-1 after:bg-cosbia-accent">Gameplay</a>
                <a href="#" className="text-white hover:text-cosbia-accent transition-colors">Resources</a>
              </>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {isPublic ? (
              <>
                <button onClick={() => go('/login')} className="hidden md:block text-white border border-gray-400 hover:border-white font-semibold py-2 px-6 rounded transition-colors">
                  Log in
                </button>
                <button onClick={() => go('/register')} className="bg-cosbia-accent hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition-colors shadow-md">
                  Sign up
                </button>
              </>
            ) : (
              <button onClick={logout} className="bg-cosbia-accent hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition-colors shadow-md">
                Log out
              </button>
            )}
           </div>
         </div>
       </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col relative w-full p-0 m-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1D2758] py-8 text-center text-xs text-slate-400 border-t border-gray-800 relative z-10">
        <p>© 2025 COSBIA. All rights reserved.</p>
      </footer>
    </div>
  );
};