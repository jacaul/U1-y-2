/**
 * Technical datasets for EólicaMaster
 * Based on Paraninfo "Gestión del montaje de parques eólicos" (ISBN: 9788428395625)
 * by Luis Romero Lozano.
 * Includes deep coverage of Unidad 1 (Componentes, Física y Meteorología) 
 * and Unidad 2 (Planificación, Obra Civil, Planos, Presupuesto y Gantt).
 */

import {
  AerogeneratorComponent,
  InspectionQuestion,
  ProjectDocumentItem,
  BlueprintHotspot,
  GanttTask,
  Achievement,
  FormulaCalculationTask,
  OnSiteDilemma,
} from '../types';

// ==========================================
// LOGROS DEL JUEGO (ACHIEVEMENTS)
// ==========================================
export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'u1_master',
    title: 'Inspector Técnico de Góndola (U1)',
    description: 'Completaste el chequeo técnico de todos los componentes mecánicos, aerodinámicos y eléctricos.',
    iconName: 'ShieldCheck',
    category: 'u1',
  },
  {
    id: 'betz_physicist',
    title: 'Físico Aerodinámico: Límite de Betz (59.3%)',
    description: 'Demostraste dominio sobre la ecuación de potencia cúbica del viento y el límite teórico de Betz.',
    iconName: 'Wind',
    category: 'u1',
  },
  {
    id: 'generator_specialist',
    title: 'Especialista en Generadores DFIG & PMSG',
    description: 'Diferenciaste con precisión entre máquinas asíncronas con convertidor rotórico y síncronas de accionamiento directo.',
    iconName: 'Zap',
    category: 'u1',
  },
  {
    id: 'doc_archivist',
    title: 'Especialista Documental CTE (U2)',
    description: 'Clasificaste con precisión los 4 documentos reglamentarios del proyecto eólico (Memoria, Planos, Pliego y Presupuesto).',
    iconName: 'FileCheck',
    category: 'u2',
  },
  {
    id: 'anejos_auditor',
    title: 'Auditor de Anejos Críticos',
    description: 'Identificaste correctamente los 16 anejos: geotécnico, ambiental, seguridad y salud y cálculos justificativos.',
    iconName: 'FolderTree',
    category: 'u2',
  },
  {
    id: 'blueprint_pro',
    title: 'Topógrafo y Calculista de Layout',
    description: 'Superaste la interpretación de plataformas de grúa y zanjas de media tensión con zahorra al 95% Proctor.',
    iconName: 'Compass',
    category: 'u2',
  },
  {
    id: 'substation_expert',
    title: 'Operador de Subestación 132/20 kV',
    description: 'Identificaste los símbolos unifilares ANSI (50/51, 87, 89, 52) y la aparamenta con aislamiento en gas SF6.',
    iconName: 'Activity',
    category: 'u2',
  },
  {
    id: 'critical_path_hero',
    title: 'Estratega del Diagrama de Gantt',
    description: 'Ordenaste la secuencia de montaje sin romper ninguna precedencia de la ruta crítica y resolviste incidencias de obra.',
    iconName: 'CalendarCheck',
    category: 'gestion',
  },
  {
    id: 'aguas_nuevas_master',
    title: 'Jefe de Obra CIFP Aguas Nuevas',
    description: 'Finalizaste los 4 retos con éxito dentro del plazo de 45 minutos y con superávit presupuestario.',
    iconName: 'Award',
    category: 'gestion',
  },
];

// ==========================================
// RETO 1: COMPONENTES DEL AEROGENERADOR (U1)
// ==========================================
export const U1_COMPONENTS: AerogeneratorComponent[] = [
  {
    id: 'comp_gondola',
    name: 'Góndola y Bastidor (Nacelle)',
    system: 'mecanico',
    location: 'gondola',
    technicalSpec: 'Carcasa en PRFV con bastidor delantero de fundición nodular y trasero soldado en celosía. Incorpora cojinete de orientación (yaw) accionado por 4 motorreductoras con arrancador suave y frenos hidráulicos activos.',
    inspectionCheck: 'Verificar par de apriete en corona dentada de orientación, estado de sellado de claraboyas y holgura de pinzas de freno de yaw.',
    correctFunction: 'Aloja y sustenta rígidamente el tren de potencia, generador, transformador de potencia (si va en góndola) y armarios de control.',
    commonDefect: 'Fugas en el circuito hidráulico de pinzas de freno o desalineación de los piñones de las motorreductoras con la corona dentada de la torre.',
    paraninfoRef: 'Págs. 46-54 (Figuras 1.38, 1.41 y 1.44)',
  },
  {
    id: 'comp_buje_pitch',
    name: 'Buje y Sistema Pitch (Paso de Pala)',
    system: 'aerodinamico',
    location: 'buje',
    technicalSpec: 'Buje de fundición con ángulo de conicidad de 2° para alejar las palas de la torre. Cilindros hidráulicos independientes por pala con acumuladores de nitrógeno a alta presión.',
    inspectionCheck: 'Comprobar presión de precarga en acumuladores de nitrógeno, verificar ausencia de fugas en racores rotativos y test de paso a bandera (90°).',
    correctFunction: 'Regula la potencia con vientos superiores al nominal por variación de ángulo de ataque y actúa como freno primario aerodinámico con triple redundancia.',
    commonDefect: 'Pérdida de presión de nitrógeno que impediría el frenado aerodinámico ante caída de tensión de red (Blackout).',
    paraninfoRef: 'Págs. 52-54 y 65 (Figuras 1.38 y 1.43)',
  },
  {
    id: 'comp_palas_rotor',
    name: 'Palas del Rotor Eólico',
    system: 'aerodinamico',
    location: 'exterior',
    technicalSpec: 'Fabricadas en material compuesto con matriz orgánica de resina epoxi reforzada con fibra de vidrio y fibra de carbono en los largueros principales. Receptores de cobre contra el rayo y orificios de drenaje en la punta.',
    inspectionCheck: 'Inspeccionar integridad del gelcoat, continuidad eléctrica de la línea de pararrayos hasta la raíz y permeabilidad de los orificios de drenaje.',
    correctFunction: 'Transforma la energía cinética de la masa de aire incidente en par mecánico rotacional sobre el eje lento.',
    commonDefect: 'Obstrucción de los orificios de drenaje que acumula agua en el interior, provocando desequilibrios dinámicos de masa o explosión por vaporización ante rayo.',
    paraninfoRef: 'Págs. 52-53 (Figura 1.43)',
  },
  {
    id: 'comp_multiplicadora',
    name: 'Multiplicadora (Gearbox)',
    system: 'mecanico',
    location: 'gondola',
    technicalSpec: 'Transmisión modular compuesta por 1 etapa planetaria y tren helicoidal de 2 etapas. Relación de transmisión de 1:50 a 1:100 (eleva de 15-20 rpm a 1000-1500 rpm). Brazos de reacción con amortiguadores elásticos.',
    inspectionCheck: 'Chequear sistema de filtrado primario y secundario de aceite, monitorización de partículas metálicas, niveles de vibración y estado de silentblocks.',
    correctFunction: 'Adapta la baja velocidad angular y elevado par del eje lento a las revoluciones requeridas por el generador eléctrico.',
    commonDefect: 'Picado o micropitting en el dentado por sobrecarga o degradación de la viscosidad del aceite lubricante sintético ISO VG 320.',
    paraninfoRef: 'Págs. 53-54 (Figura 1.42)',
  },
  {
    id: 'comp_freno_disco',
    name: 'Freno Mecánico en Eje Rápido',
    system: 'mecanico',
    location: 'gondola',
    technicalSpec: 'Disco de freno de acero templado montado en el eje de alta velocidad a la salida de la multiplicadora, accionado por pinzas hidráulicas proporcionales.',
    inspectionCheck: 'Espesor y desgaste de pastillas de fricción, fugas de líquido hidráulico y funcionamiento de sensores de proximidad inductivos.',
    correctFunction: 'Actúa exclusivamente como freno de estacionamiento (bloqueo en parada) o como freno de emergencia extremo si falla el sistema primario de pitch.',
    commonDefect: 'Uso indebido como freno de servicio provocando sobrecalentamiento destructivo y conato de incendio en góndola.',
    paraninfoRef: 'Págs. 54 y 74',
  },
  {
    id: 'comp_generador',
    name: 'Generador Eléctrico (DFIG / PMSG)',
    system: 'electrico',
    location: 'gondola',
    technicalSpec: 'Generador asíncrono doblemente alimentado (DFIG) con rotor bobinado a 690 V conectado a convertidor de frecuencia en rotor, o generador síncrono multipolo de imanes permanentes (PMSG) sin multiplicadora.',
    inspectionCheck: 'Medida de resistencia de aislamiento (Megger a 1000 V), inspección de escobillas y anillos rozantes (DFIG), y calibración de sondas térmicas Pt100.',
    correctFunction: 'Transforma la energía mecánica rotacional en energía eléctrica trifásica a 690 V y 50 Hz, permitiendo control desacoplado de potencias activa y reactiva.',
    commonDefect: 'Sobrecalentamiento en devanados estatóricos por fallo de ventilación forzada o desgaste anómalo en anillo colector.',
    paraninfoRef: 'Págs. 55-60 (Figuras 1.45 a 1.52)',
  },
  {
    id: 'comp_virola_cimentacion',
    name: 'Cimentación y Virola de Nivelación',
    system: 'obra_civil',
    location: 'base_cimentacion',
    technicalSpec: 'Zapata circular u octogonal de hormigón armado (fck ≥ 25-30 MPa) con virola cilíndrica de acero embebida y corona de espárragos roscados de alto límite elástico.',
    inspectionCheck: 'Nivelación micrométrica de la brida superior de la virola con tolerancia inferior a 1 mm/m y ensayo de probetas de hormigón a 28 días.',
    correctFunction: 'Ancla la torre al terreno y absorbe los gigantescos momentos flectores (M), esfuerzos axiales (N) y cortantes (V) generados por el empuje del viento.',
    commonDefect: 'Falta de horizontalidad en la virola que transferiría cargas asimétricas de fatiga a toda la torre tubular de acero.',
    paraninfoRef: 'Págs. 49, 102, 244-247 (Figuras 2.4 y 6.1)',
  },
  {
    id: 'comp_celdas_mt',
    name: 'Celdas de Media Tensión (20 kV - SF6)',
    system: 'electrico',
    location: 'torre',
    technicalSpec: 'Conjunto modular bajo envolvente metálica aislada en gas SF6 situada en la base de la torre: celda de remonte de cables, celda de protección de transformador con interruptor automático y relés 50/51, y celda de línea.',
    inspectionCheck: 'Presión en manómetros de SF6 (presostato), enclavamiento mecánico de cuchillas de puesta a tierra y conexionado de terminales de cable RHZ1-OL.',
    correctFunction: 'Protege, maniobra y secciona la conexión del transformador 0.69/20 kV del aerogenerador a la red colectora subterránea del parque.',
    commonDefect: 'Fuga de gas SF6 con pérdida de rigidez dieléctrica o disparo intempestivo por descalibración del transformador toroidal de intensidad.',
    paraninfoRef: 'Págs. 35-36, 56, 255-256 (Figuras 1.27 y 1.28)',
  },
];

