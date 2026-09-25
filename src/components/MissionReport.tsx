import React, { useRef } from 'react';
import { 
  Award, 
  Download, 
  Printer, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Coins, 
  FileSpreadsheet, 
  FileText, 
  BookOpen, 
  ShieldCheck,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';

interface MissionReportProps {
  progress: UserProgress;
  onRestart: () => void;
  onOpenManual: () => void;
}

export const MissionReport: React.FC<MissionReportProps> = ({ progress, onRestart, onOpenManual }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  // Trigger celebration confetti on mount
  React.useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignored if confetti unavailable
    }
  }, []);

  // Compute stats
  const totalTimeSpentSeconds = 2700 - progress.timeRemainingSeconds;
  const minsSpent = Math.floor(totalTimeSpentSeconds / 60);
  const secsSpent = totalTimeSpentSeconds % 60;

  const u1Answers = progress.answersHistory.filter(a => a.level === 1);
  const u2Answers = progress.answersHistory.filter(a => a.level > 1);

  const u1Correct = u1Answers.filter(a => a.isCorrect).length;
  const u1Total = Math.max(1, u1Answers.length);
  const u1Mastery = Math.round((u1Correct / u1Total) * 100);

  const u2Correct = u2Answers.filter(a => a.isCorrect).length;
  const u2Total = Math.max(1, u2Answers.length);
  const u2Mastery = Math.round((u2Correct / u2Total) * 100);

  const globalMastery = Math.round(((u1Correct + u2Correct) / Math.max(1, progress.answersHistory.length)) * 100);

  const mistakesList = progress.answersHistory.filter(a => !a.isCorrect);

  // Export results as CSV for teachers
  const handleExportCSV = () => {
    soundEffects.playClick();
    const rows = [
      ['ALUMNO/A', progress.student.name],
      ['GRUPO', progress.student.courseGroup],
      ['ROL', progress.student.roleTitle],
      ['PUNTUACION', `${progress.score} pts`],
      ['PRESUPUESTO FINAL', `${progress.budget} €`],
      ['TIEMPO EMPLEADO', `${minsSpent} min ${secsSpent} s`],
      ['MAESTRIA U1 (COMPONENTES)', `${u1Mastery}%`],
      ['MAESTRIA U2 (PLANIFICACION)', `${u2Mastery}%`],
      ['VIDAS RESTANTES', `${progress.safetyLives}/3`],
      [],
      ['NIVEL', 'PREGUNTA', 'RESPUESTA ALUMNO', 'RESPUESTA CORRECTA', 'RESULTADO', 'EXPLICACION TECNICA', 'REF TEXTO'],
      ...progress.answersHistory.map(a => [
        `Reto ${a.level}`,
        `"${a.questionTitle.replace(/"/g, '""')}"`,
        `"${a.userAnswer.replace(/"/g, '""')}"`,
        `"${a.correctAnswer.replace(/"/g, '""')}"`,
        a.isCorrect ? 'CORRECTO' : 'ERRONEO',
        `"${a.explanation.replace(/"/g, '""')}"`,
        `"${(a.textbookRef || '').replace(/"/g, '""')}"`,
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(';')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Informe_Eolica_${progress.student.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export results as JSON for automated grading
  const handleExportJSON = () => {
    soundEffects.playClick();
    const exportData = {
      institution: 'CIFP Aguas Nuevas',
      course: 'Grado Superior en Energías Renovables y Agua',
      module: 'Gestión del Montaje de Parques Eólicos (Paraninfo ISBN 9788428395625)',
      student: progress.student,
      summary: {
        score: progress.score,
        budget: progress.budget,
        timeSpentSeconds: totalTimeSpentSeconds,
        u1MasteryPercent: u1Mastery,
        u2MasteryPercent: u2Mastery,
        globalMasteryPercent: globalMastery,
        safetyLivesRemaining: progress.safetyLives,
      },
      answers: progress.answersHistory,
      generatedAt: new Date().toISOString(),
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Evaluacion_Eolica_${progress.student.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrintCertificate = () => {
    soundEffects.playClick();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Celebration Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-gradient-to-br from-amber-400 to-emerald-400 text-slate-950 rounded-2xl shadow-xl shadow-amber-500/20">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
                EVALUACIÓN DIDÁCTICA FINALIZADA
              </div>
              <h1 className="text-xl sm:text-3xl font-tech font-bold text-white">
                INFORME DE MISIÓN Y COMPETENCIAS
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Alumno/a: <strong className="text-cyan-300">{progress.student.name}</strong> • {progress.student.courseGroup}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all hover:scale-102"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Certificado</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Exportar CSV (Docente)</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>JSON</span>
            </button>
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
              title="Nueva Partida"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Big Performance Summary Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Maestría Global</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className={`text-2xl font-tech font-bold ${globalMastery >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {globalMastery}%
              </span>
              <span className="text-xs text-slate-500">aciertos</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Tiempo Invertido</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-mono font-bold text-white">
                {minsSpent}m {secsSpent}s
              </span>
              <span className="text-xs text-slate-500">/ 45m</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Presupuesto Final</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-mono font-bold text-emerald-400">
                {progress.budget.toLocaleString('es-ES')} €
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Vidas Seguridad PRL</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-mono font-bold text-rose-400">
                {progress.safetyLives} / 3
              </span>
              <span className="text-xs text-slate-500">conservadas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mastery Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Unidad 1 Review Mastery */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
              UNIDAD 1 (PARANINFO)
            </span>
            <span className="text-lg font-tech font-bold text-white">{u1Mastery}%</span>
          </div>
          <h3 className="font-tech font-bold text-white text-base">
            Componentes del Aerogenerador y Principios Físicos
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Evaluación de los sistemas mecánico (multiplicadora, eje lento/rápido), aerodinámico (Pitch y Ley de Betz 59,3%), eléctrico (generador DFIG y celdas 20 kV) y virola de cimentación.
          </p>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div 
              style={{ width: `${u1Mastery}%` }}
              className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Unidad 2 Planning Mastery */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
              UNIDAD 2 (PARANINFO)
            </span>
            <span className="text-lg font-tech font-bold text-white">{u2Mastery}%</span>
          </div>
          <h3 className="font-tech font-bold text-white text-base">
            Planificación del Montaje, Planos y Gantt
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Clasificación de los 4 documentos reglamentarios, Anejos técnicos (Geotécnico, E.B.S.S., E.I.A.), análisis de plataforma de grúa (5 kg/cm² al 95% Proctor), zanjas MT y precedencias de obra.
          </p>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div 
              style={{ width: `${u2Mastery}%` }}
              className="bg-gradient-to-r from-sky-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Review of Mistakes with Technical Book Citations */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-800 text-amber-400">
              <BookOpen className="w-4 h-4" />
            </span>
            <h3 className="font-tech font-bold text-white text-base">
              REGISTRO PEDAGÓGICO DE ERRORES Y REPASO TÉCNICO
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {mistakesList.length === 0 ? 'Sin fallos' : `${mistakesList.length} incidencias`}
          </span>
        </div>

        {mistakesList.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <strong className="block text-white font-semibold">¡Misión impecable sin errores!</strong>
              Has respondido y clasificado todos los elementos conforme a las especificaciones del libro de Paraninfo y la normativa de Castilla-La Mancha.
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {mistakesList.map((err, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950/80 border border-rose-900/50 rounded-xl space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-rose-400 font-bold">Incidencia #{idx + 1} • {err.questionTitle}</span>
                  <span className="text-slate-500">{err.textbookRef}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                  <div className="p-2 rounded bg-rose-950/30 border border-rose-900/30 text-rose-300">
                    <span className="font-bold text-[10px] uppercase block text-rose-400">Tu respuesta:</span>
                    {err.userAnswer}
                  </div>
                  <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/30 text-emerald-300">
                    <span className="font-bold text-[10px] uppercase block text-emerald-400">Respuesta correcta:</span>
                    {err.correctAnswer}
                  </div>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed pt-1">
                  💡 <strong>Justificación Técnica:</strong> {err.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* OFFICIAL DIPLOMA CERTIFICATE (Printable) */}
      <div 
        ref={certificateRef}
        className="bg-slate-950 p-6 sm:p-10 border-4 border-double border-amber-600/50 rounded-2xl relative shadow-2xl text-slate-200 overflow-hidden"
      >
        {/* Subtle Watermark */}
        <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none"></div>

        {/* Certificate Header */}
        <div className="text-center space-y-2 relative z-10 border-b-2 border-slate-800 pb-6 mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            {/* Center Logo */}
            <svg 
              className="h-12 w-auto" 
              viewBox="0 0 160 50" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(4, 2)">
                <path d="M10 28 C10 18, 22 18, 30 18 L34 18 L34 38 C34 41, 38 41, 40 41 L40 46 C34 46, 28 44, 28 38 C24 44, 10 44, 10 28 Z M28 26 C28 23, 20 23, 20 28 C20 34, 28 34, 28 29 Z" fill="#c0df16" />
                <path d="M38 10 L48 10 L48 18 C52 14, 62 14, 68 18 C74 22, 74 30, 74 46 L64 46 L64 30 C64 24, 60 22, 54 22 C48 22, 48 27, 48 34 L48 46 L38 46 Z" fill="#c0df16" />
                <path d="M2 38 L12 38" stroke="#c0df16" strokeWidth="3.5" strokeLinecap="round" />
              </g>
              <text x="82" y="22" fill="#ffffff" fontSize="13" fontWeight="800" letterSpacing="1.5">AGUAS NUEVAS</text>
              <text x="82" y="34" fill="#94a3b8" fontSize="7" fontWeight="600">CENTRO INTEGRADO F.P.</text>
              <text x="82" y="44" fill="#38bdf8" fontSize="6.5" fontWeight="700">ENERGÍAS RENOVABLES</text>
            </svg>
          </div>

          <div className="text-[11px] uppercase tracking-widest text-amber-400 font-mono">
            JUNTA DE COMUNIDADES DE CASTILLA-LA MANCHA
          </div>
          <h2 className="text-xl sm:text-3xl font-tech font-bold text-white tracking-wider">
            CERTIFICADO DE MONTAJE Y PLANIFICACIÓN EÓLICA
          </h2>
          <p className="text-xs text-slate-400">
            Acreditación de Capacitación Técnica en Planificación de Obras Eólicas (Unidad 2 & Repaso Unidad 1)
          </p>
        </div>

        {/* Certificate Body */}
        <div className="relative z-10 text-center space-y-4 max-w-2xl mx-auto my-6">
          <p className="text-xs text-slate-400">Se certifica formalmente que:</p>
          <div className="text-2xl sm:text-3xl font-tech font-bold text-cyan-400 underline decoration-cyan-500/40 decoration-2 underline-offset-8">
            {progress.student.name}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-2">
            Ha superado satisfactoriamente los 4 retos interactivos de planificación, interpretación de planos, 
            presupuesto, análisis documental y diagrama de Gantt en el rol de:
          </p>
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-emerald-300">
            {progress.student.roleTitle}
          </div>

          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-center font-mono my-4">
            <div>
              <span className="text-[10px] text-slate-500 block">MAESTRÍA GLOBAL</span>
              <span className="text-emerald-400 font-bold text-sm">{globalMastery}%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">PRESUPUESTO FINAL</span>
              <span className="text-white font-bold text-sm">{progress.budget.toLocaleString('es-ES')} €</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">PUNTUACIÓN</span>
              <span className="text-cyan-400 font-bold text-sm">{progress.score} pts</span>
            </div>
          </div>
        </div>

        {/* Certificate Signatures */}
        <div className="relative z-10 grid grid-cols-2 gap-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
          <div>
            <div className="h-10 border-b border-dashed border-slate-700 mx-auto w-40 flex items-center justify-center font-tech text-cyan-400 text-sm italic">
              Dirección Facultativa
            </div>
            <span className="block mt-1 font-semibold text-slate-300">CIFP Aguas Nuevas</span>
            <span className="text-[10px] text-slate-500">Depto. Energía y Agua</span>
          </div>

          <div>
            <div className="h-10 border-b border-dashed border-slate-700 mx-auto w-40 flex items-center justify-center font-tech text-emerald-400 text-sm italic">
              Luis Romero Lozano
            </div>
            <span className="block mt-1 font-semibold text-slate-300">Autor Técnico</span>
            <span className="text-[10px] text-slate-500">Ediciones Paraninfo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
