import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Target, Zap, ArrowRight, BrainCircuit, Lock } from 'lucide-react';

export const AssessmentWelcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    // The parent container already centers the child horizontally and vertically
    <div className="w-full min-h-screen flex items-center justify-center bg-[#37487A] p-4">

      {/* Main Content Panel - Centered */}
      <div className="bg-[#1D2758] p-8 md:p-12 flex flex-col justify-center relative rounded-3xl">
        {/* ADDED text-center HERE to center the headings within this block */}
        <div className="max-w-lg mx-auto w-full text-center"> 
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Welcome Agent, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">
              {user?.username || 'Candidate'}
            </span>
          </h1>
          {/* Also centered the Assessment Overview heading */}
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4 inline-block">Initial Assessment Overview</h2> 
          
          {/* Note: The feature list items below will remain left-aligned 
              because they use `flex gap-4 items-start` for their icon/text layout, 
              which is generally desired for lists. */}
          <div className="space-y-6 mb-10 text-left">
            <div className="flex gap-4 items-start">
              <div className="bg-[#24273f] p-3 rounded-lg text-blue-400 mt-1 border border-gray-700/50">
                <BrainCircuit size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Adaptive Questions</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Questions change based on your answers to find your exact skill ceiling.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#24273f] p-3 rounded-lg text-purple-400 mt-1 border border-gray-700/50">
                <Target size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">No Pass or Fail</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Don't worry about getting everything right. Honest answers help us tailor your experience.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#24273f] p-3 rounded-lg text-orange-400 mt-1 border border-gray-700/50">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">~10 Minutes</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Estimated completion time. You can pause if needed.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button 
              onClick={() => navigate('/assessment-quiz')}
              className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold py-4 px-6 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Initialize Assessment</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            
            <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest">
              System v2.4.0 • Secure Connection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentWelcome;