import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const { username, password } = formData;
const navigate = useNavigate();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    try {
      // Adjust to match your AuthContext login signature:
      // either: await login(username, password);
      // or: await login({ username, password });
      await login(username, password);
      navigate('/EnvironmentSelection');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex w-full max-w-[900px] bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] transition-all duration-300 transform">
      
      {/* Left Panel - Branding */}
      <div className="hidden md:flex flex-col justify-center w-5/12 bg-cosbia-cardBlue text-white p-10 relative overflow-hidden">
        {/* Decorative circle background */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-cosbia-red rounded flex items-center justify-center shadow-lg">
               {/* Abstract shape representing the square logo in image */}
               <div className="w-6 h-6 border-2 border-white/30 rounded-sm"></div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-orange-400">COSBIA</h1>
          </div>
          
          <h2 className="text-4xl font-normal mb-4 leading-tight">Welcome Back!</h2>
          <p className="text-blue-100 mb-10 text-sm opacity-90 leading-relaxed">
            Continue epic journey of discovery, challenges and rewards
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 bg-orange-500 rounded-full p-[2px]">
                 <Check size={12} className="text-white" strokeWidth={4} />
              </div>
              <span className="text-sm font-medium">Collect Badges and rewards</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 bg-orange-500 rounded-full p-[2px]">
                 <Check size={12} className="text-white" strokeWidth={4} />
              </div>
              <span className="text-sm font-medium">Gain Cyber Security Knowledge</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 bg-orange-500 rounded-full p-[2px]">
                 <Check size={12} className="text-white" strokeWidth={4} />
              </div>
              <span className="text-sm font-medium">Earn Xp and level up your profile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center items-center">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-normal text-gray-900">Log into your account</h2>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block">Enter your username</label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChange}
                  className="w-full bg-cosbia-input py-3 pl-4 pr-10 rounded-lg text-gray-600 font-medium outline-none focus:ring-2 focus:ring-orange-200 border border-transparent hover:border-orange-100 transition-all placeholder-gray-400/70"
                  placeholder="username"
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block">Enter your password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="w-full bg-cosbia-input py-3 pl-4 pr-10 rounded-lg text-gray-600 font-medium outline-none focus:ring-2 focus:ring-orange-200 border border-transparent hover:border-orange-100 transition-all placeholder-gray-400/70"
                  placeholder="password"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800" size={18} />
              </div>
              <div className="pt-1">
                 <button type="button" className="text-xs font-bold text-gray-400 hover:text-gray-600">Forgot password?</button>
              </div>
            </div>

            <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-cosbia-orange hover:bg-orange-600 text-white text-xl font-normal py-3 px-4 rounded-lg shadow-lg shadow-orange-500/20 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center"
                >
                  Log in
                </button>
            </div>
          </form>

          <div className="text-center mt-8">
            <span className="text-gray-900 font-bold text-sm">New to COSBIA? </span>
            <button 
              type="button" 
              onClick={onSwitchToRegister} 
              className="text-pink-700 font-bold text-sm hover:underline"
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline Icon Components
const User = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const Lock = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const Check = ({ size = 24, className = "", strokeWidth = 2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17 4 12"/></svg>
);

export default Login;