// ==========================================
// 10 PREGUNTAS TÉCNICAS COMPLETAS PARA RETO 1
// ==========================================
export const RETO1_QUESTIONS: InspectionQuestion[] = [
  {
    id: 'q1_atmosfera_troposfera',
    componentId: 'comp_gondola',
    title: 'Capas de la Atmósfera y Meteorología Eólica',
    prompt: 'Según la Unidad 1 del libro Paraninfo, ¿en qué capa de la atmósfera se concentran el 75% de los gases, el vapor de agua y la totalidad de los fenómenos meteorológicos aprovechados por la energía eólica, y cuál es su gradiente térmico vertical aproximado?',
    questionType: 'multiple-choice',
    options: [
      { id: 'a', text: 'Troposfera (hasta 8-15 km), con un descenso térmico medio de 6,5 °C por cada kilómetro de altura', isCorrect: true, technicalRationale: 'Correcto. La troposfera contiene el 75% de la masa atmosférica y en ella disminuye la temperatura a razón de ~6,5 °C/km hasta alcanzar la tropopausa.' },
      { id: 'b', text: 'Estratosfera (hasta 50 km), con temperatura uniforme de -60 °C', isCorrect: false, technicalRationale: 'Incorrecto. La estratosfera alberga la capa de ozono y su temperatura aumenta en altura hasta la estratopausa.' },
      { id: 'c', text: 'Mesosfera (hasta 80 km), donde se producen las corrientes en chorro', isCorrect: false, technicalRationale: 'En la mesosfera la temperatura desciende hasta -90 °C, pero no es la capa donde opera la energía eólica.' },
      { id: 'd', text: 'Termosfera o Ionosfera (hasta 800 km), donde se originan las auroras boreales', isCorrect: false, technicalRationale: 'La termosfera está altamente ionizada y refleja ondas electromagnéticas, pero está fuera de la troposfera meteorológica.' },
    ],
    explanation: 'La atmósfera baja o troposfera (Pág. 11 del libro Paraninfo) se extiende de 8 km en polos a 15 km en el ecuador, aglutina el 75% de la masa gaseosa y presenta un gradiente térmico vertical medio de 6,5 °C/km.',
    paraninfoPage: 'Págs. 11-12 (Figura 1.6)',
    points: 250,
    budgetImpact: 15000,
  },
  {
    id: 'q2_coriolis_brisas',
    componentId: 'comp_gondola',
    title: 'Dinámica Global del Viento y Fuerza de Coriolis',
    prompt: '¿Qué efecto produce la Fuerza de Coriolis sobre la circulación general del viento en el Hemisferio Norte y cómo funcionan las brisas costeras locales durante el día?',
    questionType: 'multiple-choice',
    options: [
      { id: 'a', text: 'Desvía los vientos hacia la derecha (sentido horario); durante el día la brisa sopla de mar a tierra porque la tierra se calienta más rápido que el agua', isCorrect: true, technicalRationale: 'Exacto. Coriolis desvía a la derecha en el HN; de día, la tierra caliente crea una baja presión térmica local que aspira el aire más fresco del mar.' },
      { id: 'b', text: 'Desvía los vientos hacia la izquierda (sentido antihorario); la brisa sopla siempre de tierra a mar', isCorrect: false, technicalRationale: 'La desviación hacia la izquierda ocurre en el Hemisferio Sur.' },
      { id: 'c', text: 'No influye en la dirección del viento, solo en su densidad térmica', isCorrect: false, technicalRationale: 'La aceleración de Coriolis modifica la trayectoria cinemática de las masas de aire en movimiento sobre la Tierra en rotación.' },
      { id: 'd', text: 'Provoca que el viento sople únicamente en los polos debido a la gravedad lunar', isCorrect: false, technicalRationale: 'Falso.' },
    ],
    explanation: 'La rotación terrestre origina la fuerza de Coriolis (Págs. 13-15), curvando masas de aire en sentido horario en el hemisferio Norte. Las brisas locales (Pág. 14) surgen del gradiente térmico mar-tierra por la mayor capacidad calorífica del agua.',
    paraninfoPage: 'Págs. 13-15 (Figura 1.7)',
    points: 250,
    budgetImpact: 15000,
  },
  {
    id: 'q3_formula_potencia_cubica',
    componentId: 'comp_palas_rotor',
    title: 'Física Eólica: Deducción de Potencia Cúbica',
    prompt: 'La ecuación de la potencia cinética del viento que atraviesa un área barrida A es P = 1/2 · ρ · A · v³. Si la velocidad del viento en el parque eólico pasa de 5 m/s a 10 m/s (se duplica), ¿en qué factor se incrementa la potencia del viento disponible?',
    questionType: 'parameter-calc',
    options: [
      { id: 'a', text: 'Se multiplica por 8 (2³ = 8 veces más potencia)', isCorrect: true, technicalRationale: 'Correcto. La potencia depende del cubo de la velocidad. Si v se duplica, (2)³ = 8.' },
      { id: 'b', text: 'Se duplica (2 veces más potencia)', isCorrect: false, technicalRationale: 'La potencia no guarda una relación lineal con la velocidad, sino cúbica.' },
      { id: 'c', text: 'Se cuadruplica (2² = 4 veces más potencia)', isCorrect: false, technicalRationale: 'El factor cuadrático aplica al radio/diámetro en el área de barrido, pero la velocidad va elevada al cubo.' },
      { id: 'd', text: 'Se multiplica por 16 debido a la inercia del rotor', isCorrect: false, technicalRationale: 'No tiene fundamento físico en la ecuación de flujo.' },
    ],
    explanation: 'En la Unidad 1 (Págs. 16 y 43), se deduce que la masa de aire por segundo es m_punto = ρ·A·v. Al multiplicar por la energía cinética específica (1/2 · v²), la potencia total resulta P = 1/2 · ρ · A · v³. Por ello, duplicar v multiplica la potencia por 8.',
    paraninfoPage: 'Pág. 43 y Pág. 63',
    points: 300,
    budgetImpact: 20000,
  },
  {
    id: 'q4_limite_betz',
    componentId: 'comp_palas_rotor',
    title: 'Fundamento Aerodinámico: Límite Teórico de Betz',
    prompt: 'Según la Ley de Betz demostrada en la Unidad 1, ¿cuál es el porcentaje máximo teórico de energía cinética del viento que un rotor puede extraer de la corriente de aire incidente (límite de Betz), y qué relación guardan las velocidades del aire?',
    questionType: 'multiple-choice',
    options: [
      { id: 'a', text: '59,3 % (Cp = 16/27 ≈ 0,593), reduciéndose la velocidad en el plano del disco a 2/3 v1 y en la estela lejana a 1/3 v1', isCorrect: true, technicalRationale: 'Correcto. Albert Betz demostró que para obtener máxima potencia el flujo debe desacelerarse a 2/3 en el rotor y a 1/3 en la estela aguas abajo, extrayendo el 59,26%.' },
      { id: 'b', text: '100 % si las palas están construidas con fibra de carbono y resinas epoxi', isCorrect: false, technicalRationale: 'Físicamente imposible; si se extrajera el 100%, el aire se detendría tras el rotor impidiendo la entrada de nuevo flujo.' },
      { id: 'c', text: '75,0 % en aerogeneradores tripala con paso variable activo', isCorrect: false, technicalRationale: 'Ningún dispositivo aerodinámico en flujo libre puede sobrepasar el 59,3%.' },
      { id: 'd', text: '33,3 % correspondiente a la desaceleración del flujo laminar', isCorrect: false, technicalRationale: '33,3% (1/3) es la velocidad residual del viento en la estela lejana, no el coeficiente Cp.' },
    ],
    explanation: 'El Límite de Betz (Págs. 43-44 y 64) establece el límite físico universal Cp_max = 16/27 ≈ 0,593. Los aerogeneradores reales modernos alcanzan coeficientes Cp prácticos en torno a 0,45 - 0,50.',
    paraninfoPage: 'Pág. 44 y Pág. 64 (Figura 1.35)',
    points: 300,
    budgetImpact: 20000,
  },
  {
    id: 'q5_altura_buje_paraninfo',
    componentId: 'comp_virola_cimentacion',
    title: 'Regla de Diseño: Altura de Buje según Diámetro',
    prompt: 'Para minimizar las pérdidas por cizalladura del viento y turbulencia cerca del suelo, ¿qué fórmula empírica recoge el manual Paraninfo para recomendar la altura del eje del aerogenerador (H) en función del diámetro del rotor (D)?',
    questionType: 'multiple-choice',
    options: [
      { id: 'a', text: 'H = 0,75 · D + 10 metros', isCorrect: true, technicalRationale: 'Exacto. Paraninfo establece expresamente que para alejar las palas de la capa límite rugosa del suelo se eleva a H = 0,75D + 10 m.' },
      { id: 'b', text: 'H = 2 · D + 50 metros', isCorrect: false, technicalRationale: 'Una altura de más del doble del diámetro encarecería desproporcionadamente la torre y cimentación.' },
      { id: 'c', text: 'H = D / 2 (la altura exacta del radio de la pala)', isCorrect: false, technicalRationale: 'Las puntas de pala rozarían prácticamente el suelo, sufriendo turbulencias destructivas.' },
      { id: 'd', text: 'H = constante de 45 metros independientemente del rotor', isCorrect: false, technicalRationale: 'La altura siempre debe estar dimensionada en función del diámetro del rotor instalado.' },
    ],
    explanation: 'En el manual Paraninfo (Pág. 45 y 65, Nota Técnica y Pregunta 1.9 de examen), se establece la relación H = 0,75·D + 10 m. Para un rotor D=80 m, la altura de buje recomendada es 0,75·80 + 10 = 70 metros.',
    paraninfoPage: 'Pág. 45, 65 y 82 (Pregunta 1.9)',
    points: 250,
    budgetImpact: 15000,
  },
  {
    id: 'q6_conicidad_buje_pitch',
    componentId: 'comp_buje_pitch',
    title: 'Geometría del Buje y Acumuladores de Nitrógeno',
    prompt: '¿Por qué las bridas del buje esférico incorporan un ángulo de conicidad de 2° y por qué es obligatorio un acumulador de nitrógeno por pala en el circuito hidráulico de pitch?',
    questionType: 'defect-diagnostics',
    options: [
      { id: 'a', text: 'La conicidad de 2° aleja las puntas de las palas de la torre tubular para evitar impactos por flexión con viento fuerte; los acumuladores garantizan llevar a bandera las palas en caso de fallo eléctrico total', isCorrect: true, technicalRationale: 'Completamente correcto. Con vientos fuertes la pala flexiona hacia la torre; los 2° de inclinación aumentan el margen de seguridad. El nitrógeno garantiza freno pasivo de emergencia.' },
      { id: 'b', text: 'Los 2° facilitan el atornillado manual de la multiplicadora; el nitrógeno sirve para enfriar los frenos de disco', isCorrect: false, technicalRationale: 'El buje está en el exterior unido al eje lento, no tiene relación con el apriete de la multiplicadora.' },
      { id: 'c', text: 'La conicidad sirve para contrarrestar la fuerza de la marea marina únicamente en aerogeneradores offshore', isCorrect: false, technicalRationale: 'La conicidad de 2° es estándar tanto en aerogeneradores terrestres onshore como offshore.' },
      { id: 'd', text: 'Los acumuladores de nitrógeno se usan para inflar el colchón de aire del ascensor de servicio', isCorrect: false, technicalRationale: 'No tiene ninguna base técnica en los esquemas de Paraninfo.' },
    ],
    explanation: 'Según la descripción técnica de componentes de Paraninfo (Págs. 52-53 y 72-73), las bridas del buje presentan 2° de conicidad para evitar choque de palas flexionadas con la torre tubular. Cada cilindro de pitch tiene su acumulador de nitrógeno para garantizar bandera inmediata sin depender de la red.',
    paraninfoPage: 'Págs. 52-53 y 72-73',
    points: 250,
    budgetImpact: 18000,
  },
  {
    id: 'q7_multiplicadora_tren_potencia',
    componentId: 'comp_multiplicadora',
    title: 'Mecánica del Tren de Potencia y Multiplicadora',
    prompt: 'En un aerogenerador con tren de potencia tradicional de alta velocidad, ¿qué configuración mecánica adopta la multiplicadora y cómo se amortiguan las reacciones del par torsor?',
    questionType: 'multiple-choice',
    options: [
      { id: 'a', text: 'Una etapa epicicloidal planetaria acoplada a un tren de engranajes helicoidales; los brazos de reacción al bastidor disponen de amortiguadores elásticos (silentblocks)', isCorrect: true, technicalRationale: 'Correcto. Los planetarios soportan el enorme par de entrada del rotor lento (15-20 rpm) y los brazos de reacción con elastómeros absorben los choques de par torsor hacia el bastidor.' },
      { id: 'b', text: 'Un variador continuo por correa trapezoidal conectado directamente al buje', isCorrect: false, technicalRationale: 'Inviable para transmitir potencias de megavatios.' },
      { id: 'c', text: 'Un sistema de engranajes rectos sin lubricación ni sensores de temperatura', isCorrect: false, technicalRationale: 'La multiplicadora requiere lubricación forzada y filtrado doble de aceite para evitar averías catastróficas.' },
      { id: 'd', text: 'Un rotor de jaula de ardilla montado dentro de la multiplicadora', isCorrect: false, technicalRationale: 'La jaula de ardilla es parte del generador eléctrico, no de la multiplicadora.' },
    ],
    explanation: 'El manual Paraninfo (Págs. 53 y 73) detalla que la multiplicadora combina etapa planetaria y tren helicoidal para maximizar eficiencia y minimizar ruido, fijándose al bastidor mediante dos brazos de reacción con soportes elásticos.',
    paraninfoPage: 'Pág. 53 y Pág. 73',
    points: 250,
    budgetImpact: 15000,
  },
  {
    id: 'q8_frenos_seguridad',
    componentId: 'comp_freno_disco',
    title: 'Sistemas de Frenado: Aerodinámico vs Freno Mecánico',
    prompt: 'Durante la operación de un aerogenerador a velocidad de corte (viento > 25 m/s) o parada de emergencia, ¿cuál es el procedimiento de frenado correcto según la normativa y el libro de texto?',
    questionType: 'defect-diagnostics',
    options: [
      { id: 'a', text: 'Frenado primario aerodinámico girando las 3 palas a posición de bandera (90°); el freno mecánico de disco solo actúa en parada final o como respaldo', isCorrect: true, technicalRationale: 'Correcto. La inercia del rotor de 80-120 m es gigantesca. Aplicar el freno de disco en giro rápido provocaría destrucción térmica del disco y riesgo de incendio.' },
      { id: 'b', text: 'Bloqueo instantáneo con el freno de disco en el eje rápido sin variar el ángulo de palas', isCorrect: false, technicalRationale: 'Peligrosísimo. Provocaría sobrecalentamiento brutal, rotura de dientes de la multiplicadora o incendio en góndola.' },
      { id: 'c', text: 'Invertir el sentido de giro de las motorreductoras de yaw para poner el rotor a sotavento', isCorrect: false, technicalRationale: 'El sistema de yaw no está diseñado para frenar la rotación del rotor y generaría torsiones destructivas.' },
      { id: 'd', text: 'Cortocircuitar los bornes del generador a tierra de forma inmediata', isCorrect: false, technicalRationale: 'Generaría un cortocircuito violento que destruiría devanados y convertidores.' },
    ],
    explanation: 'El manual (Págs. 54 y 74) resalta que el freno primario es aerodinámico con triple redundancia mediante puesta en bandera del pitch independiente. El freno de disco en eje rápido es solo freno de aparcamiento o fallo del pitch.',
    paraninfoPage: 'Págs. 54 y 74',
    points: 250,
    budgetImpact: 18000,
  },
  {
    id: 'q9_tecnologias_generador',
    componentId: 'comp_generador',
    title: 'Tipología de Generadores: SCIG vs DFIG vs PMSG',
    prompt: '¿Cuál es la principal ventaja técnica y operativa del generador asíncrono doblemente alimentado (DFIG) frente a un generador síncrono multipolo de imanes permanentes (PMSG)?',
    questionType: 'multiple-choice',
    options: [
      { id: 'a', text: 'El DFIG solo requiere un convertidor de frecuencia dimensionado para el 25-30% de la potencia nominal (circuito rotórico), abaratando la electrónica frente al convertidor de plena potencia del PMSG', isCorrect: true, technicalRationale: 'Exacto. El convertidor del DFIG maneja solo la potencia de deslizamiento del rotor (~30%), mientras que el generador síncrono direct-drive requiere convertidor al 100% de potencia nominal.' },
      { id: 'b', text: 'El DFIG no necesita multiplicadora ni mantenimiento de escobillas en los anillos', isCorrect: false, technicalRationale: 'Al revés: el DFIG sí requiere multiplicadora y tiene anillos rozantes. Es el PMSG direct-drive el que elimina la multiplicadora.' },
      { id: 'c', text: 'El DFIG entrega electricidad en corriente continua directa a la red de 132 kV', isCorrect: false, technicalRationale: 'Entrega corriente alterna trifásica a 690 V que se eleva a media tensión en el transformador.' },
      { id: 'd', text: 'El DFIG funciona únicamente a velocidad fija de 1500 rpm sin posibilidad de regulación', isCorrect: false, technicalRationale: 'El DFIG es el sistema por excelencia de velocidad variable.' },
    ],
    explanation: 'En las Págs. 55-59 y 75-79 se analizan las tipologías: la configuración V (DFIG) usa rotor bobinado con convertidor parcial (~30%), mientras que la configuración IX (PMSG direct-drive) elimina la multiplicadora pero precisa convertidor al 100% de la potencia.',
    paraninfoPage: 'Págs. 55-59 y 75-79',
    points: 300,
    budgetImpact: 20000,
  },
  {
    id: 'q10_rayos_drenajes_palas',
    componentId: 'comp_palas_rotor',
    title: 'Protección Contra Rayos y Drenaje en Palas',
    prompt: 'Las palas del aerogenerador alcanzan alturas de más de 120-150 metros. ¿Cómo se protege la pala contra los impactos de rayo y por qué son obligatorios los orificios de drenaje?',
    questionType: 'defect-diagnostics',
    options: [
      { id: 'a', text: 'Receptores metálicos en las puntas conducen el rayo por un cable de cobre interior hasta la raíz y de ahí a la estructura de la góndola y tierra; los orificios evitan acumulación de agua que se vaporizaría explosivamente con el rayo', isCorrect: true, technicalRationale: 'Correcto. Si entra humedad o agua condensada en la pala hueca, el calor instantáneo del rayo (miles de grados) hierve el agua provocando la explosión mecánica de la estructura de la pala.' },
      { id: 'b', text: 'Las palas se fabrican de aluminio macizo que conduce el rayo directamente al eje de la multiplicadora', isCorrect: false, technicalRationale: 'Las palas se fabrican de resinas epoxi y fibra de vidrio/carbono, nunca de aluminio macizo.' },
      { id: 'c', text: 'Se conectan a una antena parabólica en la veleta de cola', isCorrect: false, technicalRationale: 'Totalmente erróneo.' },
      { id: 'd', text: 'No necesitan protección porque las resinas compuestas son 100% aislantes dieléctricos indestructibles', isCorrect: false, technicalRationale: 'Un rayo perfora y destruye materiales compuestos no protegidos.' },
    ],
    explanation: 'La norma IEC 61024-24 y el libro Paraninfo (Págs. 52, 66 y 86) detallan la protección contra el rayo: receptores en pala, cable conductor de cobre hasta la raíz y drenajes para evitar retención de agua de lluvia o condensación.',
    paraninfoPage: 'Págs. 52, 66 y 86',
    points: 250,
    budgetImpact: 15000,
  },
];

