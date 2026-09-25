import React from 'react';
import { 
  Clock, 
  Coins, 
  Heart, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Award,
  AlertTriangle,
  RotateCcw,
  Calculator
} from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { UserProgress } from '../types';

interface BrandHeaderProps {
  progress: UserProgress;
  onOpenManual: () => void;
  onOpenAchievements: () => void;
  onOpenCalculator: () => void;
  onResetGame: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  progress,
  onOpenManual,
  onOpenAchievements,
  onOpenCalculator,
  onResetGame,
  soundEnabled,
  onToggleSound,
}) => {
  // Format total seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = progress.timeRemainingSeconds < 300; // less than 5 min

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner: Institutional */}
      <div className="bg-slate-950/80 px-4 py-1.5 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-300">CIFP AGUAS NUEVAS (Albacete)</span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline text-slate-400">G.S. Energías Renovables y Agua</span>
          <span className="hidden lg:inline text-slate-500">•</span>
          <span className="hidden lg:inline text-cyan-400 font-mono">Unidad 2: Planificación del Montaje (ISBN: 9788428395625)</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSound}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
            title={soundEnabled ? 'Silenciar efectos' : 'Activar sonido'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Audio ON' : 'Audio OFF'}</span>
          </button>
          <button
            onClick={onResetGame}
            className="flex items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors"
            title="Reiniciar partida"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand Logo & Role */}
        <div className="flex items-center gap-3">
          {/* Stylized Vector Logo of CIFP Aguas Nuevas */}
          <div className="flex items-center gap-2.5">
            <svg 
              className="h-9 w-auto select-none" 
              viewBox="0 0 160 50" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Logo CIFP Aguas Nuevas"
            >
              {/* Connected Lime 'an' Monogram */}
              <g transform="translate(4, 2)">
                {/* 'a' glyph */}
                <path 
                  d="M10 28 C10 18, 22 18, 30 18 L34 18 L34 38 C34 41, 38 41, 40 41 L40 46 C34 46, 28 44, 28 38 C24 44, 10 44, 10 28 Z M28 26 C28 23, 20 23, 20 28 C20 34, 28 34, 28 29 Z" 
                  fill="#c0df16" 
                />
                {/* 'n' glyph smoothly linked */}
                <path 
                  d="M38 10 L48 10 L48 18 C52 14, 62 14, 68 18 C74 22, 74 30, 74 46 L64 46 L64 30 C64 24, 60 22, 54 22 C48 22, 48 27, 48 34 L48 46 L38 46 Z" 
                  fill="#c0df16" 
                />
                {/* Modern connecting flow line */}
                <path 
                  d="M2 38 L12 38" 
                  stroke="#c0df16" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
              </g>
              {/* Institution Subtext in White / Slate */}
              <text x="82" y="22" fill="#ffffff" fontSize="13" fontWeight="800" letterSpacing="1.5" fontFamily="system-ui">
                AGUAS NUEVAS
              </text>
              <text x="82" y="34" fill="#94a3b8" fontSize="7" fontWeight="600" letterSpacing="0.8" fontFamily="system-ui">
                CENTRO INTEGRADO F.P.
              </text>
              <text x="82" y="44" fill="#38bdf8" fontSize="6.5" fontWeight="700" letterSpacing="1" fontFamily="system-ui">
                ENERGÍAS RENOVABLES
              </text>
            </svg>

            <div className="hidden sm:block border-l border-slate-700/80 pl-3">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-tech font-bold text-white tracking-wide">
                  EÓLICA<span className="text-cyan-400">MASTER</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                  U1+U2
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[180px]">
                {progress.student.name || 'Jefe de Obra Eólica'} • <span className="text-emerald-400">{progress.student.roleTitle}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Gamification Stats */}
        <div className="flex items-center gap-2 sm:gap-4 bg-slate-950/70 px-3 py-1.5 rounded-lg border border-slate-800">
          {/* General 45-Min Timer */}
          <div className={`flex items-center gap-1.5 font-mono px-2 py-1 rounded text-sm ${
            isLowTime 
              ? 'bg-rose-950/80 text-rose-400 border border-rose-800 animate-pulse' 
              : 'text-amber-300 bg-slate-900 border border-slate-800'
          }`}>
            <Clock className={`w-4 h-4 ${isLowTime ? 'text-rose-400' : 'text-amber-400'}`} />
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block -mb-1">Tiempo Restante</span>
              <span className="font-bold text-base tracking-tight">{formatTime(progress.timeRemainingSeconds)}</span>
            </div>
          </div>

          {/* Budget / Presupuesto en Euros */}
          <div className="flex items-center gap-1.5 font-mono px-2 py-1 rounded text-sm text-emerald-400 bg-slate-900 border border-slate-800">
            <Coins className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block -mb-1">Presupuesto</span>
              <span className="font-bold text-base tracking-tight">
                {progress.budget.toLocaleString('es-ES')} €
              </span>
            </div>
          </div>

          {/* Vidas / Seguridad Laboral */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded text-sm bg-slate-900 border border-slate-800">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block -mb-0.5">Seguridad PRL</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((heartIndex) => (
                  <Heart
                    key={heartIndex}
                    className={`w-3.5 h-3.5 transition-all ${
                      heartIndex <= progress.safetyLives
                        ? 'text-rose-500 fill-rose-500 scale-100'
                        : 'text-slate-700 scale-90'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Achievements badge */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenAchievements();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all hover:border-amber-400/50"
            title="Ver Logros y Medallas Desbloqueadas"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="font-tech font-bold text-amber-300">
              {progress.achievements.filter(a => !!a.unlockedAt).length}/{progress.achievements.length}
            </span>
          </button>

          {/* Formula Calculator Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenCalculator();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold border border-emerald-700/60 shadow-sm transition-all hover:scale-102"
            title="Calculadora Técnica y Fórmulas Eólicas (Betz, Buje, PEC)"
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Calculadora Fórmulas</span>
          </button>

          {/* Technical Manual Button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenManual();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 text-xs font-semibold border border-cyan-700/60 shadow-sm transition-all hover:scale-102"
            title="Consultar Vademécum Técnico Paraninfo (U1 + U2)"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Vademécum Paraninfo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
