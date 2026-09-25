import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Clock, 
  Wrench, 
  AlertOctagon, 
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Calculator,
  Compass,
  Info
} from 'lucide-react';
import { U1_COMPONENTS, RETO1_QUESTIONS } from '../../data/challengesData';
import { AerogeneratorComponent, InspectionQuestion, AnswerRecord } from '../../types';
import { soundEffects } from '../../utils/audio';

interface Challenge1ReviewU1Props {
  onComplete: (scoreGained: number, budgetDelta: number, records: AnswerRecord[]) => void;
  onDeductLife: () => void;
  onOpenCalculator?: () => void;
}

export const Challenge1ReviewU1: React.FC<Challenge1ReviewU1Props> = ({ 
  onComplete, 
  onDeductLife,
  onOpenCalculator 
}) => {
  const [timeLeft, setTimeLeft] = useState(8 * 60); // 8 minutes = 480s
  const [selectedCompId, setSelectedCompId] = useState<string>(U1_COMPONENTS[0].id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedbackRecord, setFeedbackRecord] = useState<AnswerRecord | null>(null);
  const [accumulatedRecords, setAccumulatedRecords] = useState<AnswerRecord[]>([]);
  const [accumulatedScore, setAccumulatedScore] = useState(0);
  const [accumulatedBudget, setAccumulatedBudget] = useState(0);
  const [inspectedComponents, setInspectedComponents] = useState<string[]>([U1_COMPONENTS[0].id]);

  // Per-challenge 8-minute countdown timer
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

  const activeComp = U1_COMPONENTS.find(c => c.id === selectedCompId) || U1_COMPONENTS[0];
  const currentQ: InspectionQuestion = RETO1_QUESTIONS[currentQuestionIndex];

  const handleSelectComponent = (comp: AerogeneratorComponent) => {
    soundEffects.playClick();
    setSelectedCompId(comp.id);
    if (!inspectedComponents.includes(comp.id)) {
      setInspectedComponents(prev => [...prev, comp.id]);
    }
  };

  const handleAnswerSubmit = (optionId: string) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
    setHasAnswered(true);

    const chosenOption = currentQ.options.find(o => o.id === optionId);
    const isCorrect = !!chosenOption?.isCorrect;

    const scoreDelta = isCorrect ? currentQ.points : 0;
    const budgetDelta = isCorrect ? currentQ.budgetImpact : -20000;

    if (isCorrect) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playError();
      onDeductLife();
    }

    const record: AnswerRecord = {
      id: `ans_${Date.now()}`,
      level: 1,
      questionId: currentQ.id,
      questionTitle: currentQ.title,
      userAnswer: chosenOption?.text || '',
      correctAnswer: currentQ.options.find(o => o.isCorrect)?.text || '',
      isCorrect,
      scoreDelta,
      budgetDelta,
      explanation: currentQ.explanation,
      textbookRef: currentQ.paraninfoPage,
      timestamp: Date.now(),
    };

    setFeedbackRecord(record);
    setAccumulatedRecords(prev => [...prev, record]);
    setAccumulatedScore(prev => prev + scoreDelta);
    setAccumulatedBudget(prev => prev + budgetDelta);
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentQuestionIndex < RETO1_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
      setFeedbackRecord(null);
      // Auto highlight relevant component if applicable
      const nextQ = RETO1_QUESTIONS[currentQuestionIndex + 1];
      const matchingComp = U1_COMPONENTS.find(c => c.id === nextQ.componentId);
      if (matchingComp) {
        setSelectedCompId(matchingComp.id);
        if (!inspectedComponents.includes(matchingComp.id)) {
          setInspectedComponents(prev => [...prev, matchingComp.id]);
        }
      }
    } else {
      // Challenge 1 completed!
      soundEffects.playLevelUp();
      onComplete(accumulatedScore, accumulatedBudget, accumulatedRecords);
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
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-700/80 text-cyan-400">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
                Reto 1 de 4 (U1)
              </span>
              <span className="text-xs text-slate-400">Repaso Técnico Integral & Física Eólica</span>
            </div>
            <h2 className="text-lg sm:text-xl font-tech font-bold text-white tracking-wide">
              CHEQUEO TÉCNICO, ANATOMÍA DEL AEROGENERADOR Y LEY DE BETZ
            </h2>
          </div>
        </div>

        {/* Reto 1 Controls */}
        <div className="flex items-center gap-3">
          {onOpenCalculator && (
            <button
              onClick={() => { soundEffects.playClick(); onOpenCalculator(); }}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700 hover:border-emerald-500 text-emerald-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Calculadora / Formulario</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Tiempo:</span>
            <span className={`font-bold ${timeLeft < 120 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
              {formatMinSec(timeLeft)}
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Control: </span>
            <span className="font-bold text-cyan-400">{currentQuestionIndex + 1}/{RETO1_QUESTIONS.length}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar of 10 Questions */}
      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
        {RETO1_QUESTIONS.map((q, idx) => {
          const isCurrent = idx === currentQuestionIndex;
          const isPassed = idx < currentQuestionIndex;
          const record = accumulatedRecords.find(r => r.questionId === q.id);
          const wasCorrect = record ? record.isCorrect : null;

          return (
            <div
              key={q.id}
              className={`flex-1 min-w-[28px] h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all ${
                isCurrent 
                  ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300 shadow-md shadow-cyan-500/30' 
                  : isPassed 
                    ? wasCorrect 
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/60' 
                      : 'bg-rose-950/80 text-rose-400 border border-rose-700/60'
                    : 'bg-slate-950/60 text-slate-500 border border-slate-800'
              }`}
            >
              {idx + 1}
            </div>
          );
        })}
      </div>

      {/* Main Grid: Interactive Schematic & Technical Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Vector Diagram of Aerogenerator & Subsystems (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-tech font-bold text-white flex items-center gap-1.5">
                <span>DESPIECE TÉCNICO Y COMPONENTES (FIG. 1.38 & 1.43)</span>
              </h3>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800">
                {inspectedComponents.length}/{U1_COMPONENTS.length} Inspeccionados
              </span>
            </div>

            {/* Interactive SVG Diagram */}
            <div className="bg-slate-950 rounded-xl border border-slate-800/80 p-3 relative overflow-hidden flex items-center justify-center">
              <svg 
                viewBox="0 0 340 380" 
                className="w-full max-h-72 select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Grid Accent */}
                <defs>
                  <pattern id="turbGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(56, 189, 248, 0.07)" strokeWidth="1" />
                    <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(56, 189, 248, 0.07)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="340" height="380" fill="url(#turbGrid)" />

                {/* Ground Line */}
                <line x1="20" y1="350" x2="320" y2="350" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />

                {/* Foundation / Virola */}
                <g 
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_virola_cimentacion')!)}
                >
                  <polygon 
                    points="130,350 110,370 230,370 210,350" 
                    fill={selectedCompId === 'comp_virola_cimentacion' ? '#0284c7' : '#1e293b'} 
                    stroke={selectedCompId === 'comp_virola_cimentacion' ? '#38bdf8' : '#64748b'} 
                    strokeWidth="2" 
                  />
                  <rect 
                    x="150" 
                    y="335" 
                    width="40" 
                    height="15" 
                    fill={selectedCompId === 'comp_virola_cimentacion' ? '#0ea5e9' : '#334155'} 
                    stroke={selectedCompId === 'comp_virola_cimentacion' ? '#7dd3fc' : '#94a3b8'} 
                    strokeWidth="1.5"
                  />
                  <text x="170" y="363" fill="#cbd5e1" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                    ZAPATA Y VIROLA
                  </text>
                </g>

                {/* Tubular Tower */}
                <g>
                  {/* Lower Tower with MV Switchgear */}
                  <polygon 
                    points="152,335 158,230 182,230 188,335" 
                    fill="#1e293b" 
                    stroke="#475569" 
                    strokeWidth="1.5" 
                  />
                  {/* MV Switchgear click target inside tower base */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_celdas_mt')!)}
                  >
                    <rect 
                      x="160" 
                      y="290" 
                      width="20" 
                      height="35" 
                      rx="2"
                      fill={selectedCompId === 'comp_celdas_mt' ? '#8b5cf6' : '#0f172a'} 
                      stroke={selectedCompId === 'comp_celdas_mt' ? '#c084fc' : '#64748b'} 
                      strokeWidth="1.5" 
                    />
                    <text x="170" y="312" fill="#e2e8f0" fontSize="7" fontWeight="bold" textAnchor="middle">
                      20 kV
                    </text>
                  </g>

                  {/* Upper Tower */}
                  <polygon 
                    points="158,230 162,120 178,120 182,230" 
                    fill="#334155" 
                    stroke="#64748b" 
                    strokeWidth="1.5" 
                  />
                </g>

                {/* Yaw Ring (Corona de orientación) */}
                <g 
                  className="cursor-pointer"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_gondola')!)}
                >
                  <rect 
                    x="160" 
                    y="114" 
                    width="20" 
                    height="6" 
                    fill="#38bdf8" 
                    stroke="#0284c7" 
                    strokeWidth="1" 
                  />
                </g>

                {/* Gondola / Nacelle Body */}
                <g 
                  className="cursor-pointer transition-all"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_gondola')!)}
                >
                  <path 
                    d="M 120 85 L 215 85 Q 230 85 230 100 L 230 114 Q 215 116 150 116 L 120 114 Z" 
                    fill={selectedCompId === 'comp_gondola' ? '#0369a1' : '#1e293b'} 
                    stroke={selectedCompId === 'comp_gondola' ? '#38bdf8' : '#94a3b8'} 
                    strokeWidth="2" 
                  />
                  {/* Anemometer & Wind Vane on rear top */}
                  <line x1="215" y1="85" x2="215" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
                  <circle cx="215" cy="70" r="3" fill="#38bdf8" />
                  <line x1="205" y1="85" x2="205" y2="73" stroke="#94a3b8" strokeWidth="1.5" />
                  <polygon points="205,73 200,77 210,77" fill="#38bdf8" />
                </g>

                {/* Multiplicadora (Gearbox) inside Nacelle */}
                <g 
                  className="cursor-pointer"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_multiplicadora')!)}
                >
                  <rect 
                    x="140" 
                    y="90" 
                    width="22" 
                    height="20" 
                    rx="2"
                    fill={selectedCompId === 'comp_multiplicadora' ? '#f59e0b' : '#334155'} 
                    stroke={selectedCompId === 'comp_multiplicadora' ? '#fbbf24' : '#64748b'} 
                    strokeWidth="1.5" 
                  />
                  <text x="151" y="103" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">
                    MULT
                  </text>
                </g>

                {/* Brake Disc on High Speed Shaft */}
                <g 
                  className="cursor-pointer"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_freno_disco')!)}
                >
                  <rect 
                    x="164" 
                    y="91" 
                    width="6" 
                    height="18" 
                    fill={selectedCompId === 'comp_freno_disco' ? '#ef4444' : '#64748b'} 
                    stroke={selectedCompId === 'comp_freno_disco' ? '#fca5a5' : '#475569'} 
                    strokeWidth="1" 
                  />
                </g>

                {/* Generator inside Nacelle */}
                <g 
                  className="cursor-pointer"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_generador')!)}
                >
                  <rect 
                    x="173" 
                    y="90" 
                    width="26" 
                    height="20" 
                    rx="3"
                    fill={selectedCompId === 'comp_generador' ? '#10b981' : '#334155'} 
                    stroke={selectedCompId === 'comp_generador' ? '#34d399' : '#64748b'} 
                    strokeWidth="1.5" 
                  />
                  <text x="186" y="103" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                    GEN
                  </text>
                </g>

                {/* Rotor Hub (Buje) & Pitch */}
                <g 
                  className="cursor-pointer"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_buje_pitch')!)}
                >
                  <path 
                    d="M 120 88 C 103 92 103 108 120 112 Z" 
                    fill={selectedCompId === 'comp_buje_pitch' ? '#e11d48' : '#475569'} 
                    stroke={selectedCompId === 'comp_buje_pitch' ? '#fb7185' : '#cbd5e1'} 
                    strokeWidth="2" 
                  />
                  <circle cx="112" cy="100" r="4.5" fill="#f43f5e" />
                </g>

                {/* Rotor Blades (3 Palas) */}
                <g 
                  className="cursor-pointer"
                  onClick={() => handleSelectComponent(U1_COMPONENTS.find(c => c.id === 'comp_palas_rotor')!)}
                >
                  {/* Blade 1 (pointing up) */}
                  <path 
                    d="M 112 96 C 108 50 110 15 112 10 C 114 15 118 50 116 96 Z" 
                    fill={selectedCompId === 'comp_palas_rotor' ? '#06b6d4' : '#f8fafc'} 
                    stroke="#94a3b8" 
                    strokeWidth="1.2" 
                  />
                  {/* Tip Lightning Receptor */}
                  <circle cx="112" cy="10" r="1.5" fill="#eab308" />

                  {/* Blade 2 (pointing down-left) */}
                  <path 
                    d="M 110 102 C 80 135 50 170 42 185 C 48 180 75 145 112 105 Z" 
                    fill={selectedCompId === 'comp_palas_rotor' ? '#06b6d4' : '#f8fafc'} 
                    stroke="#94a3b8" 
                    strokeWidth="1.2" 
                  />
                  <circle cx="42" cy="185" r="1.5" fill="#eab308" />

                  {/* Blade 3 (pointing down-right) */}
                  <path 
                    d="M 114 104 C 130 145 155 180 162 195 C 158 185 135 145 116 102 Z" 
                    fill={selectedCompId === 'comp_palas_rotor' ? '#06b6d4' : '#e2e8f0'} 
                    stroke="#94a3b8" 
                    strokeWidth="1.2" 
                  />
                  <circle cx="162" cy="195" r="1.5" fill="#eab308" />
                </g>
              </svg>
            </div>

            {/* Component Quick Selector Chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {U1_COMPONENTS.map(c => {
                const isSelected = c.id === selectedCompId;
                const isInspected = inspectedComponents.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectComponent(c)}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-mono transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-bold ring-1 ring-cyan-300'
                        : isInspected
                          ? 'bg-slate-800 text-slate-300 hover:text-white'
                          : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    <span>{c.name.split(' ')[0]}</span>
                    {isInspected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Component Spec Sheet Card */}
          <div className="mt-4 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="font-tech font-bold text-white uppercase tracking-wider">
                {activeComp.name}
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded">
                Ref: {activeComp.paraninfoRef}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-[11px]">
              {activeComp.technicalSpec}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-900">
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span className="text-emerald-400 font-semibold block text-[10px] uppercase">
                  Punto de Inspección:
                </span>
                <span className="text-slate-300 text-[10px] leading-tight block mt-0.5">
                  {activeComp.inspectionCheck}
                </span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                <span className="text-amber-400 font-semibold block text-[10px] uppercase">
                  Defecto Crítico Típico:
                </span>
                <span className="text-slate-300 text-[10px] leading-tight block mt-0.5">
                  {activeComp.commonDefect}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Question Prompt & Validation Form (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            
            {/* Question Header & Category */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded font-mono text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Control #{currentQuestionIndex + 1} de {RETO1_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {currentQ.questionType === 'parameter-calc' ? 'Cálculo Físico' : currentQ.questionType === 'defect-diagnostics' ? 'Diagnóstico Operativo' : 'Teoría de Componentes'}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-emerald-400 font-bold">+{currentQ.points} pts</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-300 font-bold">+{currentQ.budgetImpact.toLocaleString('es-ES')} €</span>
              </div>
            </div>

            {/* Question Title & Prompt */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
              <h3 className="text-base sm:text-lg font-tech font-bold text-white tracking-wide">
                {currentQ.title}
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                {currentQ.prompt}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {currentQ.options.map(option => {
                const isSelected = selectedOptionId === option.id;
                let btnClass = 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-200';

                if (hasAnswered) {
                  if (option.isCorrect) {
                    btnClass = 'bg-emerald-950/80 border-emerald-500 text-white font-medium ring-1 ring-emerald-400';
                  } else if (isSelected && !option.isCorrect) {
                    btnClass = 'bg-rose-950/80 border-rose-500 text-white ring-1 ring-rose-400';
                  } else {
                    btnClass = 'bg-slate-950/30 border-slate-800/50 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  btnClass = 'bg-cyan-950 border-cyan-400 text-white';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSubmit(option.id)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 text-xs sm:text-sm ${btnClass}`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 ${
                      hasAnswered && option.isCorrect
                        ? 'bg-emerald-500 text-slate-950'
                        : hasAnswered && isSelected && !option.isCorrect
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                    }`}>
                      {option.id.toUpperCase()}
                    </div>
                    <span className="flex-1 leading-relaxed">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Technical Explanation / Feedback Card */}
            {hasAnswered && feedbackRecord && (
              <div className={`p-4 rounded-xl border animate-fadeIn space-y-2 ${
                feedbackRecord.isCorrect
                  ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-700/60 text-rose-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-tech font-bold text-sm">
                    {feedbackRecord.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>¡VERIFICACIÓN TÉCNICA CORRECTA!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-400" />
                        <span>DISCREPANCIA TÉCNICA (-1 VIDA • SANCION -20.000 €)</span>
                      </>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                    Paraninfo {currentQ.paraninfoPage}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Criterio técnico evaluado según el temario oficial del CIFP Aguas Nuevas.</span>
            </div>

            {hasAnswered && (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <span>{currentQuestionIndex < RETO1_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Reto 1'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