// ==========================================
// FORMULA WORKBENCH / CALCULADORA TÉCNICA
// ==========================================
export const FORMULA_CALCULATION_TASKS: FormulaCalculationTask[] = [
  {
    id: 'calc_potencia_betz',
    title: 'Cálculo de Potencia Disponible y Límite de Betz',
    category: 'betz',
    prompt: 'Un aerogenerador tiene un rotor con diámetro D = 90 metros (radio R = 45 m). En el emplazamiento de Albacete, la densidad del aire es ρ = 1,225 kg/m³ y sopla un viento nominal de v = 12 m/s. Calcula la potencia máxima teórica aprovechable por el rotor según el Límite de Betz (Cp = 0,593) en kilovatios (kW).',
    formulaDisplay: 'P_bruta = 1/2 · ρ · (π · D² / 4) · v³  |  P_Betz = P_bruta · 0,593',
    givenData: [
      { label: 'Diámetro del rotor (D)', value: 90, unit: 'm' },
      { label: 'Densidad del aire (ρ)', value: 1.225, unit: 'kg/m³' },
      { label: 'Velocidad del viento (v)', value: 12, unit: 'm/s' },
      { label: 'Coeficiente Betz (Cp)', value: 0.593, unit: '-' },
    ],
    targetVariable: 'P_Betz',
    correctValue: 3995, // A = 6361.7 m²; P_bruta = 0.5 * 1.225 * 6361.7 * 1728 = 6,733,354 W ≈ 6733 kW. P_Betz = 6733 * 0.593 = 3993 - 4000 kW
    tolerance: 0.03, // 3%
    unit: 'kW',
    explanation: 'Paso 1: Área barrida A = π · 90² / 4 = 6.361,7 m². Paso 2: v³ = 12³ = 1.728 m³/s³. Paso 3: Potencia bruta = 0,5 · 1,225 · 6.361,7 · 1.728 = 6.733.354 W ≈ 6.733 kW. Paso 4: P_Betz = 6.733 kW · 0,593 = 3.993 kW (aprox. 4.000 kW = 4 MW).',
    paraninfoRef: 'Pág. 43-44 y 63-64',
    points: 400,
    budgetImpact: 25000,
  },
  {
    id: 'calc_altura_buje',
    title: 'Dimensionamiento de Altura de Buje (H)',
    category: 'altura_buje',
    prompt: 'Para un parque eólico con turbinas de rotor D = 82 metros, calcula la altura recomendada sobre el terreno del eje de la góndola (buje) según la fórmula técnica del manual Paraninfo H = 0,75 · D + 10.',
    formulaDisplay: 'H = 0,75 · D + 10  [metros]',
    givenData: [
      { label: 'Diámetro del rotor (D)', value: 82, unit: 'm' },
      { label: 'Constante aditiva', value: 10, unit: 'm' },
      { label: 'Factor proporcional', value: 0.75, unit: '-' },
    ],
    targetVariable: 'H',
    correctValue: 71.5,
    tolerance: 0.02,
    unit: 'm',
    explanation: 'H = 0,75 · 82 + 10 = 61,5 + 10 = 71,5 metros. Esto sitúa la punta inferior de la pala a 71,5 - 41 = 30,5 m del suelo, libre de obstáculos y rozamiento superficial.',
    paraninfoRef: 'Pág. 45 y 65',
    points: 300,
    budgetImpact: 18000,
  },
  {
    id: 'calc_presupuesto_pec',
    title: 'Cálculo de Presupuesto de Ejecución por Contrata (PEC)',
    category: 'presupuesto_pec',
    prompt: 'El Presupuesto de Ejecución Material (PEM) de la obra civil y montaje de 6 aerogeneradores asciende a 10.000.000 €. Conforme a la legislación de contratos y el manual Paraninfo, aplica 13% de Gastos Generales (GG), 6% de Beneficio Industrial (BI) y 21% de IVA. ¿Cuál es el Presupuesto de Ejecución por Contrata (PEC) total resultante en euros?',
    formulaDisplay: 'Base Imponible = PEM · (1 + 0,13 + 0,06) = PEM · 1,19  |  PEC = Base Imponible · 1,21',
    givenData: [
      { label: 'Presupuesto Ejecución Material (PEM)', value: 10000000, unit: '€' },
      { label: 'Gastos Generales (GG)', value: 13, unit: '%' },
      { label: 'Beneficio Industrial (BI)', value: 6, unit: '%' },
      { label: 'IVA reglamentario', value: 21, unit: '%' },
    ],
    targetVariable: 'PEC',
    correctValue: 14399000,
    tolerance: 0.01,
    unit: '€',
    explanation: 'Paso 1: Suma de GG (13%) + BI (6%) = 19%. Base imponible = 10.000.000 € · 1,19 = 11.900.000 €. Paso 2: Aplicación del 21% de IVA: 11.900.000 € · 1,21 = 14.399.000 €.',
    paraninfoRef: 'Pág. 121 y 141 (Capítulo 5 del Presupuesto)',
    points: 400,
    budgetImpact: 30000,
  },
];

