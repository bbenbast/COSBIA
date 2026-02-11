import React from 'react';

export const ProgressBar = ({ current, total }) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full flex flex-col gap-2 mb-8">
      <div className="flex justify-between text-slate-300 font-semibold text-sm">
        <span>Question {current} of {total}</span>
      </div>
      <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};