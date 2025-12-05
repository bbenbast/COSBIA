import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Lock, ChevronDown, CheckCircle2, XCircle, Check, ShieldCheck, Gamepad2, Award } from 'lucide-react';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    ageBracket: ''
  });
  const [error, setError] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [criteria, setCriteria] = useState({
    length: false,
    number: false,
    uppercase: false,
    symbol: false
  });

  const { register } = useAuth();
  const { username, password, confirmPassword, ageBracket } = formData;

  // Validate password requirements in real-time
  useEffect(() => {
    setCriteria({
      length: password.length >= 8,
      number: /\d/.test(password),
      uppercase: /[A-Z]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  }, [password]);

  // Simulate username check
  useEffect(() => {
    const timer = setTimeout(() => {
      if (username.length >= 3) {
        setIsUsernameAvailable(true);
      } else {
        setIsUsernameAvailable(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [username]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!Object.values(criteria).every(Boolean)) {
      setError('Please satisfy all password requirements');
      return;
    }

    if (!ageBracket) {
      setError('Please select your age bracket');
      return;
    }

    try {
      await register({ username, password, ageBracket });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
          
          <h2 className="text-3xl font-semibold mb-4 leading-tight">Begin your adventure!</h2>
          <p className="text-blue-100 mb-10 text-sm opacity-90 leading-relaxed">
            Join players on an epic journey of discovery, challenges and rewards.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 rounded-full p-1 shadow-lg shadow-orange-500/30">
                 <Award size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium">Collect Badges and rewards</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 rounded-full p-1 shadow-lg shadow-orange-500/30">
                 <ShieldCheck size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium">Gain Cyber Security Knowledge</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 rounded-full p-1 shadow-lg shadow-orange-500/30">
                 <Gamepad2 size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium">Earn Xp and level up your profile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create your account</h2>
          <p className="text-gray-400 text-sm">Join the adventure in less than a minute</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100 flex items-center gap-2">
            <XCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          
          {/* Username */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 block mb-1">Choose a username</label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Enter a username"
                className="w-full bg-cosbia-input py-3 pl-4 pr-10 rounded-lg text-gray-600 font-medium outline-none focus:ring-2 focus:ring-orange-200 transition-all border-transparent border hover:border-orange-100"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {isUsernameAvailable && (
              <div className="flex items-center gap-1 text-xs font-bold text-green-500 mt-1">
                <div className="bg-green-500 rounded p-[1px]"><Check size={10} className="text-white" /></div>
                <span>Username is available</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 block mb-1">Create a password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter a password"
                className="w-full bg-cosbia-input py-3 pl-4 pr-10 rounded-lg text-gray-600 font-medium outline-none focus:ring-2 focus:ring-orange-200 transition-all border-transparent border hover:border-orange-100"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            {/* Password Validation List */}
            <div className="mt-2 space-y-1 pl-1">
              <RequirementItem met={criteria.length} text="At least 8 Characters long" />
              <RequirementItem met={criteria.number} text="Contains a number" />
              <RequirementItem met={criteria.uppercase} text="Contains uppercase characters" /> 
              <RequirementItem met={criteria.symbol} text="Contains a symbol" />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 block mb-1">Confirm password</label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Re-enter a password"
                className="w-full bg-cosbia-input py-3 pl-4 pr-10 rounded-lg text-gray-600 font-medium outline-none focus:ring-2 focus:ring-orange-200 transition-all border-transparent border hover:border-orange-100"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

           {/* Age Bracket */}
           <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 block mb-1">Enter age bracket</label>
            <div className="relative">
              <select
                name="ageBracket"
                value={ageBracket}
                onChange={onChange}
                className="w-full bg-cosbia-input py-3 pl-4 pr-10 rounded-lg text-gray-500 font-medium outline-none focus:ring-2 focus:ring-orange-200 appearance-none cursor-pointer"
              >
                <option value="">Choose an age bracket</option>
                <option value="13-15">13-15 years old</option>
                <option value="16-17">16-17 years old</option>
                <option value="18+">18+ years old</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800" size={20} />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-cosbia-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-orange-500/30 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Register
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-gray-400 text-sm">Already have an account? </span>
            <button 
              type="button" 
              onClick={onSwitchToLogin} 
              className="text-pink-600 font-bold text-sm hover:underline"
            >
              Login here
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// Helper component for password requirements
const RequirementItem = ({ met, text }) => (
  <div className={`flex items-center gap-2 text-xs font-bold ${met ? 'text-green-600' : 'text-red-400'}`}>
    <div className={`rounded p-[1px] ${met ? 'bg-green-500' : 'bg-transparent'}`}>
      {met ? (
        <Check size={10} className="text-white" />
      ) : (
         <XCircle size={14} className="text-red-500 fill-current bg-white rounded-full" />
      )}
    </div>
    <span className={!met ? 'text-red-400' : 'text-green-600'}>{text}</span>
  </div>
);

export default Register;