// ==========================================
// RETO 2: CLASIFICACIÓN DOCUMENTAL COMPLETA (16 ÍTEMS)
// ==========================================
export const PROJECT_DOCUMENTS: ProjectDocumentItem[] = [
  // DOC 1: MEMORIA Y ANEJOS
  {
    id: 'doc_anejo_geotecnico',
    title: 'Anejo nº 2: Estudio Geotécnico y Geológico',
    description: 'Ensayos de calicatas, tomografía eléctrica y capacidad portante del terreno (σadm ≥ 2 kg/cm²) para diseño de zapatas.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Obligatorio según CTE y fundamental para evitar asientos diferenciales en zapatas de aerogenerador.',
    technicalTip: 'Los cálculos y justificaciones geotécnicas de soporte forman parte de los Anejos de la Memoria (Documento nº 1).'
  },
  {
    id: 'doc_anejo_seguridad',
    title: 'Anejo nº 6: Estudio Básico de Seguridad y Salud',
    description: 'Identificación de riesgos de obra (caídas de altura > 2 m, riesgo eléctrico de MT/AT, izado con grúa) y presupuesto de EPIs según RD 1627/1997.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Mandato estricto por la Ley 31/1995 de PRL y RD 1627/1997.',
    technicalTip: 'El EBSS acompaña a la Memoria en fase de proyecto para fijar las directrices de prevención antes del inicio de obra.'
  },
  {
    id: 'doc_anejo_impacto_ambiental',
    title: 'Anejo nº 5: Estudio de Impacto Ambiental (EIA)',
    description: 'Medidas correctoras para avifauna, desbroce selectivo, salvapájaros en tendidos y restitución de tierra vegetal en acopios.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Exigido por la Ley 21/2013 y evaluado por el órgano ambiental de Castilla-La Mancha.',
    technicalTip: 'Los estudios de afección física, biótica y socioeconómica forman el Anejo nº 5 de la Memoria.'
  },
  {
    id: 'doc_anejo_calculos_electricos',
    title: 'Anejo nº 1: Cálculos Justificativos Eléctricos',
    description: 'Dimensionamiento de conductores subterráneos de MT (20 kV), intensidades de cortocircuito, caída de tensión y red general de tierras.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Exigido por el Reglamento de Alta Tensión (RD 337/2014) y REBT (RD 842/2002).',
    technicalTip: 'Contiene las fórmulas físicas, intensidades admisibles y verificación de los conductores de aluminio RHZ1-OL.'
  },
  {
    id: 'doc_anejo_viales',
    title: 'Anejo nº 3: Diseño de Viales y Plataformas',
    description: 'Estudios topográficos, gálibos de transporte de palas, radios de curvatura mínimos (R=20m) y cálculo de capas de firme de zahorra.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Documento justificativo de obra civil para transporte especial de componentes eólicos.',
    technicalTip: 'Justifica los parámetros geométricos y mecánicos de la explanada de montaje.'
  },
  {
    id: 'doc_anejo_cimentacion',
    title: 'Anejo nº 4: Cimentación de la Torre',
    description: 'Memoria de cálculo del momento flector, esfuerzo cortante, jaula de pernos de anclaje, virola cilíndrica y chapas de nivelación.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Garantiza la estabilidad estructural del aerogenerador frente a vuelco y fatiga dinámica.',
    technicalTip: 'Todo cálculo estructural de cimentación se agrupa como Anejo a la Memoria.'
  },
  {
    id: 'doc_anejo_expropiaciones',
    title: 'Anejo nº 13: Expropiaciones y Parcelario',
    description: 'Relación de propietarios, parcelas catastrales afectadas, ocupación definitiva para zapatas y ocupación temporal para zanjas y acopios.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Requisito preceptivo ante la Dirección General de Energía para la declaración de Utilidad Pública.',
    technicalTip: 'El parcelario y las fichas de expropiación forman el Anejo 13 de la Memoria.'
  },
  {
    id: 'doc_anejo_plan_obras',
    title: 'Anejo nº 15: Plan de Obras y Cronograma',
    description: 'Secuencia lógica de tajos, red de precedencias múltiples y previsión de inversión mensual para garantizar el plazo contractual de 12 meses.',
    correctCategory: 'doc1_memoria',
    subType: 'Anejo a la Memoria',
    importanceLegal: 'Vincula la planificación temporal de trabajos ofertada por el contratista.',
    technicalTip: 'El plan de obras justificativo y su metodología de avance forman el Anejo 15 de la Memoria.'
  },

  // DOC 2: PLANOS
  {
    id: 'doc_plano_plataforma',
    title: 'Plano 2.3: Plataforma de Montaje de Aerogenerador',
    description: 'Esquema gráfico acotado con zona de grúa principal (50 m, 5 kg/cm²), zona de pluma (70x8 m), zona de palas (2 kg/cm²) y vial de 5 m.',
    correctCategory: 'doc2_planos',
    subType: 'Grupo 1: Generales de Parque y Obra Civil',
    importanceLegal: 'Plano vinculante para la ejecución de la obra civil y posicionamiento de grúas.',
    technicalTip: 'Todos los planos gráficos acotados y firmados forman el Documento nº 2.'
  },
  {
    id: 'doc_plano_zanja_mt',
    title: 'Plano 2.5: Secciones Tipo de Vial y Zanjas de MT',
    description: 'Detalle constructivo de zanja entubada/enterrada (0.64 x 0.88 m), lecho de arena de río, ladrillos/placas PVC, cable de tierra y cinta amarilla.',
    correctCategory: 'doc2_planos',
    subType: 'Grupo 1: Generales de Parque y Obra Civil',
    importanceLegal: 'Define la forma exacta de colocación de cables conforme a normas UNESA y REBT.',
    technicalTip: 'Las secciones tipo de zanjas y perfiles transversales son planos de obra civil (Doc 2).'
  },
  {
    id: 'doc_plano_subestacion_general',
    title: 'Plano 2.10: Disposición General Planta con Aparellaje',
    description: 'Planta con distribución física en subestación de trafos de tensión, seccionadores, trafos de intensidad, interruptores y transformador de potencia.',
    correctCategory: 'doc2_planos',
    subType: 'Grupo 4: Instalaciones Electromecánicas',
    importanceLegal: 'Plano ejecutivo de montaje para instaladores de alta tensión.',
    technicalTip: 'Las plantas y alzados electromecánicos forman el Grupo 4 de Planos.'
  },
  {
    id: 'doc_plano_unifilar',
    title: 'Plano 2.33: Esquema Unifilar General de Subestación',
    description: 'Representación simbólica normalizada de aparamenta (132/20 kV), seccionadores 89, interruptores 52, trafos de medida y relés de protección.',
    correctCategory: 'doc2_planos',
    subType: 'Grupo 7: Planos de Ingeniería de Control',
    importanceLegal: 'Base técnica para homologación ante Red Eléctrica de España (REE) y distribuidora.',
    technicalTip: 'Los esquemas unifilares de subestación y celdas pertenecen al Documento nº 2 (Planos).'
  },

  // DOC 3: PLIEGO DE CONDICIONES
  {
    id: 'doc_pliego_materiales_zahorra',
    title: 'Pliego: Prescripciones Técnicas de Zahorras y Hormigones',
    description: 'Exigencia de compactación al 95% del Proctor modificado para zahorra artificial en viales y resistencia fck=250 daN/cm² para hormigón en masa.',
    correctCategory: 'doc3_pliego',
    subType: 'Condiciones de Índole Técnica y de Ejecución',
    importanceLegal: 'Regula contractualmente las calidades exigidas a los materiales suministrados.',
    technicalTip: 'El Pliego de Condiciones Particulares (Doc nº 3) fija cómo deben ser los materiales y qué ensayos de laboratorio deben superar.'
  },
  {
    id: 'doc_pliego_facultativo',
    title: 'Pliego: Atribuciones de la Dirección Facultativa',
    description: 'Obligaciones del contratista, funciones del Director de Obra y del Coordinador de Seguridad, libro de órdenes y régimen de recepción provisional.',
    correctCategory: 'doc3_pliego',
    subType: 'Condiciones de Índole Facultativa',
    importanceLegal: 'Regula la relación contractual y técnica entre el promotor y el constructor.',
    technicalTip: 'Todo lo relativo a órdenes, penalizaciones y resolución de discrepancias en obra está en el Pliego (Doc 3).'
  },

  // DOC 4: PRESUPUESTO
  {
    id: 'doc_presupuesto_cuadro1',
    title: 'Cuadro de Precios Unitarios nº 1 (Precios en Letra)',
    description: 'Precio desglosado en letra y número por cada unidad de obra (ej: m³ de excavación en zanja = doce euros con cuarenta céntimos).',
    correctCategory: 'doc4_presupuesto',
    subType: 'Capítulo 2 del Presupuesto',
    importanceLegal: 'Prevalece legalmente el precio en letra ante cualquier contradicción numérica.',
    technicalTip: 'Los cuadros de precios 1 y 2 forman el núcleo de valoración del Documento nº 4 (Presupuesto).'
  },
  {
    id: 'doc_presupuesto_resumen',
    title: 'Resumen General del Presupuesto por Contrata (PEC)',
    description: 'Suma de presupuestos parciales (PEM) + 13% Gastos Generales + 6% Beneficio Industrial + 21% IVA para obtener el importe final contractual.',
    correctCategory: 'doc4_presupuesto',
    subType: 'Capítulo 5 del Presupuesto',
    importanceLegal: 'Determina el importe económico total contractual de licitación y adjudicación.',
    technicalTip: 'El resumen general aplica los coeficientes económicos reglamentarios sobre el PEM.'
  },
];

