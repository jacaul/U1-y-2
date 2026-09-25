import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  FolderTree, 
  Layers, 
  Coins, 
  AlertTriangle,
  BookOpen,
  ChevronRight,
  Calculator,
  ShieldCheck,
  Check
} from 'lucide-react';
import { PROJECT_DOCUMENTS } from '../../data/challengesData';
import { ProjectDocCategory, ProjectDocumentItem, AnswerRecord } from '../../types';
import { soundEffects } from '../../utils/audio';

interface Challenge2DocumentsProps {
  onComplete: (scoreGained: number, budgetDelta: number, records: AnswerRecord[]) => void;
  onDeductLife: () => void;
}

export const Challenge2Documents: React.FC<Challenge2DocumentsProps> = ({ onComplete, onDeductLife }) => {
  const [timeLeft, setTimeLeft] = useState(12 * 60); // 12 minutes = 720s
  const [stage, setStage] = useState<'classification' | 'financial_audit'>('classification');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [classifiedMap, setClassifiedMap] = useState<Record<string, { category: ProjectDocCategory; isCorrect: boolean }>>({});
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; text: string; correctCat: string } | null>(null);
  const [accumulatedRecords, setAccumulatedRecords] = useState<AnswerRecord[]>([]);
  const [score, setScore] = useState(0);
  const [budget, setBudget] = useState(0);

  // Financial Audit interactive calculation state (Fase 2)
  const pemValue = 12000000; // 12.000.000 €
  const [inputGG, setInputGG] = useState('');
  const [inputBI, setInputBI] = useState('');
  const [inputIVA, setInputIVA] = useState('');
  const [inputPEC, setInputPEC] = useState('');
  const [financialVerified, setFinancialVerified] = useState(false);
  const [financialError, setFinancialError] = useState<string | null>(null);

  // 12-minute countdown timer
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

  const currentItem: ProjectDocumentItem = PROJECT_DOCUMENTS[currentIndex];

  const categoriesConfig: { id: ProjectDocCategory; title: string; subtitle: string; color: string; border: string; bg: string; icon: string }[] = [
    {
      id: 'doc1_memoria',
      title: 'Doc 1: Memoria y Anejos',
      subtitle: 'Justificación, 16 Anejos técnicos (Geotécnico, E.B.S.S., E.I.A., Cálculos)',
      color: 'text-sky-400',
      border: 'border-sky-500/40 hover:border-sky-400',
      bg: 'bg-sky-950/40',
      icon: 'FolderTree',
    },
    {
      id: 'doc2_planos',
      title: 'Doc 2: Planos',
      subtitle: '7 Grupos normalizados (Viales, cimentaciones, esquemas unifilares, aparellaje)',
      color: 'text-indigo-400',
      border: 'border-indigo-500/40 hover:border-indigo-400',
      bg: 'bg-indigo-950/40',
      icon: 'Layers',
    },
    {
      id: 'doc3_pliego',
      title: 'Doc 3: Pliego de Condiciones',
      subtitle: 'Cláusulas facultativas, ensayos (Zahorras 95% Proctor, hormigón fck, SF6)',
      color: 'text-amber-400',
      border: 'border-amber-500/40 hover:border-amber-400',
      bg: 'bg-amber-950/40',
      icon: 'FileText',
    },
    {
      id: 'doc4_presupuesto',
      title: 'Doc 4: Presupuesto',
      subtitle: 'Mediciones, Cuadros 1 y 2, Parciales, PEM y Resumen por Contrata (PEC)',
      color: 'text-emerald-400',
      border: 'border-emerald-500/40 hover:border-emerald-400',
      bg: 'bg-emerald-950/40',
      icon: 'Coins',
    },
  ];

  const handleCategorySelect = (selectedCat: ProjectDocCategory) => {
    if (lastFeedback) return; // Prevent multiple clicks before advancing

    const isCorrect = selectedCat === currentItem.correctCategory;
    const catName = categoriesConfig.find(c => c.id === currentItem.correctCategory)?.title || '';

    const scoreDelta = isCorrect ? 200 : 0;
    const budgetDelta = isCorrect ? 15000 : -15000;

    if (isCorrect) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playError();
      onDeductLife();
    }

    setClassifiedMap(prev => ({
      ...prev,
      [currentItem.id]: { category: selectedCat, isCorrect }
    }));

    setScore(prev => prev + scoreDelta);
    setBudget(prev => prev + budgetDelta);

    const record: AnswerRecord = {
      id: `doc_ans_${Date.now()}`,
      level: 2,
      questionId: currentItem.id,
      questionTitle: currentItem.title,
      userAnswer: categoriesConfig.find(c => c.id === selectedCat)?.title || '',
      correctAnswer: catName,
      isCorrect,
      scoreDelta,
      budgetDelta,
      explanation: currentItem.technicalTip,
      textbookRef: currentItem.subType || 'Doc del Proyecto',
      timestamp: Date.now(),
    };

    setAccumulatedRecords(prev => [...prev, record]);
    setLastFeedback({
      isCorrect,
      text: currentItem.technicalTip,
      correctCat: catName,
    });
  };

  const handleNextDocument = () => {
    soundEffects.playClick();
    setLastFeedback(null);
    if (currentIndex < PROJECT_DOCUMENTS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Advance to Phase 2: Financial Audit
      setStage('financial_audit');
    }
  };

  const handleValidateFinancialAudit = () => {
    const gg = parseFloat(inputGG);
    const bi = parseFloat(inputBI);
    const iva = parseFloat(inputIVA);
    const pec = parseFloat(inputPEC);

    // Correct values:
    // GG = 13% = 1.560.000 €
    // BI = 6% = 720.000 €
    // Base imponible = 12M * 1.19 = 14.280.000 €
    // IVA = 21% = 2.998.800 €
    // PEC = 14.280.000 * 1.21 = 17.278.800 €
    const expectedPEC = 17278800;

    if (isNaN(gg) || isNaN(bi) || isNaN(iva) || isNaN(pec)) {
      setFinancialError('Por favor completa todos los campos numéricos del presupuesto.');
      soundEffects.playError();
      return;
    }

    if (gg !== 13 || bi !== 6 || iva !== 21) {
      setFinancialError('Los porcentajes reglamentarios según la Ley de Contratos y el libro Paraninfo son: GG = 13%, BI = 6%, IVA = 21%.');
      soundEffects.playError();
      onDeductLife();
      return;
    }

    const diff = Math.abs(pec - expectedPEC) / expectedPEC;
    if (diff > 0.02) {
      setFinancialError(`El PEC calculado (${pec.toLocaleString('es-ES')} €) no coincide con la fórmula PEM · 1,19 · 1,21 = ${expectedPEC.toLocaleString('es-ES')} €.`);
      soundEffects.playError();
      onDeductLife();
      return;
    }

    soundEffects.playLevelUp();
    setFinancialVerified(true);
    setFinancialError(null);

    const bonusScore = 400;
    const bonusBudget = 30000;
    setScore(prev => prev + bonusScore);
    setBudget(prev => prev + bonusBudget);

    const finRecord: AnswerRecord = {
      id: `pec_ans_${Date.now()}`,
      level: 2,
      questionId: 'presupuesto_pec_audit',
      questionTitle: 'Auditoría Financiera: Liquidación del Presupuesto por Contrata (PEC)',
      userAnswer: `${pec.toLocaleString('es-ES')} € (GG: 13%, BI: 6%, IVA: 21%)`,
      correctAnswer: `${expectedPEC.toLocaleString('es-ES')} €`,
      isCorrect: true,
      scoreDelta: bonusScore,
      budgetDelta: bonusBudget,
      explanation: 'Cálculo de presupuesto por contrata según Capítulo 5 del Documento nº 4: Base imponible = PEM · 1,19 (13% GG + 6% BI) y PEC = Base · 1,21 (21% IVA).',
      textbookRef: 'Pág. 121 y 141',
      timestamp: Date.now(),
    };

    const finalRecords = [...accumulatedRecords, finRecord];
    setTimeout(() => {
      onComplete(score + bonusScore, budget + bonusBudget, finalRecords);
    }, 1500);
  };

  const formatMinSec = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-950/80 border border-sky-700/80 text-sky-400">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800 uppercase">
                Reto 2 de 4 (U2)
              </span>
              <span className="text-xs text-slate-400">Estructura Legal y Documental de Proyectos Eólicos</span>
            </div>
            <h2 className="text-lg sm:text-xl font-tech font-bold text-white tracking-wide">
              {stage === 'classification' ? 'CLASIFICACIÓN DE LOS 4 DOCUMENTOS CONTRACTUALES' : 'FASE 2: AUDITORÍA DEL PRESUPUESTO POR CONTRATA (PEC)'}
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

          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Etapa: </span>
            <span className="font-bold text-sky-400">
              {stage === 'classification' ? `${currentIndex + 1}/${PROJECT_DOCUMENTS.length}` : 'Liquidación Económica'}
            </span>
          </div>
        </div>
      </div>

      {stage === 'classification' ? (
        <>
          {/* Main Inspection Card to Classify */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded border border-sky-800">
                  Documento #{currentIndex + 1} de {PROJECT_DOCUMENTS.length}
                </span>
                <span className="text-slate-400 font-medium">
                  Rango legal: {currentItem.importanceLegal}
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-xl font-tech font-bold text-white">
                    {currentItem.title}
                  </h3>
                  {currentItem.subType && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                      {currentItem.subType}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentItem.description}
                </p>
              </div>

              {/* Feedback banner if answered */}
              {lastFeedback && (
                <div className={`p-4 rounded-xl border animate-fadeIn ${
                  lastFeedback.isCorrect
                    ? 'bg-emerald-950/50 border-emerald-800 text-emerald-200'
                    : 'bg-rose-950/50 border-rose-800 text-rose-200'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 font-tech font-bold text-sm">
                      {lastFeedback.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span>¡CLASIFICACIÓN REGISTRADA CORRECTAMENTE! (+200 PTS)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-400" />
                          <span>CATEGORÍA ERRÓNEA (-1 VIDA • PÉRDIDA -15.000 €)</span>
                        </>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      Pertenece a: {lastFeedback.correctCat}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lastFeedback.text}
                  </p>
                </div>
              )}

              {/* 4 Classification Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {categoriesConfig.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    disabled={!!lastFeedback}
                    className={`p-4 rounded-xl border text-left transition-all group flex flex-col justify-between ${cat.bg} ${cat.border} ${
                      lastFeedback ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.99]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`font-tech font-bold text-sm ${cat.color}`}>
                          {cat.title}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {cat.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Document Button */}
            {lastFeedback && (
              <div className="mt-5 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={handleNextDocument}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20"
                >
                  <span>{currentIndex < PROJECT_DOCUMENTS.length - 1 ? 'Siguiente Documento' : 'Avanzar a Auditoría Presupuestaria'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Classification Matrix Progress Grid */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-tech font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Estado del Archivo Técnico del Parque ({Object.keys(classifiedMap).length}/{PROJECT_DOCUMENTS.length})
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-1.5">
              {PROJECT_DOCUMENTS.map((doc, idx) => {
                const status = classifiedMap[doc.id];
                const isCurrent = idx === currentIndex;
                return (
                  <div
                    key={doc.id}
                    title={`${doc.title} (${doc.subType || ''})`}
                    className={`h-7 rounded flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      isCurrent
                        ? 'bg-sky-500 text-slate-950 ring-2 ring-sky-300'
                        : status
                          ? status.isCorrect
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                            : 'bg-rose-950 text-rose-400 border border-rose-700'
                          : 'bg-slate-950 text-slate-600 border border-slate-800'
                    }`}
                  >
                    #{idx + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* FASE 2: AUDITORÍA FINANCIERA (PEM -> PEC) */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="px-2.5 py-1 rounded font-mono text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800 uppercase">
              Capítulo 5 del Presupuesto (Doc nº 4)
            </span>
            <h3 className="text-lg sm:text-xl font-tech font-bold text-white mt-2">
              Liquidación y Determinación del Presupuesto de Ejecución por Contrata (PEC)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Como Jefe de Obra, debes comprobar que la constructora aplique con exactitud los porcentajes legales sobre el Presupuesto de Ejecución Material (PEM) según la Ley de Contratos y el manual Paraninfo (Pág. 121 y 141).
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-xs text-slate-400 block">PEM de Obra Civil y Montaje</span>
              <span className="text-xl font-mono font-bold text-amber-400">
                {pemValue.toLocaleString('es-ES')} €
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-xs text-slate-400 block">Número de Aerogeneradores</span>
              <span className="text-xl font-mono font-bold text-sky-400">
                6 Turbinas (2 MW c/u)
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-xs text-slate-400 block">Plazo de Ejecución</span>
              <span className="text-xl font-mono font-bold text-emerald-400">
                12 Meses Contractuales
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">% Gastos Generales (GG)</label>
              <input
                type="number"
                placeholder="Ej: 13"
                value={inputGG}
                onChange={e => setInputGG(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Normativa de obra pública</span>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">% Beneficio Industrial (BI)</label>
              <input
                type="number"
                placeholder="Ej: 6"
                value={inputBI}
                onChange={e => setInputBI(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Margen industrial contratista</span>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">% IVA Vigente</label>
              <input
                type="number"
                placeholder="Ej: 21"
                value={inputIVA}
                onChange={e => setInputIVA(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Impuesto sobre valor añadido</span>
            </div>

            <div>
              <label className="text-xs text-amber-300 block mb-1 font-semibold">PEC Final Calculado (€)</label>
              <input
                type="number"
                placeholder="Ej: 17278800"
                value={inputPEC}
                onChange={e => setInputPEC(e.target.value)}
                className="w-full bg-slate-950 border border-amber-600/60 rounded-lg px-3 py-2 text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-emerald-400"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Total en euros con IVA</span>
            </div>
          </div>

          {financialError && (
            <div className="p-3 bg-rose-950/60 border border-rose-700 text-rose-300 text-xs rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{financialError}</span>
            </div>
          )}

          {financialVerified ? (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500 rounded-xl text-emerald-300 text-sm flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold font-tech">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>¡PRESUPUESTO POR CONTRATA CERTIFICADO Y LIQUIDADO! (+400 PTS)</span>
              </div>
              <span className="text-xs font-mono bg-emerald-900/60 px-3 py-1 rounded text-white">
                PEC = 17.278.800 €
              </span>
            </div>
          ) : (
            <button
              onClick={handleValidateFinancialAudit}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-tech font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Validar Liquidación Financiera y Concluir Reto 2</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
