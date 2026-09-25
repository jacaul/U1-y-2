import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Search, 
  FileText, 
  Wrench, 
  Compass, 
  ShieldAlert, 
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface TechnicalManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalManualModal: React.FC<TechnicalManualModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'u1' | 'u2_docs' | 'u2_planos' | 'u2_gantt' | 'seguridad'>('u1');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-tech font-bold text-white flex items-center gap-2">
                VADEMÉCUM TÉCNICO EÓLICO (PARANINFO)
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-normal">
                  ISBN: 9788428395625
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Guía de consulta rápida para el Técnico Superior en Energías Renovables • CIFP Aguas Nuevas
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

        {/* Tab Navigation */}
        <div className="bg-slate-950/50 px-5 pt-2 border-b border-slate-800 flex flex-wrap gap-1 sm:gap-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('u1');
            }}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'u1'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Unidad 1: Aerogeneradores</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('u2_docs');
            }}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'u2_docs'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Unidad 2: Documentación</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('u2_planos');
            }}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'u2_planos'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Unidad 2: Planos y Layout</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('u2_gantt');
            }}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'u2_gantt'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Unidad 2: Montaje y Gantt</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('seguridad');
            }}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'seguridad'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Seguridad y Normativa</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 overflow-y-auto flex-1 text-sm text-slate-300 space-y-4">
          {activeTab === 'u1' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-cyan-400 font-tech font-bold text-base mb-1">
                  1. Principios Físicos de Conversión y Ley de Betz
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  La potencia del viento depende del cubo de la velocidad y de la superficie barrida:
                </p>
                <div className="p-2.5 rounded bg-slate-900 border border-cyan-900/50 font-mono text-cyan-300 text-xs mb-2">
                  P = 0,5 · ρ · A · v³ · Cp &nbsp;&nbsp;|&nbsp;&nbsp; Límite de Betz: Cp_max = 16/27 ≈ 0,593 (59,3%)
                </div>
                <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                  <li><strong>Densidad del aire (ρ):</strong> 1,225 kg/m³ a nivel del mar (15 °C). En Albacete (~700 m de altitud), la densidad es inferior, exigiendo mayor diámetro de rotor.</li>
                  <li><strong>Comportamiento cúbico (v³):</strong> Si la velocidad se duplica (de 6 m/s a 12 m/s), la potencia disponible se multiplica por 8.</li>
                  <li><strong>Velocidades características:</strong> Arranque (cut-in): 2,5 - 3,5 m/s | Nominal: 11 - 14 m/s | Corte (cut-out): 25 m/s.</li>
                </ul>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-cyan-400 font-tech font-bold text-base mb-1">
                  2. Componentes Principales de la Góndola (Nacelle)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block mb-0.5">Tren de Potencia y Multiplicadora:</strong>
                    Transmite la energía cinética del eje lento (15-25 rpm) al eje rápido (1000-1500 rpm) mediante 1 etapa planetaria y tren helicoidal. Brazos de reacción con amortiguadores elásticos para limitar vibraciones al bastidor.
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block mb-0.5">Sistema Pitch (Paso de Pala):</strong>
                    Regulación activa independiente por pala mediante cilindros hidráulicos o servomotores. Incorpora acumuladores de nitrógeno a presión en el buje para llevar las palas a bandera (90°) en emergencias sin suministro eléctrico.
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block mb-0.5">Sistema Yaw (Orientación):</strong>
                    4 motorreductoras con arrancador suave engranan en la corona dentada de la torre. Incluye pinzas de freno hidráulicas para bloquear la orientación cuando sopla viento óptimo.
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                    <strong className="text-white block mb-0.5">Generador Eléctrico:</strong>
                    Típicamente DFIG (doblemente alimentado con rotor bobinado y convertidor de frecuencia en rotor) a 690 V, o síncrono multipolo con imanes permanentes sin multiplicadora (direct drive).
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'u2_docs' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-cyan-400 font-tech font-bold text-base mb-1">
                  Estructura Reglamentaria de los 4 Documentos de Proyecto
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Según la norma UNE 157001 y las especificaciones de Paraninfo, el proyecto técnico completo se estructura en 4 documentos con rango contractual propio:
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-cyan-900/60">
                    <span className="font-bold text-cyan-300 uppercase block mb-1">
                      Documento nº 1: Memoria y Anejos (Págs. 90-101)
                    </span>
                    <p className="text-slate-400 mb-1.5">
                      Justifica la solución técnica, antecedentes, emplazamiento y balance general. Se complementa con 16 Anejos técnicos fundamentales:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[11px] font-mono text-slate-300">
                      <div>• Anejo 1: Cálculos eléctricos</div>
                      <div>• Anejo 2: Estudio geotécnico</div>
                      <div>• Anejo 3: Viales y plataformas</div>
                      <div>• Anejo 4: Cimentación torres</div>
                      <div>• Anejo 5: Impacto ambiental</div>
                      <div>• Anejo 6: Seguridad y Salud</div>
                      <div>• Anejo 7: Estructuras metálicas</div>
                      <div>• Anejo 8: Edificio de control</div>
                      <div>• Anejo 9: Aparellaje AT/MT</div>
                      <div>• Anejo 10: Control/Protección</div>
                      <div>• Anejo 11: Conductores y cables</div>
                      <div>• Anejo 12: Funcionamiento</div>
                      <div>• Anejo 13: Expropiaciones</div>
                      <div>• Anejo 14: Control de calidad</div>
                      <div>• Anejo 15: Plan de obras</div>
                      <div>• Anejo 16: Instalaciones compl.</div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-white uppercase block mb-1">
                      Documento nº 2: Planos (Págs. 101-131)
                    </span>
                    <p className="text-slate-400">
                      Colección gráfica vinculante agrupada en 7 grupos: 1. Generales y obra civil parque; 2. Obra civil subestación; 3. Edificio de control; 4. Electromecánicos generales; 5. Estructuras metálicas de pórticos; 6. Disposiciones de montaje de aparellaje; 7. Ingeniería de control (SCADA y unifilares).
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-white uppercase block mb-1">
                      Documento nº 3: Pliego de Prescripciones Técnicas Particulares (Págs. 121-124)
                    </span>
                    <p className="text-slate-400">
                      Establece las calidades de materiales (áridos, zahorras 95% Proctor, hormigón fck, pernos), condiciones de ejecución, ensayos de laboratorio, condiciones facultativas (dirección de obra, libro de órdenes) y económicas (fianzas, penalizaciones).
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-white uppercase block mb-1">
                      Documento nº 4: Presupuesto (Págs. 118-121)
                    </span>
                    <p className="text-slate-400">
                      Estructurado en 5 partes: 1. Mediciones detalladas; 2. Cuadros de precios unitarios (nº 1 en letra y nº 2 en desglose); 3. Presupuestos parciales por capítulos; 4. Presupuesto general; 5. Resumen: PEM + 13% Gastos Generales + 6% Beneficio Industrial + 21% IVA = Presupuesto de Ejecución por Contrata (PEC).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'u2_planos' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-cyan-400 font-tech font-bold text-base mb-1">
                  1. Plataforma de Montaje de Aerogeneradores (Figura 2.3)
                </h3>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                  <li><strong>Zona de la Grúa Principal (50,00 m):</strong> Plataforma nivelada al 0% con zahorra artificial compactada al 95% del Proctor modificado. Capacidad portante exigida: <strong>5 kg/cm²</strong>.</li>
                  <li><strong>Zona para Montaje de Brazo de Grúa (70,00 x 8,00 m):</strong> Corredor longitudinal despejado sin obstáculos para el ensamblaje en el suelo de la pluma y plumines.</li>
                  <li><strong>Zona de Descarga de Palas (55,00 m):</strong> Nivelada con zahorra, capacidad portante de <strong>2 kg/cm²</strong> (suficiente para componentes aerodinámicos ligeros).</li>
                  <li><strong>Vial de Acceso:</strong> Ancho de plataforma de <strong>5,00 m</strong>, radio de curvatura mínimo en curvas de <strong>R = 20 m</strong> para el paso de transportes especiales de palas.</li>
                </ul>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-cyan-400 font-tech font-bold text-base mb-1">
                  2. Sección Tipo de Zanja de Media Tensión (Figura 2.5)
                </h3>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                  <li><strong>Dimensiones estándar:</strong> Anchura de zanja de <strong>0,64 m</strong> y profundidad de <strong>0,88 m</strong> (o entubada de 0,80 m).</li>
                  <li><strong>Cama de asiento:</strong> 10 cm de arena fina de río exenta de gravas angulosas bajo los conductores.</li>
                  <li><strong>Cobertura de cables:</strong> Arena fina de río hasta completar 185 mm sobre los conductores de potencia.</li>
                  <li><strong>Protección mecánica:</strong> Placas de PVC rígido o hilada de ladrillo cerámico macizo sobre la arena.</li>
                  <li><strong>Señalización:</strong> Cinta continua plastificada de advertencia color amarillo normalizada a 25-30 cm de la rasante.</li>
                  <li><strong>Red general de tierras:</strong> Conductor de cobre desnudo (mínimo 50 mm²) tendido en el fondo de la zanja comunicando zapatas y subestación.</li>
                </ul>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-cyan-400 font-tech font-bold text-base mb-1">
                  3. Subestación Transformadora y Códigos ANSI (Figuras 2.10 y 2.33)
                </h3>
                <p className="text-xs text-slate-400 mb-2">
                  Transforma de 20 kV (red colectora del parque) a 132 kV (evacuación a REE). Códigos ANSI clave:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-cyan-400 font-bold block">89 / 89-TL</span>
                    Seccionador de línea con cuchillas de PAT (corte visible).
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-cyan-400 font-bold block">52 / 52-L</span>
                    Interruptor automático de potencia en gas SF6.
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-cyan-400 font-bold block">50 / 51</span>
                    Sobreintensidad instantánea (50) y temporizada (51).
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-cyan-400 font-bold block">87</span>
                    Relé de protección diferencial de transformador.
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-cyan-400 font-bold block">64N</span>
                    Protección de falta a tierra homopolar.
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="text-cyan-400 font-bold block">21</span>
                    Relé de distancia de línea de evacuación.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'u2_gantt' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-cyan-400 font-tech font-bold text-base mb-1">
                  Ruta Crítica y Precedencias de Montaje Eólico
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  El cronograma de actividades (Figuras 2.25 y 2.26) impone dependencias físicas inalterables:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 font-mono flex items-center justify-center font-bold">1</span>
                    <span><strong>Replanteo y Accesos Viales:</strong> Tarea inicial absoluta. Sin caminos con capacidad portante no pueden acceder las retroexcavadoras ni los camiones de hormigón.</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 font-mono flex items-center justify-center font-bold">2</span>
                    <span><strong>Cimentaciones y Virola:</strong> Se excava, ferralla la zapata, se posiciona y nivela la virola de acero y se hormigona (curado mínimo de 28 días para resistencia máxima).</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 font-mono flex items-center justify-center font-bold">3</span>
                    <span><strong>Izado de Torre por Tramos:</strong> Requiere que el pedestal de hormigón haya fraguado y que la grúa telescópica esté posicionada sobre plataforma al 95% Proctor.</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 font-mono flex items-center justify-center font-bold">4</span>
                    <span><strong>Montaje de Góndola y Rotor:</strong> La góndola se fija a la corona de la torre; posteriormente el rotor ensamblado en tierra (buje + 3 palas) se alza con grúa principal y grúa de retenida.</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 font-mono flex items-center justify-center font-bold">5</span>
                    <span><strong>Pruebas en Blanco y Energización:</strong> Verificación de aislamiento en cables y celdas antes del cierre de interruptores y conexión a red de REE.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seguridad' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-cyan-400 font-tech font-bold text-base mb-1">
                  1. Las Cinco Reglas de Oro en Trabajos Eléctricos (RD 614/2001)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Secuencia obligatoria de estricto cumplimiento antes de iniciar cualquier trabajo sin tensión en centros de transformación y subestaciones:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-900 rounded border border-amber-900/50">
                    <span className="font-bold text-amber-400 block font-mono">1. Desconectar</span>
                    Apertura de todos los polos con corte visible o efectivo.
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-amber-900/50">
                    <span className="font-bold text-amber-400 block font-mono">2. Prevenir</span>
                    Bloqueo mecánico o enclavamiento con candado y señalización.
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-amber-900/50">
                    <span className="font-bold text-amber-400 block font-mono">3. Verificar</span>
                    Comprobar ausencia de tensión con pértiga y detector homologado.
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-amber-900/50">
                    <span className="font-bold text-amber-400 block font-mono">4. Poner a Tierra</span>
                    Puesta a tierra y en cortocircuito a ambos lados de la zona.
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-amber-900/50">
                    <span className="font-bold text-amber-400 block font-mono">5. Señalizar</span>
                    Delimitar la zona de trabajo con pantallas, cintas y vallas.
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-cyan-400 font-tech font-bold text-base mb-1">
                  2. Trabajos en Altura e Izado de Cargas (Págs. 300-307)
                </h3>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                  <li><strong>Trabajo en altura (&gt; 2 m):</strong> Uso obligatorio de arnés anticaídas UNE-EN 361 con absorbedor de energía y línea de vida. El cinturón simple (EN 358) solo sirve de retención/posicionamiento, jamás para frenar caídas.</li>
                  <li><strong>Viento máximo para izado:</strong> Prohibidas operaciones de elevación de grandes componentes (tramos de torre, góndola, palas) con velocidades de viento superiores a <strong>9-10 m/s</strong> o alerta de tormenta eléctrica.</li>
                  <li><strong>Prohibición terminante:</strong> Jamás permanecer bajo cargas suspendidas ni utilizar grúas de obra para izar personas salvo canastillas homologadas específicas.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Fuente docente: Luis Romero Lozano • Ediciones Paraninfo</span>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Cerrar Vademécum
          </button>
        </div>
      </div>
    </div>
  );
};