// ==========================================
// RETO 3: INTERPRETACIÓN DE PLANOS Y LAYOUT (8 HOTSPOTS)
// ==========================================
export const BLUEPRINT_HOTSPOTS: BlueprintHotspot[] = [
  // FIGURA 2.3: PLATAFORMA DE MONTAJE (Págs. 4 y 102)
  {
    id: 'hotspot_grua_principal',
    blueprintType: 'plataforma_montaje',
    xPercent: 44,
    yPercent: 40,
    label: 'Plataforma Grúa Principal (50 m)',
    title: 'Zona de Apoyo y Trabajo de Grúa de Gran Tonelaje',
    technicalDescription: 'Longitud de 50,00 m nivelada al 0% con zahorra compactada al 95% del Proctor modificado y capacidad portante mínima de 5 kg/cm².',
    question: {
      prompt: 'Según el plano de plataforma de montaje de aerogeneradores (Figura 2.3), ¿qué capacidad portante y compactación mínima debe garantizar la zona de la grúa principal?',
      options: [
        { id: 'a', text: 'Capacidad portante de 5 kg/cm² con zahorra compactada al 95% del Proctor modificado', isCorrect: true, rationale: 'Correcto. Las grúas móviles de 500-1000 t ejercen presiones de apoyo enormes a través de sus orugas/estabilizadores; 5 kg/cm² al 95% Proctor es la prescripción técnica.' },
        { id: 'b', text: 'Capacidad portante de 2 kg/cm² sin compactación especial', isCorrect: false, rationale: 'Incorrecto. 2 kg/cm² es suficiente para el acopio de palas ligeras, pero peligroso e insuficiente para la grúa principal.' },
        { id: 'c', text: 'Suelo natural con pendiente del 10% para escorrentía', isCorrect: false, rationale: 'La zona de la grúa debe estar rigurosamente nivelada al 0% para evitar vuelcos.' },
        { id: 'd', text: 'Hormigonado masivo de 1 metro de espesor en toda la plataforma', isCorrect: false, rationale: 'No se hormigona toda la plataforma de 50x40 m por motivos económicos y ambientales; se utiliza zahorra artificial compactada.' },
      ],
      correctExplanation: 'La zona de la grúa principal soporta el peso de grúas tipo Liebherr de cientos de toneladas; el plano especifica 50 m nivelados al 0% y capacidad portante de 5 kg/cm² (Pág. 4 y 102).',
      bookFigureRef: 'Figura 2.3 (Pág. 4 y 102)',
    }
  },
  {
    id: 'hotspot_montaje_pluma',
    blueprintType: 'plataforma_montaje',
    xPercent: 82,
    yPercent: 30,
    label: 'Zona Brazo de Grúa (70 x 8 m)',
    title: 'Corredor de Ensamblaje de la Pluma Celosía',
    technicalDescription: 'Espacio despejado longitudinal de 70,00 metros por 8,00 metros de ancho, sin obstáculos, destinado al ensamblaje horizontal del plumín y pluma de celosía.',
    question: {
      prompt: '¿Por qué el layout de la plataforma reserva un corredor rectilíneo de 70 metros x 8 metros adyacente a la grúa?',
      options: [
        { id: 'a', text: 'Para ensamblar en el suelo los tramos de celosía del brazo de la grúa antes de su elevación', isCorrect: true, rationale: 'Correcto. Las grandes grúas telescópicas/celosía necesitan montar su pluma extendida sobre el terreno antes de bascular a posición vertical de trabajo.' },
        { id: 'b', text: 'Para ubicar las casetas de comedor y aseos del personal', isCorrect: false, rationale: 'Las casetas e instalaciones auxiliares se ubican en la entrada o zonas no operativas.' },
        { id: 'c', text: 'Para enterrar la línea de evacuación de 132 kV', isCorrect: false, rationale: 'La zanja discurre por el vial de acceso, no cruzando el espacio de montaje de la grúa.' },
        { id: 'd', text: 'Para acopiar áridos y cemento para el hormigonado in situ', isCorrect: false, rationale: 'En parques de gran potencia el hormigón procede de plantas externas dosificadas en cubas.' },
      ],
      correctExplanation: 'Las grúas de gran tonelaje requieren un área despejada y libre de obstáculos para armar la pluma de hasta 100-135 m antes de alzarla (Pág. 4, 102 y 249).',
      bookFigureRef: 'Figura 2.3 (Pág. 4 y 102)',
    }
  },
  {
    id: 'hotspot_vial_curvatura',
    blueprintType: 'plataforma_montaje',
    xPercent: 28,
    yPercent: 26,
    label: 'Vial de Acceso: R=20m y ancho 5m',
    title: 'Geometría y Radios de Curvatura de Viales',
    technicalDescription: 'Vial de servicio de 5,00 m de ancho con sobreancho en curvas y radio interior mínimo R=20 m para trailers de transporte especial de palas.',
    question: {
      prompt: 'Al diseñar los caminos de acceso según el Anejo nº 3 y plano 2.3, ¿cuál es el radio de curvatura mínimo (R) para permitir el giro de camiones con palas eólicas de más de 40-50 metros?',
      options: [
        { id: 'a', text: 'R = 20 metros (con sobreancho en curvas y pendientes moderadas)', isCorrect: true, rationale: 'Exacto. Como se indica explícitamente en el plano de plataforma (R=20) y en el Anejo 3, es el mínimo geométrico para trailers especiales con eje trasero autodireccional.' },
        { id: 'b', text: 'R = 5 metros, igual que en carreteras urbanas', isCorrect: false, rationale: 'Un camión de 50 metros encallaría inmediatamente con R=5m.' },
        { id: 'c', text: 'R = 100 metros obligatorio en todas las curvas', isCorrect: false, rationale: 'Sería inviable topográficamente en zonas de montaña y generaría un desmonte inaceptable.' },
        { id: 'd', text: 'No se exige radio mínimo porque las palas siempre se transportan en helicóptero', isCorrect: false, rationale: 'El transporte terrestre es el método estándar y generalizado en España.' },
      ],
      correctExplanation: 'El plano 2.3 fija R=20 m de radio en curvas del vial para permitir el paso de transportes pesados de palas y tramos de torre con cabezas tractoras especiales (Pág. 4 y 117).',
      bookFigureRef: 'Figura 2.3 y Anejo nº 3 (Pág. 4 y 97)',
    }
  },

  // FIGURA 2.5: SECCIONES TIPO DE ZANJA MT Y VIALES (Págs. 6 y 104)
  {
    id: 'hotspot_zanja_cama_arena',
    blueprintType: 'seccion_zanja_mt',
    xPercent: 32,
    yPercent: 62,
    label: 'Lecho de Arena de Río (10 cm + 185 mm)',
    title: 'Asiento y Protección Dieléctrica del Cable MT',
    technicalDescription: 'Capa de arena fina de río de 10 cm bajo los cables y relleno envolvente de 185 mm para evitar que aristas de rocas dañen el aislamiento XLPE.',
    question: {
      prompt: 'En la sección tipo de zanja para canalización de Media Tensión (Figura 2.5), ¿qué material y espesor se coloca inmediatamente rodeando a los cables de potencia?',
      options: [
        { id: 'a', text: 'Arena fina de río (10 cm de asiento previo y relleno hasta 185 mm sobre cables)', isCorrect: true, rationale: 'Correcto. La arena de río lavada carece de piedras punzantes, amortigua esfuerzos mecánicos y facilita la disipación térmica.' },
        { id: 'b', text: 'Hormigón armado con mallazo electrosoldado de 50 cm', isCorrect: false, rationale: 'El hormigonado directo dificultaría la disipación térmica y futuras reparaciones o sustituciones.' },
        { id: 'c', text: 'Tierra vegetal sin cribar procedente del desbroce', isCorrect: false, rationale: 'La tierra vegetal contiene materia orgánica y piedras que perforarían la cubierta de poliolefina.' },
        { id: 'd', text: 'Zahorra con piedras de tamaño mayor a 50 mm', isCorrect: false, rationale: 'Las piedras grandes dañarían el conductor durante la compactación.' },
      ],
      correctExplanation: 'La norma técnica UNE/UNESA y la Figura 2.5 prescriben 10 cm de cama de arena de río y posterior cobertura de 185 mm antes de colocar las protecciones mecánicas (Págs. 6, 59 y 68).',
      bookFigureRef: 'Figura 2.5 (Págs. 6, 68 y 104)',
    }
  },
  {
    id: 'hotspot_zanja_proteccion_mecanica',
    blueprintType: 'seccion_zanja_mt',
    xPercent: 32,
    yPercent: 44,
    label: 'Protección Mecánica y Señalización',
    title: 'Placas de PVC Rígido / Ladrillos y Cinta Amarilla',
    technicalDescription: 'Placas de PVC rígido o ladrillo cerámico sobre la arena y cinta de señalización de color amarillo de advertencia a 20-30 cm de la superficie.',
    question: {
      prompt: '¿Cuál es la función reglamentaria de la cinta de señalización de color amarillo situada en el relleno superior de la zanja?',
      options: [
        { id: 'a', text: 'Avisar a cualquier excavadora o personal futuro de la presencia de cables de MT en tensión antes de alcanzar la protección física', isCorrect: true, rationale: 'Exacto. Si en el futuro se realizan excavaciones, la cinta amarilla alerta de la línea de alta/media tensión antes de golpear las canalizaciones.' },
        { id: 'b', text: 'Aislar térmicamente el cable para que no pierda calor', isCorrect: false, rationale: 'No tiene propiedades térmicas; es una medida de seguridad preventiva visual.' },
        { id: 'c', text: 'Conducir la corriente de defecto a tierra en caso de cortocircuito', isCorrect: false, rationale: 'La cinta es plástica, no conductora. La tierra la conduce el cable de cobre desnudo del fondo.' },
        { id: 'd', text: 'Impedir que el agua de lluvia penetre en la zanja', isCorrect: false, rationale: 'No es impermeable ni estanca al agua superficial.' },
      ],
      correctExplanation: 'El REBT y la normativa de seguridad obligan al empleo de cinta señalizadora amarilla continua sobre las líneas eléctricas subterráneas para prevenir cortes accidentales (Pág. 6, 59 y 104).',
      bookFigureRef: 'Figura 2.5 (Pág. 6 y 104)',
    }
  },
  {
    id: 'hotspot_zanja_tierra_fondo',
    blueprintType: 'seccion_zanja_mt',
    xPercent: 24,
    yPercent: 90,
    label: 'Red General de Tierras (Cobre Desnudo)',
    title: 'Conductor Desnudo de Cobre en Fondo de Zanja',
    technicalDescription: 'Cable de cobre desnudo de sección calculada (mínimo 50 mm²) tendido longitudinalmente a lo largo de las zanjas uniendo todas las zapatas a la subestación.',
    question: {
      prompt: 'En el fondo de la zanja discurre un cable de cobre desnudo. ¿Cuál es su misión técnica según la Unidad 1 y el Anejo nº 4?',
      options: [
        { id: 'a', text: 'Crear una red de tierras única y continua en todo el parque para disipar corrientes de rayo y limitar tensiones de paso y contacto', isCorrect: true, rationale: 'Correcto. La normativa exige un sistema de tierras único interconectado que enlace zapatas, centros de seccionamiento y subestación para igualar potenciales.' },
        { id: 'b', text: 'Transportar la energía en baja tensión para los servicios auxiliares', isCorrect: false, rationale: 'Es cobre desnudo puesto a tierra; no puede llevar tensión de servicio.' },
        { id: 'c', text: 'Transmitir las señales de fibra óptica al SCADA central', isCorrect: false, rationale: 'La fibra óptica va en un tubo separado o incorporada en cables de telecomunicaciones.' },
        { id: 'd', text: 'Servir como tensor mecánico para que los cables de MT no se muevan', isCorrect: false, rationale: 'No es un tensor mecánico, es el conductor de protección equipotencial.' },
      ],
      correctExplanation: 'La red de tierras en el sistema colector consiste en un bucle conductor de cobre desnudo en el fondo de las zanjas que garantiza la equipotencialidad de todo el parque (Pág. 38 y 58).',
      bookFigureRef: 'Figura 2.5 y Pág. 38/58',
    }
  },

  // FIGURA 2.7 / 2.11 / 2.19: OBRA CIVIL SUBESTACIÓN
  {
    id: 'hotspot_subestacion_portico',
    blueprintType: 'plataforma_montaje', // mapped to civil/substation view
    xPercent: 18,
    yPercent: 78,
    label: 'Cimentación y Virola de Zapata',
    title: 'Cimentación de Torre y Pasacables de MT',
    technicalDescription: 'Detalle de zapata de hormigón armado con virola cilíndrica embebida y tubos de PVC de 160 mm para salida de cables de MT y fibra óptica.',
    question: {
      prompt: 'En el plano de disposición de cimentación de la torre (Figura 2.4 y 2.7), ¿qué tolerancia máxima de desviación en nivelación horizontal se admite en la virola de asiento?',
      options: [
        { id: 'a', text: 'Desviación máxima inferior a 1 mm por metro (0,1%), ajustada con mortero sin retracción', isCorrect: true, rationale: 'Correcto. Una pequeña inclinación en la base de la zapata se amplifica geométricamente a 80-100 metros de altura, produciendo momentos de vuelco peligrosos.' },
        { id: 'b', text: 'Desviación de hasta 5 cm admitida por la elasticidad del acero', isCorrect: false, rationale: 'Una desviación de 5 cm en la base provocaría que la torre en cabeza se desplazara varios metros de la vertical, inutilizando el aerogenerador.' },
        { id: 'c', text: 'No se controla la horizontalidad porque las motorreductoras de yaw la corrigen', isCorrect: false, rationale: 'El sistema de yaw orienta la góndola horizontalmente sobre la corona, no corrige la inclinación de la torre.' },
        { id: 'd', text: 'Se nivela a ojo mediante cuñas de madera provisionales', isCorrect: false, rationale: 'Inadmisible en obras de ingeniería de precisión.' },
      ],
      correctExplanation: 'La virola debe nivelarse con precisión milimétrica mediante niveles topográficos ópticos/láser y calzos regulables antes del hormigonado y relleno con grout epoxi (Pág. 5, 245 y 265).',
      bookFigureRef: 'Figura 2.4 y 2.7 (Pág. 5 y 103)',
    }
  },

  // FIGURA 2.33 / 2.34: UNIFILAR SUBESTACIÓN Y PROTECCIONES (Págs. 34-35 y 170-171)
  {
    id: 'hotspot_subestacion_seccionador',
    blueprintType: 'unifilar_subestacion',
    xPercent: 55,
    yPercent: 25,
    label: 'Seccionador con PAT (89-TL)',
    title: 'Seccionador de Línea 145 kV con Puesta a Tierra',
    technicalDescription: 'Aparato mecánico de maniobra que asegura un corte visible en el circuito y permite conectar a tierra la línea durante trabajos de mantenimiento con descargo.',
    question: {
      prompt: 'En el esquema unifilar de la subestación (Figura 2.33), ¿cuál es la diferencia fundamental entre el Seccionador (89) y el Interruptor Automático (52-L)?',
      options: [
        { id: 'a', text: 'El interruptor (52) abre y corta corrientes de cortocircuito bajo carga, mientras que el seccionador (89) solo maniobra sin carga para garantizar corte visible', isCorrect: true, rationale: 'Correcto. Abrir un seccionador bajo carga generaría un arco voltaico destructivo. La secuencia segura es abrir primero el interruptor y luego el seccionador.' },
        { id: 'b', text: 'El seccionador transforma la tensión de 132 kV a 20 kV', isCorrect: false, rationale: 'Esa es la función exclusiva del transformador de potencia.' },
        { id: 'c', text: 'El interruptor solo funciona con corriente continua de 125 V', isCorrect: false, rationale: 'El interruptor de alta tensión corta las tres fases de 132 kV alternas en SF6.' },
        { id: 'd', text: 'Ambos aparatos son idénticos y se abren indistintamente', isCorrect: false, rationale: 'Error muy grave en seguridad eléctrica de alta tensión.' },
      ],
      correctExplanation: 'El interruptor en SF6 extingue corrientes elevadas de falta. El seccionador garantiza la apertura visible de seguridad para las "5 Reglas de Oro" antes de poner a tierra (Págs. 34, 72, 91 y 170).',
      bookFigureRef: 'Figura 2.33 y 2.34 (Págs. 34 y 170)',
    }
  },
  {
    id: 'hotspot_subestacion_reles_ansi',
    blueprintType: 'unifilar_subestacion',
    xPercent: 55,
    yPercent: 60,
    label: 'Relés de Protección ANSI (50/51, 87, 64N)',
    title: 'Unidad de Protección y Telemando SCADA',
    technicalDescription: 'Cuadros de control con relés de sobreintensidad instantánea/temporizada (50/51), protección diferencial (87) y falta a tierra (64N) conectados a trafos de medida.',
    question: {
      prompt: 'En la simbología normalizada del esquema de protecciones de la subestación (Figura 2.34), ¿a qué función corresponde el código ANSI 50/51 y el código 87?',
      options: [
        { id: 'a', text: '50/51: Sobreintensidad instantánea y temporizada; 87: Protección diferencial del transformador', isCorrect: true, rationale: 'Correcto. La función 50/51 detecta sobreintensidades de fase y cortocircuitos; la función 87 compara corrientes entrantes y salientes del transformador para disparar ante faltas internas.' },
        { id: 'b', text: '50/51: Termostato de aceite; 87: Sensor de velocidad del anemómetro', isCorrect: false, rationale: 'Los códigos ANSI corresponden a la estandarización internacional de relés eléctricos.' },
        { id: 'c', text: '50/51: Contador de energía activa; 87: Interruptor horario de iluminación', isCorrect: false, rationale: 'Incorrecto.' },
        { id: 'd', text: '50/51: Indicador de presencia de tensión capacitivo; 87: Manómetro de SF6', isCorrect: false, rationale: 'Incorrecto.' },
      ],
      correctExplanation: 'La norma internacional ANSI y los esquemas unifilares de Paraninfo (Pág. 34, 151 y 171) codifican los relés de sobreintensidad como 50 (instantáneo) y 51 (temporizado), y el relé diferencial de protección como 87.',
      bookFigureRef: 'Figura 2.34 (Pág. 35 y 171)',
    }
  },
];

