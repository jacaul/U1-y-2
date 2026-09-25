import React, { useState } from 'react';
import { 
  Calculator, 
  X, 
  Wind, 
  Gauge, 
  Layers, 
  Coins, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { FORMULA_CALCULATION_TASKS } from '../data/challengesData';
import { FormulaCalculationTask } from '../types';
import { soundEffects } from '../utils/audio';

interface FormulaWorkbenchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSolveTask?: (points: number, budgetDelta: number) => void;
}

export const FormulaWorkbenchModal: React.FC<FormulaWorkbenchModalProps> = ({
  isOpen,
  onClose,
  onSolveTask
}) => {
  const [activeTab, setActiveTab] = useState<'calculadora' | 'ejercicios'>('calculadora');

  // Interactive Live Calculator state
  const [calcDiameter, setCalcDiameter] = useState<number>(80);
  const [calcWindSpeed, setCalcWindSpeed] = useState<number>(12);
  const [calcAirDensity, setCalcAirDensity] = useState<number>(1.225);
  const [calcCp, setCalcCp] = useState<number>(0.46);

  // Financial calculator state
  const [calcPEM, setCalcPEM] = useState<number>(10000000);

  // Solved tasks tracker
  const [solvedTasks, setSolvedTasks] = useState<Record<string, { value: number; isCorrect: boolean }>>({});
  const [inputTaskValues, setInputTaskValues] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Real-time Physics Calculations
  const radius = calcDiameter / 2;
  const sweptArea = Math.PI * Math.pow(radius, 2); // m²
  const windPowerDensity = 0.5 * calcAirDensity * Math.pow(calcWindSpeed, 3); // W/m²
  const totalWindPowerWatts = windPowerDensity * sweptArea; // W
  const totalWindPowerKW = totalWindPowerWatts / 1000; // kW
  const betzMaxPowerKW = totalWindPowerKW * (16 / 27); // 59.26%
  const actualPowerKW = totalWindPowerKW * calcCp; // with actual Cp
  const recommendedHubHeight = 0.75 * calcDiameter + 10; // H = 0.75D + 10 m
  const groundClearance = recommendedHubHeight - (calcDiameter / 2);

  // Financial Calculations
  const gastosGenerales = calcPEM * 0.13;
  const beneficioIndustrial = calcPEM * 0.06;
  const baseImponible = calcPEM + gastosGenerales + beneficioIndustrial;
  const iva = baseImponible * 0.21;
  const presupuestoPEC = baseImponible + iva;

  const handleTaskSubmit = (task: FormulaCalculationTask) => {
    const rawVal = parseFloat(inputTaskValues[task.id] || '0');
    if (isNaN(rawVal)) return;

    const diffPercent = Math.abs(rawVal - task.correctValue) / task.correctValue;
    const isCorrect = diffPercent <= task.tolerance;

    if (isCorrect) {
      soundEffects.playSuccess();
      if (!solvedTasks[task.id]?.isCorrect && onSolveTask) {
        onSolveTask(task.points, task.budgetImpact);
      }
    } else {
      soundEffects.playError();
    }

    setSolvedTasks(prev => ({
      ...prev,
      [task.id]: { value: rawVal, isCorrect }
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Banco de Cálculo Técnico y Fórmulas Eólicas
              </h2>
              <p className="text-xs text-slate-400">
                Física del viento, Límite de Betz, Ecuaciones de Flujo y Presupuestos (Unidades 1 y 2 - Paraninfo)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => { soundEffects.playClick(); setActiveTab('calculadora'); }}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeTab === 'calculadora'
                    ? 'bg-emerald-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Calculadora Dinámica
              </button>
              <button
                onClick={() => { soundEffects.playClick(); setActiveTab('ejercicios'); }}
                className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'ejercicios'
                    ? 'bg-emerald-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Problemas de Examen</span>
                <span className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded text-[10px]">
                  {FORMULA_CALCULATION_TASKS.length}
                </span>
              </button>
            </div>

            <button
              onClick={() => { soundEffects.playClick(); onClose(); }}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {activeTab === 'calculadora' ? (
            <div className="space-y-6">
              
              {/* Module 1: Aerodynamics & Betz */}
              <div className="bg-slate-950/70 border border-slate-700/80 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-white text-base">
                      1. Potencia Eólica Cinética y Límite de Betz
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                    P = 1/2 · ρ · A · v³ · Cp
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Diámetro Rotor D (m)</label>
                    <input
                      type="number"
                      value={calcDiameter}
                      onChange={e => setCalcDiameter(Math.max(1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Velocidad Viento v (m/s)</label>
                    <input
                      type="number"
                      value={calcWindSpeed}
                      onChange={e => setCalcWindSpeed(Math.max(0.1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Densidad Aire ρ (kg/m³)</label>
                    <input
                      type="number"
                      step="0.005"
                      value={calcAirDensity}
                      onChange={e => setCalcAirDensity(Math.max(0.5, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Coeficiente Cp (máx 0.593)</label>
                    <input
                      type="number"
                      step="0.01"
                      max="0.593"
                      min="0.1"
                      value={calcCp}
                      onChange={e => setCalcCp(Math.min(0.593, Math.max(0.01, parseFloat(e.target.value) || 0)))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Calculation Results Card */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <div className="p-3 bg-slate-950/60 rounded-lg">
                    <span className="text-[11px] text-slate-400 block">Área Barrida (A)</span>
                    <span className="text-lg font-mono font-bold text-white">
                      {sweptArea.toLocaleString('es-ES', { maximumFractionDigits: 1 })} m²
                    </span>
                    <span className="text-[10px] text-slate-500 block">π · D² / 4</span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-lg">
                    <span className="text-[11px] text-slate-400 block">Potencia Bruta Flujo</span>
                    <span className="text-lg font-mono font-bold text-sky-400">
                      {totalWindPowerKW.toLocaleString('es-ES', { maximumFractionDigits: 0 })} kW
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {(totalWindPowerKW / 1000).toFixed(2)} MW
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-950/40 border border-emerald-600/30 rounded-lg">
                    <span className="text-[11px] text-emerald-300 block font-medium">Límite de Betz (59.3%)</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      {betzMaxPowerKW.toLocaleString('es-ES', { maximumFractionDigits: 0 })} kW
                    </span>
                    <span className="text-[10px] text-emerald-500 block">Máx teórico 16/27</span>
                  </div>

                  <div className="p-3 bg-amber-950/40 border border-amber-600/30 rounded-lg">
                    <span className="text-[11px] text-amber-300 block font-medium">Potencia Eléctrica Estimada</span>
                    <span className="text-lg font-mono font-bold text-amber-400">
                      {actualPowerKW.toLocaleString('es-ES', { maximumFractionDigits: 0 })} kW
                    </span>
                    <span className="text-[10px] text-amber-500 block">Cp = {calcCp}</span>
                  </div>
                </div>
              </div>

              {/* Module 2: Geometric Hub Height Rule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-950/70 border border-slate-700/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-sky-400" />
                      <h3 className="font-semibold text-white">
                        2. Altura de Buje Recomendada (Paraninfo)
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                      H = 0,75 · D + 10 m
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Para el rotor actual de D = {calcDiameter} m, la altura del eje calculada evita las bajas velocidades por fricción del terreno:
                  </p>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">Altura de Buje (H):</span>
                      <span className="text-xl font-mono font-bold text-sky-400">{recommendedHubHeight.toFixed(1)} m</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Distancia punta a suelo:</span>
                      <span className="text-sm font-mono font-bold text-emerald-400">{groundClearance.toFixed(1)} m</span>
                    </div>
                  </div>
                </div>

                {/* Module 3: Financial Budget (PEM -> PEC) */}
                <div className="bg-slate-950/70 border border-slate-700/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-amber-400" />
                      <h3 className="font-semibold text-white">
                        3. Presupuesto por Contrata (PEC)
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                      PEM + 13% GG + 6% BI + 21% IVA
                    </span>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Presupuesto Ejecución Material PEM (€)</label>
                    <input
                      type="number"
                      step="500000"
                      value={calcPEM}
                      onChange={e => setCalcPEM(Math.max(1000, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-amber-300 font-mono text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900 p-2.5 rounded border border-slate-800">
                    <div>
                      <span className="text-slate-400 block">Gastos Generales (13%):</span>
                      <span className="font-mono text-slate-300">{gastosGenerales.toLocaleString('es-ES')} €</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Beneficio Industrial (6%):</span>
                      <span className="font-mono text-slate-300">{beneficioIndustrial.toLocaleString('es-ES')} €</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Base Imponible (PEM+19%):</span>
                      <span className="font-mono text-sky-400">{baseImponible.toLocaleString('es-ES')} €</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold text-amber-300">PEC Total (+21% IVA):</span>
                      <span className="font-mono font-bold text-emerald-400">{presupuestoPEC.toLocaleString('es-ES')} €</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Tab 2: Formal Calculation Challenges */
            <div className="space-y-6">
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">Problemas de Cálculo Oficial Paraninfo</h3>
                  <p className="text-xs text-slate-400">
                    Introduce el resultado exacto de tus cálculos numéricos. Cada acierto bonifica con puntos y presupuesto extra para el parque.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {FORMULA_CALCULATION_TASKS.map((task, idx) => {
                  const solved = solvedTasks[task.id];
                  return (
                    <div 
                      key={task.id}
                      className={`p-5 rounded-xl border transition-all ${
                        solved?.isCorrect 
                          ? 'bg-emerald-950/20 border-emerald-500/50' 
                          : solved 
                            ? 'bg-rose-950/20 border-rose-500/40' 
                            : 'bg-slate-950/60 border-slate-700/80 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-emerald-400">
                            #{idx + 1}
                          </div>
                          <h4 className="font-bold text-white text-sm">{task.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700">
                            +{task.points} pts
                          </span>
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-950 text-amber-300 border border-amber-700">
                            +{task.budgetImpact.toLocaleString('es-ES')} €
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-300 text-xs leading-relaxed mb-3">
                        {task.prompt}
                      </p>

                      <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 mb-3">
                        {task.formulaDisplay}
                      </div>

                      {/* Given data tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {task.givenData.map((d, dIdx) => (
                          <div key={dIdx} className="bg-slate-800/80 px-2.5 py-1 rounded text-xs text-slate-300 border border-slate-700">
                            <span className="text-slate-400">{d.label}: </span>
                            <span className="font-mono font-bold text-white">{d.value} {d.unit}</span>
                          </div>
                        ))}
                      </div>

                      {/* Input & Action */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-xs relative">
                          <input
                            type="number"
                            placeholder={`Resultado en ${task.unit}`}
                            value={inputTaskValues[task.id] || ''}
                            onChange={e => setInputTaskValues({ ...inputTaskValues, [task.id]: e.target.value })}
                            disabled={solved?.isCorrect}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                          />
                          <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">
                            {task.unit}
                          </span>
                        </div>

                        {!solved?.isCorrect ? (
                          <button
                            onClick={() => handleTaskSubmit(task)}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors text-xs flex items-center gap-1.5"
                          >
                            <span>Validar Cálculo</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-950/80 px-3 py-2 rounded-lg border border-emerald-600/40">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>¡Cálculo Correcto Verificado!</span>
                          </div>
                        )}
                      </div>

                      {/* Explanation feedback */}
                      {solved && (
                        <div className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                          solved.isCorrect ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-800/50' : 'bg-rose-950/40 text-rose-200 border border-rose-800/50'
                        }`}>
                          <div className="font-semibold mb-1">
                            {solved.isCorrect ? '✓ Demostración Técnica:' : '✗ Desviación del valor exacto:'}
                          </div>
                          {task.explanation}
                          <div className="mt-1 text-[11px] text-slate-400">
                            Referencia: {task.paraninfoRef}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>CIFP Aguas Nuevas - Módulo de Gestión del Montaje de Parques Eólicos</span>
          <button
            onClick={() => { soundEffects.playClick(); onClose(); }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
          >
            Volver a la Misión
          </button>
        </div>

      </div>
    </div>
  );
};
