const STORAGE_KEY = 'cosbia_player_progress';

const defaultProgress = {
  completedLevels: [],
  currentLevel: 1,
  xpByLevel: {
    1: 0,
    2: 0,
    3: 0,
  },
  badges: [],
  recentActivity: [],
};

export const getPlayerProgress = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProgress };

    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      completedLevels: Array.isArray(parsed.completedLevels) ? parsed.completedLevels : [],
      xpByLevel: {
        ...defaultProgress.xpByLevel,
        ...(parsed.xpByLevel || {}),
      },
      recentActivity: Array.isArray(parsed.recentActivity) ? parsed.recentActivity : [],
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
    };
  } catch (error) {
    console.warn('Unable to read saved player progress', error);
    return { ...defaultProgress };
  }
};

const savePlayerProgress = (progress) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
};

export const recordLevelCompletion = (level, xpEarned, title = 'Level complete') => {
  const safeLevel = Number(level);
  const safeXp = Number(xpEarned) || 0;
  const progress = getPlayerProgress();

  const completedLevels = progress.completedLevels.includes(safeLevel)
    ? progress.completedLevels
    : [...progress.completedLevels, safeLevel];

  const xpByLevel = {
    ...progress.xpByLevel,
    [safeLevel]: Math.max(Number(progress.xpByLevel[safeLevel] || 0), safeXp),
  };

  const entry = {
    id: Date.now(),
    level: safeLevel,
    title,
    xp: safeXp,
    timestamp: new Date().toISOString(),
  };

  const nextProgress = {
    ...progress,
    completedLevels,
    xpByLevel,
    currentLevel: Math.min(3, Math.max(progress.currentLevel, safeLevel + 1)),
    recentActivity: [entry, ...progress.recentActivity].slice(0, 5),
  };

  const nextBadges = [...new Set([
    ...progress.badges,
    ...(safeXp > 0 ? ['XP Collector'] : []),
    ...(completedLevels.includes(1) ? ['First Steps'] : []),
    ...(completedLevels.includes(2) ? ['Social Guardian'] : []),
    ...(completedLevels.includes(3) ? ['Cyber Sentinel'] : []),
  ])];

  return savePlayerProgress({
    ...nextProgress,
    badges: nextBadges,
  });
};

export const getLevelSummary = () => {
  const progress = getPlayerProgress();
  const levels = [
    { level: 1, title: 'Security Knowledge', targetXp: 100 },
    { level: 2, title: 'Social Safety', targetXp: 100 },
    { level: 3, title: 'Information Awareness', targetXp: 150 },
  ];

  return levels.map((level) => {
    const earned = Number(progress.xpByLevel[level.level] || 0);
    return {
      ...level,
      xp: earned,
      completed: progress.completedLevels.includes(level.level),
      progressPercent: Math.min(100, Math.round((earned / level.targetXp) * 100)),
      value: `${earned}/${level.targetXp}`,
    };
  });
};
