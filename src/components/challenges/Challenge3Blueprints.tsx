import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ZoomIn, 
  MapPin, 
  ArrowRight, 
  Info,
  Maximize2,
  Zap,
  Layers,
  ChevronRight,
  Eye
} from 'lucide-react';
import { BLUEPRINT_HOTSPOTS } from '../../data/challengesData';
import { BlueprintHotspot, AnswerRecord } from '../../types';
import { soundEffects } from '../../utils/audio';

interface Challenge3BlueprintsProps {
  onComplete: (scoreGained: number, budgetDelta: number, records: AnswerRecord[]) => void;
  onDeductLife: () => void;
}

export const Challenge3Blueprints: React.FC<Challenge3BlueprintsProps> = ({ onComplete, onDeductLife }) => {
  const [timeLeft, setTimeLeft] = useState(12 * 60); // 12 minutes
  const [activeBlueprint, setActiveBlueprint] = useState<'plataforma_montaje' | 'seccion_zanja_mt' | 'unifilar_subestacion'>('plataforma_montaje');
  const [currentHotspotIndex, setCurrentHotspotIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedbackRecord, setFeedbackRecord] = useState<AnswerRecord | null>(null);
  const [accumulatedRecords, setAccumulatedRecords] = useState<AnswerRecord[]>([]);
  const [score, setScore] = useState(0);
  const [budget, setBudget] = useState(0);

  // Countdown timer
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

  const currentHotspot = BLUEPRINT_HOTSPOTS[currentHotspotIndex];

  // Auto-sync active blueprint tab with current hotspot blueprint
  useEffect(() => {
    if (currentHotspot && currentHotspot.blueprintType !== activeBlueprint) {
      if (currentHotspot.blueprintType === 'cimentacion_virola') {
        setActiveBlueprint('plataforma_montaje');
      } else {
        setActiveBlueprint(currentHotspot.blueprintType as 'plataforma_montaje' | 'seccion_zanja_mt' | 'unifilar_subestacion');
      }
    }
  }, [currentHotspotIndex]);

  const handleSelectHotspot = (index: number) => {
    soundEffects.playClick();
    setCurrentHotspotIndex(index);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setFeedbackRecord(null);
  };

  const handleOptionSelect = (optionId: string) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
    setHasAnswered(true);

    const chosenOption = currentHotspot.question.options.find(o => o.id === optionId);
    const isCorrect = !!chosenOption?.isCorrect;

    const scoreDelta = isCorrect ? 300 : 0;
    const budgetDelta = isCorrect ? 15000 : -25000;

    if (isCorrect) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playError();
      onDeductLife();
    }

    const record: AnswerRecord = {
      id: `bp_${Date.now()}`,
      level: 3,
      questionId: currentHotspot.id,
      questionTitle: currentHotspot.title,
      userAnswer: chosenOption?.text || '',
      correctAnswer: currentHotspot.question.options.find(o => o.isCorrect)?.text || '',
      isCorrect,
      scoreDelta,
      budgetDelta,
      explanation: currentHotspot.question.correctExplanation,
      textbookRef: currentHotspot.question.bookFigureRef,
      timestamp: Date.now(),
    };

    setFeedbackRecord(record);
    setAccumulatedRecords(prev => [...prev, record]);
    setScore(prev => prev + scoreDelta);
    setBudget(prev => prev + budgetDelta);
  };

  const handleNext = () => {
    soundEffects.playClick();
    if (currentHotspotIndex < BLUEPRINT_HOTSPOTS.length - 1) {
      setCurrentHotspotIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
      setFeedbackRecord(null);
    } else {
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
          <div className="p-2.5 rounded-xl bg-teal-950/80 border border-teal-700/80 text-teal-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-950 text-teal-400 border border-teal-800 uppercase">
                Reto 3 de 4 (U2)
              </span>
              <span className="text-xs text-slate-400">Interpretación Técnica de Planos</span>
            </div>
            <h2 className="text-lg sm:text-xl font-tech font-bold text-white tracking-wide">
              INTERPRETACIÓN DE PLANOS, VIALES Y LAYOUT
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Tiempo Reto 3:</span>
            <span className={`font-bold ${timeLeft < 180 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
              {formatMinSec(timeLeft)}
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Puntos de Control: </span>
            <span className="font-bold text-teal-400">{currentHotspotIndex + 1}/{BLUEPRINT_HOTSPOTS.length}</span>
          </div>
        </div>
      </div>

      {/* Blueprint Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveBlueprint('plataforma_montaje');
          }}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
            activeBlueprint === 'plataforma_montaje'
              ? 'bg-teal-950 text-teal-300 border-teal-600 shadow-sm'
              : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Plano 2.3: Plataforma de Montaje y Grúas</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveBlueprint('seccion_zanja_mt');
          }}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
            activeBlueprint === 'seccion_zanja_mt'
              ? 'bg-teal-950 text-teal-300 border-teal-600 shadow-sm'
              : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Plano 2.5: Secciones de Viales y Zanjas MT</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveBlueprint('unifilar_subestacion');
          }}
          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
            activeBlueprint === 'unifilar_subestacion'
              ? 'bg-teal-950 text-teal-300 border-teal-600 shadow-sm'
              : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Plano 2.33: Esquema Unifilar Subestación 132/20 kV</span>
        </button>
      </div>

      {/* Main Grid: Blueprint Interactive Canvas + Hotspot Query */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Vector Blueprint (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>VISOR TÉCNICO CAD / SVG INTERACTIVO</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Escala Técnica Normalizada • Paraninfo
              </span>
            </div>

            {/* Blueprint Vector Viewer */}
            <div className="relative w-full aspect-[16/10] bg-blueprint-grid rounded-xl border border-sky-900/60 overflow-hidden shadow-inner flex items-center justify-center p-2">
              {/* VIEW 1: Plataforma para montaje de aerogeneradores (Figura 2.3) */}
              {activeBlueprint === 'plataforma_montaje' && (
                <svg 
                  viewBox="0 0 700 420" 
                  className="w-full h-full select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer Border / Title Block */}
                  <rect x="5" y="5" width="690" height="410" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.6" />
                  
                  {/* Vial de Acceso (Top) */}
                  <g>
                    <path d="M 30 110 L 670 110" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
                    <rect x="30" y="80" width="640" height="30" fill="rgba(14, 165, 233, 0.12)" stroke="#0284c7" strokeWidth="1.5" />
                    <text x="350" y="100" fill="#bae6fd" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                      VIAL DE ACCESO (ANCHO 5.00 m) ➔
                    </text>
                    {/* Dimension Arrow 5.00m */}
                    <line x1="500" y1="80" x2="500" y2="110" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="515" y="98" fill="#f59e0b" fontSize="10" fontWeight="bold">5.00 m</text>
                  </g>

                  {/* Curve Radius R=20m indicator */}
                  <path d="M 120 110 Q 150 140 180 140" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="175" y="130" fill="#f59e0b" fontSize="11" fontWeight="bold">R = 20 m</text>

                  {/* Cimentación del Aerogenerador (Octagon / Circle) */}
                  <g>
                    <polygon 
                      points="90,180 140,150 190,180 190,240 140,270 90,240" 
                      fill="rgba(56, 189, 248, 0.2)" 
                      stroke="#38bdf8" 
                      strokeWidth="2" 
                    />
                    <circle cx="140" cy="210" r="35" fill="none" stroke="#bae6fd" strokeWidth="2" />
                    <circle cx="140" cy="210" r="22" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
                    <text x="140" y="214" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                      VIROLA
                    </text>
                    <text x="140" y="290" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Cimentación Aerogenerador
                    </text>
                  </g>

                  {/* Zona Grúa Principal (50.00 m) */}
                  <g>
                    <rect x="220" y="140" width="260" height="150" fill="rgba(30, 41, 59, 0.7)" stroke="#38bdf8" strokeWidth="2" />
                    {/* Tracks / Estabilizadores of Liebherr crane */}
                    <rect x="250" y="180" width="70" height="25" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                    <rect x="350" y="180" width="70" height="25" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                    <text x="350" y="165" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                      ZONA GRÚA PRINCIPAL (50.00 m)
                    </text>
                    <text x="350" y="235" fill="#38bdf8" fontSize="10" textAnchor="middle" fontStyle="italic">
                      Zahorra 95% Proctor • 5 kg/cm² • Pendiente 0%
                    </text>
                    {/* Dimension Line 50.00 */}
                    <line x1="220" y1="130" x2="480" y2="130" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="350" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">50.00 m</text>
                  </g>

                  {/* Zona Montaje de Brazo de Grúa (70.00 x 8.00 m) */}
                  <g>
                    <rect x="490" y="140" width="180" height="50" fill="rgba(14, 165, 233, 0.1)" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="5 3" />
                    <text x="580" y="162" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">
                      ZONA MONTAJE BRAZO
                    </text>
                    <text x="580" y="176" fill="#94a3b8" fontSize="9" textAnchor="middle">
                      (70.00 x 8.00 m)
                    </text>
                  </g>

                  {/* Zona de Descarga y Preparación de Palas (Bottom 55.00 m) */}
                  <g>
                    <rect x="220" y="300" width="450" height="85" fill="rgba(15, 23, 42, 0.6)" stroke="#0284c7" strokeWidth="1.5" />
                    {/* 3 Blades horizontally placed */}
                    <path d="M 230 320 C 350 320 500 322 650 324 L 650 328 C 500 327 350 326 230 324 Z" fill="#e2e8f0" />
                    <path d="M 230 340 C 350 340 500 342 650 344 L 650 348 C 500 347 350 346 230 344 Z" fill="#e2e8f0" />
                    <path d="M 230 360 C 350 360 500 362 650 364 L 650 368 C 500 367 350 366 230 364 Z" fill="#e2e8f0" />
                    <text x="445" y="315" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">
                      ZONA DE DESCARGA Y PREPARACIÓN DE PALAS (2 kg/cm²)
                    </text>
                  </g>
                </svg>
              )}

              {/* VIEW 2: Sección Tipo de Zanja MT y Viales (Figura 2.5) */}
              {activeBlueprint === 'seccion_zanja_mt' && (
                <svg 
                  viewBox="0 0 700 420" 
                  className="w-full h-full select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="5" y="5" width="690" height="410" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.6" />

                  {/* Trench Cutout */}
                  <g transform="translate(180, 40)">
                    {/* Trench walls: 0.64m width, 0.88m depth */}
                    <rect x="50" y="40" width="240" height="280" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <text x="170" y="30" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
                      SECCIÓN TIPO ZANJA MT (ANCHO = 0,64 m)
                    </text>

                    {/* Ground level */}
                    <line x1="0" y1="40" x2="50" y2="40" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="290" y1="40" x2="340" y2="40" stroke="#94a3b8" strokeWidth="2" />

                    {/* Backfill layers */}
                    {/* Layer 1: Top compacted soil */}
                    <rect x="52" y="42" width="236" height="70" fill="rgba(100, 116, 139, 0.3)" />
                    <text x="170" y="70" fill="#94a3b8" fontSize="9" textAnchor="middle">Relleno de tierra compactada</text>

                    {/* Yellow warning tape */}
                    <rect x="60" y="115" width="220" height="10" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
                    <text x="170" y="123" fill="#000000" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                      CINTA SEÑALIZACIÓN ATENCIÓN CABLE DE ALTA TENSIÓN
                    </text>

                    {/* Layer 2: Intermediate compacted backfill */}
                    <rect x="52" y="128" width="236" height="50" fill="rgba(100, 116, 139, 0.2)" />

                    {/* Protective Rigid PVC / Bricks */}
                    <rect x="60" y="180" width="220" height="12" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
                    <text x="170" y="189" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                      PLACAS DE PVC RÍGIDO O LADRILLO CERÁMICO
                    </text>

                    {/* Sand Envelope (185 mm over cables) */}
                    <rect x="52" y="194" width="236" height="90" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
                    <text x="170" y="210" fill="#fcd34d" fontSize="9" textAnchor="middle">
                      Arena fina de río (185 mm de cobertura)
                    </text>

                    {/* Power cables (3 conductors RHZ1-OL) */}
                    <circle cx="110" cy="245" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                    <circle cx="170" cy="245" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                    <circle cx="230" cy="245" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                    <text x="170" y="268" fill="#e2e8f0" fontSize="8" textAnchor="middle" fontWeight="bold">
                      Cables MT RHZ1-OL (20 kV)
                    </text>

                    {/* Sand bed: 10 cm underneath */}
                    <text x="170" y="280" fill="#fcd34d" fontSize="8" textAnchor="middle">
                      Cama de asiento 10 cm
                    </text>

                    {/* Bare Copper Ground Conductor (Red general de tierras) */}
                    <circle cx="170" cy="305" r="6" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
                    <text x="170" y="322" fill="#fdba74" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                      Cable Cu Desnudo (Red General Tierras)
                    </text>

                    {/* Dimensions */}
                    {/* Depth 0.88m */}
                    <line x1="305" y1="40" x2="305" y2="320" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="315" y="185" fill="#f59e0b" fontSize="11" fontWeight="bold">0,88 m</text>
                  </g>
                </svg>
              )}

              {/* VIEW 3: Esquema Unifilar Subestación (Figuras 2.10 y 2.33) */}
              {activeBlueprint === 'unifilar_subestacion' && (
                <svg 
                  viewBox="0 0 700 420" 
                  className="w-full h-full select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="5" y="5" width="690" height="410" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.6" />

                  {/* 132 kV Line Header */}
                  <line x1="50" y1="50" x2="650" y2="50" stroke="#ef4444" strokeWidth="3" />
                  <text x="350" y="40" fill="#fca5a5" fontSize="13" fontWeight="bold" textAnchor="middle">
                    LÍNEA DE EVACUACIÓN ALTA TENSIÓN 132 kV (CONEXIÓN RED REE)
                  </text>

                  {/* Surge arresters (Autoválvulas 120 kV 10 kA) */}
                  <g transform="translate(100, 70)">
                    <rect x="0" y="0" width="30" height="40" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                    <line x1="15" y1="0" x2="15" y2="-20" stroke="#ef4444" strokeWidth="2" />
                    <line x1="15" y1="40" x2="15" y2="55" stroke="#f97316" strokeWidth="2" />
                    <text x="15" y="24" fill="#38bdf8" fontSize="8" textAnchor="middle">MOV</text>
                    <text x="15" y="70" fill="#94a3b8" fontSize="8" textAnchor="middle">Pararrayos</text>
                  </g>

                  {/* Seccionador con PAT (89-TL) */}
                  <g transform="translate(250, 70)">
                    <circle cx="20" cy="10" r="4" fill="#38bdf8" />
                    <line x1="20" y1="-20" x2="20" y2="10" stroke="#ef4444" strokeWidth="2" />
                    <line x1="20" y1="10" x2="35" y2="28" stroke="#38bdf8" strokeWidth="2.5" />
                    <circle cx="20" cy="35" r="4" fill="#38bdf8" />
                    <line x1="20" y1="35" x2="20" y2="55" stroke="#ef4444" strokeWidth="2" />
                    {/* Earth blade */}
                    <line x1="20" y1="35" x2="5" y2="45" stroke="#f97316" strokeWidth="1.5" />
                    <line x1="2" y1="48" x2="8" y2="48" stroke="#f97316" strokeWidth="1.5" />
                    <text x="50" y="25" fill="#f8fafc" fontSize="10" fontWeight="bold">89-TL (PAT)</text>
                    <text x="50" y="38" fill="#94a3b8" fontSize="8">Seccionador</text>
                  </g>

                  {/* Interruptor Automático SF6 (52-L) */}
                  <g transform="translate(250, 150)">
                    <rect x="8" y="0" width="24" height="30" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                    <line x1="20" y1="-25" x2="20" y2="0" stroke="#ef4444" strokeWidth="2" />
                    <line x1="20" y1="30" x2="20" y2="50" stroke="#ef4444" strokeWidth="2" />
                    <line x1="12" y1="6" x2="28" y2="24" stroke="#10b981" strokeWidth="2" />
                    <text x="50" y="16" fill="#10b981" fontSize="10" fontWeight="bold">52-L (SF6)</text>
                    <text x="50" y="28" fill="#94a3b8" fontSize="8">Interruptor AT</text>
                  </g>

                  {/* Transformador de Potencia 25 MVA 132/20 kV */}
                  <g transform="translate(250, 230)">
                    <circle cx="20" cy="20" r="18" fill="none" stroke="#eab308" strokeWidth="2.5" />
                    <circle cx="20" cy="45" r="18" fill="none" stroke="#eab308" strokeWidth="2.5" />
                    <text x="55" y="30" fill="#fef08a" fontSize="11" fontWeight="bold">Trafo Potencia 25 MVA</text>
                    <text x="55" y="44" fill="#94a3b8" fontSize="8.5">Yd11 • 132 / 20 kV (Aceite)</text>
                  </g>

                  {/* Relés de Protección (ANSI Box) */}
                  <g transform="translate(470, 100)">
                    <rect x="0" y="0" width="180" height="150" rx="8" fill="rgba(15, 23, 42, 0.85)" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="90" y="22" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                      CUADROS DE PROTECCIÓN ANSI
                    </text>
                    <line x1="10" y1="30" x2="170" y2="30" stroke="#334155" strokeWidth="1" />
                    
                    <g transform="translate(15, 45)">
                      <circle cx="15" cy="10" r="10" fill="#0284c7" />
                      <text x="15" y="13" fill="#fff" fontSize="7.5" fontWeight="bold" textAnchor="middle">50/51</text>
                      <text x="32" y="13" fill="#e2e8f0" fontSize="8.5">Sobreintensidad Inst/Temp</text>
                    </g>
                    <g transform="translate(15, 72)">
                      <circle cx="15" cy="10" r="10" fill="#0284c7" />
                      <text x="15" y="13" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">87</text>
                      <text x="32" y="13" fill="#e2e8f0" fontSize="8.5">Diferencial Transformador</text>
                    </g>
                    <g transform="translate(15, 99)">
                      <circle cx="15" cy="10" r="10" fill="#0284c7" />
                      <text x="15" y="13" fill="#fff" fontSize="7.5" fontWeight="bold" textAnchor="middle">64N</text>
                      <text x="32" y="13" fill="#e2e8f0" fontSize="8.5">Falta a Tierra Homopolar</text>
                    </g>
                    <g transform="translate(15, 124)">
                      <circle cx="15" cy="10" r="10" fill="#0284c7" />
                      <text x="15" y="13" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">21</text>
                      <text x="32" y="13" fill="#e2e8f0" fontSize="8.5">Protección de Distancia</text>
                    </g>
                  </g>

                  {/* 20 kV Busbar (Bottom) */}
                  <line x1="50" y1="350" x2="650" y2="350" stroke="#06b6d4" strokeWidth="3" />
                  <text x="350" y="375" fill="#a5f3fc" fontSize="12" fontWeight="bold" textAnchor="middle">
                    EMBARRADO DE MEDIA TENSIÓN (20 kV - CELDAS INTERIORES EDIFICIO CONTROL)
                  </text>
                </svg>
              )}
            </div>

            {/* Hotspot Markers Navigation */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 font-mono mr-2">Puntos de control:</span>
              {BLUEPRINT_HOTSPOTS.map((hotspot, idx) => {
                const isCurrent = idx === currentHotspotIndex;
                const isRecorded = accumulatedRecords.some(r => r.questionId === hotspot.id);
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => handleSelectHotspot(idx)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                      isCurrent
                        ? 'bg-teal-500 text-slate-950 border-teal-300 ring-2 ring-teal-400/30'
                        : isRecorded
                        ? 'bg-slate-800 text-emerald-400 border-emerald-700/60'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    #{idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Technical Tip Box */}
          <div className="mt-3 p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-1">
            <div className="font-tech font-bold text-teal-300 flex items-center justify-between">
              <span>{currentHotspot.label}</span>
              <span className="text-[10px] font-mono text-slate-500">{currentHotspot.question.bookFigureRef}</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {currentHotspot.technicalDescription}
            </p>
          </div>
        </div>

        {/* Right: Technical Layout Question & Options (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-teal-950 text-teal-300 text-xs font-mono font-bold border border-teal-800">
                Punto #{currentHotspotIndex + 1}: {currentHotspot.title}
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                +300 pts • +15.000 €
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
              {currentHotspot.question.prompt}
            </p>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {currentHotspot.question.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let btnStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-300';

                if (hasAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/30';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500/30';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={hasAnswered}
                    onClick={() => handleOptionSelect(opt.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="font-mono font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 mt-0.5">
                      {opt.id}
                    </span>
                    <span className="flex-1 leading-snug">{opt.text}</span>
                    {hasAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {hasAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Feedback Box */}
            {hasAnswered && feedbackRecord && (
              <div className={`mt-4 p-3.5 rounded-xl border animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                feedbackRecord.isCorrect
                  ? 'bg-emerald-950/50 border-emerald-800 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-800 text-rose-200'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="font-tech font-bold text-xs flex items-center gap-1.5">
                    {feedbackRecord.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>LECTURA DE PLANO CORRECTA (+300 PTS)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>ERROR DE ACOTACIÓN / LECTURA (-1 VIDA • -25.000 €)</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                    {currentHotspot.question.bookFigureRef}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {feedbackRecord.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">
              Plano: {currentHotspot.question.bookFigureRef}
            </span>
            {hasAnswered && (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-tech font-bold text-sm bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 hover:from-teal-400 hover:to-emerald-400 shadow-md shadow-teal-500/20 transition-all hover:scale-102"
              >
                <span>{currentHotspotIndex < BLUEPRINT_HOTSPOTS.length - 1 ? 'SIGUIENTE PUNTO' : 'COMPLETAR RETO 3'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
