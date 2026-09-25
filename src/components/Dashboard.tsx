import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  Lock, 
  Wrench, 
  FolderTree, 
  Compass, 
  CalendarCheck, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Coins,
  Clock,
  BookOpen,
  Info,
  Calculator
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEffects } from '../utils/audio';

interface DashboardProps {
  progress: UserProgress;
  onStartLevel: (levelNumber: number) => void;
  onFinishGame: () => void;
  onOpenManual: () => void;
  onOpenAchievements: () => void;
  onOpenCalculator?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onStartLevel,
  onFinishGame,
  onOpenManual,
  onOpenAchievements,
  onOpenCalculator,
}) => {
  const levelsConfig = [
    {
      level: 1,
      title: 'RETO 1: Chequeo Técnico y Repaso U1',
      subtitle: 'Anatomía del Aerogenerador y Ley de Betz',
      duration: '8 Minutos',
      desc: '10 puntos de control: física atmosférica, Coriolis, ecuación de potencia cúbica, límite de Betz (59.3%), buje con pitch hidráulico, multiplicadora y generadores DFIG/PMSG.',
      icon: <Wrench className="w-6 h-6 text-cyan-400" />,
      tag: 'Unidad 1 Paraninfo',
      pointsReward: '2.600 pts',
      budgetReward: '+170.000 €',
    },
    {
      level: 2,
      title: 'RETO 2: Clasificación Documental del Proyecto',
      subtitle: 'Estructura Legal, Anejos y Auditoría PEC U2',
      duration: '12 Minutos',
      desc: 'Clasificación de 16 documentos (Memoria y los 16 anejos, 7 grupos de planos, pliego con zahorras al 95% Proctor) + Fase 2 de cálculo analítico del PEC (13% GG + 6% BI + 21% IVA).',
      icon: <FolderTree className="w-6 h-6 text-sky-400" />,
      tag: 'Unidad 2 Paraninfo',
      pointsReward: '3.600 pts',
      budgetReward: '+270.000 €',
    },
    {
      level: 3,
      title: 'RETO 3: Interpretación de Planos y Layout',
      subtitle: 'Plataformas, Zanjas MT y Subestación U2',
      duration: '12 Minutos',
      desc: 'Lectura técnica de 4 planos CAD con 8 hotspots: plataforma de 50 m para grúa a 5 kg/cm², zanja MT con cama de arena de 10 cm + 185 mm, y unifilar con relés ANSI 50/51 y 87.',
      icon: <Compass className="w-6 h-6 text-teal-400" />,
      tag: 'Unidad 2 Paraninfo',
      pointsReward: '2.400 pts',
      budgetReward: '+120.000 €',
    },
    {
      level: 4,
      title: 'RETO 4: Planificación de Montaje y Gantt',
      subtitle: 'Ruta Crítica, Precedencias y Dilemas de Seguridad',
      duration: '13 Minutos',
      desc: 'Secuenciación de 12 tareas en ruta crítica a 12 meses + Fase 2 de resolución de 4 incidencias reales de obra (límites de viento de 9 m/s, escariado de pernos y las 5 Reglas de Oro).',
      icon: <CalendarCheck className="w-6 h-6 text-amber-400" />,
      tag: 'Unidad 2 Paraninfo',
      pointsReward: '1.600 pts',
      budgetReward: '+95.000 €',
    },
  ];

  const allLevelsDone = progress.completedLevels.length === 4;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome SCADA Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                PUESTO DE CONTROL SCADA ACTIVO
              </span>
              <span className="text-xs text-slate-400">
                Albacete • CIFP Aguas Nuevas
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-tech font-bold text-white tracking-wide">
              PANEL DE CONTROL DE MONTAJE EÓLICO
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Bienvenido/a, <strong className="text-cyan-300">{progress.student.name}</strong> ({progress.student.roleTitle}). 
              Gestiona los recursos técnicos, supervisa la calidad según normativa y completa los 4 retos para certificar la obra.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {onOpenCalculator && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenCalculator();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 shadow-sm transition-all hover:scale-102"
                title="Abrir Calculadora y Formulario de Física Eólica y Presupuesto"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Calculadora Fórmulas</span>
              </button>
            )}
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenManual();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 shadow-sm transition-all hover:scale-102"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Manual Paraninfo</span>
            </button>
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenAchievements();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800 shadow-sm transition-all hover:scale-102"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Ver Medallas</span>
            </button>
          </div>
        </div>

        {/* Global Progress Gauge */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Puntuación Total</span>
            <span className="text-lg font-tech font-bold text-white">{progress.score.toLocaleString('es-ES')} pts</span>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Presupuesto Ejecución</span>
            <span className="text-lg font-mono font-bold text-emerald-400">{progress.budget.toLocaleString('es-ES')} €</span>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Retos Superados</span>
            <span className="text-lg font-tech font-bold text-cyan-400">{progress.completedLevels.length} de 4</span>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Vidas de Seguridad</span>
            <span className="text-lg font-mono font-bold text-rose-400">{progress.safetyLives} / 3 Vidas</span>
          </div>
        </div>
      </div>

      {/* 4 Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {levelsConfig.map((lvl) => {
          const isCompleted = progress.completedLevels.includes(lvl.level);
          const isUnlocked = lvl.level === 1 || progress.completedLevels.includes(lvl.level - 1);
          const isCurrent = progress.currentLevel === lvl.level;

          return (
            <div
              key={lvl.level}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden shadow-xl ${
                isCompleted
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-emerald-950/20'
                  : isUnlocked
                  ? 'bg-slate-900 border-slate-700/80 hover:border-cyan-500/60 hover:shadow-cyan-950/30'
                  : 'bg-slate-950/50 border-slate-800/80 opacity-60'
              }`}
            >
              <div>
                {/* Level Tag & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {lvl.tag}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-400">{lvl.duration}</span>
                    {isCompleted && (
                      <span className="ml-1.5 inline-flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completado</span>
                      </span>
                    )}
                    {!isUnlocked && (
                      <span className="ml-1.5 inline-flex items-center gap-1 text-slate-500 font-medium">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Bloqueado</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Level Title & Icon */}
                <div className="flex items-start gap-3.5 mb-2">
                  <div className={`p-3 rounded-xl shrink-0 ${
                    isCompleted ? 'bg-emerald-950/70 border border-emerald-800' : 'bg-slate-950 border border-slate-800'
                  }`}>
                    {lvl.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-tech font-bold text-white leading-tight">
                      {lvl.title}
                    </h3>
                    <div className="text-xs text-cyan-400 font-medium mt-0.5">
                      {lvl.subtitle}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {lvl.desc}
                </p>
              </div>

              {/* Action Buttons & Rewards */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="text-[11px] font-mono text-slate-400">
                  <span className="text-emerald-400 font-bold">{lvl.pointsReward}</span> • <span>{lvl.budgetReward}</span>
                </div>

                {isUnlocked ? (
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onStartLevel(lvl.level);
                    }}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-tech font-bold transition-all ${
                      isCompleted
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-md shadow-cyan-500/20 hover:scale-102'
                    }`}
                  >
                    <span>{isCompleted ? 'Repetir Reto' : 'Entrar al Reto'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Requiere nivel previo</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Mission Call to Action */}
      {allLevelsDone && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border-2 border-emerald-500/80 rounded-2xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500 text-slate-950 rounded-2xl shadow-lg shadow-emerald-500/30">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-tech font-bold text-white">
                ¡MISIÓN DE MONTAJE EÓLICO COMPLETADA CON ÉXITO!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Has validado los 4 retos técnicos de la Unidad 2 y Unidad 1. Emite ahora tu Certificado Oficial de Montaje y el Informe Didáctico.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playLevelUp();
              onFinishGame();
            }}
            className="px-6 py-3 rounded-xl font-tech font-bold text-sm bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
          >
            VER INFORME DE MISIÓN Y CERTIFICADO
          </button>
        </div>
      )}
    </div>
  );
};
