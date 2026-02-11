import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Shield,
  Activity,
} from "lucide-react";
import { useQuestions } from "../data/useQuestions";
import { Avatar } from "./Avatar";
import { OptionCard } from "./OptionCard";
import { useAuth } from "../context/AuthContext";
import { saveUserXp } from "../data/userService";


export const AssessmentQuiz = () => {
  const [showEnvironmentSelection, setShowEnvironmentSelection] =
    useState(false);
  const navigate = useNavigate();

  // 1. Call your custom hook
  const { questions: apiQuestions, loading, error } = useQuestions();
  const { user } = useAuth();
  // 2. Initialize Game State (questions starts empty, populated via useEffect)
  const [gameState, setGameState] = useState({
    currentQuestionIndex: 0,
    totalXp: 0,
    selectedOptionId: null,
    isAnswerChecked: false,
    questions: [], // Starts empty
    quizComplete: false,
  });

  // 3. Sync API data into Game State when it arrives
  useEffect(() => {
    if (apiQuestions.length > 0) {
      setGameState((prev) => ({
        ...prev,
        questions: apiQuestions,
      }));
    }
  }, [apiQuestions]);

  // 4. Handle Loading and Error States explicitly
  if (loading) {
    return (
      <div className="min-h-screen bg-[#37487A] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-300">Loading your mission...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#37487A] flex items-center justify-center text-white">
        <div className="text-center p-8 bg-[#2d3748] rounded-xl border border-red-500/50">
          <h3 className="text-xl text-red-400 font-bold mb-2">
            Connection Error
          </h3>
          <p className="text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  // Guard clause: If data returned empty for some reason
  if (gameState.questions.length === 0) return null;

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const isLastQuestion =
    gameState.currentQuestionIndex === gameState.questions.length - 1;

  const handleOptionSelect = (id) => {
    if (gameState.isAnswerChecked) return;
    setGameState((prev) => ({ ...prev, selectedOptionId: id }));
  };

  const handleCheckAnswer = () => {
    if (!gameState.selectedOptionId || gameState.isAnswerChecked) return;

    // Ensure we are comparing strings (e.g., "A" === "A")
    const isCorrect =
      gameState.selectedOptionId === currentQuestion.correctOptionId;
    const reward = isCorrect ? currentQuestion.xpReward : 0;

    setGameState((prev) => ({
      ...prev,
      isAnswerChecked: true,
      totalXp: prev.totalXp + reward,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Only save if the user is logged in
      if (user) {
        saveUserXp(gameState.totalXp);
      } else {
        console.log("User not logged in. XP not saved to backend.");
      }
      setGameState((prev) => ({ ...prev, quizComplete: true }));
    } else {
      setGameState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedOptionId: null,
        isAnswerChecked: false,
      }));
    }
  };

  const mainButtonAction = gameState.isAnswerChecked
    ? handleNext
    : handleCheckAnswer;
  const mainButtonText = gameState.isAnswerChecked
    ? isLastQuestion
      ? "Finish Quiz"
      : "Next Question"
    : "Confirm Answer";

  // --- RENDER: COMPLETE SCREEN ---
  if (gameState.quizComplete) {
    return (
      <div className="min-h-screen bg-[#1e293b] flex items-center justify-center p-4 font-sans text-white">
        <div className="max-w-2xl w-full bg-[#2d3748] rounded-3xl p-8 md:p-12 shadow-2xl text-center border border-slate-600">
          <div className="mb-6 flex justify-center">
            {/* <Avatar /> Uncomment if you have this component */}
            <div className="w-16 h-16 bg-orange-500 rounded-full"></div>{" "}
            {/* Placeholder */}
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">
            Quiz Completed!
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            You demonstrated great awareness today.
          </p>

          <div className="bg-[#7D86AD] bg-opacity-50 rounded-2xl p-6 mb-8 inline-block min-w-[200px] border border-slate-600 shadow-inner text-slate-100">
            <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold mb-2">
              Total XP Earned
            </p>
            <p className="text-5xl font-black text-orange-500">
              {gameState.totalXp}
            </p>
          </div>

          <div>
            <button
              onClick={() => navigate("/EnvironmentSelection")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-transform hover:scale-105"
            >
              Continue{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: MAIN QUIZ SCREEN ---
  return (
    <div className="min-h-screen bg-[#37487A] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl bg-[#1D2758] rounded-[2rem] p-6 md:p-10 shadow-2xl relative border border-slate-700">
        {/* Header Section */}
        <div className="text-center mb-8 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-white inline-block relative pb-2">
            Initial Assessment Quiz
            <span className="absolute bottom-0 left-0 w-full h-1 bg-slate-500 rounded-full opacity-50"></span>
          </h1>
        </div>

        {/* Top Bar: Bot and XP */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
          {/* Bot & Bubble */}
          <div className="flex items-start gap-4 flex-1">
            {/* <Avatar /> Uncomment if you have this component */}
            <Avatar />

            {/* Chat Bubble (drop-in replacement) */}
            <div
              role="status"
              aria-live="polite"
              className="relative max-w-md mt-2"
            >
              {/* Outer bubble (border + shadow) */}
              <div className="relative bg-slate-600/50 p-4 rounded-xl rounded-tl-none border border-orange-500/30 text-slate-200 text-sm md:text-base leading-relaxed shadow-lg">
                {gameState.isAnswerChecked && currentQuestion.explanation ? (
                  <span className="text-orange-200 font-medium">
                    {currentQuestion.explanation}
                  </span>
                ) : (
                  "Welcome to your initial quiz! Tell us how you'd behave in the situations below!"
                )}
              </div>

              {/* Tail: border layer (behind) */}
              <div className="absolute -left-3 top-6 w-0 h-0 border-t-[10px] border-b-[10px] border-r-[12px] border-t-transparent border-b-transparent border-r-orange-500/30 pointer-events-none"></div>

              {/* Tail: fill layer (in front, slightly inset to show border) */}
              <div className="absolute -left-2 top-6 w-0 h-0 border-t-[9px] border-b-[9px] border-r-[10px] border-t-transparent border-b-transparent border-r-slate-600/50 pointer-events-none"></div>
            </div>
          </div>

          {/* XP Badge */}
          <div className="bg-[#fff9e6] px-6 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[100px] shadow-md transform rotate-1 border-2 border-orange-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Total XP
            </span>
            <span className="text-2xl font-black text-orange-500">
              {gameState.totalXp}
            </span>
          </div>
        </div>

        {/* Progress Bar Placeholder - Pass props if you have the component */}
        {/* <ProgressBar current={gameState.currentQuestionIndex + 1} total={gameState.questions.length} /> */}
        <div className="w-full bg-slate-700 h-2 rounded-full mb-8">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((gameState.currentQuestionIndex + 1) /
                  gameState.questions.length) *
                100
              }%`,
            }}
          ></div>
        </div>

        {/* Question Area */}
        <div className="mb-8">
          <div className="bg-[#7D86AD] bg-opacity-50 p-6 md:p-8 rounded-2xl border border-slate-600 shadow-inner flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-lg md:text-xl text-slate-100 font-medium leading-relaxed flex-1">
              <span className="font-bold text-slate-400 mr-2">
                {gameState.currentQuestionIndex + 1}.
              </span>
              {currentQuestion.text}
            </h2>
            <div className="bg-[#fff9e6] text-orange-500 font-bold px-4 py-2 rounded-xl text-sm whitespace-nowrap shadow-sm">
              {currentQuestion.xpReward} XP
            </div>
          </div>
        </div>

        {/* Options Grid */}
        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {currentQuestion.options.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              isSelected={gameState.selectedOptionId === option.id}
              isCorrect={
                gameState.isAnswerChecked &&
                option.id === currentQuestion.correctOptionId
              }
              isWrong={
                gameState.isAnswerChecked &&
                option.id === gameState.selectedOptionId &&
                option.id !== currentQuestion.correctOptionId
              }
              showResult={gameState.isAnswerChecked}
              onSelect={handleOptionSelect}
              disabled={gameState.isAnswerChecked}
            />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={mainButtonAction}
            disabled={!gameState.selectedOptionId && !gameState.isAnswerChecked}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300
              ${
                !gameState.selectedOptionId && !gameState.isAnswerChecked
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
              }
            `}
          >
            {mainButtonText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuiz;
