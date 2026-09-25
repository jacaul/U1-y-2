/**
 * Types & Data Model for EólicaMaster
 * CIFP Aguas Nuevas - Unidad 2 & Repaso Unidad 1
 * Libro Paraninfo ISBN: 9788428395625 (Luis Romero Lozano)
 */

export type RoleType = 
  | 'jefe_obra'
  | 'ing_montaje'
  | 'coordinador_prl'
  | 'supervisor_electrico';

export interface StudentProfile {
  name: string;
  courseGroup: string;
  role: RoleType;
  roleTitle: string;
  avatarSeed: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: number;
  category: 'u1' | 'u2' | 'seguridad' | 'gestion';
}

export interface AnswerRecord {
  id: string;
  level: number;
  questionId: string;
  questionTitle: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  scoreDelta: number;
  budgetDelta: number;
  explanation: string;
  textbookRef?: string;
  timestamp: number;
}

export interface UserProgress {
  student: StudentProfile;
  currentLevel: number; // 1, 2, 3, 4
  completedLevels: number[];
  score: number;
  budget: number; // in Euros €
  initialBudget: number;
  safetyLives: number; // max 3
  timeRemainingSeconds: number; // general 45 min = 2700s
  levelTimes: Record<number, number>; // seconds spent per level
  achievements: Achievement[];
  answersHistory: AnswerRecord[];
  isGameFinished: boolean;
  startedAt: number;
  finishedAt?: number;
}

// Challenge 1 types (Inspection & U1 Review)
export interface AerogeneratorComponent {
  id: string;
  name: string;
  system: 'mecanico' | 'electrico' | 'aerodinamico' | 'obra_civil' | 'control_seguridad';
  location: 'gondola' | 'buje' | 'torre' | 'base_cimentacion' | 'exterior';
  technicalSpec: string;
  inspectionCheck: string;
  correctFunction: string;
  commonDefect: string;
  paraninfoRef: string;
}

export interface InspectionQuestion {
  id: string;
  componentId: string;
  title: string;
  prompt: string;
  questionType: 'multiple-choice' | 'defect-diagnostics' | 'parameter-calc';
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    technicalRationale: string;
  }[];
  explanation: string;
  paraninfoPage: string;
  points: number;
  budgetImpact: number;
}

// Challenge 2 types (Document Classification)
export type ProjectDocCategory = 'doc1_memoria' | 'doc2_planos' | 'doc3_pliego' | 'doc4_presupuesto';

export interface ProjectDocumentItem {
  id: string;
  title: string;
  description: string;
  correctCategory: ProjectDocCategory;
  subType?: string; // e.g. "Anejo nº 2", "Grupo 1", "Cuadro de Precios nº 1"
  importanceLegal: string;
  clmContext?: string; // e.g. "Exigido por la Viceconsejería de Medio Ambiente de Castilla-La Mancha"
  technicalTip: string;
}

// Challenge 3 types (Blueprint Hotspots & Analysis)
export interface BlueprintHotspot {
  id: string;
  blueprintType: 'plataforma_montaje' | 'seccion_zanja_mt' | 'cimentacion_virola' | 'unifilar_subestacion';
  xPercent: number;
  yPercent: number;
  label: string;
  title: string;
  technicalDescription: string;
  question: {
    prompt: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      rationale: string;
    }[];
    correctExplanation: string;
    bookFigureRef: string;
  };
}

// Challenge 4 types (Gantt Scheduling & Sequence)
export interface GanttTask {
  id: string;
  code: string;
  name: string;
  category: 'obra_civil' | 'electromecanico' | 'subestacion' | 'evacuacion_pruebas';
  durationWeeks: number;
  dependencies: string[]; // ids of predecessor tasks
  correctOrderIndex: number;
  isCriticalPath: boolean;
  resourceRequired: string;
  safetyRisk: string;
  clmRegulationNote: string;
}

// Formula Workbench & Challenge Types
export interface FormulaCalculationTask {
  id: string;
  title: string;
  category: 'betz' | 'potencia_viento' | 'altura_buje' | 'densidad_aire' | 'presupuesto_pec';
  prompt: string;
  formulaDisplay: string;
  givenData: { label: string; value: number | string; unit: string }[];
  targetVariable: string;
  correctValue: number;
  tolerance: number; // e.g. 0.05 (5%)
  unit: string;
  explanation: string;
  paraninfoRef: string;
  points: number;
  budgetImpact: number;
}

export interface OnSiteDilemma {
  id: string;
  title: string;
  scenario: string;
  incidentType: 'seguridad_viento' | 'montaje_bridas' | 'curado_hormigon' | 'cinco_reglas_oro';
  location: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    consequenceText: string;
    budgetCost: number;
    safetyRisk: boolean;
  }[];
  explanation: string;
  paraninfoRef: string;
}
