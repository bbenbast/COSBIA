import React, { useEffect, useMemo, useRef, useState } from 'react';

export const LEVEL_TIME_LIMITS = {
  1: 45,
  2: 75,
  3: 105,
};

export const formatTime = (seconds) => {
  const totalSeconds = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes}:${String(secs).padStart(2, '0')}`;
};

export const useLevelTimer = ({ level, durationSeconds, onTimeout }) => {
  const limit = durationSeconds ?? LEVEL_TIME_LIMITS[level] ?? 60;
  const [timeLeft, setTimeLeft] = useState(limit);
  const [hasExpired, setHasExpired] = useState(false);
  const timeoutTriggeredRef = useRef(false);

  useEffect(() => {
    setTimeLeft(limit);
    setHasExpired(false);
    timeoutTriggeredRef.current = false;
  }, [level, limit]);

  useEffect(() => {
    if (hasExpired) return undefined;

    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasExpired, level]);

  useEffect(() => {
    if (timeLeft === 0 && !hasExpired && !timeoutTriggeredRef.current) {
      timeoutTriggeredRef.current = true;
      setHasExpired(true);
      onTimeout?.();
    }
  }, [timeLeft, hasExpired, onTimeout]);

  const progress = useMemo(() => {
    if (!limit) return 0;
    return ((limit - timeLeft) / limit) * 100;
  }, [limit, timeLeft]);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isExpired: hasExpired,
    progress,
    limit,
  };
};

export const LevelTimer = ({
  level,
  durationSeconds,
  onTimeout,
  onRestart,
  className = '',
}) => {
  const { formattedTime, timeLeft, progress, isExpired } = useLevelTimer({ level, durationSeconds, onTimeout });
  const isLowTime = timeLeft <= 15;

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
      return;
    }
    window.location.reload();
  };

  return (
    <>
      <div className={`min-w-[150px] rounded-2xl border border-slate-600 bg-[#1D2758] p-3 shadow-lg ${className}`}>
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
          <span>Timer</span>
          <span className={isLowTime ? 'text-red-400' : 'text-orange-400'}>{formattedTime}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-300 ${isLowTime ? 'bg-red-500' : 'bg-orange-500'}`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>

      {isExpired && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-red-500/40 bg-[#1D2758] p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-3xl text-red-400">
              ⏰
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">Time Up</p>
            <h3 className="mt-3 text-3xl font-black text-white">Level Timeout</h3>
            <p className="mt-3 text-sm text-slate-300">
              You ran out of time. Restart this level and try again.
            </p>
            <button
              onClick={handleRestart}
              className="mt-6 w-full rounded-full bg-orange-500 px-6 py-3 text-lg font-bold text-white transition hover:bg-orange-600"
            >
              Restart Level
            </button>
          </div>
        </div>
      )}
    </>
  );
};
