import React, { useState } from 'react';
import { 
  HardHat, 
  Compass, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Clock, 
  Award, 
  Coins, 
  BookOpen,
  MapPin,
  CheckCircle2,
  Info
} from 'lucide-react';
import { RoleType, StudentProfile } from '../types';
import { soundEffects } from '../utils/audio';

interface WelcomeScreenProps {
  onStartGame: (profile: StudentProfile) => void;
  onOpenManual: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame, onOpenManual }) => {
  const [name, setName] = useState('');
  const [courseGroup, setCourseGroup] = useState('2º GS Energías Renovables - CIFP Aguas Nuevas');
  const [selectedRole, setSelectedRole] = useState<RoleType>('jefe_obra');

  const rolesConfig: { id: RoleType; title: string; subtitle: string; icon: React.ReactNode; desc: string; focus: string }[] = [
    {
      id: 'jefe_obra',
      title: 'Jefe/a de Obra Eólica',
      subtitle: 'Dirección Facultativa y Coordinación General',
      icon: <HardHat className="w-6 h-6 text-amber-400" />,
      desc: 'Responsable de la ejecución material, cumplimiento del cronograma contractual de 12 meses y balance económico.',
      focus: 'Gestión global, Anejos, Precedencias críticas de Gantt y certificaciones.',
    },
    {
      id: 'ing_montaje',
      title: 'Ingeniero/a de Montaje y Layout',
      subtitle: 'Especialista en Izados y Obra Civil',
      icon: <Compass className="w-6 h-6 text-cyan-400" />,
      desc: 'Supervisión de plataformas de grúa de 500-1000 t, cimentaciones con virola nivelada y radio de viales R=20m.',
      focus: 'Interpretación de planos técnicos, capacidad portante 5 kg/cm² y zanjas.',
    },
    {
      id: 'coordinador_prl',
      title: 'Coordinador/a de Seguridad y Medioambiente',
      subtitle: 'RD 1627/1997 & Ley 31/1995 de PRL',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      desc: 'Aprobación del Plan de Seguridad y Salud, 5 Reglas de Oro, EPIs para alturas de >60m y medidas correctoras de avifauna.',
      focus: 'Prevención de riesgos, libros de incidencias y protección ambiental en Castilla-La Mancha.',
    },
    {
      id: 'supervisor_electrico',
      title: 'Supervisor/a Eléctrico/a de Subestación',
      subtitle: 'Alta y Media Tensión (132 / 20 kV)',
      icon: <Zap className="w-6 h-6 text-violet-400" />,
      desc: 'Control de la aparamenta exterior en SF6, transformador de potencia 25 MVA, celdas de torre y enlace con el SCADA central.',
      focus: 'Esquemas unifilares, relés ANSI 50/51, 87 y cables de potencia RHZ1-OL.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    soundEffects.playSuccess();
    const roleObj = rolesConfig.find(r => r.id === selectedRole)!;
    onStartGame({
      name: name.trim(),
      courseGroup,
      role: selectedRole,
      roleTitle: roleObj.title,
      avatarSeed: name.trim().toLowerCase().replace(/\s+/g, '-'),
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 bg-blueprint-grid">
      <div className="max-w-4xl w-full bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden my-6">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 border-b border-slate-700/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* Institution Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-lime-400" />
                <span>CIFP Aguas Nuevas • Albacete, Castilla-La Mancha</span>
              </div>
              <button
                type="button"
                onClick={onOpenManual}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Consultar Vademécum Paraninfo</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-4xl font-tech font-bold text-white tracking-wide mb-2">
              EÓLICA<span className="text-cyan-400">MASTER</span>: PLANIFICACIÓN DE PARQUES
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Misión gamificada de 45 minutos para futuros técnicos en montaje eólico. 
              Supera la Unidad 2 (<em className="text-cyan-300">Planificación del montaje de parques eólicos</em>, Paraninfo) 
              con el repaso riguroso de la Unidad 1 (<em className="text-emerald-300">Componentes del aerogenerador</em>).
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Tiempo Total</div>
                  <div className="text-sm font-bold text-white">45 Minutos</div>
                </div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2.5">
                <Coins className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Presupuesto Inicial</div>
                  <div className="text-sm font-bold text-white">1.000.000 €</div>
                </div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2.5">
                <Award className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">4 Retos Técnicos</div>
                  <div className="text-sm font-bold text-white">U1 + U2 + Planos + Gantt</div>
                </div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Seguridad Laboral</div>
                  <div className="text-sm font-bold text-white">3 Vidas Máximas</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Nombre y Apellidos del Alumno/a <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Laura Gómez Navarro"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Centro Educativo y Grupo
              </label>
              <input
                type="text"
                value={courseGroup}
                onChange={(e) => setCourseGroup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Selecciona tu Puesto en el Parque Eólico <span className="text-rose-400">*</span>
              </label>
              <span className="text-xs text-cyan-400 font-mono">1 seleccionado</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rolesConfig.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setSelectedRole(role.id);
                    }}
                    className={`text-left p-3.5 rounded-xl border transition-all relative ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-400 ring-2 ring-cyan-400/20 shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-950 border border-cyan-700' : 'bg-slate-900'}`}>
                        {role.icon}
                      </div>
                      <div className="flex-1 pr-6">
                        <div className="font-tech font-bold text-sm text-white flex items-center gap-1.5">
                          {role.title}
                        </div>
                        <div className="text-[11px] text-cyan-400 font-medium -mt-0.5 mb-1">
                          {role.subtitle}
                        </div>
                        <p className="text-xs text-slate-400 leading-snug mb-1.5">
                          {role.desc}
                        </p>
                        <div className="text-[10px] text-slate-500 font-mono">
                          🎯 Enfoque: {role.focus}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute top-3 right-3 text-cyan-400">
                        <CheckCircle2 className="w-5 h-5 fill-cyan-950" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Educational Notice */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Metodología de Evaluación Continua:</span> Cada reto cuenta con un límite de tiempo parcial y penalizaciones presupuestarias si se violan normativas de Castilla-La Mancha o las especificaciones del libro de Paraninfo. Al finalizar se generará un <strong className="text-slate-200">Certificado Oficial de Montaje Eólico</strong> con tu desglose de maestría en U1 y U2 listo para exportar a PDF o CSV.
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-tech font-bold text-base bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-102"
            >
              <span>INICIAR MISIÓN EÓLICA (45 MIN)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