// ==========================================
// RETO 4: TAREAS GANTT (12 TAREAS EN RUTA CRÍTICA)
// ==========================================
export const GANTT_TASKS_POOL: GanttTask[] = [
  {
    id: 'task_01_replanteo',
    code: 'ACT-01',
    name: '1. Trabajos preliminares, replanteo topográfico y accesos provisionales',
    category: 'obra_civil',
    durationWeeks: 3,
    dependencies: [],
    correctOrderIndex: 1,
    isCriticalPath: true,
    resourceRequired: 'Topógrafo + Estación total + Desbrozadoras',
    safetyRisk: 'Tránsito de maquinaria en terreno virgen, interferencias arqueológicas',
    clmRegulationNote: 'Acta de replanteo previa y verificación de desbroce con agentes medioambientales de C-LM.',
  },
  {
    id: 'task_02_viales',
    code: 'ACT-02',
    name: '2. Apertura de viales internos y plataformas de montaje (zahorra 95% Proctor)',
    category: 'obra_civil',
    durationWeeks: 5,
    dependencies: ['task_01_replanteo'],
    correctOrderIndex: 2,
    isCriticalPath: true,
    resourceRequired: 'Bulldozer + Motoniveladora + Rodillos compactadores',
    safetyRisk: 'Vuelco de maquinaria pesada en taludes, polvo y emisión de partículas',
    clmRegulationNote: 'Riego sistemático de caminos para evitar nubes de polvo sobre cultivos colindantes.',
  },
  {
    id: 'task_03_cimentaciones',
    code: 'ACT-03',
    name: '3. Excavación, armado de ferralla y hormigonado de zapatas con virola',
    category: 'obra_civil',
    durationWeeks: 6,
    dependencies: ['task_02_viales'],
    correctOrderIndex: 3,
    isCriticalPath: true,
    resourceRequired: 'Retroexcavadoras + Camiones hormigonera + Grúa auxiliar',
    safetyRisk: 'Caídas en pozos de excavación, atrapamientos en encofrados y desmoronamientos',
    clmRegulationNote: 'Control de probetas a 28 días (fck ≥ 25 MPa) y nivelación de virola < 1 mm/m antes de fraguado.',
  },
  {
    id: 'task_04_zanjas_tierras',
    code: 'ACT-04',
    name: '4. Apertura de zanjas, tendido de cable de tierra y cables de MT (20 kV)',
    category: 'electromecanico',
    durationWeeks: 5,
    dependencies: ['task_02_viales'],
    correctOrderIndex: 4,
    isCriticalPath: false,
    resourceRequired: 'Zanjadora + Camión grúa con bobinas + Cama de arena de río',
    safetyRisk: 'Tirones mecánicos en desenrollado de bobinas pesadas, manipulación de conductores',
    clmRegulationNote: 'Conductor de Cu desnudo de sección calculada en fondo y cinta señalizadora amarilla superior.',
  },
  {
    id: 'task_05_obra_subestacion',
    code: 'ACT-05',
    name: '5. Obra civil de Subestación AT/MT y Edificio de Control',
    category: 'subestacion',
    durationWeeks: 7,
    dependencies: ['task_02_viales'],
    correctOrderIndex: 5,
    isCriticalPath: false,
    resourceRequired: 'Encofradores + Albañilería + Hormigonado de bancadas trafo con foso de recogida de aceite',
    safetyRisk: 'Riesgos generales de construcción y cimentaciones de pórticos de alta tensión',
    clmRegulationNote: 'Foso estanco para recogida del 100% del aceite dieléctrico del transformador de 25 MVA.',
  },
  {
    id: 'task_06_montaje_torre',
    code: 'ACT-06',
    name: '6. Transporte e izado por tramos de las torres tubulares de acero',
    category: 'electromecanico',
    durationWeeks: 4,
    dependencies: ['task_03_cimentaciones'],
    correctOrderIndex: 6,
    isCriticalPath: true,
    resourceRequired: 'Grúa principal telescópica (500 t) + Llaves dinamométricas de alto par',
    safetyRisk: 'Trabajo en altura (>60-100 m), caída de objetos, balanceo de piezas por ráfagas de viento',
    clmRegulationNote: 'Prohibido izado con vientos superiores a 9-10 m/s o tormentas eléctricas (RD 1627/97).',
  },
  {
    id: 'task_07_montaje_gondola',
    code: 'ACT-07',
    name: '7. Izado y posicionado de la góndola (nacelle), tren de potencia y transformador',
    category: 'electromecanico',
    durationWeeks: 3,
    dependencies: ['task_06_montaje_torre'],
    correctOrderIndex: 7,
    isCriticalPath: true,
    resourceRequired: 'Grúa principal telescópica + Eslingas certificadas + Técnicos especialistas',
    safetyRisk: 'Sobrecargas dinámicas en gancho, atrapamiento en corona yaw, ajuste en altura',
    clmRegulationNote: 'Alineación de brida superior y apriete controlado por tensión hidráulica de pernos.',
  },
  {
    id: 'task_08_ensamblaje_rotor',
    code: 'ACT-08',
    name: '8. Ensamblaje del rotor en suelo (buje + 3 palas) e izado conjunto con grúa y retenida',
    category: 'electromecanico',
    durationWeeks: 3,
    dependencies: ['task_07_montaje_gondola'],
    correctOrderIndex: 8,
    isCriticalPath: true,
    resourceRequired: 'Grúa principal + Grúa de retenida en pala + Fajas de izado',
    safetyRisk: 'Paso crítico de horizontal a vertical del rotor, efecto vela sobre las palas de 60m',
    clmRegulationNote: 'Conexión del circuito hidráulico de pitch y acumuladores de nitrógeno a bandera inmediata.',
  },
  {
    id: 'task_09_aparellaje_subestacion',
    code: 'ACT-09',
    name: '9. Montaje de aparellaje exterior de subestación, pórticos y celdas MT en base',
    category: 'subestacion',
    durationWeeks: 4,
    dependencies: ['task_05_obra_subestacion', 'task_04_zanjas_tierras'],
    correctOrderIndex: 9,
    isCriticalPath: false,
    resourceRequired: 'Montadores eléctricos de AT/MT + Camión pluma + Gas SF6',
    safetyRisk: 'Manejo de gas SF6, conexión de embarrados de 132 kV a cota superior',
    clmRegulationNote: 'Verificación de distancias de aislamiento en aire conforme a MIE-RAT 12.',
  },
  {
    id: 'task_10_linea_evacuacion_at',
    code: 'ACT-10',
    name: '10. Tendido y tensado de línea aérea de evacuación de 132 kV a nudo de REE',
    category: 'subestacion',
    durationWeeks: 6,
    dependencies: ['task_05_obra_subestacion'],
    correctOrderIndex: 10,
    isCriticalPath: false,
    resourceRequired: 'Cabrestantes + Torres de celosía + Cable tierra-óptico OPGW + Salvapájaros',
    safetyRisk: 'Cruces sobre viales públicos, trabajo en altura sobre apoyos de celosía',
    clmRegulationNote: 'Obligatoriedad de espirales salvapájaros homologados por la Consejería de Desarrollo Sostenible.',
  },
  {
    id: 'task_11_pruebas_scada',
    code: 'ACT-11',
    name: '11. Ensayos de rigidez dieléctrica, calibración SCADA, 5 Reglas de Oro y energización en blanco',
    category: 'evacuacion_pruebas',
    durationWeeks: 2,
    dependencies: ['task_08_ensamblaje_rotor', 'task_09_aparellaje_subestacion', 'task_10_linea_evacuacion_at'],
    correctOrderIndex: 11,
    isCriticalPath: true,
    resourceRequired: 'Maleta de inyección secundaria de relés + Medidor de aislamiento 5 kV + Pértigas 25 kV',
    safetyRisk: 'Riesgo eléctrico de alta tensión durante las primeras maniobras de energización',
    clmRegulationNote: 'Cumplimiento estricto del RD 614/2001 y consignación de circuitos con corte visible y PAT.',
  },
  {
    id: 'task_12_puesta_marcha',
    code: 'ACT-12',
    name: '12. Puesta en marcha oficial, pruebas de red, recepción provisional y restauración vegetal',
    category: 'evacuacion_pruebas',
    durationWeeks: 2,
    dependencies: ['task_11_pruebas_scada'],
    correctOrderIndex: 12,
    isCriticalPath: true,
    resourceRequired: 'Ingeniero de puesta en marcha + Representante de REE + Coordinador ambiental',
    safetyRisk: 'Aparición de desequilibrios dinámicos de vibraciones o ruidos en primeros giros de palas',
    clmRegulationNote: 'Firma de Acta de Recepción Provisional y restitución de capas vegetales en acopios.',
  },
];

