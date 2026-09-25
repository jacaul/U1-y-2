import React from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  Lock, 
  Wind, 
  FileCheck, 
  FolderTree, 
  Compass, 
  Zap, 
  CalendarCheck, 
  ShieldCheck 
} from 'lucide-react';
import { Achievement } from '../types';
import { soundEffects } from '../utils/audio';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose, achievements }) => {
  if (!isOpen) return null;

  const getIcon = (name: string, isUnlocked: boolean) => {
    const className = `w-6 h-6 ${isUnlocked ? 'text-amber-400' : 'text-slate-600'}`;
    switch (name) {
      case 'Wind': return <Wind className={className} />;
      case 'FileCheck': return <FileCheck className={className} />;
      case 'FolderTree': return <FolderTree className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'CalendarCheck': return <CalendarCheck className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      default: return <Award className={className} />;
    }
  };

  const unlockedCount = achievements.filter(a => !!a.unlockedAt).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-tech font-bold text-white flex items-center gap-2">
                LOGROS Y COMPETENCIAS PROFESIONALES
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 font-mono border border-amber-800">
                  {unlockedCount} / {achievements.length} Desbloqueados
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Acreditaciones técnicas conseguidas en la gestión del montaje eólico
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((achievement) => {
              const isUnlocked = !!achievement.unlockedAt;
              return (
                <div
                  key={achievement.id}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-slate-800/80 border-amber-500/40 shadow-md shadow-amber-950/30'
                      : 'bg-slate-950/50 border-slate-800/80 opacity-60'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    isUnlocked ? 'bg-amber-950/60 border border-amber-800/80' : 'bg-slate-900 border border-slate-800'
                  }`}>
                    {getIcon(achievement.iconName, isUnlocked)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className={`text-xs font-tech font-bold truncate ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                        {achievement.title}
                      </h4>
                      {isUnlocked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {achievement.description}
                    </p>
                    {isUnlocked && achievement.unlockedAt && (
                      <span className="text-[10px] text-amber-400/80 font-mono mt-1 block">
                        Desbloqueado • {new Date(achievement.unlockedAt).toLocaleTimeString('es-ES', { minute: '2-digit', second: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
