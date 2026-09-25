/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProgress, StudentProfile, AnswerRecord, Achievement } from './types';
import { INITIAL_ACHIEVEMENTS } from './data/challengesData';
import { BrandHeader } from './components/BrandHeader';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Dashboard } from './components/Dashboard';
import { Challenge1ReviewU1 } from './components/challenges/Challenge1ReviewU1';
import { Challenge2Documents } from './components/challenges/Challenge2Documents';
import { Challenge3Blueprints } from './components/challenges/Challenge3Blueprints';
import { Challenge4Gantt } from './components/challenges/Challenge4Gantt';
import { MissionReport } from './components/MissionReport';
import { TechnicalManualModal } from './components/TechnicalManualModal';
import { AchievementsModal } from './components/AchievementsModal';
import { FormulaWorkbenchModal } from './components/FormulaWorkbenchModal';
import { soundEffects } from './utils/audio';

const STORAGE_KEY = 'eolica_master_progress_v1';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'welcome' | 'dashboard' | 'level1' | 'level2' | 'level3' | 'level4' | 'report'>('welcome');

  // Load progress from LocalStorage or default state
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore error
        }
      }
    }
    return {
      student: {
        name: '',
        courseGroup: '2º GS Energías Renovables - CIFP Aguas Nuevas',
        role: 'jefe_obra',
        roleTitle: 'Jefe/a de Obra Eólica',
        avatarSeed: 'jefe-obra',
      },
      currentLevel: 1,
      completedLevels: [],
      score: 0,
      budget: 1000000,
      initialBudget: 1000000,
      safetyLives: 3,
      timeRemainingSeconds: 45 * 60, // 45 minutes = 2700s
      levelTimes: { 1: 0, 2: 0, 3: 0, 4: 0 },
      achievements: INITIAL_ACHIEVEMENTS,
      answersHistory: [],
      isGameFinished: false,
      startedAt: Date.now(),
    };
  });

  // Save to LocalStorage whenever progress changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  // Sync sound controller state
  useEffect(() => {
    soundEffects.enabled = soundEnabled;
  }, [soundEnabled]);

  // Global 45-Minute Timer: ticks down when in an active level
  useEffect(() => {
    if (currentView === 'welcome' || currentView === 'report' || progress.isGameFinished) {
      return;
    }

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev.timeRemainingSeconds <= 1) {
          clearInterval(timer);
          soundEffects.playWarning();
          return {
            ...prev,
            timeRemainingSeconds: 0,
            isGameFinished: true,
          };
        }
        return {
          ...prev,
          timeRemainingSeconds: prev.timeRemainingSeconds - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentView, progress.isGameFinished]);

  // Unlock achievement helper
  const unlockAchievement = (achId: string) => {
    setProgress(prev => {
      const exists = prev.achievements.find(a => a.id === achId);
      if (exists && !exists.unlockedAt) {
        soundEffects.playSuccess();
        return {
          ...prev,
          achievements: prev.achievements.map(a => 
            a.id === achId ? { ...a, unlockedAt: Date.now() } : a
          )
        };
      }
      return prev;
    });
  };

  // Start game from welcome screen
  const handleStartGame = (profile: StudentProfile) => {
    setProgress(prev => ({
      ...prev,
      student: profile,
      startedAt: Date.now(),
    }));
    setCurrentView('dashboard');
  };

  // Handle life deduction for critical safety errors
  const handleDeductLife = () => {
    setProgress(prev => {
      const nextLives = Math.max(0, prev.safetyLives - 1);
      if (nextLives === 0) {
        soundEffects.playWarning();
      }
      return {
        ...prev,
        safetyLives: nextLives,
      };
    });
  };

  // Level Complete Handlers
  const handleLevel1Complete = (scoreDelta: number, budgetDelta: number, records: AnswerRecord[]) => {
    unlockAchievement('u1_master');
    unlockAchievement('betz_physicist');
    unlockAchievement('generator_specialist');

    setProgress(prev => ({
      ...prev,
      score: prev.score + scoreDelta,
      budget: prev.budget + budgetDelta,
      completedLevels: Array.from(new Set([...prev.completedLevels, 1])),
      currentLevel: 2,
      answersHistory: [...prev.answersHistory, ...records],
    }));

    setCurrentView('dashboard');
  };

  const handleLevel2Complete = (scoreDelta: number, budgetDelta: number, records: AnswerRecord[]) => {
    unlockAchievement('doc_archivist');
    unlockAchievement('anejos_auditor');

    setProgress(prev => ({
      ...prev,
      score: prev.score + scoreDelta,
      budget: prev.budget + budgetDelta,
      completedLevels: Array.from(new Set([...prev.completedLevels, 2])),
      currentLevel: 3,
      answersHistory: [...prev.answersHistory, ...records],
    }));

    setCurrentView('dashboard');
  };

  const handleLevel3Complete = (scoreDelta: number, budgetDelta: number, records: AnswerRecord[]) => {
    unlockAchievement('blueprint_pro');
    unlockAchievement('substation_expert');

    setProgress(prev => ({
      ...prev,
      score: prev.score + scoreDelta,
      budget: prev.budget + budgetDelta,
      completedLevels: Array.from(new Set([...prev.completedLevels, 3])),
      currentLevel: 4,
      answersHistory: [...prev.answersHistory, ...records],
    }));

    setCurrentView('dashboard');
  };

  const handleLevel4Complete = (scoreDelta: number, budgetDelta: number, records: AnswerRecord[]) => {
    unlockAchievement('critical_path_hero');
    unlockAchievement('aguas_nuevas_master');

    setProgress(prev => ({
      ...prev,
      score: prev.score + scoreDelta,
      budget: prev.budget + budgetDelta,
      completedLevels: Array.from(new Set([...prev.completedLevels, 4])),
      isGameFinished: true,
      finishedAt: Date.now(),
      answersHistory: [...prev.answersHistory, ...records],
    }));

    setCurrentView('report');
  };

  // Reset Game
  const handleResetGame = () => {
    if (confirm('¿Deseas reiniciar la partida y comenzar desde el Reto 1?')) {
      localStorage.removeItem(STORAGE_KEY);
      setProgress({
        student: {
          name: '',
          courseGroup: '2º GS Energías Renovables - CIFP Aguas Nuevas',
          role: 'jefe_obra',
          roleTitle: 'Jefe/a de Obra Eólica',
          avatarSeed: 'jefe-obra',
        },
        currentLevel: 1,
        completedLevels: [],
        score: 0,
        budget: 1000000,
        initialBudget: 1000000,
        safetyLives: 3,
        timeRemainingSeconds: 45 * 60,
        levelTimes: { 1: 0, 2: 0, 3: 0, 4: 0 },
        achievements: INITIAL_ACHIEVEMENTS,
        answersHistory: [],
        isGameFinished: false,
        startedAt: Date.now(),
      });
      setCurrentView('welcome');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header with Institutional Branding & Timers */}
      <BrandHeader
        progress={progress}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onResetGame={handleResetGame}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
      />

      {/* Main View Router */}
      <main className="flex-1 p-3 sm:p-6">
        {currentView === 'welcome' && (
          <WelcomeScreen
            onStartGame={handleStartGame}
            onOpenManual={() => setIsManualOpen(true)}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            progress={progress}
            onStartLevel={(lvl) => {
              if (lvl === 1) setCurrentView('level1');
              if (lvl === 2) setCurrentView('level2');
              if (lvl === 3) setCurrentView('level3');
              if (lvl === 4) setCurrentView('level4');
            }}
            onFinishGame={() => setCurrentView('report')}
            onOpenManual={() => setIsManualOpen(true)}
            onOpenAchievements={() => setIsAchievementsOpen(true)}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {currentView === 'level1' && (
          <Challenge1ReviewU1
            onComplete={handleLevel1Complete}
            onDeductLife={handleDeductLife}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {currentView === 'level2' && (
          <Challenge2Documents
            onComplete={handleLevel2Complete}
            onDeductLife={handleDeductLife}
          />
        )}

        {currentView === 'level3' && (
          <Challenge3Blueprints
            onComplete={handleLevel3Complete}
            onDeductLife={handleDeductLife}
          />
        )}

        {currentView === 'level4' && (
          <Challenge4Gantt
            onComplete={handleLevel4Complete}
            onDeductLife={handleDeductLife}
          />
        )}

        {currentView === 'report' && (
          <MissionReport
            progress={progress}
            onRestart={handleResetGame}
            onOpenManual={() => setIsManualOpen(true)}
          />
        )}
      </main>

      {/* Technical Reference Manual Modal */}
      <TechnicalManualModal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
      />

      {/* Achievements & Badges Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        achievements={progress.achievements}
      />

      {/* Formula & Engineering Calculation Workbench Modal */}
      <FormulaWorkbenchModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onSolveTask={(points, budgetDelta) => {
          setProgress(prev => ({
            ...prev,
            score: prev.score + points,
            budget: prev.budget + budgetDelta,
          }));
        }}
      />
    </div>
  );
}