// ==========================================
// INCIDENCIAS TÉCNICAS Y DILEMAS DE OBRA (RETO 4 FASE 2)
// ==========================================
export const ON_SITE_DILEMMAS: OnSiteDilemma[] = [
  {
    id: 'dil_01_viento_izado',
    title: 'Incidencia Meteorológica durante Izado de Góndola',
    scenario: 'La grúa telescópica principal de 500 t tiene enganchada la góndola de 72 toneladas a 60 metros de altura. El anemómetro de la pluma marca ráfagas súbitas de viento de 11,5 m/s. El manual del fabricante de la grúa y el EBSS fijan el límite operativo máximo en 9,0 m/s.',
    incidentType: 'seguridad_viento',
    location: 'Plataforma del Aerogenerador nº 4',
    options: [
      {
        id: 'a',
        text: 'Detener inmediatamente el izado, descender la góndola con suavidad y trincarla en la plataforma hasta que el viento baje de 9 m/s',
        isCorrect: true,
        consequenceText: 'Excelente decisión técnica. Se prioriza la seguridad conforme a la Ley de PRL y normas de izado. Se evitan balanceos catastróficos de 72 toneladas contra la pluma.',
        budgetCost: -5000,
        safetyRisk: false,
      },
      {
        id: 'b',
        text: 'Acelerar la maniobra de subida para encajarla rápido en la corona antes de que el viento aumente',
        isCorrect: false,
        consequenceText: 'Infracción grave. El efecto péndulo golpea la pluma de la grúa y deforma la brida de apoyo. Sanción de seguridad y coste de peritaje.',
        budgetCost: -60000,
        safetyRisk: true,
      },
      {
        id: 'c',
        text: 'Soltar los vientos guía terrestres para que la góndola gire libremente con el viento',
        isCorrect: false,
        consequenceText: 'Peligrosísimo. Sin retención, la góndola gira sin control provocando torsión extrema en los cables del gancho.',
        budgetCost: -45000,
        safetyRisk: true,
      }
    ],
    explanation: 'Según la normativa de izado de Paraninfo (Pág. 145 y 249), las grúas de gran tonelaje tienen prohibido realizar maniobras con vientos superiores a los límites del fabricante (habitualmente 9-10 m/s) por riesgo inminente de vuelco o choque.',
    paraninfoRef: 'Pág. 145, 187 y 249',
  },
  {
    id: 'dil_02_bridas_taladros',
    title: 'Desajuste de Taladros en Bridas Metálicas de Torre',
    scenario: 'Durante el ensamblaje de la unión entre el tramo 2 y el tramo 3 de la torre tubular, se detecta que 4 de los 96 orificios para pernos de alta resistencia M36 presentan un desalineamiento de 2 mm impidiendo el paso del espárrago.',
    incidentType: 'montaje_bridas',
    location: 'Ensamble de Tramos de Torre',
    options: [
      {
        id: 'a',
        text: 'Proceder al escariado mecánico cilíndrico de los orificios y colocar pernos del siguiente diámetro nominal homologado; prohibir tajantemente el quemado con soplete',
        isCorrect: true,
        consequenceText: 'Solución correcta y reglamentaria según el Pliego de Condiciones de Estructuras Metálicas de Paraninfo (Pág. 146). No se altera la estructura cristalina del acero.',
        budgetCost: -3000,
        safetyRisk: false,
      },
      {
        id: 'b',
        text: 'Ensanchar los agujeros quemando el acero con soplete de oxicorte para ahorrar tiempo',
        isCorrect: false,
        consequenceText: 'Falta gravísima. El soplete descarbura y fragiliza el acero de la brida, generando microfisuras que rompen por fatiga. La Dirección Facultativa rechaza el tramo completo.',
        budgetCost: -95000,
        safetyRisk: true,
      },
      {
        id: 'c',
        text: 'Omitir los 4 pernos defectuosos confiando en los otros 92',
        isCorrect: false,
        consequenceText: 'Inadmisible. Rompe el cálculo de pretensado del Anejo nº 4 y generaría concentración de tensiones con rotura inminente de la unión.',
        budgetCost: -80000,
        safetyRisk: true,
      }
    ],
    explanation: 'El Pliego de Condiciones Técnicas de Paraninfo (Pág. 146) estipula taxativamente: "Si los agujeros de dos piezas a unir no coincidieran, se escariarán y se colocará un tornillo del siguiente mayor diámetro nominal. No se permitirá el quemado de agujeros existentes o nuevos".',
    paraninfoRef: 'Pág. 146 (Técnicas de ensamblado, alineación y sujeción)',
  },
  {
    id: 'dil_03_curado_hormigon',
    title: 'Control de Probetas de Hormigón de Zapata',
    scenario: 'El laboratorio de control de calidad entrega los resultados de rotura a compresión de las probetas de hormigón de la zapata del aerogenerador nº 2 a los 7 días (fck = 17 MPa, cuando la resistencia de proyecto a 28 días debe ser fck ≥ 30 MPa). El contratista de montaje quiere empezar a izar la torre para no pagar penalización diaria de grúa.',
    incidentType: 'curado_hormigon',
    location: 'Cimentación Aerogenerador nº 2',
    options: [
      {
        id: 'a',
        text: 'Prohibir el izado de la torre hasta que el hormigón alcance a los 28 días su resistencia de cálculo certificada fck ≥ 30 MPa',
        isCorrect: true,
        consequenceText: 'Decisión impecable como Dirección Facultativa. Cargar una cimentación verde con el peso de la torre eólico provocaría fisuras internas irreversibles en la zapata.',
        budgetCost: -4000,
        safetyRisk: false,
      },
      {
        id: 'b',
        text: 'Autorizar el izado inmediato porque a los 7 días el hormigón ya aguanta todo el peso',
        isCorrect: false,
        consequenceText: 'Negligencia técnica grave. Las cargas dinámicas provocan microfisuración en la masa de hormigón alrededor de la virola. Paralización judicial de la obra.',
        budgetCost: -120000,
        safetyRisk: true,
      },
      {
        id: 'c',
        text: 'Inyectar silicona líquida en la corona de la zapata y montar la torre',
        isCorrect: false,
        consequenceText: 'Disparate técnico sin validez estructural alguna.',
        budgetCost: -50000,
        safetyRisk: true,
      }
    ],
    explanation: 'Según la EHE-08, el CTE y el manual Paraninfo (Pág. 244-246), el hormigón estructural requiere un curado de 28 días para alcanzar su resistencia nominal de diseño fck antes de someterlo a los esfuerzos de izado y viento.',
    paraninfoRef: 'Págs. 142, 244-246',
  },
  {
    id: 'dil_04_cinco_reglas_oro',
    title: 'Procedimiento de las 5 Reglas de Oro en Subestación',
    scenario: 'Para realizar trabajos de conexión final en el embarrado de media tensión de 20 kV de la subestación, el equipo de mantenimiento eléctrico debe aplicar estrictamente el protocolo de las 5 Reglas de Oro conforme al RD 614/2001.',
    incidentType: 'cinco_reglas_oro',
    location: 'Sala de Celdas de MT - Subestación de Generación',
    options: [
      {
        id: 'a',
        text: '1º Desconectar con corte visible; 2º Prevenir realimentación (bloqueo/consignación); 3º Verificar ausencia de tensión con pértiga y detector; 4º Poner a tierra y en cortocircuito; 5º Proteger frente a elementos próximos y señalizar la zona',
        isCorrect: true,
        consequenceText: 'Procedimiento de seguridad perfecto. Cumple al 100% el RD 614/2001 y las especificaciones de seguridad de Paraninfo (Pág. 295).',
        budgetCost: 0,
        safetyRisk: false,
      },
      {
        id: 'b',
        text: '1º Poner a tierra directamente con un cable de cobre; 2º Abrir el interruptor; 3º Mirar el reloj',
        isCorrect: false,
        consequenceText: 'Falta mortal. Poner a tierra un circuito en tensión sin verificar desconexión provoca una explosión por cortocircuito directo.',
        budgetCost: -100000,
        safetyRisk: true,
      },
      {
        id: 'c',
        text: 'Desconectar únicamente el interruptor general y empezar a tocar los terminales con guantes de jardinería',
        isCorrect: false,
        consequenceText: 'Riesgo inminente de electrocución por retorno de tensión. Los guantes comunes no tienen aislamiento dieléctrico homologado.',
        budgetCost: -90000,
        safetyRisk: true,
      }
    ],
    explanation: 'El manual Paraninfo (Pág. 295 y 315) y el Real Decreto 614/2001 establecen la secuencia inalterable de las 5 Reglas de Oro: Desconexión -> Bloqueo contra realimentación -> Verificación de ausencia de tensión -> Puesta a tierra y en cortocircuito -> Señalización y protección.',
    paraninfoRef: 'Pág. 295 y Pág. 315',
  },
];
