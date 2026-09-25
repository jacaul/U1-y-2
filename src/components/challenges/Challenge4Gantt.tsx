import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowUp, 
  ArrowDown, 
  AlertTriangle, 
  Layers, 
  Play, 
  RotateCcw,
  Sparkles,
  Info,
  Check,
  ChevronRight,
  HardHat,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { GANTT_TASKS_POOL, ON_SITE_DILEMMAS } from '../../data/challengesData';
import { GanttTask, AnswerRecord, OnSiteDilemma } from '../../types';
import { soundEffects } from '../../utils/audio';

interface Challenge4GanttProps {
  onComplete: (scoreGained: number, budgetDelta: number, records: AnswerRecord[]) => void;
  onDeductLife: () => void;
}

export const Challenge4Gantt: React.FC<Challenge4GanttProps> = ({ onComplete, onDeductLife }) => {
  const [timeLeft, setTimeLeft] = useState(13 * 60); // 13 minutes = 780s
  const [stage, setStage] = useState<'gantt_puzzle' | 'site_dilemmas'>('gantt_puzzle');

  // Initially shuffle tasks slightly so student has to organize the critical path
  const [tasks, setTasks] = useState<GanttTask[]>(() => {
    const arr = [...GANTT_TASKS_POOL];
    const swapped = [...arr];
    [swapped[1], swapped[3]] = [swapped[3], swapped[1]];
    [swapped[4], swapped[6]] = [swapped[6], swapped[4]];
    [swapped[7], swapped[8]] = [swapped[8], swapped[7]];
    return swapped;
  });

  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    errorsCount: number;
    brokenDependencies: { taskName: string; missingPredecessor: string }[];
    isPerfect: boolean;
  } | null>(null);

  const [viewMode, setViewMode] = useState<'puzzle' | 'gantt_preview'>('puzzle');
  const [score, setScore] = useState(0);
  const [budget, setBudget] = useState(0);
  const [accumulatedRecords, setAccumulatedRecords] = useState<AnswerRecord[]>([]);

  // Dilemmas Phase State
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState(0);
  const [selectedDilemmaOption, setSelectedDilemmaOption] = useState<string | null>(null);
  const [dilemmaFeedback, setDilemmaFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // 13-minute timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          soundEffects.playWarning();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const moveTask = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= tasks.length) return;
    soundEffects.playClick();
    const updated = [...tasks];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setTasks(updated);
    setValidationResult(null); // Reset test results on edit
  };

  const handleValidateSequence = () => {
    soundEffects.playClick();
    const broken: { taskName: string; missingPredecessor: string }[] = [];
    const placedTaskIds: string[] = [];

    tasks.forEach(task => {
      placedTaskIds.push(task.id);
      task.dependencies.forEach(depId => {
        if (!placedTaskIds.includes(depId)) {
          const depTask = GANTT_TASKS_POOL.find(t => t.id === depId);
          broken.push({
            taskName: `${task.code} (${task.name.split(',')[0]})`,
            missingPredecessor: depTask?.name.split(',')[0] || depId,
          });
        }
      });
    });

    // Also check exact order index matching
    const misplaced = tasks.filter((t, i) => t.correctOrderIndex !== i + 1);
    const isPerfect = broken.length === 0 && misplaced.length === 0;

    if (isPerfect) {
      soundEffects.playLevelUp();
      const scoreDelta = 600;
      const budgetDelta = 35000;
      setScore(prev => prev + scoreDelta);
      setBudget(prev => prev + budgetDelta);

      const record: AnswerRecord = {
        id: `gantt_${Date.now()}`,
        level: 4,
        questionId: 'gantt_critical_path',
        questionTitle: 'Ruta Crítica y Secuencia de Montaje Eólico',
        userAnswer: 'Secuencia óptima 100% verificada sin rotura de precedencias',
        correctAnswer: 'Secuencia normalizada según Figuras 2.25 y 2.26 del libro Paraninfo',
        isCorrect: true,
        scoreDelta,
        budgetDelta,
        explanation: 'Excelente planificación. Todas las precedencias físicas y administrativas se cumplen: viales antes de cimentaciones, curado de hormigón antes de izado de torre, y rotor ensamblado en suelo antes de izado a barquilla.',
        textbookRef: 'Págs. 131-138 (Figuras 2.25 y 2.26)',
        timestamp: Date.now(),
      };

      setAccumulatedRecords(prev => [...prev, record]);
      setValidationResult({
        tested: true,
        errorsCount: 0,
        brokenDependencies: [],
        isPerfect: true,
      });

      // Transition to Stage 2: Dilemmas
      setTimeout(() => {
        setStage('site_dilemmas');
      }, 1500);
    } else {
      soundEffects.playError();
      onDeductLife();
      setValidationResult({
        tested: true,
        errorsCount: broken.length + misplaced.length,
        brokenDependencies: broken,
        isPerfect: false,
      });
    }
  };

  const handleAutoSolve = () => {
    soundEffects.playClick();
    const sorted = [...GANTT_TASKS_POOL].sort((a, b) => a.correctOrderIndex - b.correctOrderIndex);
    setTasks(sorted);
    setValidationResult(null);
  };

  // Dilemma Handlers
  const currentDilemma: OnSiteDilemma = ON_SITE_DILEMMAS[currentDilemmaIndex];

  const handleDilemmaOption = (optionId: string) => {
    if (dilemmaFeedback) return;
    setSelectedDilemmaOption(optionId);

    const chosen = currentDilemma.options.find(o => o.id === optionId);
    const isCorrect = !!chosen?.isCorrect;

    const scoreDelta = isCorrect ? 250 : 0;
    const budgetDelta = chosen ? chosen.budgetCost : -30000;

    if (isCorrect) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playError();
      onDeductLife();
    }

    setScore(prev => prev + scoreDelta);
    setBudget(prev => prev + budgetDelta);

    const record: AnswerRecord = {
      id: `dil_${Date.now()}`,
      level: 4,
      questionId: currentDilemma.id,
      questionTitle: currentDilemma.title,
      userAnswer: chosen?.text || '',
      correctAnswer: currentDilemma.options.find(o => o.isCorrect)?.text || '',
      isCorrect,
      scoreDelta,
      budgetDelta,
      explanation: currentDilemma.explanation,
      textbookRef: currentDilemma.paraninfoRef,
      timestamp: Date.now(),
    };

    setAccumulatedRecords(prev => [...prev, record]);
    setDilemmaFeedback({
      isCorrect,
      text: chosen?.consequenceText || currentDilemma.explanation,
    });
  };

  const handleNextDilemma = () => {
    soundEffects.playClick();
    setSelectedDilemmaOption(null);
    setDilemmaFeedback(null);

    if (currentDilemmaIndex < ON_SITE_DILEMMAS.length - 1) {
      setCurrentDilemmaIndex(prev => prev + 1);
    } else {
      // Completed Challenge 4!
      soundEffects.playLevelUp();
      onComplete(score, budget, accumulatedRecords);
    }
  };

  const formatMinSec = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Reto Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-700/80 text-amber-400">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800 uppercase">
                Reto 4 de 4 (U2)
              </span>
              <span className="text-xs text-slate-400">Ruta Crítica, Precedencias y Dilemas de Seguridad en Obra</span>
            </div>
            <h2 className="text-lg sm:text-xl font-tech font-bold text-white tracking-wide">
              {stage === 'gantt_puzzle' ? 'PLANIFICACIÓN DEL MONTAJE Y DIAGRAMA DE GANTT' : 'FASE 2: RESOLUCIÓN DE INCIDENCIAS CRÍTICAS DE OBRA Y 5 REGLAS DE ORO'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Tiempo:</span>
            <span className={`font-bold ${timeLeft < 180 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
              {formatMinSec(timeLeft)}
            </span>
          </div>

          {stage === 'gantt_puzzle' && (
            <button
              onClick={() => setViewMode(prev => prev === 'puzzle' ? 'gantt_preview' : 'puzzle')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              {viewMode === 'puzzle' ? 'Ver Diagrama Gantt' : 'Volver a Ordenar Tareas'}
            </button>
          )}

          {stage === 'site_dilemmas' && (
            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Incidencia: </span>
              <span className="font-bold text-amber-400">{currentDilemmaIndex + 1}/{ON_SITE_DILEMMAS.length}</span>
            </div>
          )}
        </div>
      </div>

      {stage === 'gantt_puzzle' ? (
        <>
          {/* Instructions & Help */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex items-start justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-200 font-medium mb-1">
                  Mecánica de Ruta Crítica (Págs. 131-138 del libro Paraninfo):
                </p>
                <p>
                  Usa los botones <span className="text-white font-mono">▲ Subir</span> y <span className="text-white font-mono">▼ Bajar</span> para ordenar las 12 actividades clave de obra. Si una tarea se inicia antes de que sus dependencias físicas precedentes estén terminadas, el simulador penalizará el presupuesto con sobrecostes de replanificación.
                </p>
              </div>
            </div>

            <button
              onClick={handleAutoSolve}
              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded text-[11px] border border-slate-800 shrink-0 transition-colors"
            >
              Ayuda de Secuencia
            </button>
          </div>

          {/* Validation Feedback Banner */}
          {validationResult && (
            <div className={`p-4 rounded-xl border animate-fadeIn ${
              validationResult.isPerfect
                ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                : 'bg-rose-950/60 border-rose-700 text-rose-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-tech font-bold text-sm">
                  {validationResult.isPerfect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>¡CRONOGRAMA Y RUTA CRÍTICA VALIDADOS AL 100%! (+600 PTS)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span>ROTURA DE PRECEDENCIAS EN EL CRONOGRAMA ({validationResult.errorsCount} DISCREPANCIAS)</span>
                    </>
                  )}
                </div>
              </div>

              {!validationResult.isPerfect && validationResult.brokenDependencies.length > 0 && (
                <div className="space-y-1.5 text-xs text-slate-300 mt-2">
                  <span className="font-semibold text-rose-300 block">Conflictos de precedencia detectados:</span>
                  <ul className="list-disc list-inside space-y-1 text-[11px]">
                    {validationResult.brokenDependencies.map((b, i) => (
                      <li key={i}>
                        <span className="text-white font-bold">{b.taskName}</span> requiere haber completado previamente: <span className="text-amber-300 font-bold">{b.missingPredecessor}</span>.
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* View Mode 1: Interactive Ordering Puzzle */}
          {viewMode === 'puzzle' ? (
            <div className="space-y-2.5">
              {tasks.map((task, index) => {
                const isCorrectPosition = task.correctOrderIndex === index + 1;
                return (
                  <div
                    key={task.id}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      validationResult?.tested
                        ? isCorrectPosition
                          ? 'bg-emerald-950/20 border-emerald-800/80 text-emerald-100'
                          : 'bg-rose-950/20 border-rose-800/80 text-rose-100'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-amber-400 shrink-0">
                        #{index + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                            {task.code}
                          </span>
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                            task.isCriticalPath ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-slate-950 text-slate-400 border border-slate-800'
                          }`}>
                            {task.isCriticalPath ? 'Ruta Crítica' : 'Holgura'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Duración: {task.durationWeeks} sem.
                          </span>
                        </div>

                        <h4 className="text-xs sm:text-sm font-semibold text-white">
                          {task.name}
                        </h4>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400">
                          <span>🛠️ {task.resourceRequired}</span>
                          <span>⚠️ {task.safetyRisk}</span>
                        </div>
                      </div>
                    </div>

                    {/* Up / Down Controls */}
                    <div className="flex flex-col sm:flex-row items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => moveTask(index, index - 1)}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-950 text-slate-300 border border-slate-800 transition-colors"
                        title="Subir tarea"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveTask(index, index + 1)}
                        disabled={index === tasks.length - 1}
                        className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-950 text-slate-300 border border-slate-800 transition-colors"
                        title="Bajar tarea"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* View Mode 2: Gantt Chart 12-Month Timeline Preview */
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 overflow-x-auto shadow-xl">
              <div className="min-w-[700px] space-y-3">
                <div className="grid grid-cols-12 text-xs font-mono text-slate-400 border-b border-slate-800 pb-2 text-center">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="border-r border-slate-800/60 last:border-none">
                      Mes {i + 1}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {tasks.map((task, i) => {
                    // Approximate month span based on order index
                    const startMonth = Math.min(11, Math.floor((i / tasks.length) * 10));
                    const spanMonths = Math.max(1, Math.min(3, Math.ceil(task.durationWeeks / 2)));
                    return (
                      <div key={task.id} className="grid grid-cols-12 items-center py-1">
                        <div className="col-span-12 relative h-8 bg-slate-950/60 rounded border border-slate-800/80 flex items-center px-2">
                          <div 
                            className={`absolute h-6 rounded px-2 flex items-center text-[10px] font-mono font-bold truncate text-white shadow ${
                              task.isCriticalPath 
                                ? 'bg-amber-600/90 border border-amber-400' 
                                : 'bg-sky-600/80 border border-sky-400'
                            }`}
                            style={{
                              left: `${(startMonth / 12) * 100}%`,
                              width: `${(spanMonths / 12) * 100}%`,
                            }}
                          >
                            {task.code}: {task.name.substring(0, 30)}...
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Validation Action Button */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleValidateSequence}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Verificar Ruta Crítica y Validar Precedencias</span>
            </button>
          </div>
        </>
      ) : (
        /* FASE 2: RESOLUCIÓN DE INCIDENCIAS CRÍTICAS DE OBRA */
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800">
                  Incidencia de Obra #{currentDilemmaIndex + 1} de {ON_SITE_DILEMMAS.length}
                </span>
                <span className="text-slate-400 font-medium">
                  Ubicación: {currentDilemma.location}
                </span>
              </div>
              <span className="font-mono text-slate-400 text-xs">
                Ref: {currentDilemma.paraninfoRef}
              </span>
            </div>

            <div className="p-5 bg-slate-950/90 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-tech font-bold text-base sm:text-lg">
                <HardHat className="w-5 h-5 shrink-0" />
                <h3>{currentDilemma.title}</h3>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed pt-1">
                {currentDilemma.scenario}
              </p>
            </div>

            {/* Dilemma Options */}
            <div className="space-y-3">
              {currentDilemma.options.map(opt => {
                const isSelected = selectedDilemmaOption === opt.id;
                let btnStyle = 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-200';

                if (dilemmaFeedback) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-white font-medium ring-1 ring-emerald-400';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-white ring-1 ring-rose-400';
                  } else {
                    btnStyle = 'bg-slate-950/30 border-slate-800/40 text-slate-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleDilemmaOption(opt.id)}
                    disabled={!!dilemmaFeedback}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${btnStyle}`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 ${
                      dilemmaFeedback && opt.isCorrect
                        ? 'bg-emerald-500 text-slate-950'
                        : dilemmaFeedback && isSelected && !opt.isCorrect
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                    }`}>
                      {opt.id.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <span>{opt.text}</span>
                      {opt.budgetCost !== 0 && (
                        <span className="block text-[11px] font-mono text-slate-400 mt-1">
                          Impacto presupuestario: {opt.budgetCost.toLocaleString('es-ES')} €
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback Box */}
            {dilemmaFeedback && (
              <div className={`p-4 rounded-xl border animate-fadeIn space-y-1.5 ${
                dilemmaFeedback.isCorrect 
                  ? 'bg-emerald-950/50 border-emerald-700 text-emerald-200' 
                  : 'bg-rose-950/50 border-rose-700 text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-tech font-bold text-sm">
                  {dilemmaFeedback.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>¡DECISIÓN TÉCNICA APROBADA POR LA DIRECCIÓN FACULTATIVA! (+250 PTS)</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-5 h-5 text-rose-400" />
                      <span>INFRACCIÓN DE OBRA / SEGURIDAD (-1 VIDA)</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {dilemmaFeedback.text}
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Referencia técnica: {currentDilemma.explanation} ({currentDilemma.paraninfoRef})
                </div>
              </div>
            )}

            {/* Next Dilemma Button */}
            {dilemmaFeedback && (
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={handleNextDilemma}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <span>{currentDilemmaIndex < ON_SITE_DILEMMAS.length - 1 ? 'Siguiente Incidencia' : 'Finalizar Misión de Montaje'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
