import React from 'react';

export const OptionCard = ({ 
  option, 
  isSelected, 
  isCorrect,
  isWrong,
  showResult,
  onSelect,
  disabled 
}) => {
  
  // Base styles
  let cardClasses = "relative bg-[#7D86AD]/50 w-full p-4 min-h-[80px] rounded-lg border-2 transition-all duration-200 flex items-center group ";
  let letterClasses = "mr-4 font-bold text-lg ";
  let textClasses = "text-left text-sm md:text-base font-medium ";

  if (showResult) {
    if (isCorrect) {
      cardClasses += " bg-green-500/20 border-green-500 text-white";
      letterClasses += " text-green-400";
    } else if (isWrong) {
      cardClasses += " bg-red-500/20 border-red-500 text-white";
      letterClasses += " text-red-400";
    } else {
      cardClasses += " bg-[#7D86AD]/50 border-transparent text-slate-400 opacity-50";
      letterClasses += " text-slate-500";
    }
  } else {
    if (isSelected) {
      cardClasses += " bg-[#7D86AD]/50 border-cosbia-accent text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]";
      letterClasses += " text-blue-200";
    } else {
      cardClasses += " bg-[#7D86AD]/50 border-slate-600 text-slate-200 hover:bg-[#7D86AD] hover:border-slate-500 cursor-pointer";
      letterClasses += " text-slate-400 group-hover:text-white";
    }
  }

  return (
    <button 
      onClick={() => onSelect(option.id)}
      disabled={disabled}
      className={cardClasses}
    >
      <span className={letterClasses}>{option.label}.</span>
      <span className={textClasses}>{option.text}</span>
    </button>
  );
};
