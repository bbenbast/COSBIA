
import React, { useState } from 'react';
import { Avatar } from './Avatar';

const DEVICES = [
  "Smartphone", "Laptop", "Personal Computer",
  "Game Console", "Tablet/Ipad", "School Computer"
];

const APPS = [
  "Facebook", "WhatsApp", "Instagram", "Snapchat", "X (Twitter)",
  "Skype", "LinkedIn", "Hangouts", "Gaming", "Tik Tok"
];

const ACTIVITIES = [
  "Watching Videos", "Information Searching", "Gaming",
  "Studying", "Social Networks", "Emailing"
];

export const EnvironmentSelection = ({onNext}) => {
  const [selectedDevice, setSelectedDevice] = useState('Laptop');
  const [selectedApp, setSelectedApp] = useState('Instagram');
  const [selectedActivity, setSelectedActivity] = useState('Information Searching');

  const Section = ({ items, selected, onSelect }) => (
    <div className="flex flex-wrap justify-center gap-3 md:gap-3">
      {items.map(item => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className={`
            px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
            ${selected === item 
              ? 'bg-[#7D86AD] bg-opacity-50 border-2 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
              : 'bg-[#7D86AD] bg-opacity-75 text-slate-200 border-2 border-transparent hover:bg-[#5f6b82]'}
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 md:p-8 font-sans text-white">
      <div className="w-full max-w-4xl bg-[#1D2758] rounded-[2rem] p-6 md:p-12 shadow-2xl relative border border-slate-700 flex flex-col items-center">
        
        {/* Bot Header Area */}
        <div className="flex flex-col items-center w-full mb-8 relative">
           <div className="flex items-start justify-center gap-4 md:gap-6 relative">
              <div className="flex flex-col items-center">
                <Avatar />
              </div>
              
              {/* Speech Bubble */}
               <div className="relative mt-2">
               <div className="bg-[#7D86AD] bg-opacity-50 px-6 py-4 rounded-2xl border border-slate-600 shadow-inner max-w-sm text-sm md:text-base leading-relaxed text-white font-bold">
                   Welcome to COSBIA! Choose your training environment to get started
                </div>
                {/* Arrow */}
               <div className="absolute top-6 -left-3 w-0 h-0 border-y-[8px] border-y-transparent border-r-[12px] border-r-[#7D86AD] opacity-50"></div>
              </div>
           </div>
        </div>

        <h2 className="text-2xl md:text-3xl text-white font-medium mb-10 text-center">
          Select your training Environment
        </h2>

        <div className="w-full space-y-8">
            {/* Devices Section */}
            <div>
                <Section 
                    items={DEVICES} 
                    selected={selectedDevice} 
                    onSelect={setSelectedDevice} 
                />
            </div>
            
            <div className="h-px bg-slate-500/20 w-3/4 mx-auto"></div>

            {/* Apps Section */}
            <div>
                <Section 
                    items={APPS} 
                    selected={selectedApp} 
                    onSelect={setSelectedApp} 
                />
            </div>

            <div className="h-px bg-slate-600/50 w-3/4 mx-auto"></div>

            {/* Activities Section */}
            <div>
                <Section 
                    items={ACTIVITIES} 
                    selected={selectedActivity} 
                    onSelect={setSelectedActivity} 
                />
            </div>
        </div>

        {/* Next Button */}
        <div className="w-full flex justify-end mt-12">
          <button 
            onClick={() => onNext({ device: selectedDevice, app: selectedApp, activity: selectedActivity })}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1 transition-all duration-300"
          >
            Next 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};
